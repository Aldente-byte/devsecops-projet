
# Install Mongodb

sudo apt install python3-pip
sudo apt update
sudo apt install -y mongodb
sudo systemctl status mongodb
sudo systemctl enable mongodb
sudo ufw allow ssh



# backend   -- create a mongo database and create some documents
mongo
use mongotask
# create two users
db.createUser({user: 'zh', pwd: 'test', roles: [{role: 'readWrite', db: 'mongotask'}]})
db.createUser({user: 'ziyati', pwd: 'test', roles: [{role: 'readWrite', db: 'mongotask'}]})

db.tasks.insert({"title":"course"})
db.tasks.insert({"title":"training"})
db.tasks.insert({"title":"pause"})

db.tasks.find().pretty()



# Preparing Api
pip3 install flask
pip3 install flask-cors
pip3 install flask_pymongo

-- run api by
python3 mongo.py

# test backend with Advanced Rest Client in Chrome

# frontend
sudo apt install -y  npm
sudo npm install -g npx
sudo npm install -g yarn

yarn
yarn start
