import pickle

def savePickles(file_name, pickle_obj):
    with open(file_name, 'wb') as pickle_file:
        pickle.dump(pickle_obj, pickle_file)

def loadPickles(file_name):
    with open(file_name, 'rb') as pickle_file:
        ret_dict = pickle.load(pickle_file)
    return ret_dict
