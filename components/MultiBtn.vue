<template>
  <div class="join flex rounded-sm">
    <button
      v-for="value in values"
      :key="value.slug"
      class="join-item btn btn-sm font-normal text-white border border-shd-75 hover:border-shd-75 hover:bg-shd-56"
      :class="activeBtnSlug === value.slug ? 'bg-shd-75' : 'bg-shd-27'"
      @click="btnClicked(value.slug)"
    >
      {{ value.name }}
    </button>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['btnClicked']);
const props = defineProps<{
  values: {
    name: string;
    slug: string;
  }[];
}>();
// use values prop here
const activeBtnSlug = useState('activeBtnSlug', () => props.values[0].slug);

const btnClicked = (slug: string) => {
  activeBtnSlug.value = slug;
  emit('btnClicked', slug);
};
</script>
