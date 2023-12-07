from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from db.db_connector import database_initialize, get_connection
import mysql.connector
import hashlib

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

    email = data['email']
    password = data['password']

    hashed_user_password = hashlib.md5(password.encode('utf-8')).hexdigest()

    # check if the password is correct for the particular email
    conn = get_connection()
    cursor = conn.cursor()
    query = f"SELECT password FROM user WHERE email = '{email}'"
    cursor.execute(query)
    password_from_db = cursor.fetchone()
    if cursor.rowcount == 0:
        return jsonify({"error": "email isn't recognized"}), 401
    elif hashed_user_password == list(password_from_db)[0]:
        access_token = create_access_token(identity=email)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "password isn't valid"}), 403
