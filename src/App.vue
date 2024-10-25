<script setup>
import Nucleus from 'nucleus-vue';
import VoiceCaptureVue from './components/VoiceCapture.vue';
import { configApp } from './App.config';
</script>

<template>
  <Nucleus :config="configApp">
    <div class="content example">
      <h2>Voice Capture Example</h2>
      <VoiceCaptureVue />
    </div>
  </Nucleus>
</template>

<style>
.example {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}
.example button {
  margin: 1rem 0;
}
</style>
