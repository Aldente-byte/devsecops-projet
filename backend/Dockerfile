FROM python:3.8
#Uses an official Docker image with Python 3.8 already installed

EXPOSE 5000
#this container will listen on port 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1
#Keeps the container cleaner, smaller

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1
#Ensures Python logs are visible immediately inside containers.

# Copy pip requirements into container and install dependencies
ADD requirements.txt .
RUN python -m pip install -r requirements.txt
#Create /app and move into it then copy all backend into it
WORKDIR /app
ADD . /app
