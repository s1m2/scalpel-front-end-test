import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Proto, Pose } from '../types/protoType';
import { FACES } from '../constants/constants';

export const useProtoStore = defineStore('proto', () => {

  const protoFiles = ref<Proto[] | []>([]);
  const cubes = ref([]);
  const hl = ref([]);

  function getFaceOptions (value: number, faceA: string, faceB: string) {
    if (value > 2) return [faceB];
    if (value > 1) return [faceA];
    if (value > 0) return [faceA, faceB];
    return [];
  };

  function instrumentSettings(i: { poses: Pose }) {
    let n = 1
    let calc = (x: number) => n > 0 ? x - 1 : x

    let [pose_face, pose_sides, pose_vertical] = [
      calc(i.poses.faces),
      calc(i.poses.sides),
      calc(i.poses.vertical)
    ]

    const face_option = getFaceOptions(pose_face, FACES[0], FACES[1]);
    const sides = getFaceOptions(pose_sides, FACES[3], FACES[2]);
    const vertical = getFaceOptions(pose_vertical, FACES[4], FACES[5]);

    return [...face_option, ...sides, ...vertical]
  }

  function changeFace(i: number, face: string) {
    let c = cubes.value.filter(ii => ii[0] !== i)
    let h = hl.value.filter(ii => ii[0] !== i)
    c.push([i, `show-${face}`])
    h.push([i, face])
    cubes.value = c
    hl.value = h
  }

  function getCube(i: number) {
    let c = cubes.value.filter(ii => ii[0] === i)
    return c.length > 0 ? c[0][1] : null
  }

  function getHL(i:number, face: string) {
    let h = hl.value.filter(ii => ii[0] === i)
    return h.length > 0 && h[0][1] === face
  }

  return { protoFiles, instrumentSettings, changeFace, getCube, getHL }
})