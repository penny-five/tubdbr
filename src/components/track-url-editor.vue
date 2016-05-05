<template>
  <input type="text" class="form-control" placeholder="videon id tai url-osoite" v-model="source"></input>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>
