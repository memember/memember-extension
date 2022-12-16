browser.contextMenus.create({
  id: 'memember-extension',
  title: 'Save To Meme database',
  contexts: ['image'],
})

browser.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === 'memember-extension') {
    if (info.srcUrl) {
      const popupUrl = browser.runtime.getURL('dist/popup/index.html')
      await browser.windows.create({
        url: `${popupUrl}?saveMeme=true&imageUrl=${encodeURIComponent(info.srcUrl)}`,
        type: 'popup',
        width: 400,
        height: 600,
      })
    }
  }
})
