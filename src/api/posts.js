import axios from 'axios';

import { BASE_URL_API } from '../settings';

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const createPostsService = (baseUrl) => {
  return {
    getUrl() {
      return `${baseUrl}/posts`;
    },
    async getPosts(params = {}) {
      // await delay(2000);
      return await axios.get(this.getUrl(), {
        params,
      });
    },
    async getPostById(id) {
      // await delay(1000);
      return await axios.get(`${this.getUrl()}/${id}`);
    },
    async getPostComments(id) {
      return await axios.get(`${this.getUrl()}/${id}/comments`);
    },
    async deletePost(id) {
      return await axios.delete(`${this.getUrl()}/${id}`);
    },
    async updatePost(id) {
      return await axios.patch(`${this.getUrl()}/${id}`, {
        title: 'React Forever',
      });
    },
  };
};

export const postsService = createPostsService(BASE_URL_API);
