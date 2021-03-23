<template>
  <div>
    <ActiveMatchScore />
    Active reporting
  </div>
</template>

<script>
import ActiveMatchScore from './ActiveMatchScore.vue';
export default {
  components: { ActiveMatchScore },
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
