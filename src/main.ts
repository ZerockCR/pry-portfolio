import { createApp } from 'vue'
import router from './router'
import i18n from './i18n'
import App from './App.vue'

// -webkit-user-drag: none (in base.css) doesn't cover Firefox, so also
// block the native image-drag ghost preview at the event level.
document.addEventListener('dragstart', (e) => {
  if (e.target instanceof HTMLImageElement) e.preventDefault()
})

createApp(App).use(router).use(i18n).mount('#app')
