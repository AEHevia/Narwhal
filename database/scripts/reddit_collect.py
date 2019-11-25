import praw, pickle
from pickle_jar import savePickles, loadPickles

reddit = praw.Reddit()

subreddit = reddit.subreddit('Awwducational')

def collect_data():
    hot = subreddit.hot(limit=1000)
    top = subreddit.top(limit=1000)
    rising = subreddit.rising(limit=1000)
    

    animal_facts = {}
    animal_facts["uncleaned_data"] = []

    for i in hot:
        animal_facts["uncleaned_data"].append(i.title)

    for i in top:
        animal_facts["uncleaned_data"].append(i.title)

    for i in rising:
        animal_facts["uncleaned_data"].append(i.title)

    savePickles('animal_facts3', animal_facts)

collect_data()
