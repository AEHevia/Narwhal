from pickle_jar import savePickles, loadPickles
import spacy

def file_open(file_name):
    f = open(file_name, 'r')
    data = f.read().split("\n")
    return_list = []
    for i in data:
        return_list.append(i)
    return return_list


animal_list = file_open('../constants/animals.txt')
# animal_dict = loadPickles('animal_dict')
