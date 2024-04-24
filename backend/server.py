from flask import Flask
from auth.register import register_user
from auth.login import login_user
from symptoms.symptoms import symptoms

app = Flask(__name__)

# Register the blueprints
app.register_blueprint(register_user)
app.register_blueprint(login_user)
app.register_blueprint(symptoms)

if __name__ == '__main__':
    app.run()
