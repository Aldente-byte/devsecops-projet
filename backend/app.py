from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)

import os

app.config['MONGO_DBNAME'] = os.environ.get('MONGO_DATABASE', 'mongotask')
# Build MONGO_URI and include authSource=admin so root user created in the admin
# database can authenticate correctly. If you create users in a specific database,
# remove the authSource parameter or set it accordingly.
app.config['MONGO_URI'] = (
    'mongodb://' + os.environ.get('MONGO_USERNAME') + ':' + os.environ.get('MONGO_PASSWORD') +
    '@' + os.environ.get('MONGO_HOSTNAME') + ':27017/' + os.environ.get('MONGO_DATABASE', 'mongotask') +
    '?authSource=admin'
)

client = MongoClient(app.config['MONGO_URI'])
db = client[app.config['MONGO_DBNAME']]

CORS(app)


@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    tasks = db.tasks

    result = []

    for field in tasks.find():
        result.append({'_id': str(field['_id']), 'title': field['title']})
    return jsonify(result)

@app.route('/api/task', methods=['POST'])
def add_task():
    tasks = db.tasks 
    title = request.get_json().get('title')

    # insert_one returns InsertOneResult with inserted_id
    insert_result = tasks.insert_one({'title': title})
    task_id = insert_result.inserted_id
    new_task = tasks.find_one({'_id': task_id})

    result = {'title': new_task['title']}

    return jsonify({'result': result})

@app.route('/api/task/<id>', methods=['PUT'])
def update_task(id):
    tasks = db.tasks 
    title = request.get_json().get('title')

    tasks.find_one_and_update({'_id': ObjectId(id)}, {"$set": {"title": title}}, upsert=False)
    new_task = tasks.find_one({'_id': ObjectId(id)})

    result = {'title': new_task['title']}

    return jsonify({"result": result})

@app.route('/api/task/<id>', methods=['DELETE'])
def delete_task(id):
    tasks = db.tasks 

    response = tasks.delete_one({'_id': ObjectId(id)})

    if response.deleted_count == 1:
        result = {'message' : 'record deleted'}
    else: 
        result = {'message' : 'no record found'}
    
    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True)