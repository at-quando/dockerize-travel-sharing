<template>
  <div class="review-card">
    <img class="reviewer-av" src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg">
    <div class="reviewer-meta">
      <span class="reviewer-name">name</span>
      <span class="reviewer-date">1 months ago</span>
      <el-rate
        v-model="value3"
        :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text>
      </el-rate>
    </div>
    <p class="reviewer-content"> {{text1 | limit_review_content}}</p>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        value3: null,
        text1: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      }
    },
    methods: {
    },
    computed: {
    }
  }
</script>
