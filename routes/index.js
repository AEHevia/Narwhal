const { postUserLogin, postUserRegister } = require("./users");
const {
  getAnimalsGetAllAnimals,
  getAnimalsSearch,
  postAnimalsAdd
} = require("./animals");

// User routes
exports.postUserLogin = async (req, res) => {
  await postUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
  await postUserRegister(req, res);
};

// Animal routes
exports.getAnimalsGetAllAnimals = async (req, res) => {
  await getAnimalsGetAllAnimals(req, res);
};
exports.getAnimalsSearch = async (req, res) => {
  await getAnimalsSearch(req, res);
};
exports.postAnimalsAdd = async (req, res) => {
  await postAnimalsAdd(req, res);
};
