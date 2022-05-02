#app.py

from flask import Flask, request, Response
import json
import pymongo

app = Flask(__name__)

def mongoConnection():
    try:
        client = pymongo.MongoClient("mongodb+srv://selinnen:admin@cluster0.yyatd.mongodb.net/testDB?retryWrites=true&w=majority")
        db = client["test"]
        col = db["testCol"]
        return col
    except:
        return Exception('Error connecting to DB')

@app.route('/createUser', methods=["POST"])
def createUser():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "username" in arguments and "password" in arguments:
            username = arguments.get("username")
            password = arguments.get("password")
        else:
            return {
                'error': 'This input does not contain proper fields',
                'status': 404
            }, 404
    else:
        return {
            'error': 'This input is not in a json format',
            'status': 404
        }, 404
    col = mongoConnection()
    record = {
        "username": username,
        "password": password
    }
    col.insert_one(record)
    response = Response(
        response=json.dumps({
            "username": username,
            "message": "success"
        }), 
        status=201, 
        mimetype='application/json'
    )
    return response

@app.route('/login', methods=["POST"])
def logIn():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "username" in arguments and "password" in arguments:
            username = arguments.get("username")
            password = arguments.get("password")
        else:
            return {
                'error': 'This input does not contain proper fields',
                'status': 404
            }, 404
    else:
        return {
            'error': 'This input is not in a json format',
            'status': 404
        }, 404
    col = mongoConnection()
    record = {
        "username": username,
        "password": password
    }
    task = col.find_one(record)
    if task is None:
        return {
            'error': 'User not found',
            'status': 404
        }, 404
    else:
        response = Response(
            response=json.dumps({
                "username": username,
                "message": "success"
            }), 
            status=201, 
            mimetype='application/json'
        )
        return response

@app.route('/createRequest', methods=["POST"])
def createRequest():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "username" in arguments and "from" in arguments and "to" in arguments:
            username = arguments.get("username")
            fromPlace = arguments.get("from")
            toPlace = arguments.get("to")
        else:
            return {
                'error': 'This input does not contain proper fields',
                'status': 404
            }, 404
    else:
        return {
            'error': 'This input is not in a json format',
            'status': 404
        }, 404
    col = mongoConnection()
    record = {
        "username": username,
        "password": password
    }
    task = col.find_one(record)
    if task is None:
        return {
            'error': 'User not found',
            'status': 404
        }, 404
    else:
        response = Response(
            response=json.dumps({
                "username": username,
                "message": "success"
            }), 
            status=201, 
            mimetype='application/json'
        )
        return response

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)