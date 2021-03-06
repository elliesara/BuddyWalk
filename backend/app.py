#app.py

from flask import Flask, request, Response
from flask_cors import CORS
import json
import sqlite3
import uuid
import threading

DATABASE = './database.db'
app = Flask(__name__)
CORS(app)
db = sqlite3.connect(DATABASE, check_same_thread=False)
cursor = db.cursor()
userdb = """
          CREATE TABLE IF NOT EXISTS users (
            username text not null,
            password text not null
          );
        """
cursor.execute(userdb)
db.commit()

requestdb = """
          CREATE TABLE IF NOT EXISTS requests (
            rid text not null,
            username text not null,
            fromplace text not null,
            toplace text not null
          );
        """
cursor.execute(requestdb)
db.commit()

pendingreqdb = """
          CREATE TABLE IF NOT EXISTS pendingrequests (
            rid text not null,
            owner text not null,
            requester text not null,
            status text not null
          );
        """
cursor.execute(pendingreqdb)
db.commit()

lock = threading.Lock()

# does not check same username
@app.route('/createUser', methods=["POST"])
def createUser():
    try:
        lock.acquire(True)
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
        
        query = "INSERT INTO users (username, password) VALUES (?, ?)"
        cursor.execute(query, [username, password])
        db.commit()
        response = Response(
            response=json.dumps({
                "username": username,
                "message": "success"
            }), 
            status=201, 
            mimetype='application/json'
        )
        return response
    finally:
        lock.release()

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
    try:
        lock.acquire(True)
        query = "select * from users where username = ? and password = ?"
        cursor.execute(query, [username, password])
        rv = cursor.fetchall()
        rv[0][0]
        response = Response(
            response=json.dumps({
                "username": username,
                "message": "success"
            }), 
            status=201, 
            mimetype='application/json'
        )
        return response
    except:
        return {
            'error': 'User not found',
            'status': 404
        }, 404
    finally:
        lock.release()

@app.route('/createRequest', methods=["POST"])
def createRequest():
    try:
        lock.acquire(True)
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
        rid = str(uuid.uuid4())
        query = "INSERT INTO requests (rid, username, fromplace, toplace) VALUES (?, ?, ?, ?)"
        cursor.execute(query, [rid, username, fromPlace, toPlace])
        db.commit()
        response = Response(
            response=json.dumps({
                "rid": rid,
                "from": fromPlace,
                "to": toPlace,
                "message": "success"
            }), 
            status=201, 
            mimetype='application/json'
        )
        return response
    finally:
        lock.release()

@app.route('/requestInfo', methods=["POST"])
def getRequestInfo():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "rid" in arguments:
            rid = arguments.get("rid")
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
    try:
        lock.acquire(True)
        query = "select * from requests where rid = ?"
        cursor.execute(query, [rid])
        rv = cursor.fetchall()
        requests = []
        for row in range(len(rv)):
            rid = rv[row][0]
            username = rv[row][1]
            fromPlace = rv[row][2]
            toPlace = rv[row][3]
            value = {
                "rid": rid,
                "username": username,
                "from": fromPlace,
                "to": toPlace
            }
            requests += [value]
        return {'requests': requests}, 200
    except:
        return {
            'error': 'getting request info error',
            'status': 404
        }, 404
    finally:
        lock.release()

@app.route('/requests', methods=["GET"])
def listAllRequests():
    try:
        lock.acquire(True)
        query = "select * from requests"
        cursor.execute(query)
        rv = cursor.fetchall()
        requests = []
        for row in range(len(rv)):
            rid = rv[row][0]
            username = rv[row][1]
            fromPlace = rv[row][2]
            toPlace = rv[row][3]
            value = {
                "rid": rid,
                "username": username,
                "from": fromPlace,
                "to": toPlace
            }
            requests += [value]
        return {'requests': requests, 'message': 'success'}, 200
    except:
        return {
            'error': 'Listing all requests error',
            'status': 404
        }, 404
    finally:
        lock.release()

@app.route('/requests', methods=["POST"])
def listUserRequests():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "username" in arguments:
            username = arguments.get("username")
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
    try:
        lock.acquire(True)
        query = "select * from requests where username = ?"
        cursor.execute(query, [username])
        rv = cursor.fetchall()
        requests = []
        for row in range(len(rv)):
            rid = rv[row][0]
            username = rv[row][1]
            fromPlace = rv[row][2]
            toPlace = rv[row][3]
            value = {
                "rid": rid,
                "username": username,
                "from": fromPlace,
                "to": toPlace
            }
            requests += [value]
        return {'requests': requests, 'message': 'success'}, 200
    except:
        return {
            'error': 'Listing all requests error',
            'status': 404
        }, 404
    finally:
        lock.release()

