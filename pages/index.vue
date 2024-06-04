<template>
  <div class="bg-base-300 p-10 rounded m-10">
    <h2 class="font-bold text-lg">Transactions</h2>
    <h3 class="text-sm">A list of transactions on Starknet</h3>

    <div class="mt-5 w-1/2">
      <div class="join flex rounded-sm">
        <button class="join-item btn btn-sm btn-outline border-slate-500">All</button>
        <button class="join-item btn-active btn btn-sm btn-outline border-slate-500">declare</button>
        <button class="join-item btn btn-sm btn-outline border-slate-500">deploy</button>
        <button class="join-item btn btn-sm btn-outline border-slate-500">deploy_account</button>
        <button class="join-item btn btn-sm btn-outline border-slate-500">invoke</button>
        <button class="join-item btn btn-sm btn-outline border-slate-500">l1_handler</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useVueTable } from '@tanstack/vue-table'

</script>