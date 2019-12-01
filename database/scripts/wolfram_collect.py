from wolframclient.evaluation import WolframLanguageSession
from pickle_jar import savePickles, loadPickles, file_open
from wolframclient.language import wl, wlexpr
session = WolframLanguageSession()

#Entity["Species", "Species:CorvusCorax"]["Dataset"]
# 

animal_list = file_open('../constants/animals.txt')
#for animal in animal_list:
    #print(session.evaluate(f'Interpreter["Species"][{animal}]["Image"]'))
    #print(session.evaluate(f'Interpreter["Species", "raven"]["MaximumLifeSpan"]'))

print(session.evaluate(f'Interpreter["Species", "Species:CorvusCorax"]["MaximumLifeSpan"]'))