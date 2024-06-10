#!/usr/bin/env python
# coding: utf-8

# <h2>Polycystic ovary syndrome (PCOS)</h2> 
# PCOS is a hormonal disorder common among women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels. The ovaries may develop numerous small collections of fluid (follicles) and fail to regularly release eggs.
# <img src = 'https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/42/ds00423_im04151_mcdc7_polycystic_ovarythu_jpg.jpg'>
# 
# 
# Complications of PCOS can include:
# 
# - Infertility 
# 
# - Gestational diabetes or pregnancy-induced high blood pressure
# 
# - Miscarriage or premature birth
# 
# - Nonalcoholic steatohepatitis — a severe liver inflammation caused by fat accumulation in the liver
# 
# - Metabolic syndrome — a cluster of conditions including high blood pressure, high blood sugar, and abnormal cholesterol or triglyceride levels that significantly increase your risk of cardiovascular disease
# 
# - Type 2 diabetes or prediabetes
# 
# - Sleep apnea
# 
# - Depression, anxiety and eating disorders
# 
# - Abnormal uterine bleeding
# 
# - Cancer of the uterine lining (endometrial cancer)
# 
# 
# 

# <h2> The data </h2>
# 

# In[111]:


import openpyxl
import pandas as pd
# data = pd.read('', sheet_name=1)# loads the data and creates a table(formally called a pandas DataFrame) 
data = pd.read_csv("../datasets/pcos-datasets/PCOS_data.csv")

data.head(50) #shows us the first ten rows of the DataFrame
# data.columns


# In[112]:


#let us load the infertility table too
data_inf = pd.read_csv("../datasets/pcos-datasets/PCOS_infertility.csv")
data_inf.head(10)


# <h1>Exploratory Data Analysis (EDA)</h1>

# In[113]:


# fix Patient File no.
data['Patient File No.'] = data['Patient File No.'].apply(lambda x:  x+10000).astype('int64')


# In[114]:


data.head()


# In[115]:


# merge data and data_inf
data = pd.merge(data,data_inf[['Patient File No.','  I   beta-HCG(mIU/mL)','II    beta-HCG(mIU/mL)']], on='Patient File No.', how='left')


# In[116]:


data.head()


# In[117]:


# deal with empty values
# 0 IS NOT an empty value. only NaN is considered as a null (or empty) value
pd.isnull(data).sum()


# 539 missing values. Delete the column. Deal with other values by filling them with zero
# 

# In[118]:


try:
    del data['Unnamed: 44']
except KeyError:
    # Handle the case where the column doesn't exist
    pass

data['Marraige Status (Yrs)'].fillna(0, inplace=True)
data['Fast food (Y/N)'].fillna(0, inplace=True)


# In[119]:


import matplotlib.pyplot as plt
import seaborn as sns
for i in [' Age (yrs)', 'Weight (Kg)',
       'Height(Cm) ', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)', 'No. of aborptions',
        'Hip(inch)', 'Waist(inch)', 
       'PRG(ng/mL)', 'RBS(mg/dl)', 'BP _Systolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)',
       'Avg. F size (L) (mm)', 'Avg. F size (R) (mm)', 'Endometrium (mm)', 'BMI']:
  sns.set(rc = {'figure.figsize':(15,15)})
  data[data['PCOS (Y/N)'] == 1][i].value_counts().plot.bar()
  plt.title(i)
  plt.show()


# There is a relationship between all subsequent columns. The middle values of the X-cordinate have the highest values in the y-coordinate. Use a different plot. 

# In[120]:


# Convert non-numeric columns to numeric, handling errors
data_numeric = data.apply(pd.to_numeric, errors='coerce')

# Generate correlation heatmap
sns.heatmap(data_numeric.corr(method='pearson'), annot=True)
sns.set(rc={'figure.figsize':(70, 70)})  # Responsible for changing the size of a seaborn plot
plt.show()


