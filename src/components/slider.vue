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
  watch: {
    min(min) {
      $(this.$el).slider('setAttribute', 'min', min);
    },
    max(max) {
      $(this.$el).slider('setAttribute', 'max', max);
    },
    value(value) {
      $(this.$el).slider('setValue', value);
    }
  },
  ready() {
    $(this.$el).slider({
      min: this.min,
      max: this.max,
      value: this.value,
      formatter: this.format === 'duration' ? formatDuration : null
    }).on('change', event => {
      this.value = event.value.newValue;
    });
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

      box-shadow: 0 2px 3px transparentize(black, 0.75);

      &:focus {
        border: $slider-border-size*2 solid $color-primary;
        outline: none;
      }
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

      padding: $tooltip-padding;

      opacity: 0;

      font-family: $font-family-sans-serif;
      font-weight: $tooltip-font-weight;
      font-size: $tooltip-font-size;

      transform: scale(0.8) translateY(50%);
      transform-origin: 50% 100%;
      transition: $tooltip-transition;

      &.in {
        transform: scale(1);
        opacity: 1;
      }

      > .tooltip-inner {
        background-color: $color-primary;
        box-shadow: 0 2px 3px transparentize(black, 0.8);
      }
      > .tooltip-arrow {
        border-top-color: $color-primary;
      }
    }
  }
}
</style>
