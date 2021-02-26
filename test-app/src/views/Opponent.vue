<template>
  <div class="about">

      <v-tabs v-model="tabs" center-active>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab>
          List
        </v-tab>
        <v-tab>
          Add
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
         <v-tab-item>
           <v-container fluid>
             <opponent-list />
           </v-container>
         </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <player-form />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
  </div>
</template>

<script>
import PlayerForm from '../components/PlayerForm.vue'
import OpponentList from '../components/OpponentList.vue'
export default {
  components: { OpponentList, PlayerForm },
  
  data: () => ({
    tabs: null
  })

}
</script>