import praw, pickle
from pickle_jar import savePickles, loadPickles

reddit = praw.Reddit()

subreddit = reddit.subreddit('Awwducational')

hot = subreddit.hot(limit=5)

animal_facts = loadPickles('examplePickle')
print(animal_facts["uncleaned_data"])



