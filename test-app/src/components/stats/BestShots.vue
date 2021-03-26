<template>
  <div>
    <p v-for="(shot, i) in bestShots" :key="i">
      <strong>
        {{ shot.key }}
      </strong>
      : {{ shot.value }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    console.log(this.shotsSummarized);
    console.log(this.bestShots);
  },
  data() {
    return {
      nBestShots: 3,
    };
  },

  computed: {
    ...mapGetters("matches/", {
      shotsSummarized: "shotsSummarizedArray",
    }),
    bestShots() {
      return this.shotsSummarized.slice(0, this.nBestShots);
    },
  },
};
</script>

<style></style>
