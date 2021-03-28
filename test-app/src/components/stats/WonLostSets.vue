<template>
  <div>
    <p>Won: {{ numberOfSetsWon }} Lost: {{ numberOfSetsLost }}</p>
    <!-- <v-switch v-model="includeNotEnded" :label="`Include not ended`"></v-switch> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    console.log(this.scoreSummarized);
  },
  //   data() {
  //     return {
  //       includeNotEnded: true,
  //     };
  //   },

  computed: {
    ...mapGetters("matches/", {
      scoreSummarized: "scoreSummarized",
    }),
    numberOfSetsWon() {
      return this.scoreSummarized.user.sets;
    },
    numberOfSetsLost() {
      return this.scoreSummarized.opponent.sets;
    },
  },
};
</script>

<style></style>
