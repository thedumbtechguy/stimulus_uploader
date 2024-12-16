import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["grid", "template",
    "globalProgressContainer", "globalProgressFileCount", "globalProgressText"]

  connect() {
    this.uploadTracker = {}
    this.element.addEventListener("upload:progress", event => {
      this.#handleUploadProgress(event.detail)
    })
  }

  #handleUploadProgress(detail) {
    if (detail.progress >= 100) delete this.uploadTracker[detail.id]
    else this.uploadTracker[detail.id] = detail
    this.#updateGlobalProgress()
  }

  #updateGlobalProgress() {
    const fileCount = Object.keys(this.uploadTracker).length
    if (fileCount > 0) {
      // Format time estimate
      let timeEstimate
      const estimatedSeconds = Object.values(this.uploadTracker).reduce((sum, item) => sum + item.estimatedSeconds, 0)
      if (estimatedSeconds < 60) {
        timeEstimate = `${Math.ceil(estimatedSeconds)} seconds`
      } else if (estimatedSeconds < 3600) {
        timeEstimate = `${Math.ceil(estimatedSeconds / 60)} minutes`
      } else {
        const hours = Math.floor(estimatedSeconds / 3600)
        const minutes = Math.ceil((estimatedSeconds % 3600) / 60)
        timeEstimate = `${hours} hours ${minutes} minutes`
      }
      console.log(timeEstimate)
      this.globalProgressFileCountTarget.innerHTML = fileCount
      this.globalProgressTextTarget.innerHTML = timeEstimate
      this.globalProgressContainerTarget.style.display = "initial"
    }
    else {
      this.globalProgressContainerTarget.style.display = "none"
    }
  }

  async pickFiles() {
    try {
      const fileHandles = await window.showOpenFilePicker({
        types: [{
          description: 'Images',
          accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
          }
        }],
        multiple: true
      });

      const files = await Promise.all(
        fileHandles.map(handle => handle.getFile())
      );

      await Promise.all(
        Array.from(files).map(async (file) => {
          let dataUri = await this.#fileToDataURI(file)
          let node = this.templateTarget.content.cloneNode(true)
          node.firstElementChild.setAttribute('id', Date.now() + Math.random().toString(36).substr(2))
          node.firstElementChild.setAttribute('data-upload-element-file-value', dataUri)
          this.gridTarget.appendChild(node)
        })
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('User cancelled file selection');
      } else {
        console.error('Error picking file:', error);
      }
      return null;
    }
  }

  #fileToDataURI(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

}
