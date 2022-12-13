import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './Popup.vue'
import '../styles'

import DefaultPopupPage from './views/DefaultPage.vue'
import SaveMeme from './views/SaveMeme.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'DefaultPopupPage',
      component: DefaultPopupPage,
    },
    {
      path: '/save-meme',
      name: 'SaveMeme',
      component: SaveMeme,
    },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
