const express = require("express");
const { schemaValidator } = require("../middlewares/schemaValidator");
const {
  createUserSchema,
  findUserSchema,
  updateUserSchema,
} = require("../schemas/usersSchema");
const { userService } = require("../services/usersService");
const {upload} = require("../config/multerConfig");
const passport = require("passport");


const router = express.Router();
const service = new userService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.allUsers();
    res.json(users);
  } catch (error) {
    next(`En router${error}`);
  }
});

router.get("/:id", schemaValidator(findUserSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", schemaValidator(createUserSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.createUser(body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/edit-user",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    schemaValidator(updateUserSchema, "body"), async (req, res, next) => {
  try {
    console.log(req.file)
    const {bio} = req.body;
    const profile_picture = req.file ? req.file.buffer : null;

    const userId  = req.user.sub;
    const updatedData = {
      bio: bio,
      profile_picture: profile_picture,
    };

    const user = await service.updateUser(userId, updatedData);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", schemaValidator(findUserSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.deleteUser(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = { router };
