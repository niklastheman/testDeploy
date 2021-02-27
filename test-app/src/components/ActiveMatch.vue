<template>
  <div>
    <AppTop :title="'Sets'" />

    <v-btn-toggle>
      <v-btn :disabled="localSets.length <= 0" @click="removeSet">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn :disabled="localSets.length >= 5" @click="addSet">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-tabs v-model="tabs" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="(set, index) in localSets" :key="index">
        Set{{ index + 1 }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="(set, index) in localSets" :key="index">
        <ActiveSet :id="set" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters } from "vuex";
import AppTop from "@/components/AppTop";
import ActiveSet from "@/components/ActiveSet";
import { ADD_SET, SET_SETS } from "@/store/modules/matches.js";
export default {
  components: {
    AppTop,
    ActiveSet,
  },
  created: function() {
    this.localSets = [...this.sets];
  },
  destroyed: function() {
    console.log("unmounted");
    this.$store.commit(SET_SETS, this.localSets);
  },
  data: () => ({
    tabs: 0,
    localSets: [],
  }),
  computed: {
    ...mapGetters("matches/", {
      match: "activeMatch",
      sets: "activeMatchSets",
    }),
  },
  methods: {
    addSet: function() {
      const existing = this.sets[this.localSets.length];

      if (existing) {
        this.localSets.push(existing);
      } else {
        const id = uuidv4();
        this.localSets.push(id);
        this.$store.commit(ADD_SET, id);
      }
    },
    removeSet: function() {
      this.localSets.pop();
    },
  },
};
</script>

<style></style>
