<script setup>
import { onMounted } from 'vue';
import { useProtoStore } from './stores/proto.ts';
import { storeToRefs } from 'pinia';
import { proto } from "./mocks/proto_demo.mjs";

import Poses from './components/pose_test.vue';

const store = useProtoStore();
const { protoFiles } = storeToRefs(store);

onMounted(() => {
  protoFiles.value = proto;
});
</script>

<template>

  <div style="margin: 10px;">
    Tech test - Tasks:

    <div>

      <b class="task">A. Vue</b>
      <ol>
        <li><s>display all values given in the 'properties' object for each entry, use your judgment on how to display them</s></li>
        <li>find the inconsistency between the values and fields in `proto_demo` ?? NB. Not sure if I found all the inconsistency</li>
        <li><s>convert the pose buttons to a dropdown menu using the vue composition api bindings to set the face of the cube (space-out contents of each entry as you see fit) </s></li>
        <li><s>change the background color of each blue container on hover by using the vue action and binding the hover sass class</s></li>
      </ol>
      <b class="task">B. Store</b>
      <ol>
        <li><s>create a pinia store</s></li>
        <li><s>move current functions to manage the state of the cubes, faces and the highlighted face to the store</s></li>
        <li><s>load values into the store on mount of `App` component</s></li>
      </ol>
      <b class="task">C. Project</b>
      <ol>
        <li>Push to a new branch `deps {yymmdd}`</li>
        <li>resolve the 4+ 'High' impact vulnerabilities</li>
        <li>Commit with message listing solutions</li>
        <li>PR to main adding me 'SirJamesBrown' as reviewer</li>
      </ol>
      <b class="task">D. Execution</b>
      <ol>
        <li>build and serve with the provided scripts in package.json</li>
        <li>using the express server `./server.js`, create a POST end-point which takes a string and call it from the vue app with any given arg</li>
        <li>Linux | Mac: use node `exec` (specifically) to create a new file called 'word' containing the passed arg and the timestamp (Unix format)</li>
        <li>Windows: use an fs tool to create a new file called 'word' with the passed arg</li>
        <li>create a GET endpoint on the server to read the file and return the contents to the vue app</li>
        <li>display the file contents in the app</li>
        <li>as in section 'C', commit and pr</li>
      </ol>

    </div>

    <div>
      Strike though completed tasks.<br />
      Not all tasks need to be completed. Please highlight those skipped or passed with a note.
    </div>

  </div>

  <Poses />

</template>

<style scoped lang="sass">
.task
  margin: 10px
  font-size: 12px
  font-weight: bold
</style>
