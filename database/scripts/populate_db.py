from pymongo import MongoClient
import json
from pickle_jar import savePickles, loadPickles


client = MongoClient('SECRET')
db = client['test']
collection = db['animals']

#animal_list = file_open('../constants/animals.txt')
animal_dict = loadPickles('animal_dict9')

# for animal in animal_list:
#     collection.insert_one(animal_dict[animal])

animal_list = animal_dict.keys()

for animal in animal_list:
    with open(f'{animal}.json', 'w') as fp:
        json.dump(animal_dict[animal], fp)

