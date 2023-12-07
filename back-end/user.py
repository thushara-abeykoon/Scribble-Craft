from flask import Blueprint, request, jsonify
from db.db_connector import database_initialize, get_connection
import mysql.connector

user = Blueprint('user', __name__)

database_initialize()


def parameters_check(data, required_fields):
    return all(field in data for field in required_fields)


@user.route('/register', methods=['POST'])
def register():
    data = request.json
    required_fields = ['username', 'fullname', 'email', 'password']
    if not parameters_check(data, required_fields):
        return jsonify({"error": "missing parameters"})

    insert_statement = "INSERT INTO user (username,fullname,email,password) VALUES (%s,%s,%s,MD5(%s));"
    conn = get_connection()
    cursor = conn.cursor()

    # make the data ready to insert database
    insert_data_list = []
    for field in required_fields:
        insert_data_list.append(data[field])
    insert_tuple = tuple(insert_data_list)

    try:
        cursor.execute(insert_statement, insert_tuple)
        return jsonify({"message": "success"})
    except mysql.connector.Error as error:
        return jsonify({"error": f"{error.msg}"})


@user.route('/login', methods=['POST'])
def login():
    data = request.json
    required_fields = ['email', 'password']
    if not parameters_check(data, required_fields):
        return jsonify({"error": "missing parameters"})
