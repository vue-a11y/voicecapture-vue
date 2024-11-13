<template>
  <section
    class="voicecapture"
    :class="{ active: status, [mode]: mode }"
    @click="deactivateVoice"
    aria-modal="true"
    role="dialog"
    :aria-expanded="status ? 'true' : 'false'"
  >
    <button
      class="exit"
      @click="deactivateVoice"
      :aria-label="getTranslation('close')"
      type="button"
    >
      <i class="icon icon-exit" aria-hidden="true">X</i>
    </button>
    <p class="text-tip" aria-live="polite">{{ translatedText }}</p>
    <button
      type="button"
      class="btn-voice"
      :class="{ active: animationButton }"
      :aria-label="getTranslation('open')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M17 11.998c0 2.76-2.23 5-4.99 5l-.002.002a4.994 4.994 0 01-4.979-5h-2c0 3.52 2.59 6.433 5.98 6.92v3.078h.01V22h2v-3.08h-.01A6.982 6.982 0 0019 11.998z" />
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3z" />
      </svg>
    </button>
  </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { translates } from './VoiceCapture.translate';

export default {
  name: 'VoiceCapture',
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      default: 'en',
    },
    mode: {
      type: String,
      default: 'fullscreen',
    },
    clipboard: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['voiceTranscript', 'onStatus'],
  setup(props, { emit }) {
    const recognizing = ref(false);
    const errorOccurred = ref(false);
    const recognition = ref(null);
    const animationButton = ref(false);
    const finalTranscript = ref('');
    const translatedText = ref('');
    const translations = translates;

    const activateVoice = () => {
      if (!recognizing.value && recognition.value) {
        recognition.value.lang = props.lang;
        finalTranscript.value = '';
        recognizing.value = true;
        recognition.value.start();
      }
    };

    const deactivateVoice = () => {
      recognizing.value = false;
      animationButton.value = false;
      recognition.value.stop();
      emit('onStatus', false);
    };

    const setupVoiceRecognition = () => {
      if (!('webkitSpeechRecognition' in window)) {
        console.warn('SpeechRecognition not supported, please update your browser.');
        return;
      }

      recognition.value = new window.webkitSpeechRecognition();
      recognition.value.continuous = false;
      recognition.value.lang = props.lang;
      recognition.value.interimResults = true;

      recognition.value.onstart = () => {
        recognizing.value = true;
        errorOccurred.value = false;
        translatedText.value = getTranslation('speakNow');
        animationButton.value = true;
      };

      recognition.value.onerror = (event) => {
        animationButton.value = false;
        errorOccurred.value = true;
        handleError(event.error);
      };

      recognition.value.onend = () => {
        recognizing.value = false;
        if (finalTranscript.value) {
          translatedText.value = '';
          emit('voiceTranscript', finalTranscript.value);
        } else if (!errorOccurred.value) {
          translatedText.value = getTranslation('noSpeech');
          setTimeout(() => deactivateVoice(), 5000);
        }
        animationButton.value = false;
      };

      recognition.value.onresult = handleResults;
    };

    const handleResults = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript.value += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      translatedText.value = interimTranscript || finalTranscript.value;

      if (finalTranscript.value) {
        if(props.clipboard) {
          navigator.clipboard.writeText(finalTranscript.value).then(
            () => {
              console.log('Text copied to clipboard');
            },
            (err) => {
              console.error('Could not copy text to clipboard', err);
            }
          );
        }
        emit('voiceTranscript', finalTranscript.value);
        deactivateVoice();
      }
    };

    const handleError = (error) => {
      translatedText.value = getTranslation(error);

      setTimeout(() => {
        deactivateVoice();
      }, 5000);
    };

    const getTranslation = (key) => {
      const translationsForLang = translations[props.lang] || translations['en'];
      return translationsForLang[key] || key;
    };

    watch(() => props.status, (newVal) => {
      if (newVal) activateVoice();
      else deactivateVoice();
    });

    onMounted(() => {
      setupVoiceRecognition();
    });

    return {
      animationButton,
      translatedText,
      activateVoice,
      deactivateVoice,
      getTranslation
    };
  },
};
</script>

