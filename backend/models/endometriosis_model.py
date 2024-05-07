#!/usr/bin/env python
# coding: utf-8

# <h1>Step one- understand the problem</h1>
# <h2>Endometriosis</h2> Endometriosis is a condition where tissue similar to the lining of your uterus grows on other parts of your body. When this tissue grows in the wrong places, it can cause you to experience uncomfortable symptoms that can impact your daily life. Some people with endometriosis also have issues getting pregnant.
# The endometrium is the inner lining of your uterus. This tissue is what you shed during a menstrual period.
# When you have endometriosis, endometrial-like tissue grows on other organs or structures. This tissue can grow within your abdomen, pelvis or even chest. This tissue is hormonally sensitive and can become inflamed during your menstrual cycle.
# <img src = 'https://my.clevelandclinic.org/-/scassets/images/org/health/articles/10857-endometriosis'>
# 
# Complications of Endometriosis can include:
# 
# - Infertility
# - Endometriosis-associated adenocarcinoma (cancer)
# 

# **Now that we know all about the disease, we can finally define the problem statement** - <h1>Using the provided dataset, devise a way to predict Endometriosis for a given patient</h1>

# <h2> First, the imports </h2>

# In[1]:


# Pandas library is a tool for data scientists to explore and manipulate data

import pandas as pd
import numpy as np
# for Box-Cox Transformation
from scipy import stats

import seaborn as sn
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")


# <h2> Quick glance at the data </h2>

# In[2]:


# put 'r' before the path string to address any special characters in the path, such as '\'
# df = pd.read_csv (r'Path where the CSV file is stored\File name.csv')

df = pd.read_csv (r'../datasets/endometriosis-datasets/endo_dataset.csv')
# print (df.head())

df.head(10) # shows first 10 rows


# In[70]:


#Shape of the dataset
df.shape


# In[71]:


#Dataset variables
df.columns


# In[7]:


# prints the summary of the data
df.describe()


# <h2>Exploratory data analysis</h2>

# In[8]:


# No of missing data points per column
missing_values_count = df.isnull().sum()
missing_values_count


# In[9]:


total_cells = np.product(df.shape)
total_missing = missing_values_count.sum()

#percentage of data that is missing
percent_missing = (total_missing/total_cells) * 100
print(percent_missing)


# In[13]:


# No of categorical and numerical variables
df.dtypes.value_counts()


# In[77]:


# Create correlation matrix
corr_matrix = df.corr().abs()

# Select upper triangle of correlation matrix
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))

# Find features with correlation greater than 0.7
high_corr = [column for column in upper.columns if any(upper[column] > 0.7)]


# In[78]:


high_corr


# In[79]:


# Select upper triangle of correlation matrix
lower = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))

# Find features with correlation greater than 0.5
low_corr = [column for column in lower.columns if any(lower[column] < 0.5)]

low_corr


# In[80]:


# Convert correlation matrix to 1-D Series and sort
sorted_mat = corrMatrix.unstack().sort_values()
  
print(sorted_mat)


# In[81]:


#Skewness
import seaborn as sns
sns.distplot(df.skew(),color='blue',axlabel ='Skewness')


# In[82]:


#Kurtosis
plt.figure(figsize = (12,8))
sns.distplot(df.kurt(),color='r',axlabel ='Kurtosis',norm_hist= False, kde = True,rug = False)
#plt.hist(train.kurt(),orientation = 'vertical',histtype = 'bar',label ='Kurtosis', color ='blue')
plt.show()


# In[83]:


#Correlation of variables with Endometriosis
corrMatrix = df.corr()
print(corrMatrix['Endometriosis_YN'].sort_values(ascending = False),'\n')


# In[84]:


#Correlation plot
f , ax = plt.subplots(figsize = (14,12))

plt.title('Correlation of Features with Endometriosis',y=1,size=16)

sns.heatmap(corrMatrix,square = True,  vmax=0.8)


# In[85]:


# Selecting features with correlation > 0.45 for the analysis
df1 = df[['Menstrual pain (Dysmenorrhea)', 'Painful cramps during period', 'Cramping', 'Fatigue / Chronic fatigue',
       'Heavy / Extreme menstrual bleeding', 'Bleeding', 'Pelvic pain','Abdominal pain / pressure',
          'Painful / Burning pain during sex (Dyspareunia)','Painful bowel movements', 'Ovarian cysts', 'Back pain', 'Bloating',
         'Lower back pain', 'Sharp / Stabbing pain', 'Menstrual clots', 'Stomach cramping', 'Decreased energy / Exhaustion',
         'Pain / Chronic pain', 'Endometriosis_YN']]


# In[86]:


print(df1)


# In[87]:


