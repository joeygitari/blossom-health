import pandas as pd
import os

cleaned_datasets_dir = "../datasets/cleaned_datasets"

# Load cleaned datasets
cleaned_pcos_data1 = pd.read_csv("../datasets/cleaned_datasets/cleaned_pcos_data1.csv")
cleaned_pcos_data2 = pd.read_csv("../datasets/cleaned_datasets/cleaned_pcos_data2.csv")

# Merge datasets
merged_pcos_data = pd.merge(cleaned_pcos_data1, cleaned_pcos_data2, how='outer') 

# Save the merged dataset
merged_pcos_data.to_csv(os.path.join(cleaned_datasets_dir, "merged_pcos_data.csv"), index=False)
