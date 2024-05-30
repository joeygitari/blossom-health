#!/usr/bin/env python
# coding: utf-8

# # Maternal Health Risk Analysis
# 
# 
# 
# <img src="https://miro.medium.com/max/400/1*rmj7B0EumeMHL4SiW6tD5Q.gif" width="600px">

# Pregnancy is a pivotal phase in a woman's life, demanding monitoring of maternal health to ensure the well-being of both the expecting mother and the unborn child. Complications during pregnancy can pose serious risks, making it necessary for early detection and intervention.
# 
# The objective is to develop a predictive model that assesses the potential risks associated with pregnancy based on a set of crucial health indicators. These indicators may include maternal age, medical history, lifestyle factors, and various physiological parameters.

# ## Data Description
# 
# **Age:** Represents the age of pregnant women in years. Any ages are considered during pregnancy.
# 
# **Systolic Blood Pressure (SystolicBP):** The upper value of Blood Pressure measured in millimeters of mercury (mmHg). Systolic blood pressure is a significant attribute during pregnancy.
# 
# **Diastolic Blood Pressure (DiastolicBP):** The lower value of Blood Pressure measured in millimeters of mercury (mmHg). Diastolic blood pressure is another significant attribute during pregnancy.
# 
# **Blood Glucose Levels (BS):** Blood glucose levels expressed in terms of a molar concentration, measured in millimoles per liter (mmol/L).
# 
# **Body Temperature (BodyTemp):** Represents the body temperature of pregnant women, measured in degrees Fahrenheit (F).
# 
# **Heart Rate:** A normal resting heart rate of pregnant women, measured in beats per minute (bpm).
# 
# **Risk Level:** Predicted Risk Intensity Level during pregnancy, considering the previous health attributes. This is the target variable for risk prediction.

# ## The imports

# In[60]:


#importing required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import missingno as msno
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
from lightgbm import LGBMClassifier
import warnings
warnings.filterwarnings("ignore")


# ## The dataset

# In[61]:


df=pd.read_csv('../datasets/pregnancy-risk-datasets/Maternal Health Risk Data Set.csv')


# In[62]:


df.head()


# ## Explorative Data Analysis (EDA)

# ### Descriptive Statistics

# In[63]:


df.shape


# In[64]:


df.info()


# #### Statistical data summaries

# In[65]:


df.describe().transpose()


# #### Summary
# The dataset provides insights into the demographic and health-related characteristics. The age distribution spans from 10 to 70 years, with an average age of approximately 29.87 years. The majority of individuals fall within the age range of 19 to 39. Systolic blood pressure varies widely, ranging from 70 to 160 mmHg, with an average of approximately 113.20 mmHg. A big portion of the population has a systolic blood pressure of 120 mmHg.
# 
# In terms of diastolic blood pressure, the range extends from 49 to 100 mmHg, with an average of approximately 76.46 mmHg. The majority of individuals have diastolic blood pressure levels below 90 mmHg. Blood sugar levels in the population vary from 6 to 19, with an average level of approximately 8.73. The range for blood sugar falls between 6.9 and 8.
# 
# Body temperature readings range from 98 to 103°F, with an average temperature of approximately 98.67°F. The most common body temperature observed is 98°F. Heart rates exhibit variability, ranging from 7 to 90 beats per minute, with an average rate of approximately 74.30 beats per minute. The predominant heart rate range lies between 70 and 80 beats per minute.

# ### Checking for missing values in the dataset

# In[66]:


print(df.isnull().sum())
print('\n')
msno.bar(df,color = 'g',figsize=(10,5), fontsize=12)


# #### Univarient, bivarient and multivarient analysis

# In[67]:


# Numerical variables
numerical_columns = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate']
categorical_columns = ['RiskLevel']


# In[68]:


#Plot 1: Univariate analysis for numerical variables
for column in numerical_columns:
    plt.figure(figsize=(8, 5))
    sns.histplot(df[column], kde=True)
    plt.title(f'Distribution of {column}')
    plt.show()


