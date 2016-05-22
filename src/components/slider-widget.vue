<template>
  <div class="slider-widget">
    <template v-if="isTimeFormat">
      <time-input :min="min" :max="max" :value.sync="value"></time-input>
    </template>
    <template v-else>
      <number-input :min="min" :max="max" :value.sync="value"></number-input>
    </template>
    <slider :min="min" :max="max" :value.sync="value" :format="format"></slider>
  </div>
</template>

<script>
import NumberInput from 'components/number-input';
import TimeInput from 'components/time-input';
import Slider from 'components/slider';

export default {
  components: {
    Slider,
    NumberInput,
    TimeInput
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
  computed: {
    isTimeFormat: function() {
      return this.format === 'time';
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
