const {
  postUserLogin,
  postUserRegister,
  postUserAddFavorite,
  postUserRemoveFavorite,
  postUserListFavorites
} = require("./users");
const {
  getAnimalsGetAllAnimals,
  getAnimalsFindName,
  postAnimalTrackQuery,
  postAnimalsAdd,
  getRandomAnimal
} = require("./animals");

// User routes
exports.postUserLogin = async (req, res) => {
  await postUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
  await postUserRegister(req, res);
};
exports.postUserAddFavorite = async (req, res) => {
  await postUserAddFavorite(req, res);
};
exports.postUserRemoveFavorite = async (req, res) => {
  await postUserRemoveFavorite(req, res);
};
exports.postUserListFavorites = async (req, res) => {
  await postUserListFavorites(req, res);
};

// Animal routes
exports.getAnimalsGetAllAnimals = async (req, res) => {
  await getAnimalsGetAllAnimals(req, res);
};
exports.getAnimalsFindName = async (req, res) => {
  await getAnimalsFindName(req, res);
};
exports.postAnimalTrackQuery = async (req, res) => {
  await postAnimalTrackQuery(req, res);
};
exports.postAnimalsAdd = async (req, res) => {
  await postAnimalsAdd(req, res);
};
exports.getRandomAnimal = async (req, res) => {
  await getRandomAnimal(req, res);
};
