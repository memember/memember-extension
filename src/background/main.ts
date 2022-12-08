// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.contextMenus.create({
  id: 'vitesse-webext',
  title: 'Save To Meme database',
  contexts: ['image'],
})

browser.contextMenus.onClicked.addListener((info, tab) => {
  console.log({ info, tab })
})

