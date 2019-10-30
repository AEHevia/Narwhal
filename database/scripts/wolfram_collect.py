from wolframclient.evaluation import WolframLanguageSession
from wolframclient.language import wl, wlexpr
session = WolframLanguageSession()

session.evaluate(Interpreter[
Restricted["Animal",
EntityClass["Species", "EndangeredSpecies"]]]["seahorse"])