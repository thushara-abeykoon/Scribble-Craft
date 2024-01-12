from flask import Flask
from flask_jwt_extended import JWTManager

from user import user
from font_config.manual_request import font
import secrets

app = Flask(__name__)
app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(font, url_prefix='/font')

secret_key = secrets.token_urlsafe(32)

app.config['JWT_SECRET_KEY'] = secret_key

jwt = JWTManager(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
