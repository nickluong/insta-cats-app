<template>
  <div class="w-3/4 mx-auto">
    <nav class="flex items-center justify-between flex-wrap px-4 rounded-lg">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="cat"
        class="w-24 h-24 ml-2 hover:animate-spin text-garfield/90"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"
        ></path>
      </svg>
      <div class="flex-end tracking-wider">
        <button
          class="transition-colors w-28 text-center text-base bg-tangerine-400 hover:shadow-lg hover:bg-gray-200 text-slate-800 mr-2 rounded-sm"
          @click="showSignUpModal"
        >
          Sign Up
        </button>
        <button
          class="transition-colors w-28 text-center text-base bg-white hover:shadow-lg hover:bg-gray-200 text-slate-800 mr-2 border border-tangerine-400 rounded-sm"
          @click="showUploadModal"
        >
          Upload
        </button>
      </div>
    </nav>
    <div class="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12 justify-items-center">
      <div v-for="post in loadedPosts" :key="post.pk">
        <Card :post="post" @click="showViewModal(post)" />
      </div>
    </div>
    <div
      class="flex flex-row w-20 h-20 bg-tangerine-400 align-middle items-center rounded-full mt-12 mx-auto card"
      @click="loadMorePosts"
    >
      <svg
        class="mx-auto mb-1 w-16 h-16 text-orange-50 card"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z"
        />
      </svg>
    </div>
  </div>

  <Modal
    v-if="showModal"
    :post="post"
    @post="getPosts"
    :type="modalType"
    @close="showModal = false"
  />
</template>

<script>
import { getAllUsers } from "../services/UserService";
import { getAllPosts } from "../services/PostService";
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
      modalType: "",
      maxPosts: 9,
      users: [],
      allPosts: [],
      post: {},
    };
  },
  computed: {
    loadedPosts() {
      return this.allPosts.slice(0, this.maxPosts);
    },
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
      this.allPosts = posts.reverse();
    },
    showViewModal(card) {
      this.post = card;
      this.showModal = true;
      this.modalType = "view";
    },
    showSignUpModal() {
      this.showModal = true;
      this.modalType = "signup";
    },
    showUploadModal() {
      this.showModal = true;
      this.modalType = "upload";
    },
    loadMorePosts() {
      if (this.maxPosts < this.allPosts.length) {
        this.maxPosts += 9;
      }
    },
  },
};
</script>

<style scoped>
.card:hover {
  transform: scale(1.08);
  box-shadow: 0 3px 12px 0 rgba(#e2e8f0), 0 1px 15px 0 rgba(#e2e8f0);
}
</style>
