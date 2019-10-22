import praw, pickle
from pickle_jar import savePickles, loadPickles

reddit = praw.Reddit(client_id="6g7-Em2LT07kCA",
                    client_secret="6btP5_wxjuu_cyRs2vZbsuW3J18",
                    username="7buns",
                    password="cckkll777@reddityay",
                    user_agent="Narwhal")

subreddit = reddit.subreddit('Awwducational')

hot = subreddit.hot(limit=5)


# animal_facts["uncleaned_data"] = []

# for submission in hot:
#     if not submission.stickied and not submission.visited:
#         print(submission.title)
#         animal_facts["uncleaned_data"].append(submission.title)
# # checkout submission.visited?
# savePickles('examplePickle', animal_facts)

animal_facts = loadPickles('examplePickle')
print(animal_facts["uncleaned_data"])



