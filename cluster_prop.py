import sys
import pandas as pd 
import numpy as np
import matplotlib.pyplot as plt
from itertools import cycle
from pandas.io import sql
from sqlalchemy import create_engine

engine = create_engine('mysql://stanzanewdb:stanzanewdb@backend-training.cldq4iyr6wzu.ap-south-1.rds.amazonaws.com/locator')
with engine.connect() as conn, conn.begin():
    dataset = pd.read_sql("SELECT * FROM locator.Banglore_prop_cluster;",conn)

X = dataset.iloc[:,[5,6]].values

from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=int(sys.argv[1]),init='k-means++',n_init=10,max_iter=300,random_state=0)
y_kmeans = kmeans.fit_predict(X)

print(y_kmeans.tolist())