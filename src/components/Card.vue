<template>
  <div
    class="flex w-80 h-96 bg-indigo-600 rounded-xl p-px15 mb-6 transition-all color-white cursor-pointer overflow-hidden card"
  >
    <div class="items-center">
      <img
        v-if="!post.image.startsWith('images') && !show"
        :src="'http://catstagram.lofty.codes/media/' + post.image"
        class="rounded-full my-1 w-56 h-56 border"
      />
      <h2 class="font-inter font-semibold text-lg text-center text-ellipsis truncate">
        {{ post.name }}
      </h2>
    </div>
  </div>
</template>

<script>
import { Transition } from "vue";

export default {
  props: {
    post: Object,
    show: Boolean,
  },
  components: { Transition },
};
</script>

<style scoped>
.avatarContainer {
  display: flex;
  border-radius: 100%;
  background-color: #6666ff;
  overflow: hidden;
}
.event-card {
  width: 360px;
  height: auto;
  min-height: 360px;
  background: rgb(60, 62, 68);
  border-radius: 10px;
  overflow: hidden;
  padding: 15px 15px;
  margin-bottom: 24px;
  /* margin-right: 10px; */
  transition: all 0.2s linear;
  cursor: pointer;
  color: white;
}

img {
  margin-top: 5%;
}
.card:hover {
  transform: scale(1.11);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>
