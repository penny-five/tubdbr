<template>
  <div class="dropdown">
    <span class="dropdown__handle"></span>
    <ul class="dropdown__items">
      <li v-for="item in items" class="dropdown__item" @click="onItemClick($index)">
        {{ item }}
      </li>
    </ul>
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
$height: $settings-row-height;
$arrow-size: 6px;

.dropdown {
  display: table-cell;
  width: $width;
  height: $height;

  text-align: center;

  > .dropdown__handle {
    content: "";

    position: relative;
    top: 0.5 * ($height + $arrow-size);

    width: 0;
    height: 0;

    border-left: $arrow-size solid transparent;
    border-right: $arrow-size solid transparent;
    border-top: $arrow-size solid $color-highlight-dark;

    transition: border-color 0.2s ease-in-out;
  }

  &:hover {
    > .dropdown__handle {
      border-top-color: $color-highlight-light;
    }

    > .dropdown__items {
      pointer-events: inherit;
      opacity: 1;
      transform: scale(1) translateY(1px);
    }
  }

  > .dropdown__items {
    position: absolute;
    top: $height;
    right: 0;
    z-index: 1;

    max-width: 250px;
    min-width: 150px;

    padding: 4px 12px;

    pointer-events: none;

    opacity: 0;

    list-style: none;

    background-color: $color-highlight-dark;
    box-shadow: 0px 4px 4px transparentize(black, 0.8);

    transform: scale(0.5);
    transform-origin: top right;
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in;
  }

  .dropdown__item {
    display: block;
    position: relative;

    cursor: pointer;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    text-align: left;
    line-height: 250%;
    color: $color-text;

    transition: color 0.2s ease-out;

    &:hover {
      color: $color-primary;
    }

    &:not(:first-of-type):before {
      content: "";
      position: absolute;
      top: 0; right: 0; left: 0;
      border-bottom: 1px solid $color-alt-background;
    }
  }
}

</style>
