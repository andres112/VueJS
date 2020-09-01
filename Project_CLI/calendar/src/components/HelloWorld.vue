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
            :first-day-of-week="1"
            reactive
            scrollable
            @change="getDolar()"
          ></v-date-picker>
        </v-card>
        <v-card color="deep-orange" dark>
          <v-card-text class="display-1"
            >{{ cop_value }}COP - {{ clp_value }}CLP
          </v-card-text>
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
      cop_value: null,
      clp_value: null,
    };
  },
  methods: {
    async getDolar() {
      try {
        const date = this.date
          .split("-")
          .reverse()
          .join("-");
        const clp = await this.axios.get(
          `https://mindicador.cl/api/dolar/${date}`
        );        
        const cop = await this.axios.get(
          `https://www.datos.gov.co/resource/32sa-8pi3.json?vigenciadesde=${this.date}`
        );
        console.log(cop);
        // data retrieved from api for CLP
        if (clp.data.serie.length > 0) {
          this.clp_value = clp.data.serie[0].valor;
        } else {
          this.clp_value = "No Data";
        }
        // data retrieved from api for COP
        if (cop.data.length > 0) {
          this.cop_value = cop.data[0].valor;
        } else {
          this.cop_value = "No Data";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getDolar();
  },
};
</script>
