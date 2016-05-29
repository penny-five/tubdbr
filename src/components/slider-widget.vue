<template>
  <div class="slider-widget">
    <input-field :min="min" :max="max" :value.sync="value" :format="format"></input-field>
    <slider :min="min" :max="max" :value.sync="value" :format="format"></slider>
  </div>
</template>

<script>
import _ from 'lodash';

import InputField from 'components/input-field';
import Slider from 'components/slider';

export default {
  components: {
    Slider,
    InputField
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
    },
    format: {
      type: String,
      default: 'number'
    }
  },
  watch: {
    value: _.throttle(function(value) {
      this.$emit('change', value);
    }, 200)
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
