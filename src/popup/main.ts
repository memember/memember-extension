import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Notifications from '@kyvg/vue3-notification'
import App from './Popup.vue'

import '../styles'

import DefaultPopupPage from './views/DefaultPage.vue'
import SaveMeme from './views/SaveMeme.vue'
import Login from './views/Auth/Login.vue'
import { checkAuth } from '~/services/supabase'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'DefaultPopupPage',
      component: DefaultPopupPage,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/save-meme',
      name: 'SaveMeme',
      component: SaveMeme,
    },
  ],
})

router.beforeEach(async (to) => {
  if (!await checkAuth() && to.name !== 'Login')
    return { name: 'Login' }
})

const app = createApp(App)
app.use(router)

app.use(Notifications)
app.mount('#app')
