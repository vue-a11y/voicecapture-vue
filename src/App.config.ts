import pkg from '../package.json';
const appVersion = pkg.version;
const vueVersion = pkg.dependencies.vue.replace('^', '');

export const configApp = {
  name: 'voicecapture-vue',
  npm: 'https://www.npmjs.com/package/voicecapture-vue',
  github: 'https://github.com/vue-a11y/voicecapture-vue',
  linkedin: 'https://www.linkedin.com/in/lucasferreiralimax',
  appVersion,
  vueVersion,
  stepsInstall: [
    {
      name: 'Install',
      language: 'bash',
      content: 'npm install voicecapture-vue',
    },
    {
      name: 'Usage',
      language: 'tsx',
      content: `<script setup>
import { ref } from 'vue';
import VoiceCaptureVue from 'voicecapture-vue';

const isVoiceCaptureExample = ref(false);
const voiceTextTranscript = ref('');

function openVoiceCapture() {
  isVoiceCaptureExample.value = true;
}

function statusVoiceCapture(value) {
  isVoiceCaptureExample.value = value;
}

function returnVoiceTranscript(transcript) {
  voiceTextTranscript.value = transcript;
}
</script>

<template>
  <VoiceCaptureVue
    :status="isVoiceCaptureExample"
    :clipboard="true"
    @voiceTranscript="returnVoiceTranscript"
    @onStatus="s  tatusVoiceCapture"
  />
  <textarea
    v-if="voiceTextTranscript"
    v-model="voiceTextTranscript"
    placeholder="Text Voice Transcript"
  >
  </textarea>
</template>`,
    },
  ],
}
