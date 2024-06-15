<template>
  <Table :rows="eventsData" :columns="columnList">
    <template #row="{ item }">
      <td>
        {{ `${blockNo}_${txnIndex}_${item.id}` }}
      </td>
      <td>...</td>
      <td>
        {{ blockNo }}
      </td>
      <td>...</td>
      <td>...</td>
    </template>
  </Table>
</template>
<script setup lang="ts">
import type { TransactionEvent } from '~/utils/models';
const { events } = defineProps<{
  events: TransactionEvent[];
  blockNo: number;
  txnIndex: number;
}>();

const eventsData = computed(() => {
  return events.map((e: any, idx) => {
    return { id: idx + 1, ...e };
  });
});

const columnList: TableColItem[] = [
  {
    name: 'ID',
    slug: 'id',
    width: '22%',
  },
  {
    name: 'Name',
    slug: 'name',
    width: '12%',
  },
  {
    name: 'Block',
    slug: 'block',
    width: '22%',
  },
  {
    name: 'From',
    slug: 'from',
    width: '22%',
  },
  {
    name: 'Age',
    slug: 'age',
    width: '22%',
  },
];
</script>
