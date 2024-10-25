import pkg from '../package.json';
const appVersion = pkg.version;
const vueVersion = pkg.dependencies.vue.replace('^', '');

export const configApp = {
  name: 'voicecapture-vue',
  npm: 'https://www.npmjs.com/package/voicecapture-vue',
  github: 'https://github.com/livresaber/voicecapture-vue',
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
      content: `import VoiceCaptureVue from 'voicecapture-vue'

<VoiceCaptureVue />`,
    },
  ],
}
