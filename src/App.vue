<script setup>
import { ref } from 'vue';
import Nucleus from 'nucleus-vue';
import VoiceCaptureVue from './components/VoiceCapture.vue';
import { configApp } from './App.config';

const langSelect = ref('en');
const modeSelect = ref('fullscreen');
const isVoiceCaptureExample = ref(false);
const voiceTextTranscript = ref('');

function openVoiceCapture(mode) {
  modeSelect.value = mode;
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
  <Nucleus :config="configApp">
    <div class="content">
      <h2>Voice Capture Example</h2>
      <div class="content-actions">
        <div class="example-actions">
          <button class="button-voicecapture-example" type="button" @click="openVoiceCapture('fullscreen')">
            <span class="material-symbols-outlined"> &#xe029; </span>
            <span class="material-symbols-outlined"> &#xe5d0; </span> FullScreen
          </button>
          <button class="button-voicecapture-example" type="button" @click="openVoiceCapture('float')">
            <span class="material-symbols-outlined"> &#xe029; </span>
            <span class="material-symbols-outlined"> &#xe62e; </span> Float
          </button>
        </div>
        <div class="language">
          <label for="langSelect" class="lang-label">Choose the language:</label>
          <select id="langSelect" v-model="langSelect" class="lang-select">
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese</option>
            <option value="ru">Russian</option>
            <option value="ar">Arabic</option>
            <option value="ko">Korean</option>
            <option value="nl">Dutch</option>
            <option value="sv">Swedish</option>
          </select>
        </div>
      </div>

      <VoiceCaptureVue
        :status="isVoiceCaptureExample"
        :lang="langSelect"
        :mode="modeSelect"
        :clipboard="true"
        @voiceTranscript="returnVoiceTranscript"
        @onStatus="statusVoiceCapture"
      />
    </div>
    <div v-if="voiceTextTranscript" class="content">
        <div class="input-group">
          <label for="voiceTextArea" class="input-label">
            <h2>Transcript Results</h2>
          </label>
          <textarea id="voiceTextArea" class="input-field textarea" v-model="voiceTextTranscript"
            placeholder="Texto do Voice Transcript"></textarea>
        </div>
      </div>
  </Nucleus>
</template>

<style>
.example-actions {
  width: 50%;
  display: flex;
  gap: 20px;

  @media (max-width: 800px) {
    width: 100%;
  }
}

.button-voicecapture-example {
  background: var(--primary);
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--vtl-background);
  padding: 0.5rem 1rem;
  cursor: pointer;
  min-height: 70px;
  white-space: nowrap;

  svg {
    margin-right: 1rem;
  }

  .material-symbols-outlined {
    margin-right: 0.5rem;
  }

  .material-symbols-outlined.plus {
    margin: 0 0.5rem;
  }
}

.lang-label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.lang-select {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 16px;
  color: var(--color-text);
  background-color: var(--vtl-background);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 16px;
  color: var(--color-text);
}

.input-field {
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  background-color: var(--vtl-background);
  color: var(--color-text);
}

.textarea {
  resize: vertical;
  height: 100px;
}

.content-actions {
  display: flex;
  gap: 20px;

  button,
  .language {
    width: 50%;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    .language {
      width: 100%;
    }
  }
}
</style>
