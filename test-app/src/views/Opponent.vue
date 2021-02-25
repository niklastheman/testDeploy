<template>
  <div class="about">

      <v-tabs v-model="tabs">
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
            <opponent-form />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
  </div>
</template>

<script>
import OpponentForm from '../components/OpponentForm.vue'
import OpponentList from '../components/OpponentList.vue'
export default {
  components: { OpponentList, OpponentForm },
  
  data: () => ({
    tabs: null
  })

}
</script>