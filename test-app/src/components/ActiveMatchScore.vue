<template>
  <div>
    <div class="space-between">
      <p>
        PREVIOUS SETS
      </p>
      <p>
        SETS GAMES POINTS
      </p>
    </div>

    <div class="grid">
      <div v-for="(game, i) in prevGamesWonUser" :key="i">
        <p>
          {{ game }}
        </p>
      </div>
      <div class="center">
        <p>
          {{ displayNameUser }}
        </p>
      </div>
      <div>
        <p>
          {{ setsUser }}
        </p>
      </div>
      <div>
        <p>
          {{ pointsUser }}
        </p>
      </div>
    </div>

    <div class="center"><p>v</p></div>

    <div class="grid">
      <div v-for="(game, i) in prevGamesWonOpponent" :key="i">
        <p>
          {{ game }}
        </p>
      </div>
      <div class="center">
        <p>
          {{ displayNameOpponent }}
        </p>
      </div>
      <div>
        <p>
          {{ setsOpponent }}
        </p>
      </div>
      <div>
        <p>
          {{ pointsOpponent }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
  },
  computed: {
    displayNameOpponent() {
      return this.activeMatchOpponent.displayName;
    },
    ...mapGetters({
      displayNameUser: "displayName",
    }),
    ...mapGetters("opponents/", ["activeMatchOpponent"]),
    ...mapGetters("matches/", {
      score: "activeMatchScore",
    }),
    prevGamesWonUser() {
      return this.prevGamesWon("user");
    },
    prevGamesWonOpponent() {
      return this.prevGamesWon("opponent");
    },
    setsUser() {
      return this.score.user.sets;
    },
    setsOpponent() {
      return this.score.opponent.sets;
    },
    pointsUser() {
      return this.score.user.points;
    },
    pointsOpponent() {
      return this.score.opponent.points;
    },
  },
  methods: {
    prevGamesWon(player) {
      const result = Array(4);

      const games = this.score[player].games;

      for (let i = 0; i < games.length; i++) {
        const gamesWon = games[i];
        result[i] = gamesWon;
      }

      return result;
    },
  },
};
</script>

<style>
.flex {
  display: flex;
}
.center {
  display: flex;
  justify-content: center;
}
.space-between {
  display: flex;
  justify-content: space-between;
}

.grid {
  display: grid;
  min-height: 20px;
  grid-template-columns: repeat(4, 1rem) auto 1rem 1rem 2rem;
}
</style>
