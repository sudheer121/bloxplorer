<template>
  <div
    class="py-1 px-2 text-xs inline-block rounded border"
    :style="{
      color: btnStyles[color].color,
      borderColor: btnStyles[color].borderColor,
      backgroundColor: btnStyles[color].backgroundColor,
    }"
  >
    {{ value }}
  </div>
</template>
<script setup lang="ts">
defineProps<{
  value: any;
  color: string;
}>();
</script>
