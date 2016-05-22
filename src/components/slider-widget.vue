<template>
  <div class="slider-widget">
    <number-input :min="min" :max="max" :value.sync="value"></number-input>
    <slider :min="min" :max="max" :value.sync="value"></slider>
  </div>
</template>

<script>
import NumberInput from 'components/number-input';
import Slider from 'components/slider';

export default {
  components: {
    Slider,
    NumberInput
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    }
  },
  watch: {
    value: function(value) {
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

$input-width: $settings-row-control-width;

.slider-widget {
  position: relative;
  padding-right: $input-width + 16px;

  > input {
    position: absolute;
    right: 0;
    width: $input-width;
    text-align: center;
  }
}
</style>
