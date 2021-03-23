<template>
  <div>
    <h2>
      Sets
    </h2>
    <p>{{ displayNameUser }} 1 {{ displayNameOpponent }}: 0</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    console.log(this.sets);
  },
  computed: {
    displayNameOpponent: function() {
      return this.activeMatchOpponent.displayName;
    },
    ...mapGetters({
      displayNameUser: "displayName",
    }),
    ...mapGetters("opponents/", ["activeMatchOpponent"]),
    ...mapGetters("matches/", {
      sets: "activeMatchSetsWithGames",
    }),
  },
};
</script>

<style></style>
