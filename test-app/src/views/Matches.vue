<template>
  <div>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-container fluid>
          <MatchList />
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <MatchForm @submit="onSubmit" />
        </v-container>
      </v-tab-item>
    </v-tabs-items>

    <v-footer app padless>
      <v-tabs v-model="tabs" centered>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab>
          <v-icon>mdi-format-list-bulleted</v-icon>
          List
        </v-tab>
        <v-tab>
          <v-icon>mdi-plus</v-icon>
          Add
        </v-tab>
      </v-tabs>
    </v-footer>
  </div>
</template>

<script>
import MatchList from "../components/MatchList.vue";
import MatchForm from "../components/MatchForm.vue";

export default {
  created: function(){

    if(this.$store.state.matches.matches.length == 0){
      
      this.tabs = 1;
    }
  },
  components: { MatchList, MatchForm },
  data: () => ({
    tabs: 0,
  }),

  methods: {
    
    onSubmit: function(){

      this.tabs = 0;
    }
  }
};
</script>

<style></style>
