<template>
  <div>
    <h1 v-if="displayTitle">
      {{ _title }}
    </h1>
    <p v-if="displaySubtitle">
        {{subtitle}}
    </p>
  </div>
</template>

<script>
export default {
  created: function() {

      this.title
  },
  props: {
    displayTitle: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String
      , default: null
    },
    displaySubtitle: {
      type: Boolean,
      default: true,
    },
    subtitle: {
      type: String
      , default: null
    },
  },
  computed: {

      _title: function(){

          return this.title ?? this.$route.name;
      }
  }
};
</script>

<style></style>