# Correlation plot for the selected features
corrMatrix1 = df1.corr()
print(corrMatrix1['Endometriosis_YN'].sort_values(ascending = False),'\n')


# In[88]:


#Correlation plot
f , ax = plt.subplots(figsize = (14,12))

plt.title('Correlation of Features with Endometriosis',y=1,size=16)

sns.heatmap(corrMatrix1,square = True,  vmax=0.8)


# In[26]:


#Correlation plot with corr > 0.45 and < -0.45
corr = df1.drop('Endometriosis_YN', axis=1).corr() # We already examined SalePrice correlations
plt.figure(figsize=(12, 10))

sns.heatmap(corr[(corr >= 0.45) | (corr <= -0.4)],
                                   cmap='viridis', vmax=1.0, vmin=-1.0, linewidths=0.1,
                                   annot=True, annot_kws={"size": 8}, square=True);


# <h2>Building the solution</h2>

# In[89]:


#Normalization
from sklearn import preprocessing
import pandas as pd

scaler = preprocessing.MinMaxScaler()
names = df1.columns
d = scaler.fit_transform(df1)
scaled_df = pd.DataFrame(d, columns=names)
scaled_df.head()                                                                                                        


# In[94]:


#Logistic Regression
#split dataset in features and target variable
feature_cols = ['Menstrual pain (Dysmenorrhea)', 'Painful cramps during period', 'Cramping', 'Fatigue / Chronic fatigue',
       'Heavy / Extreme menstrual bleeding', 'Bleeding', 'Pelvic pain','Abdominal pain / pressure',
          'Painful / Burning pain during sex (Dyspareunia)','Painful bowel movements', 'Ovarian cysts', 'Back pain', 'Bloating',
         'Lower back pain', 'Sharp / Stabbing pain', 'Menstrual clots', 'Stomach cramping', 'Decreased energy / Exhaustion',
         'Pain / Chronic pain']
target_col = ['Endometriosis_YN']
X = df1[feature_cols] # Features
y = df1[target_col] # Target variable


# In[95]:


# split X and y into training and testing sets
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.25,random_state=0)


# In[96]:


# import the class
from sklearn.linear_model import LogisticRegression

# instantiate the model (using the default parameters)
logreg = LogisticRegression()

# fit the model with data
logreg.fit(X_train,y_train)

#
y_pred=logreg.predict(X_test)


# In[97]:


# import the metrics class
from sklearn import metrics
cnf_matrix = metrics.confusion_matrix(y_test, y_pred)
cnf_matrix


# In[98]:


# import required modules
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
get_ipython().run_line_magic('matplotlib', 'inline')


# In[99]:


#Confusion matrix
class_names=[0,1] # name  of classes
fig, ax = plt.subplots()
tick_marks = np.arange(len(class_names))
plt.xticks(tick_marks, class_names)
plt.yticks(tick_marks, class_names)
# create heatmap
sns.heatmap(pd.DataFrame(cnf_matrix), annot=True, cmap="YlGnBu" ,fmt='g')
ax.xaxis.set_label_position("top")
plt.tight_layout()
plt.title('Confusion matrix', y=1.1)
plt.ylabel('Actual label')
plt.xlabel('Predicted label')


# In[100]:


# Accuracy, Precision and Recall scores
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
print("Precision:",metrics.precision_score(y_test, y_pred))
print("Recall:",metrics.recall_score(y_test, y_pred))


# In[101]:


# ROC CURVE
y_pred_proba = logreg.predict_proba(X_test)[::,1]
fpr, tpr, _ = metrics.roc_curve(y_test,  y_pred_proba)
auc = metrics.roc_auc_score(y_test, y_pred_proba)
plt.plot(fpr,tpr,label="data 1, auc="+str(auc))
plt.legend(loc=4)
plt.show()


# <h3>Classification</h3>

# In[110]:


#Random forest
#Import Random Forest Model
from sklearn.ensemble import RandomForestClassifier

#Create a Gaussian Classifier
clf=RandomForestClassifier(n_estimators=100)

#Train the model using the training sets y_pred=clf.predict(X_test)
clf.fit(X_train,y_train)

y_pred=clf.predict(X_test)


# In[111]:


#Import scikit-learn metrics module for accuracy calculation
from sklearn import metrics
# Model Accuracy, how often is the classifier correct?
# print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
# print("Precision:",metrics.precision_score(y_test, y_pred))
# print("Recall:",metrics.recall_score(y_test, y_pred))
accuracy = metrics.accuracy_score(y_test, y_pred)
precision = metrics.precision_score(y_test, y_pred)
recall = metrics.recall_score(y_test, y_pred)

# Convert scores to percentages
accuracy_percentage = accuracy * 100
precision_percentage = precision * 100
recall_percentage = recall * 100