# A heatmap shows the relation between columns. A higher number means that the columns have a higher positive correlation with each other ('pearson coefficient'). This means that an increase in value of one column will directly result in the increase of value in the other column, and vice versa.
# 
# PCOS has a higher positive correlation with Follicle No.(L and R), Skin darkening, hair growth,weight gain and cycle. It has the highest negative correlation with age and cycle length.
# 
# Pick seven columns with the highest coefficient and two with the lowest coefficient(with respect to PCOS).

# In[121]:


# data = data[['PCOS (Y/N)','Follicle No. (R)','Follicle No. (L)','Weight gain(Y/N)','hair growth(Y/N)','Skin darkening (Y/N)','Cycle(R/I)','Fast food (Y/N)','Cycle length(days)',' Age (yrs)']]
data = data[['PCOS (Y/N)', 'BMI','Weight gain(Y/N)','Cycle length(days)',' Age (yrs)']]
sns.heatmap(data.corr('pearson'), annot =True )
sns.set(rc = {'figure.figsize':(60,60)})
plt.show()


# In[122]:


# Check if data is balanced
data['PCOS (Y/N)'].value_counts()


# There's imbalance. There should be almost 50% instances of both 0 and 1. In this case, perform random Oversampling

# In[123]:


# create training dataset
X=data.drop(["PCOS (Y/N)"],axis = 1)
y=data["PCOS (Y/N)"]


# In[124]:


# get_ipython().system('pip3 install imbalanced-learn')
from imblearn.over_sampling import RandomOverSampler 
oversample = RandomOverSampler(sampling_strategy=0.7)
X, y = oversample.fit_resample(X, y)
y.value_counts()


# <h1> Build the solution</h1>

# In[125]:


import sklearn
from sklearn.preprocessing import PowerTransformer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error
from sklearn.tree import DecisionTreeRegressor
import math
from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix
# from sklearn.metrics import plot_confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.metrics import roc_auc_score
from sklearn.metrics import roc_curve
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import StackingClassifier
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score
from joblib import dump
from xgboost import XGBClassifier


# In[126]:


sscaler = MinMaxScaler() # scale the dataset.
cols = X.columns
x_scaled = sscaler.fit_transform(X)
X_scaled = pd.DataFrame(x_scaled, columns = cols)
X_scaled


# In[127]:


X_scaled_values = X_scaled.to_numpy() # convert the DataFrame to a numpy array
X_scaled_values


# In[128]:


X_train,X_test, y_train, y_test = train_test_split(X_scaled , y, test_size=0.2) #creating a training split. We divide the data in a train and a test set 


# <h2>Classification (random forest classifier)</h2>
# Supervised Learning technique - identifies the category of new observations on the basis of training data.

# In[129]:


rfc = RandomForestClassifier(n_jobs=-1,n_estimators=150,max_features='sqrt',min_samples_leaf=10) #creates a Random forest model
rfc.fit(X_train, y_train) #trains model on data
pred_rfc = rfc.predict(X_test) #prediction
accuracy = accuracy_score(y_test, pred_rfc)
print(accuracy)


# In[130]:


classi_report = classification_report(y_test, pred_rfc)
print(classi_report)


# In[131]:


import xgboost as xgb

xgb_cl = xgb.XGBClassifier(learning_rate = 0.001, gamma = 0.03, max_depth = 20, subsample = 0.5 )
xgb_cl.fit(X_train, y_train)

# Predict
preds = xgb_cl.predict(X_test)

# Score
accuracy_score(y_test, preds)


# <h2>Stacking Ensembling</h2>
# Stacking or Stacked Generalization is an ensemble machine learning algorithm.
# 
# It uses a meta-learning algorithm to learn how to best combine the predictions from two or more base machine learning algorithms.
# 
# The benefit of stacking is that it can harness the capabilities of a range of well-performing models on a classification or regression task and make predictions that have better performance than any single model in the ensemble.

# In[132]:


