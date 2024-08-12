import Boom from "@hapi/boom"

class bookmarksService {
  async deleteBookmark(id) {
    const allData = {
      id: 24,
      user: "Hendersor",
    };

    if (id === 24) {
      return allData;

    } else {
      throw Boom.notFound("Bookmark not found!");

    }
  }
}

export {bookmarksService}