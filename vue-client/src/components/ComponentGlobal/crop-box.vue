<template>
  <div class="container-crop">
    <div class="img-box">
      <img id="image" :src="editImg" alt="Picture" :class="{hidden: isNotShow}">
      <img id="image-preview" :src="preview">
    </div>
    <div class="action-img">
      <i class="fa fa-crop" @click="handlingCropBox" aria-hidden="true"></i>
      <i class="fa fa-repeat" @click="cropper.rotate(90)" aria-hidden="true"></i>
      <i class="fa fa-undo" @click="cropper.rotate(-90)" aria-hidden="true"></i>
      <i class="fa fa-arrows-v" @click="scaleHorizon" aria-hidden="true"></i>
      <i class="fa fa-arrows-h" @click="scaleVertical" aria-hidden="true"></i>
    </div>
    <div class="action">
      <button @click="takeOriginImg">Origin Size</button>
      <i class="fa fa-file-image-o" aria-hidden="true"></i>
      <input id="zoomSilder" type="range" min="0" max="100" value="50" @input="zoomImg" class="range blue"/>
      <i class="fa fa-file-image-o" style="font-size: 25px" aria-hidden="true"></i>
      <button class="btn-normal btn-black" @click="sendEditedImg">OK</button>
      <router-link :to="{name: 'NewsFeed'}">
        <button class="btn-normal btn-light-grey">Cancel</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import 'whatwg-fetch'
  import Cropper from 'cropperjs'
  export default {
    props: ['editImg'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        isCropBox: true,
        cropper: Cropper,
        croppedCanvas: {},
        preview: '',
        horizon: -1,
        vertical: -1,
        canvasData: '',
        cropBoxData: {},
        imageData: {},
        containerData: {},
        value: 50,
        // limited: {top:0, left:0},
        isNotShow: false
      }
    },
    mounted () {
      var image = document.querySelector('#image')
      // var minAspectRatio = 0.5;
      // var maxAspectRatio = 1.5;
      this.cropper = new Cropper(image, {
        background: false,
        dragMode: 'move',
        autoCrop: true,
        autoCropArea: 0.8,
        scalable: true,
        // zoomable: false,
        movable: false,
        ready: () => {
          this.cropper.setCropBoxData(this.cropBoxData).setCanvasData(this.canvasData)
        },
        cropmove: function () {
          // var cropBoxData = this.cropper.getCropBoxData()
          this.containerData = this.cropper.getContainerData()
          this.imageData = this.cropper.getImageData()
          // var height = this.imageData.height
          // var width = this.imageData.width
          // if(this.imageData.rotate==90 || this.imageData.rotate==-90) {
          //   this.imageData.width = height
          //   this.imageData.height = width
          // }
          // this.limited = { left: (this.containerData.width- width)/2, top: (this.containerData.height- height)/2 }
          // var spaceX= cropBoxData.left - this.limited.left
          // var spaceY= cropBoxData.top - this.limited.top
          // if(spaceY >= 0 ) {
          //   if (spaceY + cropBoxData.height > height){
          //     this.cropper.setCropBoxData({height: height-spaceY})
          //   }
          // }
          // else{
          //   this.cropper.setCropBoxData({top: this.limited.top})
          // }
          // if(spaceX >= 0) {
          //   if (spaceX + cropBoxData.width >= width){
          //     this.cropper.setCropBoxData({width: width-spaceX})
          //   }
          // }
          // else{
          //   this.cropper.setCropBoxData({left: this.limited.left})
          // }
          // var aspectRatio = cropBoxData.width / cropBoxData.height
          // if (aspectRatio < minAspectRatio) {
          //   cropper.setCropBoxData({
          //     width: cropBoxData.height * minAspectRatio
          //   });
          // } else if (aspectRatio > maxAspectRatio) {
          //   cropper.setCropBoxData({
          //     width: cropBoxData.height * maxAspectRatio
          //   });
          // }
        }
      })
    },
    methods: {
      scaleHorizon () {
        this.cropper.scaleX(this.horizon)
        this.horizon = -this.horizon
      },
      scaleVertical () {
        this.cropper.scaleY(this.vertical)
        this.vertical = -this.vertical
      },
      cropImg () {
        this.croppedCanvas = this.cropper.getCroppedCanvas()
        var image = document.querySelector('#image')
        image.src = this.croppedCanvas.toDataURL()
      },
      handlingCropBox () {
        if (this.isCropBox === true) {
          this.isNotShow = true
          this.preview = this.cropper.getCroppedCanvas().toDataURL()
          this.cropBoxData = this.cropper.getCropBoxData()
          this.canvasData = this.cropper.getCanvasData()
          this.cropper.destroy()
        } else {
          this.preview = ''
          this.cropper.init()
          this.isNotShow = false
        }
        this.isCropBox = !this.isCropBox
      },
      zoomImg (e) {
        var value = e.target.value
        this.cropper.zoom((value - this.value) / 100)
        this.value = e.target.value
      },
      takeOriginImg () {
        const zoomSlider = document.querySelector('#zoomSilder')
        zoomSlider.value = 50
        this.cropper.reset()
      },
      // urltoFile (url, filename, mimeType) {
      //   mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1]
      //   return (window.fetch(url)
      //     .then(function (res) { return res.arrayBuffer() })
      //     .then(function (buf) { return new File([buf], filename, {type: mimeType}) })
      //   )
      // },
      b64toBlob (b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data.replace(/^data:image\/[a-z]+;base64,/, '').replace(/\s/g, ''))
        const byteArrays = []
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize)
          const byteNumbers = new Array(slice.length)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }
          const byteArray = new Uint8Array(byteNumbers)
          byteArrays.push(byteArray)
        }
        const blob = new Blob(byteArrays, {type: contentType})
        return blob
      },
      sendEditedImg () {
        var blob = this.b64toBlob(this.cropper.getCroppedCanvas().toDataURL(), 'image/png')
        this.$emit('sendImg', blob)
      }
    }
  }
</script>