<style lang="scss">
body {
  --voicecapture-color-text: #000;
  --voicecapture-default: #ccc;
  --voicecapture-primary: #209665;
  --voicecapture-secondary: #116b8f;
  --voicecapture-background: #fff;
  --voicecapture-background-tooltip: #444;
  --voicecapture-shadow-tooltip: rgba(0, 0, 0, 0.2);
  --voicecapture-text: #fff;
  --voicecapture-background-svg: #000;

  --main-color: #303030;
  --main-color-rgb: 0, 0, 0;
  --main-color-primary: 26, 115, 232;
  --main-color-secondary: green;
  --main-bg-color-primary: #fff;
  --main-bg-color-secondary: #f2f2f2;
  --main-bg-color-profile: #e9eef6;
  --main-border-color: #747775;
  --main-invert: 0;
  --logo-filter: none;
  --input-bg-color: #fff;
  --input-bg-color-hover: #fff;
  --input-drop-shadow: #20212447;

  &.darkmode {
    --voicecapture-color-text: #fff;
    --voicecapture-default: #555;
    --voicecapture-primary: #1e8057;
    --voicecapture-secondary: #0d7eaa;
    --voicecapture-background: #222;
    --voicecapture-background-tooltip: #fff;
    --voicecapture-shadow-tooltip: rgba(0, 0, 0, 0.2);
    --voicecapture-text: #000;
    --voicecapture-background-svg: #fff;

    --main-color: #fff;
    --main-color-rgb: 255, 255, 255;
    --main-color-primary: 26, 115, 232;
    --main-color-secondary: green;
    --main-bg-color-primary: #202124;
    --main-bg-color-secondary: #171717;
    --main-bg-color-profile: #202124;
    --main-border-color: #747775;
    --main-invert: 1;
    --logo-filter: grayscale(1) brightness(3);
    --input-bg-color: #202124;
    --input-bg-color-hover: #303134;
    --input-drop-shadow: #171717;
  }
}

.voicecapture {
  align-items: center;
  background-color: var(--voicecapture-background);
  bottom: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  font-family: arial, sans-serif;
  font-size: 14px;
  height: auto;
  justify-content: center;
  opacity: 0;
  padding: 35px;
  pointer-events: none;
  transition: 0.5s all;
  user-select: none;
  z-index: 99;
  color: var(--voicecapture-color-text);
  -webkit-tap-highlight-color: transparent;
  &.active {
    opacity: 1;
    pointer-events: all;
    p {
      opacity: 1;
      transform: translateX(0);
    }
    .btn-voice {
      transform: scale(1);
    }
  }
  &.fullscreen {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
  }
  &.float {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    border-radius: 100px;
    justify-content: flex-end;
    .exit {
      display: none;
    }
    .btn-voice {
      --mic-volume-size: 80px;
    }
  }
  p {
    font-size: 22px;
    margin: 0;
    opacity: 0;
    padding: 0;
    transform: translateX(100px);
    transition: 1s all;
  }
  .exit {
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

.btn-voice {
  --mic-volume-size: 150px;
  align-items: center;
  background-color: rgba(var(--main-color-rgb), 0.05);
  border-radius: 50%;
  border: 0;
  box-shadow:
    0 0 0 1px rgba(#fff, 0.6),
    0 10px 20px rgba(var(--main-color-rgb), 0.1);
  cursor: pointer;
  display: flex;
  height: var(--mic-volume-size);
  justify-content: center;
  margin-left: 20px;
  opacity: 0.5;
  outline: none;
  transition: 0.4s all;
  transform: scale(0);
  user-select: none;
  width: var(--mic-volume-size);
  min-width: var(--mic-volume-size);
  -webkit-tap-highlight-color: transparent;
  &.active {
    animation: 1s voiceAnimation infinite alternate;
    opacity: 1;
    svg {
      fill: #ea4335;
    }
  }
  &:hover {
    transform: scale(1.1);
  }
  svg {
    height: 50%;
    width: 50%;
    fill: var(--main-color);
  }
}

@keyframes voiceAnimation {
  0% {
    box-shadow:
      0 0 0 1px rgba(#fff, 0.6),
      0 10px 20px rgba(var(--main-color-rgb), 0.1),
      0 0 10px rgba(var(--main-color-rgb), 0.1);
  }
  100% {
    box-shadow:
      0 0 0 1px rgba(#fff, 0.6),
      0 10px 20px rgba(var(--main-color-rgb), 0.1),
      0 0 0 30px rgba(var(--main-color-rgb), 0.1);
  }
}

.exit {
  background-color: var(--main-bg-color-primary);
  border: 0;
  cursor: pointer;
  padding: 15px;
  position: absolute;
  right: 5px;
  top: 5px;
  -webkit-tap-highlight-color: transparent;
}

.icon {
  background: url(//ssl.gstatic.com/inputtools/images/ita_sprite2.png) no-repeat;
  display: block;
  filter: Invert(var(--main-invert));
  font-size: 0;
  height: 14px;
  line-height: 0;
  margin: 0px;
  opacity: 0.4;
  pointer-events: none;
  width: 14px;
}

.icon-exit {
  background-position: -668px -18px;
}

.btn {
  -webkit-tap-highlight-color: transparent;
  background-color: rgba(var(--main-color-rgb), 0.05);
  border-radius: 4px;
  border: 0;
  color: var(--main-color);
  cursor: pointer;
  font-family: arial, sans-serif;
  font-size: 14px;
  height: 36px;
  line-height: 27px;
  margin: 11px 4px;
  min-width: 54px;
  outline: none;
  padding: 0 16px;
  text-align: center;
  transition: 0.3s all;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 0 0 1px rgba(var(--main-color-rgb), 0.3);
  }
}
</style>
