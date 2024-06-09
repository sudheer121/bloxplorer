<template>
  <div
    class="py-1 px-2 text-xs inline-block rounded border"
    :style="{
      color: txnTypeToStyleMap[txnType].color,
      borderColor: txnTypeToStyleMap[txnType].borderColor,
      backgroundColor: txnTypeToStyleMap[txnType].backgroundColor,
    }"
  >
    {{ txnType }}
  </div>
</template>
<script setup lang="ts">
import type { TransactionType } from '~/utils/models';
import { txnTypeToStyleMap } from '~/utils/styles';

// props
defineProps<{
  txnType: TransactionType;
}>();
</script>