#performing stack ensembling on xgboost and random forest
# rfc = RandomForestClassifier(n_jobs=-1,n_estimators=150,max_features='sqrt',min_samples_leaf=10)
# xgb = xgb.XGBClassifier(learning_rate = 0.001, gamma = 0.03, max_depth = 20, subsample = 0.5)
# l = [('rf',rfc), ('xgb', xgb)]
# from sklearn.ensemble import StackingClassifier
# stack_model = StackingClassifier( estimators = l)
# score = cross_val_score(stack_model,X_scaled,y,cv = 5,scoring = 'accuracy')

# Train RandomForestClassifier
rfc = RandomForestClassifier(n_jobs=-1, n_estimators=150, max_features='sqrt', min_samples_leaf=10)
rfc.fit(X_train, y_train)
pred_rfc = rfc.predict(X_test)
print("RandomForestClassifier Accuracy:", accuracy_score(y_test, pred_rfc))
print(classification_report(y_test, pred_rfc))

# Train XGBClassifier
xgb_cl = xgb.XGBClassifier(learning_rate=0.001, gamma=0.03, max_depth=20, subsample=0.5)
xgb_cl.fit(X_train, y_train)
preds = xgb_cl.predict(X_test)
print("XGBClassifier Accuracy:", accuracy_score(y_test, preds))

# Stack the models
l = [('rf', rfc), ('xgb', xgb_cl)]
stack_model = StackingClassifier(estimators=l)
stack_model.fit(X_train, y_train)
pred_stack = stack_model.predict(X_test)
print("StackingClassifier Accuracy:", accuracy_score(y_test, pred_stack))


# In[133]:


# print(score)


# <h2> Final Performance - 86.2% precision</h2>

import pickle
model_file = 'pcos_model.pkl'
with open(model_file, 'wb') as file:
    pickle.dump(stack_model, file)

# import pandas as pd
import numpy as np

# Filter the dataset for PCOS positive cases
pcos_positive = data[data['PCOS (Y/N)'] == 1]

# Display the statistics of the features for PCOS positive cases
pcos_positive_features = pcos_positive.drop(columns=['PCOS (Y/N)'])
print("Statistics of features for PCOS positive cases:")
print(pcos_positive_features.describe())

# Create a sample input using the 75th percentile values of PCOS positive cases
sample_input_75th_percentile = pcos_positive_features.quantile(0.75).values.reshape(1, -1)

# Create a sample input using the maximum values of PCOS positive cases
sample_input_max = pcos_positive_features.max().values.reshape(1, -1)

# Create a sample input with mixed high values
sample_input_mixed = np.array([
    pcos_positive_features['BMI'].quantile(0.75),   # 75th percentile
    pcos_positive_features['Weight gain(Y/N)'].max(),  # max value
    pcos_positive_features['Cycle length(days)'].quantile(0.75),  # 75th percentile
    pcos_positive_features[' Age (yrs)'].max()     # max value
]).reshape(1, -1)

# Convert sample inputs to DataFrame to retain feature names
sample_input_75th_df = pd.DataFrame(sample_input_75th_percentile, columns=pcos_positive_features.columns)
sample_input_max_df = pd.DataFrame(sample_input_max, columns=pcos_positive_features.columns)
sample_input_mixed_df = pd.DataFrame(sample_input_mixed, columns=pcos_positive_features.columns)

# Ensure the input is scaled using the same scaler used during training
sample_input_75th_scaled = sscaler.transform(sample_input_75th_df)
sample_input_max_scaled = sscaler.transform(sample_input_max_df)
sample_input_mixed_scaled = sscaler.transform(sample_input_mixed_df)

# Predict using the trained model
prediction_75th = stack_model.predict(sample_input_75th_scaled)
prediction_max = stack_model.predict(sample_input_max_scaled)
prediction_mixed = stack_model.predict(sample_input_mixed_scaled)

print("Prediction for the sample input (75th percentile) (1 indicates PCOS positive):", prediction_75th)
print("Prediction for the sample input (max values) (1 indicates PCOS positive):", prediction_max)
print("Prediction for the sample input (mixed values) (1 indicates PCOS positive):", prediction_mixed)