# In[69]:


#Plot 2: Univariate analysis for categorical variable
for column in categorical_columns:
    plt.figure(figsize=(6, 4))
    sns.countplot(x=column, data=df,palette='Set2')
    plt.title(f'Count of each category in {column}')
    plt.show()


# In[70]:


# Plot 3: Boxplot for Age and RiskLevel
plt.figure(figsize=(10, 6))
sns.boxplot(x="RiskLevel", y="Age", data=df, palette="Set3")
plt.title("Boxplot of Age by Risk Level")
plt.show()


# In[71]:


# Plot 4: Violin plot for Blood Glucose Levels and RiskLevel
plt.figure(figsize=(10, 6))
sns.violinplot(x="RiskLevel", y="BS", data=df, palette="pastel")
plt.title("Violin plot of Blood Glucose Levels by Risk Level")
plt.show()


# In[72]:


# Plot 5: Swarm plot for Heart Rate and RiskLevel
plt.figure(figsize=(10, 6))
sns.swarmplot(x="RiskLevel", y="HeartRate", data=df, palette="Blues")
plt.title("Swarm plot of Heart Rate by Risk Level")
plt.show()


# In[73]:


# Plot 6: Bar plot for RiskLevel distribution
plt.figure(figsize=(8, 5))
sns.barplot(x=df["RiskLevel"].value_counts().index, y=df["RiskLevel"].value_counts(), palette="pastel")
plt.title("Distribution of Risk Levels")
plt.show()


# In[74]:


# Plot 7: Strip plot for Age and RiskLevel with jitter
plt.figure(figsize=(10, 6))
sns.stripplot(x="RiskLevel", y="Age", data=df, palette="coolwarm", jitter=True)
plt.title("Strip plot of Age by Risk Level with Jitter")
plt.show()


# In[75]:


# Plot 8: Pie chart for RiskLevel distribution
plt.figure(figsize=(8, 8))
df["RiskLevel"].value_counts().plot.pie(autopct='%1.1f%%', startangle=90, colors=sns.color_palette("pastel"), explode=(0.1, 0, 0))
plt.title("Pie chart for Risk Level distribution")
plt.show()


# In[76]:


# # Plot 9: Histogram for Body Temperature by RiskLevel
# plt.figure(figsize=(10, 6))
# sns.histplot(df, x="BodyTemp", hue="RiskLevel", kde=True, palette="husl", bins=20)
# plt.title("Histogram of Body Temperature by Risk Level")
# plt.show()


# Function to convert Fahrenheit to Celsius
def fahrenheit_to_celsius(f):
    return (5/9) * (f - 32)

# Plot 9: Histogram for Body Temperature by RiskLevel
plt.figure(figsize=(10, 6))
sns.histplot(df.assign(BodyTemp_Celsius=fahrenheit_to_celsius(df['BodyTemp'])), x="BodyTemp_Celsius", hue="RiskLevel", kde=True, palette="husl", bins=20)
plt.title("Histogram of Body Temperature by Risk Level")
plt.xlabel("Body Temperature (°C)")
plt.show()


# In[77]:


# Plot 10: Rug plot for Age by RiskLevel
plt.figure(figsize=(10, 6))
sns.rugplot(x="Age", hue="RiskLevel", data=df, palette="husl", height=0.5)
plt.title("Rug plot for Age by Risk Level")
plt.show()


# In[78]:


# Plot 11: Stacked Area plot for RiskLevel and Age
plt.figure(figsize=(12, 8))
sns.histplot(data=df, x="Age", hue="RiskLevel", multiple="stack", palette="Blues", bins=20)
plt.title("Stacked Area plot for Risk Level and Age")
plt.show()


# In[79]:


# # Plot 12: Pairplot for RiskLevel and numerical variables with hue
# sns.pairplot(df, hue="RiskLevel", palette="husl", vars=["SystolicBP", "DiastolicBP", "BS", "BodyTemp"])
# plt.suptitle("Pairplot for Risk Level and Numerical Variables with Hue")
# plt.show()

