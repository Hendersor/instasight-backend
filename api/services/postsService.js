class postsService {
  constructor() {}

  async allPosts() {
    return { data: "data" };
  }

  async createPost(data) {
    return data;
  }

  async deletePost(id) {
    return { data: id };
  }
}

export { postsService };
