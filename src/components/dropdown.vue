<template>
  <div class="dropdown">
    <span class="dropdown__handle"></span>
    <div class="dropdown__items-wrapper">
      <ul class="dropdown__items">
        <li v-for="item in items" class="dropdown__item" @click="onItemClick($index)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    default: () => []
  },
  methods: {
    onItemClick(index) {
      this.$emit('select', index);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

$width: 40px;
$height: $control-height;
$arrow-size: 6px;

.dropdown {
  display: table-cell;
  width: $width;
  height: $height;

  text-align: center;

  > .dropdown__handle {
    content: "";

    position: absolute;
    top: 0.5 * $height - (0.5 * $arrow-size);
    right: 15px;

    width: 0;
    height: 0;

    border-left: $arrow-size solid transparent;
    border-right: $arrow-size solid transparent;
    border-top: $arrow-size solid $color-highlight-dark;

    transition: border-color 0.2s ease-in-out;
  }

  &:hover {
    > .dropdown__handle {
      border-top-color: $color-primary;
    }

    .dropdown__items {
      pointer-events: inherit;
      opacity: 1;
      transform: scale(1) translateY(1px);
    }
  }

  > .dropdown__items-wrapper {
    position: absolute;
    padding-top: $height;
    right: 0;
    z-index: 1;
  }

  .dropdown__items {
    max-width: 250px;
    min-width: 150px;

    padding: 4px 12px;

    list-style: none;

    border: 1px solid $color-highlight-light;
    background-color: white;
    box-shadow: 0px 3px transparentize($color-highlight-light, 0.8);

    pointer-events: none;

    opacity: 0;

    transform: scale(0.5);
    transform-origin: top right;
    transition: opacity .15s .2s ease-in-out, transform .15s .2s ease-in;
    transition-delay: 0.1s;
  }

  .dropdown__item {
    display: block;
    position: relative;

    cursor: pointer;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    font-size: $font-size-small;
    text-align: left;
    line-height: 250%;
    color: $color-text-dark;

    transition: color 0.15s ease-out;

    &:hover {
      color: $color-primary;
    }

    &:not(:first-of-type):before {
      content: "";
      position: absolute;
      top: 0; right: 0; left: 0;
      border-bottom: 1px solid $color-highlight-light;
    }
  }
}

</style>
