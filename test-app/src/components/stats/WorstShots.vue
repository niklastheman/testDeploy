<template>
  <div>
    <p v-for="(shot, i) in worsShots" :key="i">
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
    console.log(this.worsShots);
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
    worsShots() {
      return this.shotsSummarized.slice(
        this.shotsSummarized.length - this.nBestShots
      );
    },
  },
};
</script>

<style></style>
