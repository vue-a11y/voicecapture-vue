# VoiceCapture Vue

`VoiceCapture Vue` is a Vue component for real-time voice capture and speech transcription. This component leverages the Web Speech API for speech recognition and provides an interactive UI.

## Installation

Install `voicecapture-vue` via npm:

```bash
npm install voicecapture-vue
```

## Basic Usage

### Script Setup

```javascript
<script setup>
import { ref } from 'vue';
import VoiceCapture from 'voicecapture-vue';

const isVoiceCaptureActive = ref(false);
const selectedLang = ref('en');
const selectedMode = ref('fullscreen');
const transcript = ref('');

function handleTranscript(text) {
  transcript.value = text;
}

function handleStatusChange(status) {
  isVoiceCaptureActive.value = status;
}
</script>
```

### Template Example

Use the component in your template with language and mode options:

```html
<template>
  <div>
    <VoiceCapture
      :status="isVoiceCaptureActive"
      :lang="selectedLang"
      :mode="selectedMode"
      @voiceTranscript="handleTranscript"
      @onStatus="handleStatusChange"
    />
    <textarea v-model="transcript" placeholder="Transcript results"></textarea>
  </div>
</template>
```

### Props

| Prop       | Type    | Default    | Description                                                                                  |
|------------|---------|------------|----------------------------------------------------------------------------------------------|
| `status`   | Boolean | `false`    | Toggles the voice capture on/off. Set to `true` to activate voice recognition.              |
| `lang`     | String  | `"en"`     | Specifies the language for speech recognition (e.g., `"pt"` for Portuguese).               |
| `mode`     | String  | `"fullscrenn"` | Defines the display mode: `"float"` for inline, `"fullscreen"` for full-screen.           |

### Events

| Event              | Payload     | Description                                                                                     |
|--------------------|-------------|-------------------------------------------------------------------------------------------------|
| `@voiceTranscript` | `String`    | Emitted with the transcription generated from the user's speech.                              |
| `@onStatus`        | `Boolean`   | Emitted when the voice capture status changes (active/inactive).                             |
