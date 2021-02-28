<template>
  <v-data-table
    :headers="headers"
    :items="opponents"
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
        value: "displayName"
      },
      {
        text: "Lefty",
        value: "lefty"
      }
    ]
  }),

  computed: {
    ...mapGetters("opponents/", {
      opponents: "opponents"
    })
  }
};
</script>

<style></style>