def fahrenheit_to_celsius(f):
    return (5/9) * (f - 32)

# Convert BodyTemp from Fahrenheit to Celsius
df['BodyTemp_Celsius'] = fahrenheit_to_celsius(df['BodyTemp'])

# Plot 12: Pairplot for RiskLevel and numerical variables with hue
sns.pairplot(df, hue="RiskLevel", palette="husl", vars=["SystolicBP", "DiastolicBP", "BS", "BodyTemp_Celsius"])
plt.suptitle("Pairplot for Risk Level and Numerical Variables with Hue")
plt.show()


# In[80]:


# Plot 13: Distribution plot for Heart Rate by RiskLevel and Gender
plt.figure(figsize=(12, 6))
sns.histplot(data=df, x="HeartRate", hue="RiskLevel", multiple="stack", element="step", stat="density", common_norm=False, palette="Set1", bins=20)
plt.title("Distribution plot of Heart Rate by Risk Level and Gender")
plt.show()


# In[81]:


# Plot 14: Line plot for Blood Glucose Levels over Age by RiskLevel
plt.figure(figsize=(12, 6))
sns.lineplot(x="Age", y="BS", hue="RiskLevel", data=df, palette="viridis")
plt.title("Line plot of Blood Glucose Levels over Age by Risk Level")
plt.show()


# In[82]:


# Plot 15: Point plot for Risk Level and Diastolic BP
plt.figure(figsize=(10, 6))
sns.pointplot(x="RiskLevel", y="DiastolicBP", data=df, ci="sd", palette="coolwarm")
plt.title("Point plot for Risk Level and Diastolic BP")
plt.show()


# In[83]:


# Plot 16: KDE plot for Age and SystolicBP by RiskLevel
plt.figure(figsize=(12, 8))
sns.kdeplot(data=df, x="Age", y="SystolicBP", hue="RiskLevel", fill=True, cmap="Blues", common_norm=False)
plt.title("KDE plot for Age and Systolic BP by Risk Level")
plt.show()


# In[84]:


# Plot 17: Pairplot for Age and Heart Rate with RiskLevel hue
sns.pairplot(df, hue="RiskLevel", palette="husl", vars=["Age", "HeartRate"])
plt.suptitle("Pairplot for Age and Heart Rate with Risk Level Hue")
plt.show()


# In[85]:


# Plot 18: Distribution plot for Blood Glucose Levels by RiskLevel
plt.figure(figsize=(10, 6))
sns.histplot(df, x="BS", hue="RiskLevel", element="step", stat="density", common_norm=False, palette="Set2", bins=20)
plt.title("Distribution plot of Blood Glucose Levels by Risk Level")
plt.show()


# In[86]:


# Plot 19: Line plot for Heart Rate over Age with RiskLevel hue
plt.figure(figsize=(12, 6))
sns.lineplot(x="Age", y="HeartRate", hue="RiskLevel", data=df, palette="Dark2")
plt.title("Line plot of Heart Rate over Age with Risk Level Hue")
plt.show()


# In[87]:


# Plot 20: Pointplot for Age and RiskLevel with Hue
plt.figure(figsize=(10, 6))
sns.boxplot(x="RiskLevel", y="Age", hue="SystolicBP", data=df, palette="coolwarm")
plt.title("Box plot of Age by Risk Level with Systolic BP as Hue")
plt.show()


# In[88]:


# Plot 21: Scatter plot for Systolic BP vs Diastolic BP
plt.figure(figsize=(10, 6))
sns.scatterplot(x="SystolicBP", y="DiastolicBP", hue="RiskLevel", data=df, palette="viridis")
plt.title("Scatter plot of Systolic BP vs Diastolic BP by Risk Level")
plt.show()


# In[89]:


# Plot 22: Pairplot for RiskLevel and numerical variables with hue
# sns.pairplot(df, hue="RiskLevel", palette="husl", vars=["SystolicBP", "DiastolicBP", "BS", "BodyTemp"])
# plt.suptitle("Pairplot for Risk Level and Numerical Variables with Hue")
# plt.show()

