const express = require("express");
const { schemaValidator } = require("../middlewares/schemaValidator");
const {
  createUserSchema,
  findUserSchema,
  editUserSchema,
} = require("../schemas/usersSchema");
const { userService } = require("../services/usersService");

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

router.patch("/:id", schemaValidator(findUserSchema, "params"), schemaValidator(editUserSchema, "body"), async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const user = await service.updateUser(id, body);
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
