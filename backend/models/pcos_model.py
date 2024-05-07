#!/usr/bin/env python
# coding: utf-8

# <h1>Step one- understand the problem</h1>
# <h2>Polycystic ovary syndrome (PCOS)</h2> PCOS is a hormonal disorder common among women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels. The ovaries may develop numerous small collections of fluid (follicles) and fail to regularly release eggs.
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

# **Now that we know all about the disease, we can finally define the problem statement** - <h1>Using the provided dataset, devise a way to predict PCOS(Polycystic Ovary Syndrome) for a given patient</h1>

# <h2> Quick glance at the data </h2>
# 

# In[22]:


import openpyxl
import pandas as pd
# data = pd.read('', sheet_name=1)# loads the data and creates a table(formally called a pandas DataFrame) 
data = pd.read_csv("../datasets/pcos-datasets/PCOS_data.csv")

data.head(10) #shows us the first ten rows of the DataFrame


# In[23]:


#let us load the infertility table too
data_inf = pd.read_csv("../datasets/pcos-datasets/PCOS_infertility.csv")
data_inf.head(10)


# <h1>Step two- Exploratory Data Analysis</h1>

# In[24]:


#before we start, let's fix Paitient File no.
data['Patient File No.'] = data['Patient File No.'].apply(lambda x:  x+10000).astype('int64')


# In[25]:


data.head()


# In[26]:


#let's merge data and data_inf
data = pd.merge(data,data_inf[['Patient File No.','  I   beta-HCG(mIU/mL)','II    beta-HCG(mIU/mL)']], on='Patient File No.', how='left')


# In[27]:


data.head()


# In[28]:


#now let's start by dealing with empty values
#IMPORTANT: 0 IS NOT an empty value. only NaN is considered as a null (or empty) value
pd.isnull(data).sum()


# 539 missing values?! We really can't use the column now can we? So let's delete it. We can also deal with other values by filling them with zero
# 

# In[29]:


try:
    del data['Unnamed: 44']
except KeyError:
    # Handle the case where the column doesn't exist
    pass

data['Marraige Status (Yrs)'].fillna(0, inplace=True)
data['Fast food (Y/N)'].fillna(0, inplace=True)


# In[30]:


#now that that's done, let us try to get a little more intimate with the data
import matplotlib.pyplot as plt #for plotting simple graphs
import seaborn as sns #another plotting library
for i in [' Age (yrs)', 'Weight (Kg)',
       'Height(Cm) ', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)', 'No. of aborptions',
        'Hip(inch)', 'Waist(inch)', 
       'PRG(ng/mL)', 'RBS(mg/dl)', 'BP _Systolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)',
       'Avg. F size (L) (mm)', 'Avg. F size (R) (mm)', 'Endometrium (mm)', 'BMI']:
  sns.set(rc = {'figure.figsize':(15,15)})
  data[data['PCOS (Y/N)'] == 1][i].value_counts().plot.bar()
  plt.title(i)
  plt.show()


# we can already observe an interesting relationship between all subsequent columns. If you observe closely, it looks like the middle values of the X-cordinate seem to have the highest values in the y-coordinate. But this still isn't very comprehensible enough, so let us use a different plot. 

# In[ ]:


# Convert non-numeric columns to numeric, handling errors
data_numeric = data.apply(pd.to_numeric, errors='coerce')

# Generate correlation heatmap
sns.heatmap(data_numeric.corr(method='pearson'), annot=True)
sns.set(rc={'figure.figsize':(70, 70)})  # Responsible for changing the size of a seaborn plot
plt.show()


# A heatmap shows us the relation between columns. A higher number means that the columns have a higher positive correlation with each other (this metric is called the 'pearson coefficient'). This means that an increase in value of one column will directly result in the increase of value in the other column, and vice versa.
# 
# By the looks of it. PCOS has a higher positive correlation with Follicle No.(L and R), Skin darkening, hair growth,weight gain and cycle. It has the highest negative correlation with age and cycle length. (see the third row/column if you're confused)
# 
# So let us pick seven columns with the highest coefficient and two with the lowest coefficient(with respect to PCOS). We'll be discarding the rest for convenience

# In[32]:


# data = data[['PCOS (Y/N)','Follicle No. (R)','Follicle No. (L)','Weight gain(Y/N)','hair growth(Y/N)','Skin darkening (Y/N)','Cycle(R/I)','Fast food (Y/N)','Cycle length(days)',' Age (yrs)']]
# Modify Here!
data = data[['PCOS (Y/N)', 'BMI','Weight gain(Y/N)','Cycle length(days)',' Age (yrs)']]
sns.heatmap(data.corr('pearson'), annot =True )
sns.set(rc = {'figure.figsize':(60,60)})
plt.show()


