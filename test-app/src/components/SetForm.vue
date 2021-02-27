<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Games
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card-text>
            <v-slider
              :label="displayNameUser"
              v-model="numberOfGamesUser"
              :tick-labels="ticksLabels"
              :max="6"
              step="1"
              ticks="always"
              tick-size="7"
            ></v-slider>
          </v-card-text>

          <v-card-text>
            <v-slider
              :label="displayNameOpponent"
              v-model="numberOfGamesOpponent"
              :tick-labels="ticksLabels"
              :max="6"
              step="1"
              ticks="always"
              tick-size="7"
            ></v-slider>
          </v-card-text>
          <v-btn color="primary" @click="e6 = 2">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Winners
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-text-field
            type="number"
            :label="'Winners forehand'"
            v-model="winnersForehand"
          />

          <v-text-field
            type="number"
            :label="'Winners backhand'"
            v-model="winnersBackhand"
          />

          <v-btn color="primary" @click="e6 = 3">
            Continue
          </v-btn>
          <v-btn text>
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          Unforced errors
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-text-field
            type="number"
            :label="'Unforced forehand'"
            v-model="unforcedForehand"
          />
          <v-text-field
            type="number"
            :label="'Unforced backhand'"
            v-model="unforcedBackhand"
          />
          <v-btn color="primary" @click="e6 = 4">
            Continue
          </v-btn>
          <v-btn text>
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">
          Serve
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-text-field type="number" :label="'Aces'" v-model="aces" />
          <v-text-field
            type="number"
            :label="'Double faults'"
            v-model="doubleFaults"
          />
          <v-btn class="mr-4" type="submit">
            submit
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    numberOfGamesUser: null,
    numberOfGamesOpponent: null,
    ticksLabels: [1, 2, 3, 4, 5, 6, 7],
    unforcedForehand: null,
    unforcedBackhand: null,
    aces: null,
    doubleFaults: null,
    winnersForehand: null,
    winnersBackhand: null,
    e6: 1,
  }),
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayNameOpponent: function() {
      return this.activeMatchOpponent.displayName;
    },
    ...mapGetters({
      displayNameUser: "displayName",
    }),
    ...mapGetters("opponents/", ["activeMatchOpponent"]),
  },
  methods: {
    submit: function() {},
  },
};
</script>

<style></style>
