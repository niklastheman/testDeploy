<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
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
              :max="7"
              step="1"
              ticks="always"
              tick-size="8"
            ></v-slider>
          </v-card-text>

          <v-card-text>
            <v-slider
              :label="displayNameOpponent"
              v-model="numberOfGamesOpponent"
              :tick-labels="ticksLabels"
              :max="7"
              step="1"
              ticks="always"
              tick-size="8"
            ></v-slider>
          </v-card-text>
          <v-btn color="primary" @click="e6 = 2">
            Next
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Winners {{ displayNameUser }} (Me)
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-text-field
            type="number"
            :label="'Forehand'"
            v-model="winnersForehandUser"
          />

          <v-text-field
            type="number"
            :label="'Backhand'"
            v-model="winnersBackhandUser"
          />

          <v-btn color="primary" @click="e6 = 3">
            Next
          </v-btn>
          <v-btn text @click="e6 = 1">
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          Winners {{ displayNameOpponent }}
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-text-field
            type="number"
            :label="'Forehand'"
            v-model="winnersForehandOpponent"
          />

          <v-text-field
            type="number"
            :label="'Backhand'"
            v-model="winnersBackhandOpponent"
          />

          <v-btn color="primary" @click="e6 = 4">
            Next
          </v-btn>
          <v-btn text @click="e6 = 2">
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 4" step="4">
          Unforced errors {{ displayNameUser }} (Me)
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-text-field
            type="number"
            :label="'Unforced forehand'"
            v-model="unforcedForehandUser"
          />
          <v-text-field
            type="number"
            :label="'Unforced backhand'"
            v-model="unforcedBackhandUser"
          />
          <v-btn color="primary" @click="e6 = 5">
            Next
          </v-btn>
          <v-btn text @click="e6 = 3">
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 5" step="5">
          Unforced errors {{ displayNameOpponent }}
        </v-stepper-step>
        <v-stepper-content step="5">
          <v-text-field
            type="number"
            :label="'Unforced forehand'"
            v-model="unforcedForehandOpponent"
          />
          <v-text-field
            type="number"
            :label="'Unforced backhand'"
            v-model="unforcedBackhandOpponent"
          />
          <v-btn color="primary" @click="e6 = 6">
            Next
          </v-btn>
          <v-btn text @click="e6 = 4">
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 6" step="6">
          Serve {{ displayNameUser }} (Me)
        </v-stepper-step>
        <v-stepper-content step="6">
          <v-text-field type="number" :label="'Aces'" v-model="acesUser" />
          <v-text-field
            type="number"
            :label="'Double faults'"
            v-model="doubleFaultsUser"
          />
          <v-btn color="primary" @click="e6 = 7">
            Next
          </v-btn>
          <v-btn text @click="e6 = 5">
            Previous
          </v-btn>
        </v-stepper-content>

        <v-stepper-step step="7">
          Serve {{ displayNameOpponent }}
        </v-stepper-step>
        <v-stepper-content step="7">
          <v-text-field type="number" :label="'Aces'" v-model="acesOpponent" />
          <v-text-field
            type="number"
            :label="'Double faults'"
            v-model="doubleFaultsOpponent"
          />
          <v-btn text @click="e6 = 6">
            Previous
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_GAMES_ACTIVE_MATCH, NAMESPACE } from "@/store/modules/matches.js";
export default {
  created: function() {
    const stats = this.$store.getters[`${NAMESPACE}gameStatsByMatchSetId`](
      this.$store.state.matches.activeMatchId,
      this.id
    );

    for (const key in stats) {
      if (Object.hasOwnProperty.call(stats, key)) {
        const stat = stats[key];
        this.$data[key] = stat;
      }
    }
  },
  destroyed: function() {
    this.saveChanges();
  },
  data: () => ({
    valid: true,
    ticksLabels: [0, 1, 2, 3, 4, 5, 6, 7],
    e6: 1,
    numberOfGamesUser: null,
    numberOfGamesOpponent: null,
    unforcedForehandUser: null,
    unforcedBackhandUser: null,
    unforcedForehandOpponent: null,
    unforcedBackhandOpponent: null,
    acesUser: null,
    doubleFaultsUser: null,
    acesOpponent: null,
    doubleFaultsOpponent: null,
    winnersForehandUser: null,
    winnersBackhandUser: null,
    winnersForehandOpponent: null,
    winnersBackhandOpponent: null,
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
    // onChange: function() {

    //   console.log("hjej")
    //   this.saveChanges();
    // },
    saveChanges: function() {
      const obj = {
        ...this.$data,
      };

      delete obj.valid;
      delete obj.ticksLabels;
      delete obj.e6;

      obj["setId"] = this.id;

      this.$store.dispatch(SET_GAMES_ACTIVE_MATCH, obj);
    },
  },
};
</script>

<style></style>
