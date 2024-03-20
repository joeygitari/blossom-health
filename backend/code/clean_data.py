import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import os

# Create a directory path for the cleaned datasets
cleaned_datasets_dir = "../datasets/cleaned_datasets"

# Check if the directory exists, if not, create it
if not os.path.exists(cleaned_datasets_dir):
    os.makedirs(cleaned_datasets_dir)

# Step 1: Load data from CSV files
pcos_data1 = pd.read_csv("../datasets/pcos-datasets/PCOS_data.csv")
pcos_data2 = pd.read_csv("../datasets/pcos-datasets/PCOS_infertility.csv")
pcos_data3 = pd.read_csv("../datasets/pcos-datasets/PCOS_data_without_infertility/Full_new-Table 1.csv")
pregrisk_data1 = pd.read_csv("../datasets/pregnancy-risk-datasets/Maternal Health Risk Data Set.csv")
pregrisk_data2 = pd.read_csv("../datasets/pregnancy-risk-datasets/risk-dataset.csv")
endo_data = pd.read_csv("../datasets/endometriosis-datasets/endo-dataset.csv")

# Step 2: Load data from Excel file
# try:
#     endo_data = pd.read_excel("../datasets/endometriosis-datasets/endo-dataset.xlsx")
#     pcos_data3 = pd.read_excel("../datasets/pcos-datasets/PCOS_data_without_infertility.xlsx")
# except FileNotFoundError:
#     print("Error: The Excel file 'endo-dataset.xlsx' was not found at the specified location.")
#     # Handle the error gracefully, e.g., print a helpful message or exit the script
#     exit(1)

# Step 3: Clean and preprocess the data
def clean_data(data):
    # Handle missing values
    data.dropna(inplace=True)
    
    # Perform any other cleaning steps if necessary
    
    return data

pcos_data1 = clean_data(pcos_data1)
pcos_data2 = clean_data(pcos_data2)
pcos_data3 = clean_data(pcos_data3)
endo_data = clean_data(endo_data)
pregrisk_data1 = clean_data(pregrisk_data1)
pregrisk_data2 = clean_data(pregrisk_data2)

# Step 4: Combine the cleaned data if necessary
# For example, if you want to concatenate the data vertically
# combined_data = pd.concat([pcos_data, endo_data], axis=0)

# # Step 5: Preprocess the combined data
# # For example, standardize numerical features
# scaler = StandardScaler()
# numerical_features = combined_data.select_dtypes(include=[np.number])
# scaled_features = scaler.fit_transform(numerical_features)
# combined_data[numerical_features.columns] = scaled_features

# # Step 6: Save the cleaned data if needed
# # For example, if you want to save the combined_data
# combined_data.to_csv("cleaned_combined_data.csv", index=False)

# Alternatively, if you want to save both datasets separately
pcos_data1.to_csv(os.path.join(cleaned_datasets_dir, "cleaned_pcos_data1.csv"), index=False)
pcos_data2.to_csv(os.path.join(cleaned_datasets_dir, "cleaned_pcos_data2.csv"), index=False)
pcos_data3.to_csv(os.path.join(cleaned_datasets_dir, "cleaned_pcos_data3.csv"), index=False)
endo_data.to_csv(os.path.join(cleaned_datasets_dir, "cleaned_endo_data.csv"), index=False)
pregrisk_data1.to_csv(os.path.join(cleaned_datasets_dir, "cleaned_pregrisk_data1.csv"), index=False)
pregrisk_data2.to_csv(os.path.join(cleaned_datasets_dir, "cleaned_pregrisk_data2.csv"), index=False)