<template>
  <div class="w-3/4 mx-auto">
    <nav
      class="flex items-center justify-between flex-wrap p-2.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-600 rounded-lg"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="cat"
        class="w-20 h-20 ml-2 hover:animate-spin"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"
        ></path>
      </svg>
      <!-- <button class="transition-colors text-center bg-black" @click="getUsers">
        Get Users
      </button>
      <button class="transition-colors text-center bg-black" @click="getPosts">
        Get Posts
      </button>
      <button class="transition-colors text-center bg-black" @click="getComments">
        Get Comments
      </button> -->
      <button
        class="transition-colors text-center bg-tangerine-100 hover:bg-indigo-700 mr-2"
        @click="showModal = !showModal"
      >
        Sign Up
      </button>
    </nav>
    <!-- <div
      class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
    >
      <div>
        <span
          class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg"
        >
          <svg
            class="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          ></svg>
        </span>
      </div>
      <h3 class="text-white mt-5 text-base font-medium tracking-tight">
        Writes Upside-Down
      </h3>
      <p class="text-slate-400 mt-2 text-sm">
        The Zero Gravity Pen can be used to write in any orientation, including
        upside-down. It even works in outer space.
      </p>
    </div> -->
    <div class="grid grid-cols-3 gap-12 mt-12">
      <div v-for="post in posts">
        <Card :post="post" @click="showCard = !showCard" :show="showCard" />
      </div>
    </div>
  </div>

  <Modal :show="showModal" type="email" @close="showModal = false" />
</template>

<script>
import { getAllUsers } from "../services/UserService";
import { getAllPosts } from "../services/PostService";
import { getAllComments } from "../services/CommentService";
import Modal from "./Modal.vue";
import Card from "./Card.vue";

export default {
  props: {
    msg: String,
  },
  components: {
    Modal,
    Card,
  },
  data() {
    return {
      showModal: false,
      showCard: false,
      users: [],
      posts: [],
      comments: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getUsers() {
      const users = await getAllUsers();
      this.users = users;
    },
    async getPosts() {
      const posts = await getAllPosts();
      this.posts = posts.slice(0, 9);
      console.table(this.posts);
    },
    async getComments() {
      const comments = await getAllComments();
      this.comments = comments;
    },
  },
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.body__profile__photo img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 5px solid #fff;
  top: 50px;
  position: relative;
}
</style>
