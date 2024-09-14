import Boom from "@hapi/boom";

class bookmarksService {
  constructor() {}

  async deleteBookmark(id) {
    const allData = {
      id: 24,
      user: "Hendersor",
    };

    if (id === "24") {
      return allData;
    } else {
      throw Boom.notFound("Bookmark not found!");
    }
  }

  async createBookmark(data) {
    return { data: data };
  }

  async allBookmarks() {
    return { data: "All bookmarks" };
  }
}

export { bookmarksService };
