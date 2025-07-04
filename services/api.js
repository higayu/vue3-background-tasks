import axios from 'axios';

export default {
  async created() {
    this.loading = true;
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.posts = res.data;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      posts: [],
      loading: false
    };
  }
}