def fahrenheit_to_celsius(f):
    return (5/9) * (f - 32)

# Convert BodyTemp from Fahrenheit to Celsius
df['BodyTemp_Celsius'] = fahrenheit_to_celsius(df['BodyTemp'])

# Plot 12: Pairplot for RiskLevel and numerical variables with hue
sns.pairplot(df, hue="RiskLevel", palette="husl", vars=["SystolicBP", "DiastolicBP", "BS", "BodyTemp_Celsius"])
plt.suptitle("Pairplot for Risk Level and Numerical Variables with Hue")
plt.show()


# ## Feature Engineering

# In[90]:


# Selected feature engineering examples
df['AgeSquared'] = df['Age'] ** 2
df['HeartRateOverBodyTemp'] = df['HeartRate'] / df['BodyTemp']
df['BloodPressureRatio'] = df['SystolicBP'] / df['DiastolicBP']
df['AgeBMIProduct'] = df['Age'] * (df['BS'] / (df['BodyTemp'] ** 2))
df['BloodPressureDeviation'] = df['SystolicBP'] - df['DiastolicBP']
df['BloodSugarSquared'] = df['BS'] ** 2
df['RiskScore'] = (df['Age'] * df['SystolicBP']) / (df['DiastolicBP'] + df['HeartRate'])
df['BodyTempOverHeartRate'] = df['BodyTemp'] / df['HeartRate']
df['BloodPressureDiff'] = df['SystolicBP'] - df['DiastolicBP']


# In[91]:


df.head()


# ## Identifying and removing outliers

# In[92]:


# Selected columns for outlier detection
columns_for_outlier_detection = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate',
                                 'AgeSquared', 'HeartRateOverBodyTemp', 'BloodPressureRatio',
                                 'AgeBMIProduct', 'BloodPressureDeviation', 'BloodSugarSquared',
                                 'BodyTempOverHeartRate', 'BloodPressureDiff']

# Plot boxplots for outlier detection
plt.figure(figsize=(18, 12))
for i, column in enumerate(columns_for_outlier_detection, 1):
    plt.subplot(3, 5, i)
    sns.boxplot(x=df[column])
    plt.title(f'Boxplot for {column}')

plt.tight_layout()
plt.show()


# In[93]:


outlier_column=['Age', 'SystolicBP', 'BS', 'BodyTemp', 'HeartRate',
                                 'AgeSquared', 'HeartRateOverBodyTemp', 'BloodPressureRatio',
                                 'AgeBMIProduct', 'BloodPressureDeviation', 'BloodSugarSquared',
                                 'BodyTempOverHeartRate', 'BloodPressureDiff']


# In[94]:


#determining the inter-quartile range for the columns with outliers
Q1 = df[outlier_column].quantile(0.25)
Q3 = df[outlier_column].quantile(0.75)
IQR = Q3-Q1


# In[95]:


# determining the upper and lower limit for the removal of outliers
upper_limit = Q3 + (1.5*IQR)
lower_limit = Q1 - (1.5*IQR)
df[outlier_column] = df[outlier_column][~((df[outlier_column] < lower_limit) | (df[outlier_column] > upper_limit))]


# In[96]:


df.info()


# In[97]:


# Filling missing values in outlier columns with median
for column in outlier_column:
    df[column] = df[column].fillna(df[column].median())


# In[98]:


df.info()


# ## Model Building

# In[99]:


X=df[['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate',
      'AgeSquared', 'HeartRateOverBodyTemp',
       'BloodPressureRatio', 'AgeBMIProduct', 'BloodPressureDeviation',
       'BloodSugarSquared', 'RiskScore', 'BodyTempOverHeartRate',
       'BloodPressureDiff']]
# Assuming 'RiskLevel' is the target variable
le = LabelEncoder()
y = le.fit_transform(df['RiskLevel'])


