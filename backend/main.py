from os import link
from flask import Flask, redirect
from flask import request
from flask_cors import CORS
from functools import wraps
import authenticator
import database
import util

app = Flask(__name__)
CORS(app, supports_credentials=True)

token_manager = authenticator.TokenManager()
database_manager = database.SQLiteWrapper()


def authenticated(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not token_manager.check_token(request.cookies.get('token')):
            return util.build_response("Unauthorized", 403)
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper


@app.route('/create/token', methods=["POST"])
def createToken():
    post_data = request.json
    if post_data["password"] == authenticator.password:
        new_token = token_manager.create_token()
        return util.build_response("OK", 200, cookie=["token", new_token])
    else:
        return util.build_response("Unauthorized", 403)


@app.route('/logout', methods=["POST"])
@authenticated
def logout():
    token_manager.delete_token(request.cookies.get('token'))
    return util.build_response("OK")


@app.route('/authenticated', methods=["GET"])
#@authenticated
def is_authenticated():
    return util.build_response("OK")


@app.route('/links', methods=["GET"])
def get_Links():
    links=database_manager.load_links()
    return util.build_response(database_manager.load_links())


@app.route('/links/add', methods=["POST"])
#@authenticated
def add_Links():
    database_manager.store_links(request.json["shortname"], request.json["url"])
    return util.build_response("OK")


@app.route('/links/remove', methods=["POST"])
#@authenticated
def remove_Links():
    database_manager.remove_links(request.json["id"])
    return util.build_response("OK")

@app.route('/favicon.ico', methods=["GET"])
def icon():
    return util.build_response("OK")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_dir(path):
    url=database_manager.load_and_increment_link(path)
    return redirect(url)

app.run("127.0.0.1", threaded=True)
