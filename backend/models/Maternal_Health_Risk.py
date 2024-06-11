import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import missingno as msno
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from catboost import CatBoostClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
from joblib import dump, load
from sklearn.utils.class_weight import compute_class_weight
import warnings
import json
import joblib

warnings.filterwarnings("ignore")

# Load the dataset
df = pd.read_csv('../datasets/pregnancy-risk-datasets/Maternal Health Risk Data Set.csv')

# Exploratory Data Analysis (EDA)
def exploratory_data_analysis(df):
    print(df.shape)
    print(df.info())
    print(df.describe().transpose())
    print(df.isnull().sum())
    msno.bar(df, color='g', figsize=(10, 5), fontsize=12)
    plt.show()

    numerical_columns = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate']
    categorical_columns = ['RiskLevel']

    for column in numerical_columns:
        plt.figure(figsize=(8, 5))
        sns.histplot(df[column], kde=True)
        plt.title(f'Distribution of {column}')
        plt.show()

    for column in categorical_columns:
        plt.figure(figsize=(6, 4))
        sns.countplot(x=column, data=df, palette='Set2')
        plt.title(f'Count of each category in {column}')
        plt.show()

exploratory_data_analysis(df)

# Check for data imbalance
print("Risk Level Distribution Before SMOTE:")
print(df['RiskLevel'].value_counts())

# Feature Engineering
df['BodyTemp_Celsius'] = (df['BodyTemp'] - 32) * 5.0/9.0
df['AgeSquared'] = df['Age'] ** 2
df['HeartRateOverBodyTemp'] = df['HeartRate'] / df['BodyTemp']
df['BloodPressureRatio'] = df['SystolicBP'] / df['DiastolicBP']
df['AgeBMIProduct'] = df['Age'] * (df['BS'] / (df['BodyTemp'] ** 2))
df['BloodPressureDeviation'] = df['SystolicBP'] - df['DiastolicBP']
df['BloodSugarSquared'] = df['BS'] ** 2
df['RiskScore'] = (df['Age'] * df['SystolicBP']) / (df['DiastolicBP'] + df['HeartRate'])
df['BodyTempOverHeartRate'] = df['BodyTemp'] / df['HeartRate']
df['BloodPressureDiff'] = df['SystolicBP'] - df['DiastolicBP']

# Identifying and removing outliers
columns_for_outlier_detection = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate',
                                 'AgeSquared', 'HeartRateOverBodyTemp', 'BloodPressureRatio',
                                 'AgeBMIProduct', 'BloodPressureDeviation', 'BloodSugarSquared',
                                 'BodyTempOverHeartRate', 'BloodPressureDiff']

Q1 = df[columns_for_outlier_detection].quantile(0.25)
Q3 = df[columns_for_outlier_detection].quantile(0.75)
IQR = Q3 - Q1

upper_limit = Q3 + 1.5 * IQR
lower_limit = Q1 - 1.5 * IQR

df = df[~((df[columns_for_outlier_detection] < lower_limit) | (df[columns_for_outlier_detection] > upper_limit)).any(axis=1)]

# Fill missing values
df.fillna(df.median(), inplace=True)

# Label encoding
le = LabelEncoder()
df['RiskLevel'] = le.fit_transform(df['RiskLevel'])

# Splitting the dataset
X = df[['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate', 'AgeSquared', 'HeartRateOverBodyTemp',
        'BloodPressureRatio', 'AgeBMIProduct', 'BloodPressureDeviation', 'BloodSugarSquared', 'RiskScore',
        'BodyTempOverHeartRate', 'BloodPressureDiff']]
y = df['RiskLevel']

# Apply SMOTE to balance the classes
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

print("Risk Level Distribution After SMOTE:")
print(pd.Series(y_resampled).value_counts())

X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=1)

# Feature scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Compute class weights
class_weights = compute_class_weight(class_weight='balanced', classes=np.unique(y_resampled), y=y_resampled)
class_weights_dict = {i: weight for i, weight in enumerate(class_weights)}

# Model training and evaluation
def train_and_evaluate_model(model, X_train, X_test, y_train, y_test):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Accuracy: {accuracy:.2f}')
    print(classification_report(y_test, y_pred))
    return model

# Training CatBoost model with class weights
catboost_model = CatBoostClassifier(random_state=30, class_weights=class_weights_dict, verbose=0)
catboost_model = train_and_evaluate_model(catboost_model, X_train, X_test, y_train, y_test)

joblib.dump(scaler, 'scaler.joblib')
joblib.dump(le, 'label_encoder.joblib')

# Save the model and feature columns
dump(catboost_model, 'Maternal_Health_Risk.joblib')
with open('feature_columns.json', 'w') as f:
    json.dump(X.columns.tolist(), f)

# Load the model and feature columns for prediction
loaded_model = load('Maternal_Health_Risk.joblib')
with open('feature_columns.json', 'r') as f:
    expected_features = json.load(f)

# Ensure the feature columns match
if list(X.columns) == expected_features:
    # Function to predict risk level for a new instance
    def predict_risk(new_data):
        # Transform the new data to match the training data
        new_data_scaled = scaler.transform(new_data)
        prediction = loaded_model.predict(new_data_scaled)
        risk_level = le.inverse_transform(prediction)
        return risk_level[0]

    # Example high-risk instance
    high_risk_instance = pd.DataFrame({
        'Age': [30],
        'SystolicBP': [130],
        'DiastolicBP': [85],
        'BS': [7.2],
        'BodyTemp': [98.6],
        'HeartRate': [80],
        'AgeSquared': [30**2],
        'HeartRateOverBodyTemp': [80 / 98.6],
        'BloodPressureRatio': [130 / 85],
        'AgeBMIProduct': [30 * (7.2 / (98.6 ** 2))],
        'BloodPressureDeviation': [130 - 85],
        'BloodSugarSquared': [7.2 ** 2],
        'RiskScore': [30 * 130 / (85 + 80)],
        'BodyTempOverHeartRate': [98.6 / 80],
        'BloodPressureDiff': [130 - 85]
    })

    high_risk_level = predict_risk(high_risk_instance)
    print(f'The predicted risk level for the high-risk instance is: {high_risk_level}')
    
    if high_risk_level == 'high risk':
        print("This individual is considered high risk.")
    else:
        print("This individual is not considered high risk.")

    # Example low-risk instance
    low_risk_instance = pd.DataFrame({
        'Age': [25],
        'SystolicBP': [110],
        'DiastolicBP': [70],
        'BS': [5.5],
        'BodyTemp': [98.6],
        'HeartRate': [70],
        'AgeSquared': [25**2],
        'HeartRateOverBodyTemp': [70 / 98.6],
        'BloodPressureRatio': [110 / 70],
        'AgeBMIProduct': [25 * (5.5 / (98.6 ** 2))],
        'BloodPressureDeviation': [110 - 70],
        'BloodSugarSquared': [5.5 ** 2],
        'RiskScore': [25 * 110 / (70 + 70)],
        'BodyTempOverHeartRate': [98.6 / 70],
        'BloodPressureDiff': [110 - 70]
    })

    low_risk_level = predict_risk(low_risk_instance)
    print(f'The predicted risk level for the low-risk instance is: {low_risk_level}')
    
    if low_risk_level == 'high risk':
        print("This individual is considered high risk.")
    else:
        print("This individual is not considered high risk.")
else:
    print("The feature columns do not match the expected features by the model.")
