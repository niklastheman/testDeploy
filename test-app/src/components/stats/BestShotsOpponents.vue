<template>
  <div>
    <p v-for="(shot, i) in bestShots" :key="i">
      <strong>
        {{ shot.displayName }}
      </strong>
      : {{ shot.value }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { pointEndingReasonTypes } from "@/logic/types";
import { addShotTranslation } from "@/logic/propertyTranslate";

export default {
  created() {
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
      const shots = this.shotsSummarized
        .filter(
          (s) =>
            pointEndingReasonTypes.opponentRallyPoint.indexOf(s.key) > -1 ||
            pointEndingReasonTypes.opponentServePoint.indexOf(s.key) > -1
        )
        .slice(0, this.nBestShots);

      addShotTranslation(shots);

      return shots;
    },
  },
};
</script>

<style></style>
