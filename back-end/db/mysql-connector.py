import mysql.connector


def db_cursor():
    return mysql.connector.connect(host="localhost", user="root", passwd="", db="scribble_craft").cursor()


def get_db_cursor():
    try:
        return db_cursor()
    except:
        try:
            db = mysql.connector.connect(host="localhost", user="root", passwd="")
            cur = db.cursor()
            print("Database isn't created yet!...\nCreating Database")
            cur.execute("create database scribble_craft")
            return db_cursor()
        except:
            print("Connection Error! Check Your Connection to MySQL Server!")
