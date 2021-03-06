<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete this match?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">No!</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >Yes!</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="matches"
      :items-per-page="5"
      class="elevation-1"
      @click:row="editItem"
    >
    </v-data-table>
  </div>
</template>

<script>
import { SET_ACTIVE_MATCH, REMOVE_MATCHES } from "@/store/modules/matches.js";
import {
  // UNFORCED_FOREHAND_USER,
  // UNFORCED_BACKHAND_USER,
  // UNFORCED_FOREHAND_OPPONENT,
  // UNFORCED_BACKHAND_OPPONENT,
  ACES_USER,
  // DOUBLE_FAULTS_USER,
  // ACES_OPPONENT,
  // DOUBLE_FAULTS_OPPONENT,
  WINNERS_FOREHAND_USER,
  WINNERS_BACKHAND_USER,
  // WINNERS_FOREHAND_OPPONENT,
  // WINNERS_BACKHAND_OPPONENT,
} from "@/logic/types.js";

import { mapGetters } from "vuex";
export default {
  created: function() {
    console.log(this.matches);
  },
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "displayName",
      },
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Winners forehand",
        value: WINNERS_FOREHAND_USER,
        sortable: false,
      },
      {
        text: "Winners backhand",
        value: WINNERS_BACKHAND_USER,
        sortable: false,
      },
      { text: "Aces", value: ACES_USER, sortable: false },
    ],
    dialogDelete: false,
    editedId: null,
    editedItem: null,
  }),
  computed: {
    ...mapGetters("matches/", {
      matches: "matches",
    }),
  },
  methods: {
    editItem(item) {
      this.$store.commit(SET_ACTIVE_MATCH, item.id);
      this.$emit("selected");
    },
    deleteItem(item) {
      this.editedId = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch(REMOVE_MATCHES, this.editedId);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = null;
        this.editedId = null;
      });
    },
  },
};
</script>

<style></style>
