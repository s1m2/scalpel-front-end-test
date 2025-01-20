<script setup lang="ts">
const { obj } = defineProps<{
  obj: Object;
}>();
</script>

<template>
  <p v-for="([key, value], i) in Object.entries(obj)" :key="i">
    {{ key }}: <span v-if="Array.isArray(value)">{{ value.join(", ") }}</span
    ><span v-else> {{ value }} </span>
  </p>
</template>

