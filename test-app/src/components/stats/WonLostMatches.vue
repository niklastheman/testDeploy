<template>
  <div>
    <p>Won: {{ numberOfMatchesWon }} Lost: {{ numberOfMatchesLost }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("matches/", {
      scoreSummarized: "scoreSummarized",
    }),
    numberOfMatchesWon() {
      return this.scoreSummarized.user.matches;
    },
    numberOfMatchesLost() {
      return this.scoreSummarized.opponent.matches;
    },
  },
};
</script>

<style></style>
