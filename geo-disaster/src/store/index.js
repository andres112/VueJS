import Vue from "vue";
import Vuex from "vuex";
// import localConfig from "@/assets/localConfig.js";
const localConfig = require("@/assets/localConfig.js");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: null,
    locale: "en",
    tasks: [],
    postTaskRun: false,
    projectTutorialStep: 3,
    currentModal: null,
    currentModalProps: {},
    currentModalActive: false,
    bottomNavbar: false,
    postTaskRun: false,
    category: {},
    taskrunInfo: {},
    globalModalProps: {},
    projectTutorial: false,
    project: {},
    currentUser: {},
    projectNavTutorial: console.log,
    showHelpButton: false,
    // FIXME:actions migrated from c3s-lab-client
    loginOptions: {},
    logged: false,
  },
  getters: {
    projectCategory: (state) => {
      if (state.project.hasOwnProperty("id")) {
        return _.find(state.categories, { id: state.project.category_id });
      } else {
        return null;
      }
    },
    currentTask: (state) => {
      if (state.tasks.length) {
        return state.tasks[0];
      } else {
        return {};
      }
    },
  },
  mutations: {
    ADD_CATEGORIES: (state, value) => {
      Vue.set(state, "categories", value);
    },
    ADD_TASK_FIRST: (state, obj) => {
      debugger;
      Vue.set(state.tasks, 0, obj);
    },
    RESET_TUTORIAL_STEP: (state) => {
      state.projectTutorialStep = 1;
    },
    SET_MODAL: (state, value) => {
      state.currentModal = value;
    },
    SET_MODAL_PROPS: (state, value) => {
      state.currentModalProps = value;
    },
    SET_MODAL_ACTIVE: (state, value) => {
      state.currentModalActive = value;
    },
    ADD_TASKS: (state, tasks) => {
      //FIXME: add data manually
      tasks = tasks.map((x) => {
        x.info["media"] = ["https://pbs.twimg.com/media/BgEe0UfIQAAIeKv.jpg"];
        x.info["text"] =
          "the river Anton continues to flood the road, but the drains can't keep up, so a mini swimming pool has been created! http://t.co/gxc9lq3f7B";
        (x.info["type"] = "tweet"),
          (x.info["url"] =
            "www.twitter.com/desdigger/status/433641810951667712");
        x.info["tags"] = [
          // {
          //   api_user: 3,
          //   id: 2484,
          //   name: "CIME_geolocation_geojson",
          //   value: [
          //     '{"type":"Polygon","coordinates":[[[-0.3708072,51.5432702],[-0.3700939,51.5434596],[-0.3695682,51.5434818],[-0.3690943,51.5436151],[-0.3686574,51.5436817],[-0.3682945,51.5436669],[-0.3679981,51.5435685],[-0.3677422,51.5436107],[-0.367525,51.5437487],[-0.3675017,51.5438856],[-0.3671689,51.5438595],[-0.366732,51.5435262],[-0.365655,51.5428877],[-0.3662687,51.5426],[-0.3669231,51.542331],[-0.367537,51.5421578],[-0.3681965,51.5420241],[-0.3687386,51.5419793],[-0.369267,51.5419411],[-0.3696237,51.5419089],[-0.3699163,51.5418404],[-0.370185,51.5422395],[-0.3704728,51.542605],[-0.3707154,51.5428892],[-0.3708072,51.5432702]]]}',
          //   ],
          // },
          {
            name: "CIME_geolocation_centre",
            value: [[47.40279168143903, 8.594684933615401]],
          },
          // {
          //   name: "CIME_geolocation_string",
          //   value: [
          //     "Belvue Park, Rowdell Road, Wood End, Northolt, London Borough of Ealing, London, Greater London, England",
          //   ],
          // }
        ];
        return x;
      });
      var tmp = _.union(state.tasks, tasks);
      state.tasks = tmp;
    },
    DEL_TASK: (state, task) => {
      state.tasks = _.reject(state.tasks, { id: task.id });
    },
    BOTTOM_NAVBAR: (state, value) => {
      state.bottomNavbar = value;
    },
    POST_TASK_RUN: (state, value) => {
      state.postTaskRun = value;
    },
    SET_GLOBAL_MODAL_PROPS: (state, value) => {
      state.globalModalProps = value;
    },
    UPDATE_PROJECT_TUTORIAL: (state, value) => {
      state.projectTutorial = value;
      if (value === false && state.project.hasOwnProperty("short_name")) {
        localStorage.setItem(
          `tutorial${state.project.short_name}Finished`,
          true
        );
      }
    },
    SET_MODAL_ACTIVE: (state, value) => {
      state.currentModalActive = value;
    },
    UPDATE_PROJECT: (state, value) => {
      Vue.set(state, "project", value);
    },
    INCREASE_TUTORIAL_STEP: (state, value) => {
      state.projectTutorialStep += 1;
    },
    SET_NAV_PROJECT_TUTORIAL: (state, value) => {
      state.projectNavTutorial = value;
    },
    UPDATE_SHOW_HELP_BUTTON: (state, value) => {
      state.showHelpButton = value;
    },
    set: (state, obj) => {
      Vue.set(state, obj.key, obj.val);
    },
    // FIXME:actions migrated from c3s-lab-client
    setLoginOptions(state, options) {
      state.loginOptions = options;
    },
    setLogged(state, value = true) {
      state.logged = value;
    },
  },
  actions: {
    async getCategories({ commit }) {
      const data = await fetch(`${localConfig.baseURL}api/category?all=1`);
      const categories = await data.json();
      commit("ADD_CATEGORIES", categories);
    },

    // FIXME:actions migrated from c3s-lab-client
    async getLoginOptions({ commit }) {
      try {
        const data = await fetch(`${localConfig.baseURL}account/signin`, {
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
        });
        const options = await data.json();
        commit("setLoginOptions", options);
        return options;
      } catch (error) {
        console.dir(error);
      }
    },
    signIn({ commit, state, dispatch }) {
      return dispatch("getLoginOptions").then(async (value) => {
        if (value) {
          const userData = {
            email: localConfig.email,
            password: localConfig.password,
            csrf: state.loginOptions.form.csrf,
          };
          try {
            const data = await fetch(`${localConfig.baseURL}account/signin`, {
              method: "POST",
              credentials: "include", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
            const response = await data.json();
            console.dir(response);
            if (
              response.hasOwnProperty("status") &&
              response.status === "success"
            ) {
              commit("setLogged");
            }
            return false;
          } catch (error) {
            console.dir(error);
          }
        }
        return false;
      });
    },

    async signOut({ commit }) {
      const data = await fetch(`${localConfig.baseURL}account/signout`);
      const response = await data.json();
      commit("setLogged", false);
    },
  },
  modules: {},
});
