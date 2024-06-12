from flask import Flask, session
from flask_session import Session
from auth.register import register_user
from auth.login import login_user
from symptoms.symptoms import symptoms
from patients.patients import patients
from patients.vitals import vitals
from prediction.prediction import prediction
from recommendations.recommendations import recommendations
from reports.patientreports import patient_report_blueprint
from appointments.appointments import appointments_blueprint
from practitioners.practitioner import practitioners
from auth.profile import update_profile
from patients.medications import medications_blueprint
from flask_cors import CORS
from flask_mail import Mail

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = '2e9b368eb2468a42820e99bc2445bc49'
Session(app)
CORS(app) 

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'jgitaridev@gmail.com'
app.config['MAIL_PASSWORD'] = 'bczu qosa vktd zoii'
app.config['MAIL_DEFAULT_SENDER'] = 'jgitaridev@gmail.com'

mail = Mail(app)

# Register the blueprints
app.register_blueprint(register_user)
app.register_blueprint(login_user)
app.register_blueprint(symptoms)
app.register_blueprint(patients)
app.register_blueprint(vitals)
app.register_blueprint(prediction)
app.register_blueprint(recommendations)
app.register_blueprint(patient_report_blueprint)
app.register_blueprint(appointments_blueprint)
app.register_blueprint(practitioners)
app.register_blueprint(update_profile)
app.register_blueprint(medications_blueprint)

if __name__ == '__main__':
    app.run()