# ### Split Dataset

# In[100]:


X_train,X_test,y_train,y_test = train_test_split(X,y,test_size = 0.2,random_state = 1)


# #### Feature Scaling

# In[101]:


# Normalizing the Dataset using Standard Scaling Technique.
from sklearn.preprocessing import StandardScaler
scaler=StandardScaler()
X_train=scaler.fit_transform(X_train)
X_test=scaler.transform(X_test)


# #### Logistic Regression model

# In[102]:


# Create Logistic Regression model
logreg_model = LogisticRegression(random_state=30)
logreg_model.fit(X_train, y_train)
# Make predictions on test
logreg_pred = logreg_model.predict(X_test)
logreg_pred_proba = logreg_model.predict_proba(X_test)[:, 1]


# In[103]:


# Evaluation on testing data
AS_logreg = accuracy_score(y_test, logreg_pred)
print("Testing Accuracy_Score:", round(AS_logreg,2))


# In[105]:


# Generate Classification Report
print("Classification Report for Logistic Regression:")
print(classification_report(y_test, logreg_pred))


# Overall accuracy: 60%, meaning the model correctly classifies 60% of the instances.
# 
# Class-wise performance:
# 
# Class 0: Precision (0.73) is better than recall (0.60), indicating the model tends to avoid false positives but might miss some true positives.
# 
# Class 1: Recall (0.77) is better than precision (0.57), meaning the model captures most true positives but may have some false positives.
# 
# Class 2: Both precision (0.53) and recall (0.40) are low, suggesting the model struggles with this class.
# 
# F1-score: All classes have F1-scores around 0.6, indicating a balance between precision and recall.
# 
# Macro/weighted averages: Average performance across classes is similar to overall accuracy, suggesting no major bias towards any class.

# #### Random Forest model

# In[106]:


#Importing Random Forest
rf_model= RandomForestClassifier(random_state=30)
rf_model= rf_model.fit(X_train, y_train)
#Making prediction for test
rf_pred= rf_model.predict(X_test)
rf_pred_proba= rf_model.predict_proba(X_test)[:,1]


# In[107]:


# Evaluation on testing data
AS_rf = accuracy_score(y_test, rf_pred)
print("Testing Accuracy_Score:", round(AS_rf,2))


# In[108]:


# Generate Classification Report
print("Classification Report Random Forest:")
print(classification_report(y_test, rf_pred))


# Overall accuracy: 85%, indicating it correctly classifies 85% of the instances.
# Class-wise performance:
# 
# Class 0 and 1: Strong performance with precision, recall, and F1-scores around 0.87-0.90.
# 
# Class 2: Slightly lower scores (precision 0.76, recall 0.83, F1-score 0.79), suggesting potential for improvement.
# 
# Balanced performance: Macro and weighted averages closely align with overall accuracy, indicating consistent performance across classes.

# #### LGBM model

# In[109]:


# Create LGBM model
lgb_model = LGBMClassifier(random_state=30)
# Fit the model
lgb_model.fit(X_train, y_train)
# Make predictions on test
lgb_pred_test = lgb_model.predict(X_test)
lgb_pred_proba_test = lgb_model.predict_proba(X_test)[:, 1]


# In[110]:


# Evaluate on testing dataset
print("Evaluation Metrics for LGBM")
accuracy_lgb = accuracy_score(y_test, lgb_pred_test)
print("Accuracy: {:.2f}".format(accuracy_lgb))


# In[111]:


# Print Classification Report for LGBM Model
print("Classification Report for LGBM Model:")
print(classification_report(y_test, lgb_pred_test))


# Overall accuracy: 85%, indicating it correctly classifies 85% of the instances.
# Class-wise performance: Generally strong across all classes, with precision and recall around 0.85 or higher.
# 
# Class 0: Highest scores (precision 0.89, recall 0.90, F1-score 0.90).
# 
# Class 2: Slightly lower scores (precision 0.78, recall 0.81, F1-score 0.80), suggesting potential room for improvement.
# 
# Balanced performance: Macro and weighted averages closely align with overall accuracy, indicating consistent performance across classes.

