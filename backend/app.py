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

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = '2e9b368eb2468a42820e99bc2445bc49'
Session(app)

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

if __name__ == '__main__':
    app.run()
