<template>
  <v-data-table
    :headers="headers"
    :items="matches"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
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
      }
    ],
  }),
  computed: {
    ...mapGetters("matches/", {
      matches: "matches",
    }),
  },
}
</script>

<style>

</style>