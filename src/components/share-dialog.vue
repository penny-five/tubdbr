<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog share-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h3>Jaa dubbaus</h3>
      </div>
      <div class="modal-body">
        <input-field format="text" :value="url" :readonly="true"></input-field>
        <button class="share-dialog__button" :data-clipboard-text="url" v-el:share-button>
          <span class="glyphicon glyphicon-copy" aria-hidden="true"></span>
          {{ isCopied ? 'Kopioitu!' : 'Kopioi leikepöydälle' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import Clipboard from 'clipboard';

import inputField from 'components/input-field';

export default {
  components: {
    inputField
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isCopied: false
    };
  },
  ready() {
    new Clipboard(this.$els.shareButton).on('success', () => {
      this.isCopied = true;
      _.delay(() => {
        $(this.$el).modal('hide');
      }, 800);
    });

    $(this.$el).modal().on('hidden.bs.modal', () => {
      this.$emit('close');
    });
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.share-dialog {

  .modal-content {
    background-color: $color-background;
    border: 1px solid $color-highlight-dark;
  }

  .modal-header {
    padding: 10px 15px;

    border-bottom: 1px solid $color-highlight-dark;

    > h3 {
      margin: 0;
      text-align: center;
      color: $color-text;
      font-size: $font-size-small;
    }

    .close {
      opacity: 1;
      color: $color-highlight-dark;
      text-shadow: none;

      transition: color 0.2s ease-out;

      &:hover {
        color: $color-highlight-light;
      }
      &:focus {
        outline: none;
      }
    }
  }

  .modal-body {
    display: flex;
  }

  .share-dialog__button {
    margin-left: 10px;

    min-height: $control-height;

    white-space: nowrap;

    color: white;
    border: 1px solid $color-highlight-dark;
    background-color: $color-complimentary;
    box-shadow: 0 1px 2px transparentize(black, 0.8);

    transition: background-color .2s ease-in-out, width 1s ease-in-out;

    &:hover {
      background-color: darken($color-complimentary, 8%);
    }
    &:focus {
      outline: none;
    }
    &:active {
      box-shadow: inset 0 1px 2px transparentize(black, 0.6);
    }

    > .glyphicon {
      padding-right: 10px;
    }
  }
}
</style>
