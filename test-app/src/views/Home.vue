<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <AppTop :title="'Matches'" />
          <MatchList />
        </v-col>
        <v-col>
          <AppTop :title="'Sets'" />
          <SetList />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AppTop :title="'Best shots'" />
          <BestShots />
        </v-col>
        <v-col>
          <AppTop :title="'Wors shots'" />
          <WorstShots />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppTop from "../components/AppTop.vue";
import MatchList from "../components/MatchList.vue";
import SetList from "../components/SetList.vue";
import BestShots from "../components/stats/BestShots.vue";
import WorstShots from "../components/stats/WorstShots.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { MatchList, SetList, AppTop, BestShots, WorstShots },
};
</script>
