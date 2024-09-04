import Express from "express";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createPostSchema, deletePostSchema } from "../schemas/postsSchema";
import { upload } from "../config/multerConfig";

const router = Express.Router();

router.get("/", async (req, res) => {
  const data = { text: "Hello!" };
  res.json(data);
});

router.post(
  "/",
  upload.single("image"),
  schemaValidator(createPostSchema, body),
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const post = {
        id: req.body.id,
        description: req.body.description,
        imageUrl: file.path,
        uploadedDate: req.body.uploadedDate,
      };
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  schemaValidator(deletePostSchema, body),
  async (req, res, next) => {
    try {
      const postId = req.params.id;
    } catch (error) {
      next(error);
    }
  }
);

export { router };
