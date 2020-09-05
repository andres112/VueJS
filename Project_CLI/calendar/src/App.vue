<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view></router-view>

        <!-- Loader section -->
        <v-dialog v-model="loading.status" hide-overlay persistent width="300">
          <v-card :color="loading.color" dark>
            <v-card-text>
              {{ loading.title }}
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["loading"]),
  },
};
</script>
