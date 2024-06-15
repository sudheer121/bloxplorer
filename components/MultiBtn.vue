<template>
  <div class="join rounded-sm">
    <button
      v-for="value in values"
      :key="value.slug"
      class="join-item btn btn-sm font-normal text-white border border-shd-75 hover:border-shd-75 hover:bg-shd-56"
      :class="activeBtn === value.slug ? 'bg-shd-75' : 'bg-shd-27'"
      @click="btnClicked(value.slug)"
    >
      {{ value.name }}
    </button>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['btnClicked']);
const { activeBtnSlug } = defineProps<{
  values: {
    name: string;
    slug: string;
  }[];
  activeBtnSlug: string;
}>();
// use values prop here
const activeBtn = ref(activeBtnSlug);

const btnClicked = (slug: string) => {
  activeBtn.value = slug;
  emit('btnClicked', slug);
};
</script>
