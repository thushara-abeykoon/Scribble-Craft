import mysql.connector
from flask import Flask, request, jsonify
from db.db_connector import database_initialize
from db.db_connector import get_connection

app = Flask(__name__)
database_initialize()


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    required_fields = ['username', 'fullname', 'email', 'password']
    if not all(field in data for field in required_fields):
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


if __name__ == '__main__':
    app.run()
