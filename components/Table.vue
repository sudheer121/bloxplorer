<template>
  <table class="table w-full">
    <colgroup>
      <col v-for="c in columns" span="1" :style="`width: ${c.width}`" />
    </colgroup>
    <thead>
      <tr
        class="border border-top border-x-0 border-shd-75 text-left text-xs text-shd-170"
      >
        <th v-for="c in columns" :key="c.slug" class="p-1 font-medium h-9">
          {{ c.name.toUpperCase() }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in rows"
        :key="item.id"
        class="border-shd-75 hover:bg-shd-75"
      >
        <slot name="row" :item="item"></slot>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { TableColItem } from '~/utils/types';
defineProps<{
  rows: any[];
  columns: TableColItem[];
}>();
</script>
