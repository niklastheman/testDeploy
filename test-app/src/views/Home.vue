<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <AppTop :title="'Matches'"/>
          <MatchList />
        </v-col>
        <v-col>
          <AppTop :title="'Sets'"/>
          <SetList />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppTop from '../components/AppTop.vue';
import MatchList from "../components/MatchList.vue";
import SetList from "../components/SetList.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { MatchList, SetList, AppTop },
};
</script>
