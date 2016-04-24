<template>
  <div class="input-slider">
    <label>{{ title }}</label>
    <input type="text" class="form-control" v-model="value"></input>
    <slider :min="min" :max="max" :value="value"></slider>
  </div>
</template>

<script>
import Slider from 'components/slider';

export default {
  components: { Slider },
  props: ['title', 'min', 'max'],
  data: () => ({
    value: 0
  }),
  events: {
    'slider-change': function(value) {
      this.value = value;
    }
  }
}
</script>

<style lang="scss">
$input-width: 50px;

.input-slider {
  position: relative;
  padding-right: $input-width + 16px;

  > label {
    margin-bottom: 16px;
  }

  > input {
    position: absolute;
    right: 0;
    width: $input-width;
    text-align: center;
  }
}
</style>
