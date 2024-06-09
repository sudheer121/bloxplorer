<template>

</template>
<script setup lang="ts">
defineProps<{
  rows: {
    name: string;
    value?: string | number;
    isLink?: boolean;
    colSlug?: string;
  }[];
  columns?: {
    name: string;
    slug: string;
  };
}>();
</script>