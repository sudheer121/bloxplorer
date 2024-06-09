<template>
    <h3 v-if="header" class="font-medium mb-4" style="font-size: 22px"> {{  header }}</h3>
    <div class="flex flex-col">
      <div v-for="row in rows" class="flex flex-row gap-x-2.5 min-h-9" >
        <div class="flex flex-row items-center gap-x-2.5 font-medium" style="min-width: 250px;">
          <div> <img src="~/assets/question.svg" alt="question" width="18"> </div>
          <div class="text-xs"> {{ row.name }}: </div>
        </div>
        <div class="flex items-center flex-auto w-100 border-b border-shd-75 text-sm">
            <span> 
                {{ row.value }}
             </span>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
// props
defineProps<{
  rows: {
    name: string;
    value?: string | number;
    isLink?: boolean;
  }[];
  header?: string;
}>();

</script>