# ## **Catboost model**

# In[112]:


# pip install catboost


# In[113]:


# Create CatBoost model
catboost_model = CatBoostClassifier(random_state=30)
catboost_model.fit(X_train, y_train)


# In[114]:


# Make predictions on the testing dataset
catboost_pred = catboost_model.predict(X_test)
catboost_pred_proba = catboost_model.predict_proba(X_test)[:, 1]


# In[115]:


# Evaluate the model
accuracy_catboost = accuracy_score(y_test, catboost_pred)
print("Accuracy: {:.2f}".format(accuracy_catboost))


# In[116]:


# Print Classification Report for CatBoost Model
print("Classification Report for CatBoost Model:")
print(classification_report(y_test, catboost_pred))


# Overall accuracy: 86%, meaning it correctly classifies 86% of the instances.
# Class-wise performance:
# 
# Class 0: Highest precision and F1-score (0.92 and 0.91, respectively).
# Class 1: Strong scores, closely following Class 0.
# 
# Class 2: Slightly lower precision and recall (0.80), but still acceptable performance.
# 
# Balanced performance: Macro and weighted averages align with overall accuracy, indicating consistent performance across classes.
# 
# Slightly better performance: It shows a marginal improvement over the LGBM model, particularly for Class 0.

# ## Conclusion

# 1. **Age and Risk Level:**
#    - The high-risk group tends to be older, with a median age around 50, while the low-risk group has a median age of around 30.
#    - There's a positive correlation between age and risk level, but it's not absolute; younger people can also be at high risk.
# 
# 2. **Blood Sugar Levels and Risk:**
#    - High-risk individuals generally have higher blood sugar levels than those with low risk.
#    - The median blood sugar level is higher for the high-risk group, and there's more variability in blood sugar levels within the high-risk group.
# 
# 3. **Heart Rate and Risk:**
#    - There's a positive correlation between heart rate and risk level, with higher risk individuals having higher heart rates.
#    - High-risk individuals exhibit the highest heart rates, as indicated by the data points in the top right corner of the plot.
# 
# 4. **Risk Level Distribution:**
#    - The most frequent risk level is "low risk," followed by "mid risk" and then "high risk."
#    - Majority of data points fall under the lower risk categories.
# 
# 5. **Body Temperature and Risk:**
#    - People with high risk tend to have higher body temperatures than those with low risk.
#    - There's some overlap in body temperatures between risk groups.
# 
# 6. **Memory and Risk:**
#    - There appears to be a positive correlation between memory scores and risk level.
#    - Memory scores range from 0 to 100, with higher scores associated with lower risk levels.
# 
# 7. **Blood Glucose Levels and Age:**
#    - There's a positive correlation between age and blood glucose levels for all risk levels.
#    - The difference in blood glucose levels between risk levels appears to increase with age.
# 
# 8. **Diastolic Blood Pressure and Risk:**
#    - There's a positive correlation between diastolic blood pressure and risk level.
#    - High-risk individuals tend to have the highest diastolic blood pressure readings.
# 
# 9. **Systolic Blood Pressure and Age:**
#    - Younger people tend to have lower systolic blood pressure than older people, regardless of risk level.
#    - High-risk individuals generally have higher systolic blood pressure at all ages.
# 
# 10. **Risk Level and Memory (Heatmap):**
#     - There seems to be a positive correlation between memory and risk level, with higher memory scores associated with lower risk levels.
# 
# **Best Model for Deployment:**
# 
# Considering overall accuracy, balanced performance, and class-wise metrics, the Catboost model emerges as the most suitable for deployment. It achieves the highest overall accuracy, maintains strong precision and recall across classes, and exhibits slightly better performance than LGBM. Deploying the Catboost model would likely result in a robust and accurate classification system for the given task.

from joblib import dump

model_file = 'Maternal_Health_Risk.joblib'
dump(catboost_model, model_file)