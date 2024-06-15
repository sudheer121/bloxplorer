<template>
  <div class="flex justify-center ml-1 relative">
    <img
      src="~/assets/copy.svg"
      :width="width ?? 14"
      alt="copy"
      @click="clicked"
    />
    <span
      class="absolute left-3.5 bg-shd-27 border ml-0.5 rounded border-shd-56 p-1 text-xs max-h-6"
      v-if="tooltipOpen"
    >
      COPIED!
    </span>
  </div>
</template>
<script setup lang="ts">
const { value } = defineProps<{
  value: string;
  width?: number;
}>();
const tooltipOpen = ref(false);

function clicked() {
  writeToClipboard(value);
  tooltipOpen.value = true;
  setTimeout(() => {
    tooltipOpen.value = false;
  }, 1000);
}

const writeToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
</script>
