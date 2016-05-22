<template>
  <div></div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap-slider';

import { formatDuration } from '../utils';

export default {
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
      twoWay: true,
      default: 0
    },
    format: {
      type: String,
      default: 'number'
    }
  },
  ready: function() {
    $(this.$el).slider({
      min: this.min,
      max: this.max,
      value: this.value,
      formatter: this.format === 'time' ? formatDuration : null
    }).on('change', event => {
      this.value = event.value.newValue;
    });
  },
  watch: {
    min: function(min) {
      $(this.$el).slider('setAttribute', 'min', min);
    },
    max: function(max) {
      $(this.$el).slider('setAttribute', 'max', max);
    },
    value: function(value) {
      $(this.$el).slider('setValue', value);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

$slider-handle-radius: 13px;
$slider-track-height: 3px;
$slider-border-size: 1px;

.slider {

  &.slider-horizontal {
    margin-top: 10px;
    width: 100%;

    .slider-handle {
      width: $slider-handle-radius*2;
      height: $slider-handle-radius*2;
      margin-top: $slider-handle-radius*-1 + $slider-track-height*.5 - $slider-border-size;
      margin-left: $slider-handle-radius*-1;
      background: white;
      border: $slider-border-size solid $color-highlight-dark;
    }
    .slider-track {
      height: $slider-track-height;
      background: $color-highlight-dark;
      border-radius: 0;
      box-shadow: none;
    }
    .slider-selection {
      background: $color-highlight-light;
      border-radius: 0;
      box-shadow: none;
    }

    > .tooltip {
      bottom: 38px;
      font-family: $font-family-sans-serif;
      font-weight: 700;

      transform: scale(0.5);
      transform-origin: bottom;
      transition: opacity 0.15s ease-in-out, transform 0.15s ease-out;

      &.in {
        transform: scale(1);
      }

      > .tooltip-inner {
        background-color: $color-primary;
      }
      > .tooltip-arrow {
        border-top-color: $color-primary;
      }
    }
  }
}
</style>
