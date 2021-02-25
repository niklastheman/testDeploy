<template>
  <v-app>

     <v-app-bar
        absolute
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

     <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
        <router-link to="/match">
          <v-list-item>
            <v-list-item-title>
              Match
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/opponent">
          <v-list-item>
           <v-list-item-title>
              Opponent
            </v-list-item-title>
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid class="margin-top">

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    drawer: false
  }),
};
</script>

<style>

.margin-top{
  margin-top: 4rem;
}
</style>
