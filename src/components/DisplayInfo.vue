<script setup lang="ts">
import { ref } from "vue";

import { BASE_URL } from "./../constants/constants";

const storedData = ref();
const input = ref("");

async function fetchDocData() {
  try {
    const response = await fetch(`${BASE_URL}/getdata`);
    const data = await response.json();
    storedData.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function saveDocData() {
  try {
    const response = await fetch(`${BASE_URL}/savedata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word: input.value })
    });
    await response.json();
    input.value = "";
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <h4>Save Data to a text file</h4>
    <input v-model="input" />
    <button @click="saveDocData">Save Data</button>
  </div>
  <div>
    <h4>Display info from a text file</h4>
    <button @click="fetchDocData">Fetch Data</button>
    <p>Fetched Data: {{ storedData }}</p>
  </div>
</template>
