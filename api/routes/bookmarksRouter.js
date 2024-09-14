import Express from "express";
import { bookmarksService } from "../services/bookmarksService.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import {
  deleteBookmarkSchema,
  createBookmarkSchema,
} from "../schemas/bookmarksSchema.js";

const router = Express.Router();
const service = new bookmarksService();

router.get("/", async (req, res) => {
  const response = await service.allBookmarks();
  res.json(response);
});

router.delete(
  "/:id",
  schemaValidator(deleteBookmarkSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.deleteBookmark(id);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  schemaValidator(createBookmarkSchema, "body"),
  async (req, res) => {
    const bookmark = req.body;
    const response = await service.createBookmark(bookmark);

    res.json(response);
  }
);

export { router };
