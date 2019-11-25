from pickle_jar import savePickles, loadPickles
from typing import List, Optional
import spacy

def file_open(file_name):
    f = open(file_name, 'r')
    data = f.read().split("\n")
    return_list = []
    for i in data:
        return_list.append(i)
    return return_list


animal_list = file_open('../constants/animals.txt')
animal_dict = loadPickles('animal_dict2')
animal_facts = loadPickles('animal_facts4')

#print(animal_dict)

def addNewDataField(data_dict: dict, field_name: str, field_type: int) -> None:
    if field_type is 0:
        data_dict[field_name] = []
    elif field_type is 1:
        data_dict[field_name] = 0
    elif field_type is 2:
        data_dict[field_name] = ""

def sortAnimalFacts(animal_list: List[str], animal_facts: dict, animal_dict: dict):
    log_data = {"factsFound": 0, "animalsFound":set()}
    for animal in animal_list:
        for fact in animal_facts["cleaned_data"]:
            if animal in fact:
                log_data["factsFound"] += 1
                log_data["animalsFound"].add(animal)
                animal_dict[animal]["facts"].append(fact)
    
    savePickles('log_data', log_data)
    savePickles('animal_dict3', animal_dict)
    print(f"Facts found: {log_data['factsFound']}")
    print(f"Facts found for animals: {len(log_data['animalsFound'])}")


def _lowercaseAll(input_list: List[str]) -> List[str]:
    retval = []
    for j in input_list:
        retval.append(j.lower())
    return retval
def lowercaseInput(data_dict: dict) -> None:
    data_dict["cleaned_data"] = _lowercaseAll(data_dict["uncleaned_data"])
    data_dict["uncleaned_data"] = []
    savePickles('animal_facts4', data_dict)

sortAnimalFacts(animal_list, animal_facts, animal_dict)