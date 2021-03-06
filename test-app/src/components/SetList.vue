<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sets"
      :items-per-page="5"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import {
  UNFORCED_FOREHAND_USER,
  UNFORCED_BACKHAND_USER,
  ACES_USER,
  DOUBLE_FAULTS_USER,
  WINNERS_FOREHAND_USER,
  WINNERS_BACKHAND_USER,
} from "@/logic/types.js";

import { mapGetters } from "vuex";
export default {
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
      {
        text: "Unforced forehand",
        value: UNFORCED_FOREHAND_USER,
        sortable: false,
      },
      {
        text: "Unforced backhand",
        value: UNFORCED_BACKHAND_USER,
        sortable: false,
      },
      { text: "Aces", value: ACES_USER, sortable: false },
      { text: "Double faults", value: DOUBLE_FAULTS_USER, sortable: false },
    ],
  }),
  computed: {
    ...mapGetters("matches/", {
      sets: "sets",
    }),
  },
};
</script>

<style></style>
