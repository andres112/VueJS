const app = new Vue({
  el: "#app",
  data: {
    title: "Hello again",
    time: "",
    interval: "",
    selectedDay: { day: "", busy: 0 },
    timeWarning: false,
    days: [
      { day: "Sonntag", busy: 0 },
      { day: "Montag", busy: 0 },
      { day: "Dienstag", busy: 0 },
      { day: "Mitwoch", busy: 0 },
      { day: "Donnerstag", busy: 0 },
      { day: "Freitag", busy: 0 },
      { day: "Samstag", busy: 0 }
    ]
  },
  methods: {
    getTime() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          let d = new Date();
          this.time = d.toLocaleTimeString();
        }, 1000);
      }
    },
    validateDay(day) {
      let d = new Date();
      return this.days[d.getDay()].day === day;
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    },
    set_busy() {
      if (
        this.days.find(x => x.day === this.selectedDay.day) &&
        this.selectedDay.busy <= 24 &&
        this.selectedDay.busy >= 0
      ) {
        this.days.forEach(day => {
          if (day.day === this.selectedDay.day) {
            day.busy = this.selectedDay.busy;
          }
        });
      }
    },

    getStatusDay(busy) {
      if (busy >= 0 && busy <= 5) {
        return ["text-success", "Ferien :)"];
      }
      if (busy > 5 && busy <= 12) {
        return ["text-warning", "Some busy :|"];
      }
      if (busy > 12) {
        return ["text-danger", "Too busy :("];
      } else {
        return ["text-dark", "Normal"];
      }
    },

    destroy(){
      this.$destroy();
    }
  },
  computed: {
    change_busy() {
      let day = this.days.find(x => x.day === this.selectedDay.day);
      if (day) {
        this.selectedDay.busy = day.busy;
      }
    },
    verifyHours() {
      this.timeWarning = false;
      this.days.forEach(day => {
        if (day.busy < 0) {
          day.busy = 0;
        }
        if (day.busy > 20) {
          this.timeWarning = true;
        }
        if (day.busy > 24) {
          day.busy = 24;
        }
      });
    },
    sumatoryHoursBusy() {
      const HOURS_PER_WEEK = 7 * 24;
      let hours_busy_per_week = this.days.map(x => x.busy).reduce((total, item) => total + item);
      let percentage_hours = Math.round((hours_busy_per_week/HOURS_PER_WEEK) * 100);

      return {
        value: percentage_hours,
        color: {
          "bg-success": percentage_hours <= 25,
          "bg-primary": percentage_hours > 25,
          "bg-warning": percentage_hours > 50,
          "bg-danger": percentage_hours > 75
        }
      };
    }
  },
  beforeCreate() {
    // first method call after the instance creation
  },
  created() {
    // read all the methods and data of the application, but not el
    // Is not posible access to the DOM
  },
  beforeMount() {
    // This is executed before of the DOM inserted 
  },
  mounted() {
    // Is executed when DOM is inserted  
    this.interval = setInterval(() => {
      let d = new Date();
      this.time = d.toLocaleTimeString();
    }, 1000);
  },
  beforeUpdate() {
    // When a change is detected
  },
  updated(){
    // after a change is done
  },
  beforeDestroy() {
    // Before destroy the instance
    console.log("Preparing to kill the instance")
  },
  destroyed() {
    // for detroy the instance
    console.log("The instance is killed")
  },
});
