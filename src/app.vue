<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="col-md-6">
        <input-slider title="viive" :min="0" :max="100"></input-slider>
      </div>
      <div class="col-md-6">
        <input-slider title="volyymi" :min="0" :max="100"></input-slider>
      </div>
      <div class="col-md-12">
        <button class="btn">dubstep</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputSlider from 'components/input-slider';

export default {
  components: {
    InputSlider
  }
}

</script>

<style lang="scss">
@import "./styles/base";
</style>
