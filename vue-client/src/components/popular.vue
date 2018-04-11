<template>
  <div class="container popular">
    <input type="text" v-model="title">
    <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption">
    </quill-editor>
    <p>12312 {{linkImg}}</p>
    <button @click="createArticle({title: title, content: content, images: imageList})">Submit</button>
    <!-- <div class="quill-code">
      <code class="hljs" v-html="contentCode"></code>
    </div> -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as types from '../store/types'
import {quillEditor} from 'vue-quill-editor'
// import hljs from 'highlight.js'

export default {
  name: 'Popular',
  data () {
    return {
      title: '',
      content: '<p>example content</p>',
      imageList: [],
      editContent: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
          // syntax: {
          //   highlight: text => hljs.highlightAuto(text).value
          // }
        }
      }
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    document.getElementsByClassName('ql-image')[0].onclick = () => {
      this.editContent = this.content
      document.getElementsByClassName('ql-image')[1].onchange = () => {
        this.getLinkImg(event.target.files[0])
      }
    }
  },
  watch: {
    linkImg: function (value) {
      this.onEditorChange(value)
    }
  },
  methods: {
    ...mapActions({
      getLinkImg: types.UPLOAD_IMG,
      createArticle: types.CREATE_ARTICLE
    }),
    onEditorChange (value) {
      var img = document.createElement('img')
      this.imageList.push(value)
      img.src = this.$options.filters.takeImage(value)
      this.editContent += img.outerHTML
      this.content = this.editContent
    },
    resizeImg () {

    }
  },
  computed: {
    ...mapGetters({
      linkImg: types.LINK
    }),
    contentCode () {
      // return hljs.highlightAuto(this.content).value
    }
  }
}
</script>
