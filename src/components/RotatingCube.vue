<script setup lang="ts">
import { useProtoStore } from './../stores/proto.ts';

const store = useProtoStore();
const { getCube, getHL } = store;

const {idx, faces} = defineProps<{
  idx: number;
  faces: string[];
}>();

</script>
<template>
  <div class="scene">
    <div :class="`cube ${getCube(idx)}`">
      <div
        v-for="pose in faces"
        :key="pose"
        :class="`cube__face cube__face--${pose}${
          getHL(idx, pose) ? ' highlight' : ''
        }`"
      >
        {{ pose.split("_").join(" ") }}
      </div>
    </div>
  </div>
</template>
