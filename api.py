from flask import Flask, jsonify, request
from flask_cors import CORS


def index():
    data = request.get_json()
    print(data)
    a = area(data["length"], data["depth"])

    return jsonify({"risultato": a})


def area(lenght, depth):
    return lenght * depth


def create_app():
    app = Flask(__name__)
    _ = CORS(app)

    app.add_url_rule("/calculate", view_func=index, methods=["POST"])
    return app
