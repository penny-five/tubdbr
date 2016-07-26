<template>
  <div></div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap-slider';

import { format } from '../utils/duration';

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
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'number'
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    disabled(disabled) {
      $(this.$el).slider(disabled ? 'disable': 'enable');
      //$(this.$el).slider('relayout');
    },
    min(min) {
      $(this.$el).slider('setAttribute', 'min', min);
      $(this.$el).slider('setValue', this.value);
    },
    max(max) {
      $(this.$el).slider('setAttribute', 'max', max);
      $(this.$el).slider('setValue', this.value);
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
      enabled: !this.disabled,
      formatter: this.format === 'duration' ? format : null
    }).on('change', event => {
      if (!this.lazy) this.value = event.target.value;
    }).on('slideStop', event => {
      if (this.lazy) this.value = event.target.value;
    });
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

$slider-handle-radius: 13px;
$slider-track-height: 1px;
$slider-border-size: 1px;

.slider {

  &.slider-horizontal {
    width: 100%;
    height: $control-height;

    .slider-handle {
      width: 2*$slider-handle-radius;
      height: 2*$slider-handle-radius;

      margin-top: .5*$control-height - $slider-handle-radius;
      margin-left: -$slider-handle-radius;

      background: white;
      border: $slider-border-size solid $color-primary;
      box-shadow: none;

      &:focus {
        border: 2*$slider-border-size solid $color-primary;
        outline: none;
      }
    }

    .slider-track {
      margin-top: 0;

      height: $slider-track-height;
      background: $color-highlight-light;
      border-radius: 0;
      box-shadow: none;
    }

    .slider-track-low {
      &:before {
        content: "";

        position: absolute;
        left: 0;

        width: $slider-handle-radius;
        height: 1px;

        transform: translateX(-$slider-handle-radius);

        background-color: $color-primary;
      }
    }

    .slider-track-high {
      &:after {
        content: "";

        position: absolute;
        right: 0;

        width: $slider-handle-radius;
        height: 1px;

        transform: translateX($slider-handle-radius);

        background-color: $color-highlight-light;
      }
    }

    .slider-selection {
      background: $color-primary;
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

      transform: scale(0.8) translateY(25%);
      transform-origin: 50% 100%;
      transition: $tooltip-transition;

      &.in {
        transform: scale(1);
        opacity: 1;
      }

      > .tooltip-inner {
        min-width: 35px;
        background-color: $color-primary;
        border-radius: 0;
      }

      > .tooltip-arrow {
        border-top-color: $color-primary;
      }
    }

    &.slider-disabled {
      .slider-handle {
        cursor: not-allowed;
        border: $slider-border-size solid $color-highlight-light;
      }

      .slider-selection {
        background: $color-highlight-dark;
      }

      > .tooltip {
        display: none;
      }
    }
  }
}
</style>
