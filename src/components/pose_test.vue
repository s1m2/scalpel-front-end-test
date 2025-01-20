<script setup lang="ts">
import { ref } from "vue";
import RotatingCube from "./RotatingCube.vue";
import PropertyDisplay from "./PropertyDisplay.vue";

import { useProtoStore } from "./../stores/proto.ts";
import { storeToRefs } from "pinia";

import { FACES } from "../constants/constants";

const store = useProtoStore();
const { protoFiles } = storeToRefs(store);
const { instrumentSettings, changeFace } = store;

const isHovering = ref(-1);
</script>

<template>
  <table class="list" v-if="protoFiles.length">
    <thead>
      <tr>
        <th>id</th>
        <th>Face</th>
        <th>Options</th>
        <th>Poses</th>
        <th>Result</th>
        <th>Properties</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, idx) of protoFiles"
        :key="idx"
        :class="{ hover: isHovering === idx }"
        @mouseover="isHovering = idx"
        @mouseleave="isHovering = -1"
      >
        <td>{{ idx }}</td>
        <td>
          <RotatingCube :idx :faces="FACES" />
          <select class="spacing" @input="changeFace(idx, ($event.target as HTMLInputElement).value)">
            <option v-for="(face, index) in FACES" :key="index" :value="face">
              {{ face }}
            </option>
          </select>
        </td>
        <td>
          <div v-for="face in instrumentSettings(item.settings)" class="scene2">
            <div :class="`cube2 show-${face}`">
              <div
                v-for="(pose, index) in FACES"
                :key="index"
                :class="`cube2__face cube2__face--${pose}`"
              >
                {{ pose === face ? String(pose).split("_").join(" ") : null }}
              </div>
            </div>
          </div>
        </td>
        <td>
          <PropertyDisplay :obj="item.settings.poses" />
        </td>
        <td>
          <p
            v-for="(res, index) of instrumentSettings(item.settings)"
            :key="index"
          >
            {{ res }}
          </p>
        </td>
        <td>
          <PropertyDisplay :obj="item.properties" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="sass">

body
  font-size: 12px
  background-color: #242424

button
  margin: 2px

.list
  border-collapse: separate
  border-spacing: 0 1em
  .title
    border-spacing: 0
    font-size: large
  .v_up
    vertical-align: top
    .code
      color: #bebebe
      font-size: small

.space
  background-color: #242424
  color: #242424

.sect
  display: flex
  flex-direction: column
  max-width: 30vw
  min-width: 29vw
  margin: 20px

.sub
  color: #edff79

table
  padding: 0 10px
  text-transform: lowercase
  font-family: monospace

tr
  background-color: #183666

td
  padding: 20px 0 20px 10px
  vertical-align: top

.col
  display: flex
  flex-direction: column
  margin-right: 20px

.active
  background-color: #565ed8

.spacing
  margin-top: 2rem

.hover
  cursor: pointer
  background-color: #565ed8
</style>
