<template>
  <div class="p-8 rounded bg-base-100">
    <div class="flex flex-row align-center" style="min-height: 80px">
      <h3 class="font-medium" style="font-size: 22px">Transaction</h3>
      <div></div>
    </div>
    <div class="grid grid-cols-4 gap-y-6 mb-3">
      <div class="col-span-4">
        <div class="text-xs" style="color: rgb(170, 170, 170)">HASH</div>
        <div class="text-base leading-8">
          0x3a02ab603ffcbd612ce1edd035088e22a9c135529a16ea9ae2b0e1b8a97423f
        </div>
      </div>
      <div class="col-span-1">
        <div class="text-xs" style="color: rgb(170, 170, 170)">TYPE</div>
        <div>
          <TxnTypeBtn :txn-type="'INVOKE'" />
        </div>
      </div>
      <div class="col-span-1">
        <div class="text-xs" style="color: rgb(170, 170, 170)">TIMESTAMP</div>
        <div></div>
      </div>
      <div class="col-span-4">
        <div class="text-xs mb-2" style="color: rgb(170, 170, 170)">STATUS</div>
        <div class="flex">
          <div
            class="btn btn-sm btn-rounded py-1 pl-3 pr-2 rounded-3xl font-medium text-white"
            style="background: rgb(17, 125, 73)"
          >
            <div>
              <img src="~/assets/tick.svg" width="16" height="16" alt="" />
            </div>
            <div style="font-size: 11px; line-height: 11px">Received</div>
          </div>
          <div class="w-8 flex flex-col justify-center align-center">
            <div style="background: rgb(17, 125, 73); height: 2px;"> </div>
          </div>
          <div
            class="btn btn-sm btn-rounded py-1 pl-3 pr-2 rounded-3xl font-medium text-white"
            style="background: rgb(17, 125, 73)"
          >
            <div>
              <img src="~/assets/tick.svg" width="16" height="16" alt="" />
            </div>
            <div style="font-size: 11px; line-height: 11px">Accepted On L2</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row h-14 gap-x-10 mb-8 items-center align-middle font-medium">
        <a class="border-b h-14" style="line-height: 56px;"> <div class="align-middle">Overview</div> </a>
        <a> Events </a>
    </div>
  </div>
</template>