# In[33]:


#this one is important - we need to make sure our data is balanced enough 
data['PCOS (Y/N)'].value_counts()


# this is a rather significant imbalance in our data. To get the best results, we need to make sure that there are almost 50% instances of both 0 and 1. In this case, we'll perform random Oversampling

# In[39]:


#let us create our training dataset now
X=data.drop(["PCOS (Y/N)"],axis = 1)
y=data["PCOS (Y/N)"]


# In[38]:


get_ipython().system('pip3 install imbalanced-learn')
from imblearn.over_sampling import RandomOverSampler 
oversample = RandomOverSampler(sampling_strategy=0.7)
X, y = oversample.fit_resample(X, y)
y.value_counts()


# much better! let's proceed with the final step

# <h1>Step three- Build the solution</h1>
# We're almost done now! All that's left is to create our machine learning model, and we can do that easily with scikit-learn.

# In[ ]:


#here we'll call scikit-learn and other related functions that'll be useful for us
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
from sklearn.metrics import plot_confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.metrics import roc_auc_score
from sklearn.metrics import roc_curve
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler


# In[ ]:


sscaler = MinMaxScaler() #helps us scale the dataset. This makes it easy for the model to train
cols = X.columns
x_scaled = sscaler.fit_transform(X)
X_scaled = pd.DataFrame(x_scaled, columns = cols)
X_scaled


# In[ ]:


X_scaled_values = X_scaled.to_numpy() #convert the DataFrame to a numpy array
X_scaled_values


# In[ ]:


X_train,X_test, y_train, y_test = train_test_split(X_scaled , y, test_size=0.2) #creating a training split. We divide the data in a train and a test set respectively


# Now we finally create our classification machine learning algorithm
# <h2>Classification</h2>
# The Classification algorithm is a Supervised Learning technique that is used to identify the category of new observations on the basis of training data. In Classification, a program learns from the given dataset or observations and then classifies new observation into a number of classes or groups
# 
# ![classification](https://static.javatpoint.com/tutorial/machine-learning/images/classification-algorithm-in-machine-learning.png)
# 
# Let us use some of these algorithms to see which one suits best

# In[36]:


rfc = RandomForestClassifier(n_jobs=-1,n_estimators=150,max_features='sqrt',min_samples_leaf=10) #creates a Random forest model
rfc.fit(X_train, y_train) #trains model on data
pred_rfc = rfc.predict(X_test) #prediction
accuracy = accuracy_score(y_test, pred_rfc)
print(accuracy)


# In[37]:


classi_report = classification_report(y_test, pred_rfc)
print(classi_report)


# 92% is excellent accuracy! But there's still grounds for improvement. Let's try a different classification model 

# In[ ]:


import xgboost as xgb

xgb_cl = xgb.XGBClassifier(learning_rate = 0.001, gamma = 0.03, max_depth = 20, subsample = 0.5 )
xgb_cl.fit(X_train, y_train)

# Predict
preds = xgb_cl.predict(X_test)

# Score
accuracy_score(y_test, preds)


# Now we have two models that give us similar performance over the same dataset. But what if we used them.....together?
# <h2>Introduction to Stacking Ensembling</h2>
# Stacking or Stacked Generalization is an ensemble machine learning algorithm.
# 
# It uses a meta-learning algorithm to learn how to best combine the predictions from two or more base machine learning algorithms.
# 
# The benefit of stacking is that it can harness the capabilities of a range of well-performing models on a classification or regression task and make predictions that have better performance than any single model in the ensemble.
# 
# ![Ensemble image](https://miro.medium.com/max/600/1*ZzXwFueV-Beh9MapLgZ5QA.png)

# In[ ]:


#performing stack ensembling on xgboost and random forest
rfc = RandomForestClassifier(n_jobs=-1,n_estimators=150,max_features='sqrt',min_samples_leaf=10)
xgb = xgb.XGBClassifier(learning_rate = 0.001, gamma = 0.03, max_depth = 20, subsample = 0.5)
l = [('rf',rfc), ('xgb', xgb)]
from sklearn.ensemble import StackingClassifier
stack_model = StackingClassifier( estimators = l)
score = cross_val_score(stack_model,X_scaled,y,cv = 5,scoring = 'accuracy')


# In[ ]:


print(score)


# <h2> Final Performance - 93.5% precision</h2>
# And there you have it! We've got an impressive cross validation precision, and we didn't have to do much! It just goes to show that getting into data science and machine learning is super easy!
