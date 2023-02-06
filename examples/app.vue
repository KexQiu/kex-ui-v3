<template>
    <Popover
      placement="bottom"
      trigger="click"
    >
      <button>click me</button>
      <template #content>
        <div>content</div>
      </template>
    </Popover>
</template>

<script setup lang="ts">
import { Popover } from 'kex-ui-v3/src/index.js';
</script>

<style lang="scss" scoped>

</style>