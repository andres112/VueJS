import localConfig from "@/assets/localConfig.js";
import Tutorial from "@/components/tutorial.vue";
import _ from "lodash";

export default {
  components: { Tutorial },
  data() {
    return {
      answers: [],
      title: localConfig.brand,
      meta: {
        hid: "description",
        name: "description",
        content: "My custom description",
      },
    };
  },
  head() {
    return {
      title: this.title,
      meta: [this.meta],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    isAuth() {
      if (this.currentUser.hasOwnProperty("id")) {
        return true;
      } else {
        return false;
      }
    },
    currentTask() {
      return this.$store.getters.currentTask;
    },
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    customSkip() {
      this.$store.commit("DEL_TASK", this.$store.getters.currentTask);
    },
    initializeTutorial() {
      let tutorialStr = `tutorial${this.$route.params.slug}`;
      let tutorialStrFinished = `tutorial${this.$route.params.slug}Finished`;
      if (!localStorage.getItem(tutorialStr)) {
        this.$store.commit("UPDATE_PROJECT_TUTORIAL", true);
        localStorage.setItem(tutorialStr, true);
        localStorage.setItem(tutorialStrFinished, false);
        this.showProjectTutorial();
      } else {
        this.$store.commit("UPDATE_PROJECT_TUTORIAL", false);
      }
      this.$store.commit("SET_NAV_PROJECT_TUTORIAL", this.showProjectTutorial);
      this.$store.commit("UPDATE_SHOW_HELP_BUTTON", true);
    },
    resetAnswers() {
      this.answers = [];
    },
    async signTask(projectShortName, taskId) {
      var url = `${localConfig.baseURL}project/${projectShortName}/task/${taskId}`;
      await fetch(url, {
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    // NOTE: This function is Disabled is not required anymore
    async newTask(projectId, filters, limit = 20, lastId = 0) {
      if (filters.length) {
        for (var filter of filters) {
          var query = "";
          Object.entries(filter).forEach(([key, val]) => {
            if (query === "") {
              query = `${key}::${val}`;
            } else {
              query += `|${key}::${val}`;
            }
          });
          let url = `${localConfig.baseURL}api/task?project_id=${projectId}&info=${query}&fulltextsearch=true&participated=true&limit=${limit}&state=ongoing&orderby=priority_0&desc=true`;
          let tasks_aux = await fetch(url);
          let tasks = await tasks_aux.json();
          this.$store.commit("ADD_TASKS", tasks);
        }
      }
      if (!_.isUndefined(lastId) && _.isInteger(lastId) && lastId > 0) {
        let url = `${localConfig.baseURL}api/task?project_id=${projectId}&all=1&participated=true&limit=2&last_id=${lastId}&state=ongoing&orderby=priority_0&desc=true`;
        let tasks_aux = await fetch(url, {
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
        });
        let tasks = await tasks_aux.json();
        if (!_.isArray(tasks) || tasks.length < 1) {
          url = `${localConfig.baseURL}api/project/${projectId}/newtask?limit=2&orderby=priority_0&desc=true`;
          tasks_aux = await fetch(url, {
            credentials: "include", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
          });
          let tasks = await tasks_aux.json();
          if (!Array.isArray(tasks)) {
            if (tasks.hasOwnProperty("id")) {
              tasks = [tasks];
            } else {
              tasks = [];
            }
          }
        }
        this.$store.commit("ADD_TASKS", tasks);
      } else {
        let offset = this.$store.state.tasks.length;
        let url = `${localConfig.baseURL}api/project/${projectId}/newtask?limit=2&orderby=priority_0&desc=true`;
        let tasks_aux = await fetch(url, {
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
        });
        let tasks = await tasks_aux.json();
        if (!Array.isArray(tasks)) {
          if (tasks.hasOwnProperty("id")) {
            tasks = [tasks];
          } else {
            tasks = [];
          }
        }
        this.$store.commit("ADD_TASKS", tasks);
      }
    },
  },
};
