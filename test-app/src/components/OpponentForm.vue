<template>
  <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
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

            <v-btn
            class="mr-4"
            @click="submit"
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
    }),
    methods: {

        submit: function() {

            const id = uuidv4();
            const opponent = {

                id: id
                , displayName: this.displayName
                , lefty: this.lefty
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