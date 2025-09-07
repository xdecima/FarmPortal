from flask import Flask, jsonify


def index():
    return jsonify({"message": "Hello World !"})


def create_app():
    app = Flask(__name__)
    app.add_url_rule("/", view_func=index)
    return app
