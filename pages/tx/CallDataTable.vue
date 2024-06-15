<template>
  <Table :rows="rows" :columns="columnList">
    <template #row="{ item }">
      <td style="color: rgb(245, 171, 53)">
        {{ item.input }}
      </td>
      <td style="color: rgb(130, 244, 187)">
        {{ `"${getFormat(item.value)}"` }}
      </td>
    </template>
  </Table>
</template>
<script setup lang="ts">
import { useTxnStore } from '~/stores.ts/Txn';
const txnStore = useTxnStore();
const format = txnStore.getDataFormat;
const { dataArr } = defineProps<{
  dataArr: string[];
}>();

const getFormat = (hex: string) => {
  const format = txnStore.getDataFormat;

  if (format === 'dec') {
    return parseInt(hex, 16).toString();
  }

  if (format === 'text') {
    const hexPairs = hex.match(/.{1,2}/g) ?? [];
    // each hex pair to ASCII
    return hexPairs
      .map((pair) => String.fromCharCode(parseInt(pair, 16)))
      .join('');
  }

  return hex;
};

const rows = dataArr.map((d, i) => {
  return {
    value: d,
    id: i,
    input: i,
  };
});

const columnList: TableColItem[] = [
  {
    name: 'Input',
    slug: 'input',
    width: '20%',
  },
  {
    name: 'Value',
    slug: 'value',
    width: '80%',
  },
];
</script>
