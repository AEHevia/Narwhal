import wikipediaapi

from pickle_jar import loadPickles, savePickles


def file_open(file_name):
    f = open(file_name, 'r')
    data = f.read().split("\n")
    return_list = []
    for i in data:
        return_list.append(i)
    return return_list

def create_maps(search_term, language='en'):
    #check that page exists before requesting info 
    wiki_obj = wikipediaapi.Wikipedia(language)
    wiki_page = wiki_obj.page(search_term)
    hash_summaries = {}
    
    if wiki_page.exists():
        # Store the data in a dict for later processing
        hash_summaries['title'] = wiki_page.title
        hash_summaries['exists'] = True
        hash_summaries['summary'] = []
        hash_summaries['summary'].append(wiki_page.summary)
        hash_summaries['wiki-url'] = wiki_page.fullurl

        # Concat all the text from a specificed amount of sections
        return hash_summaries
    else:
        hash_summaries['exists'] = False
        return hash_summaries


def create_summaries(file_list, pickle_name="default_pickle_name"):
    summaries_dict = {}

    for i in file_list:
        summaries_dict[i] = create_maps(i)
    
    savePickles(pickle_name, summaries_dict)

    return summaries_dict



animal_list = file_open('animals.txt')

summaries_dict = create_summaries(animal_list, "animal_dict")

print(summaries_dict)
