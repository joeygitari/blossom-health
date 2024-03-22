import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
import os

# Create a directory path for the cleaned datasets
cleaned_datasets_dir = "../datasets/cleaned_datasets"

# Check if the directory exists, if not, create it
if not os.path.exists(cleaned_datasets_dir):
    os.makedirs(cleaned_datasets_dir)

# Load data from CSV files
pcos_data1 = pd.read_csv("../datasets/pcos-datasets/PCOS_data.csv")
pcos_data2 = pd.read_csv("../datasets/pcos-datasets/PCOS_infertility.csv")
pregrisk_data1 = pd.read_csv("../datasets/pregnancy-risk-datasets/Maternal Health Risk Data Set.csv")
pregrisk_data2 = pd.read_csv("../datasets/pregnancy-risk-datasets/risk-dataset.csv")
endo_data = pd.read_csv("../datasets/endometriosis-datasets/endo-dataset.csv")

# Define columns to clean for each dataset
columns_to_clean = {
    'pregrisk_data1': {
        'risk_cols': ['RiskLevel']  # Specify risk columns
    },
    'pregrisk_data2': {
        'yes_no_cols': ['tt1', 'tt2', 'urine', 'urine_albumin', 'urine_sugar', 'body_swelling', 'DIB', 'bodypain', 'vomate', 'fever'],  # Specify "Yes/No" columns 
    },
}

# Clean and preprocess the data
def clean_data(data, columns_to_clean):
    # Handle missing values
    data.dropna(inplace=True)
    
    # Handle duplicates
    data.drop_duplicates(inplace=True)
    
    # Convert "Yes/No" columns to binary (0 for No, 1 for Yes)
    yes_no_cols = columns_to_clean.get('yes_no_cols', [])
    for col in yes_no_cols:
        data[col] = data[col].map({'Yes': 1, 'No': 0})
    
    # Encode "high risk", "mid risk", and "low risk" columns
    risk_cols = columns_to_clean.get('risk_cols', [])
    for col in risk_cols:
        label_encoder = LabelEncoder()
        data[col] = label_encoder.fit_transform(data[col])
    
    # Drop text columns
    text_cols = data.select_dtypes(include='object').columns
    data.drop(columns=text_cols, inplace=True)
    
    # Handle outliers (Example: using z-score method)
    numeric_columns = data.select_dtypes(include=['float64', 'int64']).columns
    z_scores = np.abs((data[numeric_columns] - data[numeric_columns].mean()) / data[numeric_columns].std())
    data = data[(z_scores < 3).all(axis=1)]  # Keep only the data within 3 standard deviations
    
    return data

# Iterate over datasets and apply cleaning process
cleaned_datasets = {}
for dataset_name, dataset in [('pcos_data1', pcos_data1), ('pcos_data2', pcos_data2), ('pregrisk_data1', pregrisk_data1), ('pregrisk_data2', pregrisk_data2), ('endo_data', endo_data)]:
    cleaned_dataset = clean_data(dataset.copy(), columns_to_clean.get(dataset_name, {}))
    cleaned_datasets[dataset_name] = cleaned_dataset

# Save datasets separately
for dataset_name, dataset in cleaned_datasets.items():
    dataset.to_csv(os.path.join(cleaned_datasets_dir, f"cleaned_{dataset_name}.csv"), index=False)

