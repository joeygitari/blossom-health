from flask import Blueprint, request, jsonify, session
import psycopg2
import pandas as pd
import joblib
import os

# Define a Blueprint for prediction
prediction = Blueprint('prediction', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''
