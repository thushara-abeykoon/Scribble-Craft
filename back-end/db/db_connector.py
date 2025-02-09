import mysql.connector


def get_connection():
    try:
        return mysql.connector.connect(host="localhost", user="root", passwd="1234", db="scribble_craft")
    except:
        try:
            conn = mysql.connector.connect(host="localhost", user="root", passwd="1234")
            cur = conn.cursor()
            print("Database isn't created yet!...\nCreating Database")
            cur.execute("CREATE DATABASE scribble_craft")
            return mysql.connector.connect(host="localhost", user="root", passwd="", db="scribble_craft")
        except mysql.connector.Error:
            print("Connection Error! Check Your Connection to MySQL Server!")


def database_initialize():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(50) UNIQUE NOT NULL, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL)""")


database_initialize()
