<template>
  <div>
    <v-row class="text-center" no-gutters>
      <v-col cols="12">
        <v-card>
          <v-date-picker
            v-model="date"
            full-width
            color="info"
            locale="en-US"
            :min="min_date"
            :max="max_date"
            reactive
            scrollable
          ></v-date-picker>
        </v-card>
        <v-card color="deep-orange" dark>
          <v-card-text class="display-1">{{ date }} - $0.00 </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10), // the format of the date is important!!!
      min_date: "1984-10",
      max_date: new Date().toISOString().substr(0, 10),
    };
  },
  mounted() {
    const aja = new Date().toISOString();
    console.log(aja);
  },
};
</script>
