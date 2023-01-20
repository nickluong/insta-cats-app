<template>
  <div
    class="flex flex-col justify-items-center w-80 h-96 bg-white rounded-md transition-all color-white card overflow-hidden p-8 border shadow-lg shadow-slate-200 border-tangerine-400 whitespace-normal"
  >
    <img
      v-if="!show"
      :src="'http://catstagram.lofty.codes/media/' + post.image"
      class="w-56 h-56 border rounded-full border-tangerine-400 self-center object-cover"
    />
    <span class="flex-wrap whitespace-pre tracking-wide">
      <p class="font-inter text-base text-center text-slate-800 mt-6 truncate">
        {{ post.name }}
      </p>
    </span>
    <svg
      class="w-8 h-8 text-tangerine-400 self-center mt-6 card"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z"
      />
    </svg>
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
.card:hover {
  transform: scale(1.08);
  box-shadow: 0 3px 12px 0 rgba(#e2e8f0), 0 1px 15px 0 rgba(#e2e8f0);
}
</style>
