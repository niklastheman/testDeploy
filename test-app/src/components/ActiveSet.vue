<template>
  <div>
    <v-tabs fixed-tabs v-model="tabs">
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

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card flat>
            <ActiveReporting :id="id" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat v-if="tabs == 1">
            <SetForm :id="id" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import SetForm from "@/components/SetForm";
import ActiveReporting from "@/components/ActiveReporting";

export default {
  components: {
    SetForm,
    ActiveReporting,
  },
  data: () => ({
    tabs: 0,
  }),
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
