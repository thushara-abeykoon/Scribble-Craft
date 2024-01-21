from flask import Flask
from flask_jwt_extended import JWTManager

from automatic_config.request_handler import automatic
from user import user
from manual_config.request_handler import manual
import secrets

app = Flask(__name__)
app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(manual, url_prefix='/manual')
app.register_blueprint(automatic, url_prefix='/automatic')

secret_key = secrets.token_urlsafe(32)

app.config['JWT_SECRET_KEY'] = secret_key

jwt = JWTManager(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
