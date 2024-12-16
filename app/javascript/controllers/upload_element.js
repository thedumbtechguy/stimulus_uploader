import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["progressCircle", "progressNumber", "progressContainer"]
  static values = {
    file: String
  }

  connect() {
    this.element.style.background = `url('${this.fileValue}') center / cover no-repeat`
    this.#uploadFile()

  }

  #uploadFile() {
    this.fileData = this.#dataURItoFile(this.fileValue)
    this.uploaded = 0
    this.startTime = Date.now()
    this.#uploadChunk()
  }

  #uploadChunk() {
    setTimeout(() => {
      this.uploaded = Math.min(this.uploaded + 10000, this.fileData.size)

      // Calculate progress
      const progress = ((this.uploaded / this.fileData.size) * 100).toFixed(2)
      // Calculate speed and estimate
      const elapsedSeconds = (Date.now() - this.startTime) / 1000
      const bytesPerSecond = this.uploaded / elapsedSeconds
      const remainingBytes = this.fileData.size - this.uploaded
      const estimatedSeconds = remainingBytes / bytesPerSecond

      this.updateProgress(progress, estimatedSeconds)

      if (this.uploaded < this.fileData.size) this.#uploadChunk()
    }, 100)
  }

  updateProgress(progress, estimatedSeconds) {
    this.progressNumberTarget.innerHTML = `${progress}%`
    this.progressCircleTarget.style.strokeDashoffset = 351.86 * (1 - progress / 100)
    const progressEvent = new CustomEvent("upload:progress", {
      bubbles: true,  // Allow event to bubble up to parent
      detail: {
        id: this.element.id,
        progress: progress,
        estimatedSeconds: estimatedSeconds
      }
    })
    this.element.dispatchEvent(progressEvent)

    if (progress >= 100) {
      this.progressContainerTarget.remove()

      const completedEvent = new CustomEvent("upload:complete", {
        bubbles: true,  // Allow event to bubble up to parent
        detail: {
          id: this.element.id,
          progress: progress
        }
      })
      this.element.dispatchEvent(completedEvent)
    }
  }

  #dataURItoFile(dataURI, filename) {
    // Get the data part from the Data URI
    const arr = dataURI.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // Convert to byte array
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Create File object
    return new File([u8arr], filename, { type: mime });
  }

}
