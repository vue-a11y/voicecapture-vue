# voicecapture-vue

A component darkmode injection in your document page with vue.js

<a href="https://voicecapture-vue.web.app" target="_blank">Live Preview</a>

Install
```js
npm install --save voicecapture-vue
```

Usage basic
```vue
import VoiceCaptureVue from 'voicecapture-vue';

<VoiceCaptureVue />
```

Prop hiddenLabel
```vue
<VoiceCaptureVue :hiddenLabel="true" />
```

Prop hiddenIcon
```vue
<VoiceCaptureVue :hiddenIcon="true" />
```

Prop labelDark and labelLight
```vue
<VoiceCaptureVue labelDark="Tema escuro" labelLight="Tema claro" />
```

Slot change icon and label custom
```vue
<VoiceCaptureVue>
  <template #iconDark>
    <svg></svg>
  </template>
  <template #iconLight>
    <svg></svg>
  </template>
  <template #labelDark>
    Off
  </template>
  <template #labelLight>
    On
  </template>
</VoiceCaptureVue>
```

Usage useVoiceCaptureVue with toggleMode and mode value
```vue
import { useVoiceCaptureVue } from 'voicecapture-vue';

const { mode, toggleMode } = useVoiceCaptureVue();

<button @click="toggleMode">VoiceCaptureVue {{ mode }}</button>
```

Style modification and usage in your styles
```css
body {
  --dm-color-primary: #41b883;
  --dm-color-secondary: #34495e;
  --dm-color-text: #222;
  --dm-color-background: #fff;
}

body.darkmode {
  --dm-color-text: #fff;
  --dm-color-background: #222;
}
```
Create your variable colors and update this with class .darkmode.

### Description class of components
If VoiceCaptureVue usage in a page, a class in body document is update with class darkmode.
In LocalStorage is created a key store with value current mode.
Do you usage children body.darkmode styles for your application.
I recomend create a variables colors in css and update this with toggle class of body document.
