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
import { SET_USER } from '@/store/types.js';
import { ADD_OPPONENT } from '@/store/modules/opponents.js';

export default {
    props: {

        isUser: {
            type: Boolean
            , default: false
        }
    },
    data: () => ({
        valid: true
        , displayName: ''
        , lefty: false
        , active: true
    }),
    methods: {

        submit: function() {
            
            const id = uuidv4();
            const opponent = {

                id: id
                , displayName: this.displayName
                , lefty: this.lefty
            };

            if(this.isUser == false){

                this.$store.dispatch(ADD_OPPONENT, opponent);
            }
            else{

                this.$store.dispatch(SET_USER, opponent);
            }

            this.$refs.form.reset();
        }
    },
    computed: {
        switchLabel: function() {

            return this.lefty ? 'Lefty': 'Righty';
        }
    }
}
</script>

<style>

</style>