<template>
  <div>
    <AppTop :title="'Sets'" />
    <v-btn color="error" class="ma-2 white--text" @click="dialogDelete = true">
      Delete
      <v-icon right>
        mdi-beaker-remove
      </v-icon>
    </v-btn>

    <v-card-text>
      <v-slider
        @change="onChange"
        :label="'Number of sets'"
        v-model="numberOfSets"
        :tick-labels="ticksLabels"
        :max="4"
        step="1"
        ticks="always"
        tick-size="5"
      ></v-slider>
    </v-card-text>

    <v-tabs v-model="tabs" show-arrows fixed-tabs>
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

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete this match?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">No!</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >Yes!</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters } from "vuex";
import AppTop from "@/components/AppTop";
import ActiveSet from "@/components/ActiveSet";
import {
  ADD_SET_ACTIVE_MATCH,
  SET_SETS_ACTIVE_MATCH,
  REMOVE_MATCHES,
} from "@/store/modules/matches.js";

export default {
  components: {
    AppTop,
    ActiveSet,
  },
  created: function() {
    this.localSets = [...this.sets];
    this.numberOfSets = this.localSets.length - 1;
  },
  destroyed: function() {
    this.$store.dispatch(SET_SETS_ACTIVE_MATCH, this.localSets);
  },
  data: () => ({
    tabs: 0,
    localSets: [],
    numberOfSets: 0,
    ticksLabels: [1, 2, 3, 4, 5],
    dialogDelete: false,
  }),
  computed: {
    ...mapGetters("matches/", {
      match: "activeMatch",
      sets: "activeMatchSets",
    }),
  },
  methods: {
    onChange: function() {
      const acctualNum = this.numberOfSets + 1;

      while (acctualNum != this.localSets.length) {
        if (acctualNum > this.localSets.length) {
          this.addSet();
        } else {
          this.removeSet();
        }
      }
    },
    addSet: function() {
      const existing = this.sets[this.localSets.length];

      if (existing) {
        this.localSets.push(existing);
      } else {
        const id = uuidv4();
        this.localSets.push(id);
        this.$store.dispatch(ADD_SET_ACTIVE_MATCH, id);
      }
    },
    removeSet: function() {
      this.localSets.pop();
    },

    deleteItemConfirm() {
      this.$store.dispatch(
        REMOVE_MATCHES,
        this.$store.state.matches.activeMatchId
      );
      this.dialogDelete = false;
      this.$emit("deleted");
    },
  },
};
</script>

<style></style>
