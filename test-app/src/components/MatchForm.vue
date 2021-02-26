<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-select
        v-model="select"
        :items="opponents"
        :rules="[(v) => !!v || 'Item is required']"
        item-text="displayName"
        item-value="id"
        label="Opponent"
        required
      ></v-select>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <!-- <v-slider
        label="Number of sets played"
        v-model="numberOfSets"
        :tick-labels="ticksLabels"
        :max="4"
        step="1"
        ticks="always"
        tick-size="5"
      ></v-slider> -->

      <v-textarea solo label="Notes"></v-textarea>

      <v-btn class="mr-4" type="submit">
        submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    select: null,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    // numberOfSets: 0,
    // ticksLabels: [1, 2, 3, 4, 5],
  }),
  computed: {
    ...mapState("opponents/",{
      opponents: "opponents",
    }),
  },
  methods: {

    submit: function() {

      
    }

  }
};
</script>

<style></style>
