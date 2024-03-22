import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the cleaned datasets
cleaned_pcos_data1 = pd.read_csv("../datasets/cleaned_datasets/cleaned_pcos_data1.csv")
cleaned_pcos_data2 = pd.read_csv("../datasets/cleaned_datasets/cleaned_pcos_data2.csv")
cleaned_pregrisk_data1 = pd.read_csv("../datasets/cleaned_datasets/cleaned_pregrisk_data1.csv")
# cleaned_pregrisk_data2 = pd.read_csv("../datasets/cleaned_datasets/cleaned_pregrisk_data2.csv")
cleaned_endo_data = pd.read_csv("../datasets/cleaned_datasets/cleaned_endo_data.csv")

# Visualize distributions of numeric features
def visualize_distribution(data, dataset_name):
    plt.figure(figsize=(10, 8))
    sns.histplot(data, kde=True)
    plt.title(f"Distribution of Numeric Features - {dataset_name}")
    plt.xlabel("Value")
    plt.ylabel("Frequency")
    plt.show()

# Visualize distributions for each cleaned dataset
for dataset, dataset_name in [(cleaned_pcos_data1, 'PCOS Data 1'), (cleaned_pcos_data2, 'PCOS Data 2'), (cleaned_pregrisk_data1, 'Pregnancy Risk Data 1'), (cleaned_endo_data, 'Endometriosis Data')]:
    visualize_distribution(dataset, dataset_name)
