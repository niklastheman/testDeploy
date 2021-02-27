<template>
  <div class="about">
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-container fluid>
          <OpponentList />
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <PlayerForm @submit="onSubmit" />
        </v-container>
      </v-tab-item>
    </v-tabs-items>

    <v-footer app padless>
      <v-tabs v-model="tabs" centered>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab>
          List
        </v-tab>
        <v-tab>
          Add
        </v-tab>
      </v-tabs>
    </v-footer>
  </div>
</template>

<script>
import PlayerForm from "../components/PlayerForm.vue";
import OpponentList from "../components/OpponentList.vue";
export default {
  components: { OpponentList, PlayerForm },
  created: function(){

    if(Object.values(this.$store.state.opponents.opponents).length == 0){

      this.tabs = 1;
    }
  },
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
