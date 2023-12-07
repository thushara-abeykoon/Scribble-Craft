from flask import Flask
from flask_jwt_extended import JWTManager

from user import user
import secrets

app = Flask(__name__)
app.register_blueprint(user, url_prefix='/user')

secret_key = secrets.token_urlsafe(32)

app.config['JWT_SECRET_KEY'] = secret_key

jwt = JWTManager(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
