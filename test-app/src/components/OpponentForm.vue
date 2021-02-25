<template>
  <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
            <v-text-field
                v-model="displayName"
                :counter="10"
                label="Name"
                required
            ></v-text-field>

            <v-switch
            v-model="lefty"
            :label="`${switchLabel}`"
            ></v-switch>

            <v-checkbox
            v-model="active"
            label="Player is active?"
            ></v-checkbox>

            <v-btn
            class="mr-4"
            type="submit"
            >
            submit
            </v-btn>
      </v-form>
  </div>
</template>

<script>

import { v4 as uuidv4 } from 'uuid';
import { ADD_OPPONENT } from '@/store/index.js';

export default {
    
    data: () => ({
        valid: true
        , displayName: ''
        , lefty: false
        , active: true
    }),
    methods: {

        submit: function() {

            console.log(this.lefty)
            const id = uuidv4();
            const opponent = {

                id: id
                , displayName: this.displayName
                , lefty: this.lefty
                , active: this.active
            };

            this.$store.dispatch(ADD_OPPONENT, opponent);
            this.$refs.form.reset();
        }
    },
    computed: {
        switchLabel() {

            return this.lefty ? 'Lefty': 'Righty';
        }
    }
}
</script>

<style>

</style>