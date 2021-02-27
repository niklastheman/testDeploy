<template>
  <div>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-container fluid>
          <MatchList @selected="onSelected" />
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <MatchForm @submit="onSubmit" />
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container v-if="tabs == 2">
          <ActiveMatch />
        </v-container>
      </v-tab-item>
    </v-tabs-items>

    <v-footer app padless>
      <v-tabs v-model="tabs" fixed-tabs>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab>
          <v-icon>mdi-format-list-bulleted</v-icon>
          List
        </v-tab>
        <v-tab>
          <v-icon>mdi-plus</v-icon>
          Add
        </v-tab>
        <v-tab :disabled="!activeMatch">
          <v-icon>mdi-play</v-icon>
          Match
        </v-tab>
      </v-tabs>
    </v-footer>
  </div>
</template>

<script>
import MatchList from "../components/MatchList.vue";
import MatchForm from "../components/MatchForm.vue";
import ActiveMatch from "../components/ActiveMatch.vue";
import { mapGetters } from 'vuex';

export default {
  created: function(){

    if(this.$store.state.matches.matches.length == 0){
      
      this.tabs = 1;
    }
  },
  components: { MatchList, MatchForm, ActiveMatch },
  data: () => ({
    tabs: 0,
  }),
  computed: {

    ...mapGetters("matches/", [
      "activeMatch"
    ])
  },
  methods: {
    
    onSubmit: function(){

      this.tabs = 0;
    },
    onSelected: function(){

      this.tabs = 2;
    }
  }
};
</script>

<style></style>
