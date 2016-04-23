<template>
  <div>
    <h1>{{ msg }}</h1>
    <slider :min="5" :max="10"></slider>
    <slider :min="1" :max="5"></slider>
  </div>
</template>

<script>
import Slider from 'components/slider';

export default {
  components: {
    Slider
  },
  data: () => ({
    msg: 'Hello world'
  })
}

</script>

<style lang="scss">
@import "./styles/base";
</style>
