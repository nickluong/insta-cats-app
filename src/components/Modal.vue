<script>
import { createUser } from "../services/UserService";
export default {
  props: {
    show: Boolean,
    type: String,
  },
  data() {
    return {
      modalEmail: "",
      modalPassword: "",
      modalFirstName: "",
      modalLastName: "",
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
    clearInputs() {
      this.$emit("close");
      this.modalEmail = "";
      this.modalPassword = "";
      this.modalFirstName = "";
      this.modalLastName = "";
    },
  },
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show && type === 'email'" class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="container w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-slate-800 divide-y divide-slate-500"
        >
          <div>
            <h3 class="text-2xl my-2 font-bold font-inter">Register Email</h3>
          </div>

          <div class="flex flex-col p-8">
            <div class="flex flex-initial align-middle justify-between">
              Email:
              <input
                type="text"
                class="bg-slate-100 rounded-md w-9/12 h-8 ml-3 mb-3 text-black"
                v-model="modalEmail"
              />
            </div>
            <div class="flex flex-initial align-middle justify-between">
              Password:
              <input
                type="text"
                class="bg-slate-100 rounded-md w-9/12 h-8 ml-8 mb-3 text-black"
                v-model="modalPassword"
              />
            </div>
            <span class="flex flex-initial align-middle justify-between">
              First Name:
              <input
                type="text"
                class="bg-slate-100 rounded-md w-9/12 h-8 ml-5 mb-3 text-black"
                v-model="modalFirstName"
              />
            </span>
            <span class="flex flex-initial align-middle justify-between">
              Last Name:
              <input
                type="text"
                class="bg-slate-200 rounded-md w-9/12 h-8 ml-5 text-black"
                v-model="modalLastName"
              />
            </span>
          </div>
          <div class="p-3 mb-8 text-center space-x-4 md:block">
            <button
              @click="registerUser"
              class="ml-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100 float-right"
            >
              Save
            </button>
            <button
              @click="clearInputs"
              class="md:mb-0 bg-slate-500 border border-slate-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-slate-600 float-right"
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
