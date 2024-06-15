<template>
  <div
    class="py-1 px-2.5 text-xs inline-block rounded border"
    :style="{
      color: txnTypeToStyleMap[txnType ?? 'INVOKE'].color,
      borderColor: txnTypeToStyleMap[txnType ?? 'INVOKE'].borderColor,
      backgroundColor: txnTypeToStyleMap[txnType ?? 'INVOKE'].backgroundColor,
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
  txnType: TransactionType | null;
}>();
</script>
