import type { Worker } from 'tesseract.js'
import { createWorker } from 'tesseract.js'

export default class TesseractService {
  worker: Worker | null = null

  async init() {
    this.worker = await createWorker({
      workerPath: 'https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js',
      langPath: browser.runtime.getURL('assets/js/traineddata/'),
      corePath: 'https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js',
      logger: m => console.log(m),
    })
    await this.worker.load()
    await this.worker.loadLanguage('eng')
    await this.worker.initialize('eng')
    console.log('Tesseract Service initialized')
  }

  async recognize(url: string) {
    if (this.worker === null)
      await this.init()

    const {
      data: { text },
    } = await (this.worker as Worker).recognize(url)

    return text
  }

  async terminate() {
    if (this.worker)
      await this.worker.terminate()
  }
}
