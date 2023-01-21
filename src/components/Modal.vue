<script>
import { createUser } from "../services/UserService";
import { createPost } from "../services/PostService";
import { createComment } from "../services/CommentService";

export default {
  props: {
    show: Boolean,
    type: String,
    post: Object,
  },
  computed() {
    if (post !== null) {
      this.comments = post.comments;
    }
  },
  data() {
    return {
      modalEmail: "",
      modalPassword: "",
      modalFirstName: "",
      modalLastName: "",
      modalTitle: "",
      modalComment: "",
      comments: [],
      file: null,
      image: null,
    };
  },
  methods: {
    async registerUser() {
      const user = {
        email: this.modalEmail,
        password: this.modalPassword,
        firstName: this.modalFirstName,
        lastName: this.modalLastName,
      };
      createUser(user.email, user.password, user.firstName, user.lastName).then((res) => {
        console.log(res);
        this.clearInputs();
      });
    },
    validUpload() {
      this.file && this.modalTitle !== "" ? true : false;
    },
    uploadPost() {
      if (validUpload()) {
        let post = new FormData();
        post.append("name", this.modalTitle);
        post.append("image", this.file);

        createPost(post).then((res) => {
          console.log(res);
          this.clearInputs();
        });
      }
    },
    postComment() {
      console.log(this.post);
      if (this.modalComment !== "") {
        const comment = {
          postId: this.post.pk,
          comment: this.modalComment,
        };
        createComment(comment.postId, comment.comment).then((res) => {
          console.log(res);
          this.clearInputs();
        });
        this.$emit("post");
      }
    },
    clearInputs() {
      this.$emit("close");
      this.modalTitle = "";
      this.modalEmail = "";
      this.modalPassword = "";
      this.modalFirstName = "";
      this.modalLastName = "";
      this.modalComment = "";
      this.file = null;
      this.image = null;
    },
    onChange(e) {
      const file = e.target.files[0];
      this.file = file;
      this.image = URL.createObjectURL(file);
    },
  },
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="container max-w-2xl h-2/5 p-4 tracking-wide relative mx-auto my-auto rounded-xl bg-orange-50 divide-y-2 divide-tangerine-400 border border-tangerine-400 text-slate-900"
          v-if="type === 'signup'"
        >
          <div class="flex flex-row place-items-center pb-2">
            <h3 class="text-2xl my-2 mx-auto pl-8 font-inter">Register Email</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-2 text-slate-900 hover:bg-tangerine-400 rounded-sm"
              @click="clearInputs"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div class="flex flex-col p-8">
            <div class="flex flex-initial align-middle justify-between">
              Email:
              <input
                type="text"
                class="bg-white rounded-md w-9/12 h-8 ml-3 mb-4 focus:ring-0 focus:ring-garfield/90 focus:border-garfield/90"
                v-model="modalEmail"
              />
            </div>
            <div class="flex flex-initial align-middle justify-between">
              Password:
              <input
                type="text"
                class="bg-white rounded-md w-9/12 h-8 ml-8 mb-4 focus:ring-0 focus:ring-garfield/90 focus:border-garfield/90"
                v-model="modalPassword"
              />
            </div>
            <span class="flex flex-initial align-middle justify-between">
              First Name:
              <input
                type="text"
                class="bg-white rounded-md w-9/12 h-8 ml-5 mb-4 focus:ring-0 focus:ring-garfield/90 focus:border-garfield/90"
                v-model="modalFirstName"
              />
            </span>
            <span class="flex flex-initial align-middle justify-between">
              Last Name:
              <input
                type="text"
                class="bg-white rounded-md w-9/12 h-8 ml-4 focus:ring-0 focus:ring-garfield/90 focus:border-garfield/90"
                v-model="modalLastName"
              />
            </span>
          </div>
          <div class="px-3 pt-5 h-1/5 text-center space-x-4 md:block tracking-wider">
            <button
              @click="registerUser"
              :disabled="!type === 'signup'"
              class="ml-2 md:mb-0 bg-white px-5 border-tangerine-400 text-sm shadow-sm font-medium border text-slate-900 rounded-md hover:shadow-lg hover:bg-gray-100 float-right"
            >
              Save
            </button>
            <button
              @click="clearInputs"
              class="md:mb-0 bg-tangerine-400 px-5 text-sm shadow-sm font-medium text-slate-900 rounded-md hover:shadow-lg hover:bg-slate-600 float-right"
            >
              Close
            </button>
          </div>
        </div>
        <div
          v-else-if="type === 'upload'"
          class="container w-3/5 h-3/5 p-4 tracking-wide relative mx-auto my-auto rounded-xl bg-orange-50 divide-y-2 divide-tangerine-400 border border-tangerine-400 text-slate-900"
        >
          <div class="flex flex-row place-items-center pb-2">
            <h3 class="text-2xl my-2 mx-auto pl-8 font-inter">Upload Post</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-2 text-slate-900 hover:bg-tangerine-400 rounded-sm"
              @click="clearInputs"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div id="preview" class="flex flex-row py-8">
            <img
              v-if="image"
              :src="image"
              class="max-w-80 max-h-96 rounded-md border border-tangerine-400"
            />
            <div v-else class="container w-80 h-96 bg-tangerine-400 rounded-md">
              <svg
                class="self-center align-middle mx-auto mt-36 w-24 h-24 text-orange-50 card"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z"
                />
              </svg>
            </div>
            <div class="flex flex-col ml-12 self-start">
              <span class="flex flex-initial align-middle justify-between mb-4">
                Choose Photo:
                <input
                  href="cat.jpg"
                  type="file"
                  accept="image/*"
                  class="ml-4"
                  @change="onChange"
                />
              </span>
              <span class="flex flex-initial align-middle justify-between">
                Title:
                <input
                  type="text"
                  class="w-80 bg-white rounded-md h-8 focus:ring-0 focus:ring-garfield/90 focus:border-garfield/90"
                  v-model="modalTitle"
                />
              </span>
            </div>
          </div>
          <div class="px-3 py-4 h-1/5 text-center space-x-4 md:block tracking-wider">
            <button
              @click="uploadPost"
              :disabled="!type === 'upload'"
              class="ml-2 md:mb-0 bg-white px-5 border-tangerine-400 text-sm shadow-sm font-medium border text-slate-900 rounded-md hover:shadow-lg hover:bg-gray-100 float-right"
            >
              Post
            </button>
            <button
              @click="clearInputs"
              class="md:mb-0 bg-tangerine-400 px-5 text-sm shadow-sm font-medium text-slate-900 rounded-md hover:shadow-lg hover:bg-slate-600 float-right"
            >
              Close
            </button>
          </div>
        </div>
        <div
          v-else-if="type === 'view' && post !== null"
          class="container w-3/5 h-5/6 p-4 tracking-wide relative mx-auto my-auto rounded-xl bg-orange-50 divide-y-2 divide-tangerine-400 border border-tangerine-400 text-slate-900"
        >
          <div class="flex flex-row place-items-center pb-2">
            <h3 class="text-2xl my-2 mx-auto pl-8 font-inter">
              {{ post.name }}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-2 text-slate-900 hover:bg-tangerine-400 rounded-sm"
              @click="clearInputs"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div id="preview" class="flex flex-col py-8">
            <img
              v-if="post.image"
              :src="'http://catstagram.lofty.codes/media/' + post.image"
              class="max-w-80 max-h-96 rounded-md border border-tangerine-400"
            />
            <div
              class="flex flex-row mx-auto justify-center align-middle max-w-80 max-h-fit my-4 rounded-md overflow-y-scroll"
            >
              <div
                class="flex flex-initial align-middle self-center text-center space-x-4 md:block tracking-wider"
              >
                Comment:
                <input
                  type="text"
                  class="w-80 ml-4 h-8 bg-white rounded-md focus:ring-0 focus:ring-garfield/90 focus:border-garfield/90"
                  v-model="modalComment"
                />
                <button
                  @click="postComment"
                  class="md:mb-0 ml-4 h-8 bg-tangerine-400 pt-1.5 px-5 text-sm shadow-sm font-medium align-middle text-slate-900 rounded-md hover:shadow-lg hover:bg-slate-600 float-right"
                >
                  Comment
                </button>
              </div>
            </div>
            <div
              class="container w-4/6 bg-white border border-tangerine-400 divide-y divide-tangerine-400 mx-4 rounded-md"
            >
              <div
                class="flex flex-col align-middle w-full max-h-fit my-1 self-stretch"
                v-for="comment in post.comments"
              >
                <div
                  class="flex flex-row flex-initial self-start items-center tracking-wider mx-4"
                >
                  <svg
                    class="flex-initial align-middle w-8 h-8 text-tangerine-400 card"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z"
                    />
                  </svg>
                  :
                  <span class="max-w-80 mx-4 text-justify">{{ comment.text }} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="px-3 py-4 h-1/5 text-center space-x-4 md:block tracking-wider">
            <!-- <button
              @click="uploadPost"
              :disabled="!type === 'upload'"
              class="ml-2 md:mb-0 bg-white px-5 border-tangerine-400 text-sm shadow-sm font-medium border text-slate-900 rounded-md hover:shadow-lg hover:bg-gray-100 float-right"
            >
              Post
            </button> -->
            <button
              @click="clearInputs"
              class="md:mb-0 bg-tangerine-400 px-5 text-sm shadow-sm font-medium text-slate-900 rounded-md hover:shadow-lg hover:bg-slate-600 float-right"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgb(143, 143, 143);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
