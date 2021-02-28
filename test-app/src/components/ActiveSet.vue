<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab>
        <v-icon left>
          mdi-play
        </v-icon>
        Active mode
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-pencil
        </v-icon>
        Report
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <ActiveReporting :id="id" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <SetForm :id="id" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import SetForm from "@/components/SetForm";
import ActiveReporting from "@/components/ActiveReporting";

export default {
  components: {
    SetForm,
    ActiveReporting
  },
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