@app.route('/offer', methods=["POST"])
def offerWalk():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "username" in arguments and "rid" in arguments:
            username = arguments.get("username")
            rid = arguments.get("rid")
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
    try:
        lock.acquire(True)
        #add pending request to the owner
        getQuery = "SELECT username from requests where rid = ?"
        cursor.execute(getQuery, [rid])
        rv = cursor.fetchall()
        owner = rv[0][0]
        status = "waiting"
        query = "INSERT INTO pendingrequests (rid, owner, requester, status) VALUES (?, ?, ?, ?)"
        cursor.execute(query, [rid, owner, username, status])
        db.commit()
        response = Response(
            response=json.dumps({
                "rid": rid,
                "owner": owner,
                "requester": username,
                "status": status,
                "message": "success"
            }), 
            status=200, 
            mimetype='application/json'
        )
        return response
    except:
        return {
            'error': 'Offer a walk error',
            'status': 404
        }, 404
    finally:
        lock.release()

@app.route('/pendingRequest', methods=["POST"])
def getPendingRequest():
    try:
        lock.acquire(True)
        if request.headers['Content-Type'] == 'application/json':
            arguments = request.get_json()
            if "username" in arguments:
                username = arguments.get("username")
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
        getQuery = "SELECT * from pendingrequests where owner = ? order by rid"
        cursor.execute(getQuery, [username])
        rv = cursor.fetchall()
        requests = []
        for row in range(len(rv)):
            rid = rv[row][0]
            owner = rv[row][1]
            requester = rv[row][2]
            status = rv[row][3]
            value = {
                "rid": rid,
                "owner": owner,
                "requester": requester,
                "status": status
            }
            requests += [value]
        return {'requests': requests, 'message': 'success'}, 200
    finally:
        lock.release()

@app.route('/pendingOffer', methods=["POST"])
def getPendingOffer():
    try:
        lock.acquire(True)
        if request.headers['Content-Type'] == 'application/json':
            arguments = request.get_json()
            if "username" in arguments:
                username = arguments.get("username")
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
        getQuery = "SELECT * from pendingrequests where requester = ?"
        cursor.execute(getQuery, [username])
        rv = cursor.fetchall()
        requests = []
        for row in range(len(rv)):
            rid = rv[row][0]
            owner = rv[row][1]
            requester = rv[row][2]
            status = rv[row][3]
            value = {
                "rid": rid,
                "owner": owner,
                "requester": requester,
                "status": status
            }
            requests += [value]
        return {'requests': requests, 'message': 'success'}, 200
    finally:
        lock.release()

@app.route('/acceptPendingRequest', methods=["POST"])
def acceptPendingRequest():
    if request.headers['Content-Type'] == 'application/json':
        arguments = request.get_json()
        if "rid" in arguments and "requester" in arguments:
            rid = arguments.get("rid")
            requester = arguments.get("requester")
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
    try:
        lock.acquire(True)
        getQuery = "SELECT status from pendingrequests where requester = ? and rid = ?"
        cursor.execute(getQuery, [requester, rid])
        rv = cursor.fetchall()
        status = rv[0][0]
        if status == "waiting":
            declinequery = "UPDATE pendingrequests SET status = 'declined' WHERE rid = ?"
            cursor.execute(declinequery, [rid])
            db.commit()
            query = "UPDATE pendingrequests SET status = 'accepted' WHERE requester = ? and rid = ?"
            cursor.execute(query, [requester, rid])
            db.commit()
            response = Response(
                response=json.dumps({
                    "rid": rid,
                    "requester": requester,
                    "status": "accepted",
                    "message": "success"
                }), 
                status=200, 
                mimetype='application/json'
            )
            return response
        else:
            return {
                'error': 'Not a valid pending offer',
                'status': 404
            }, 404
    except:
        return {
            'error': 'Accept pending offer error',
            'status': 404
        }, 404
    finally:
        lock.release()

@app.route('/acceptedOffer', methods=["POST"])
def acceptedOffer():
    try:
        lock.acquire(True)
        if request.headers['Content-Type'] == 'application/json':
            arguments = request.get_json()
            if "username" in arguments:
                username = arguments.get("username")
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
        getQuery = "SELECT * from pendingrequests where status = 'accepted' and owner = ?"
        cursor.execute(getQuery, [username])
        rv = cursor.fetchall()
        requests = []
        for row in range(len(rv)):
            rid = rv[row][0]
            owner = rv[row][1]
            requester = rv[row][2]
            getFrom = "SELECT fromplace from requests where rid = ? and username = ?"
            cursor.execute(getFrom, [rid, owner])
            res = cursor.fetchall()
            fromplace = res[0][0]
            getTo = "SELECT toplace from requests where rid = ? and username = ?"
            cursor.execute(getTo, [rid, owner])
            res = cursor.fetchall()
            toplace = res[0][0]

            value = {
                "owner": owner,
                "requester": requester,
                "from": fromplace,
                "to": toplace
            }
            requests += [value]
        return {'requests': requests, 'message': 'success'}, 200
    finally:
        lock.release()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)