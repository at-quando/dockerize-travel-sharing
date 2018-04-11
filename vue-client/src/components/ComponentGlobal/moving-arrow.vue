<template>
  <div class="moving-arrow" :style="arrowStyle">
  </div>
</template>
<script>
  export default {
    props: {
      moveX: {
        type: Number,
        default: 0
      }
    },
    computed: {
      arrowStyle () {
        return {
          transform: `translateX(${this.moveX}rem)`
        }
      }
    }
  }
</script>
<style lang="scss">
$bg-nude: #f4f3ef !default;
.moving-arrow {
  border-bottom: 1rem solid $bg-nude;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  display: inline-block;
  position: absolute;
  transform: translateX(-11.5rem);
  transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1);
}
</style>