# Print scores as percentages
print("Accuracy: {:.2f}%".format(accuracy_percentage))
print("Precision: {:.2f}%".format(precision_percentage))
print("Recall: {:.2f}%".format(recall_percentage))


# In[112]:


from sklearn.ensemble import RandomForestClassifier
import pandas as pd

# Assuming you have defined feature_cols somewhere earlier in your code
# Assuming you have defined X_train and y_train as your training data
# Fit the classifier to your data
clf = RandomForestClassifier(bootstrap=True, class_weight=None, criterion='gini',
            max_depth=None, max_features=None, max_leaf_nodes=None,
            min_impurity_decrease=0.0, min_samples_leaf=1, min_samples_split=2,
            min_weight_fraction_leaf=0.0, n_estimators=100, n_jobs=1,
            oob_score=False, random_state=None, verbose=0,
            warm_start=False)
clf.fit(X_train, y_train)

# Now you can access feature importances
feature_imp = pd.Series(clf.feature_importances_, index=feature_cols).sort_values(ascending=False)


# In[113]:


# Feature importance plot for random forest
import matplotlib.pyplot as plt
import seaborn as sns
get_ipython().run_line_magic('matplotlib', 'inline')
# Creating a bar plot
sns.barplot(x=feature_imp, y=feature_imp.index)
# Add labels to your graph
plt.xlabel('Feature Importance Score')
plt.ylabel('Features')
plt.title("Visualizing Important Features")
plt.legend()
plt.show()


# In[114]:


#XGboost
#pip install xgboost
import xgboost as xgb
from xgboost import XGBClassifier, plot_tree
from sklearn.metrics import mean_squared_error

xg_reg = xgb.XGBRegressor(objective ='reg:linear', colsample_bytree = 0.3, learning_rate = 0.1,
                max_depth = 5, alpha = 10, n_estimators = 10)
xg_reg.fit(X_train,y_train)

preds = xg_reg.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, preds))
print("RMSE: %f" % (rmse))


# In[115]:


#K-fold cross validation using XGBoost
data_dmatrix = xgb.DMatrix(data=X,label=y)

params = {"objective":"reg:linear",'colsample_bytree': 0.3,'learning_rate': 0.1,
                'max_depth': 5, 'alpha': 10}

cv_results = xgb.cv(dtrain=data_dmatrix, params=params, nfold=3,
                    num_boost_round=50,early_stopping_rounds=10,metrics="rmse", as_pandas=True, seed=123)


# In[116]:


cv_results.head()


# In[117]:


print((cv_results["test-rmse-mean"]).tail(1))


# In[118]:


#Visualizing boosting tress and feature importance
xg_reg = xgb.train(params=params, dtrain=data_dmatrix, num_boost_round=10)


# In[119]:


#Feature importance
xgb.plot_importance(xg_reg)
plt.rcParams['figure.figsize'] = [40, 10]
plt.show()


# In[120]:


# Decision tree
# Load libraries
import pandas as pd
from sklearn.tree import DecisionTreeClassifier # Import Decision Tree Classifier
from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation


# In[121]:


# Create Decision Tree classifer object
clf = DecisionTreeClassifier()

# Train Decision Tree Classifer
clf = clf.fit(X_train,y_train)

#Predict the response for test dataset
y_pred = clf.predict(X_test)


# In[122]:


# Model Accuracy, how often is the classifier correct?
# print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
accuracy = metrics.accuracy_score(y_test, y_pred)
accuracy_percentage = accuracy * 100

print("Accuracy: {:.2f}%".format(accuracy_percentage))


# In[123]:


#SVM

#Import svm model
from sklearn import svm

#Create a svm Classifier
clf = svm.SVC(kernel='linear') # Linear Kernel

#Train the model using the training sets
clf.fit(X_train, y_train)

#Predict the response for test dataset
y_pred = clf.predict(X_test)


# In[124]:


#Import scikit-learn metrics module for accuracy calculation
from sklearn import metrics

# Model Accuracy: how often is the classifier correct?
# print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
# print("Precision:",metrics.precision_score(y_test, y_pred))
# print("Recall:",metrics.recall_score(y_test, y_pred))
accuracy = metrics.accuracy_score(y_test, y_pred)
precision = metrics.precision_score(y_test, y_pred)
recall = metrics.recall_score(y_test, y_pred)

# Convert scores to percentages
accuracy_percentage = accuracy * 100
precision_percentage = precision * 100
recall_percentage = recall * 100

# Print scores as percentages
print("Accuracy: {:.2f}%".format(accuracy_percentage))
print("Precision: {:.2f}%".format(precision_percentage))
print("Recall: {:.2f}%".format(recall_percentage))


# <h2> Final Performance - 97.30% precision</h2>
