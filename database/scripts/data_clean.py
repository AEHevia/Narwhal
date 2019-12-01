from pickle_jar import savePickles, loadPickles
from typing import List, Optional
import wikipediaapi
import spacy


#animal_list = file_open('../constants/animals.txt')
animal_dict = loadPickles('animal_dict8')
#animal_facts = loadPickles('animal_facts4')

def addNewDataField(data_dict: dict, field_name: str, field_type: int) -> None:
    if field_type is 0:
        data_dict[field_name] = []
    elif field_type is 1:
        data_dict[field_name] = 0
    elif field_type is 2:
        data_dict[field_name] = ""
    elif field_type is 3:
        data_dict[field_name] = {
            "kingdom": "",
            "phylum":"",
            "class":"",
            "order":"",
            "family":"",
            "genus":"",
            "species":""
        }
    elif field_type is 4:
        data_dict[field_name] = []
def sortAnimalFacts(animal_list: List[str], animal_facts: dict, animal_dict: dict):
    log_data = {"factsFound": 0, "animalsFound":set()}
    for animal in animal_list:
        for fact in animal_facts["cleaned_data"]:
            if animal in fact.split():
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
def cleanSenteces():
    pass
def updateFields(animal_list: List[str], data_dict: dict, old_field: str, new_field: str) -> None:
    for animal in animal_list:
        try:
            data_dict[animal][new_field] = data_dict[animal][old_field].lower()
        except KeyError:
            pass
        try:
            del data_dict[animal][old_field]
        except KeyError:
            pass
def deleteThoseThatDontExist(animal_list: List[str], data_dict: dict) -> None:
    count = 0
    for animal in animal_list:
        try:
            if data_dict[animal]['exists'] == False:
                del data_dict[animal]
                count += 1
        except KeyError:
            pass
    print(f"{count} entries deleted")
def deleteFields(animal_list: List[str], data_dict: dict, old_field: str) -> None:
    for animal in animal_list:
        try:
            del data_dict[animal][old_field]
        except KeyError:
            pass





#deleteFields(animal_list, animal_dict, 'exists')
#deleteThoseThatDontExist(animal_list, animal_dict)
#savePickles('animal_dict7', animal_dict)

animal_list = animal_dict.keys()

for animal in animal_list:
    animal_dict[animal]['summary'] = ''.join(animal_dict[animal]['summary'])
    
savePickles('animal_dict9', animal_dict)
print(animal_dict['antelope']['summary'])
print(type(animal_dict['antelope']['summary']))