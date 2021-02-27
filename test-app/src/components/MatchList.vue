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
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { REMOVE_MATCHES } from "@/store/modules/matches.js";
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
      { text: "Actions", value: "actions", sortable: false },
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
