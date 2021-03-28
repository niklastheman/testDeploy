<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <AppTop :title="'Matches'" />
          <WonLostMatches />
          <MatchList />
        </v-col>
        <v-col>
          <AppTop :title="'Sets'" />
          <WonLostSets />
          <SetList />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AppTop :title="'Best shots'" />
          <BestShotsUser />
        </v-col>
        <v-col>
          <AppTop :title="'Worst shots'" />
          <BestShotsOpponents />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppTop from "../components/AppTop.vue";
import MatchList from "../components/MatchList.vue";
import SetList from "../components/SetList.vue";
import BestShotsUser from "../components/stats/BestShotsUser.vue";
import BestShotsOpponents from "../components/stats/BestShotsOpponents.vue";
import WonLostSets from "../components/stats/WonLostSets.vue";
import WonLostMatches from "../components/stats/WonLostMatches.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    MatchList,
    SetList,
    AppTop,
    BestShotsUser,
    BestShotsOpponents,
    WonLostSets,
    WonLostMatches,
  },
};
</script>
