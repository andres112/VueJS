<template>
  <div>
    <!-- b-loading(:active.sync='isLoading')-->
    <!-- <b-modal :active.sync="isModalActive"><img :src="tweetImage" /></b-modal> -->
    <!-- <div
      v-show="$mq === 'sm'"
      v-if="currentTask.hasOwnProperty('id')"
      :class="{ section: $mq === 'sm' }"
      style="color: black; margin-top: 12px; padding: 0px"
    >
      <div
        class="myColumns"
        :class="{ videoMobile: currentTask.info.source === 'youtube' }"
      >
        <div
          style="max-width: 200px; margin-right: 10px"
          v-if="currentTask.hasOwnProperty('info') &amp;&amp; currentTask.info.source !== 'youtube'"
        >
          <figure class="image-container is-clickable mobile-image">
            <img
              @click="toggleModal"
              :src="tweetImage"
              @load="loaded"
              @error="error"
            />
          </figure>
        </div>
        <div v-else>
          <no-ssr>
            <div style="width: 100%; height: 100%">
              <youtube
                :video-id="videoId"
                @ready="ready"
                player-width="100%"
                player-height="auto"
              ></youtube>
            </div>
          </no-ssr>
        </div>
        <div>
          <p class="post-text">{{ currentTask.info.text }}</p>
          <p class="linkMobile">
            <a
              v-if="currentTask.info.source !== 'youtube'"
              target="blank"
              :href="urlOriginalPost"
              ><b-icon icon="file-document" size="is-small"></b-icon>
              {{ $t("geolocation.seeOriginal") }}</a
            ><a v-else target="blank" :href="currentTask.info.url"
              ><b-icon icon="file-document" size="is-small"></b-icon>
              {{ $t("geolocation.seeOriginal") }}</a
            >
          </p>
          <p class="linkMobile">
            <a class="link" target="blank" :href="searchImg"
              ><b-icon icon="camera" size="is-small"></b-icon>
              {{ $t("geolocation.googleReverse") }}</a
            >
          </p>
          <p class="linkMobile">
            <a class="link" target="blank" :href="translate"
              ><b-icon icon="translate" size="is-small"></b-icon>
              {{ $t("geolocation.googleTranslate") }}</a
            >
          </p>
          <comments linkClass="link" wrapperClass="linkMobile"></comments>
        </div>
      </div>
      <div class="mobile-column-questions">
        <div v-show="step&lt;2">
          <div>
            <h2 class="subtitle" v-if="approxLocationOptions.length">
              {{ step }} - {{ $t("geolocation.isItLocatedIn") }}
              {{ approxLocationOptions[0].storeValue }}?
              <h2 v-if="currentTask.info.source !== 'youtube'">
                {{ $t("geolocation.checkToValidate") }}
                <span
                  class="is-clickable"
                  style="color: #2f67df"
                  @click="showTips = true"
                  ><b-icon icon="help-circle-outline"></b-icon>
                  {{ $t("geolocation.tips") }}</span
                >
              </h2>
              <h2 v-else>
                {{ $t("geolocation.checkOriginalLink") }}
                <span
                  class="is-clickable"
                  style="color: #2f67df"
                  @click="showTips = true"
                  ><b-icon icon="help-circle-outline"></b-icon>
                  {{ $t("geolocation.tips") }}</span
                >
              </h2>
              <div class="tipsMobile" :class="{ hidden: !showTips }">
                <h3>{{ $t("geolocation.tipsHeadline") }}</h3>
                <p>{{ $t("geolocation.readTheFullPost") }}</p>
                <p>{{ $t("geolocation.useGoogleImages") }}</p>
                <button
                  class="button is-secondary"
                  style="align-self: flex-end"
                  @click="showTips = false"
                >
                  {{ $t("geolocation.gotIt") }}
                </button>
              </div>
            </h2>
            <options
              ref="optionsApprox"
              key="approxLocation"
              :options="approxLocationOptions"
              :storeValue.sync="approxLocation"
              :active="true"
            ></options>
          </div>
        </div>
        <div v-show="step === 2">
          <div>
            <div style="padding: 0px 10px">
              <h2 style="max-width: 300px">
                {{ step }} - {{ $t("geolocation.locateExactPosition") }}
                <span
                  class="is-clickable"
                  style="color: #2f67df"
                  @click="showTips = true"
                  ><b-icon icon="help-circle-outline"></b-icon>
                  {{ $t("geolocation.tips") }}</span
                >
                <div
                  class="tipsMobile"
                  :class="{ hidden: !showTips }"
                  style="width: 320px; height: 60vh; overflow-y: scroll"
                >
                  <h3>{{ $t("geolocation.tipsHeadline") }}</h3>
                  <p>
                    {{ $t("geolocation.streetview1") }}
                    <b-icon icon="account"></b-icon>
                    {{ $t("geolocation.streetview2") }}
                  </p>
                  <p>{{ $t("geolocation.streetview3") }}</p>
                  <p>{{ $t("geolocation.streetview4") }}</p>
                  <p>{{ $t("geolocation.streetview5") }}</p>
                  <p>{{ $t("geolocation.streetview6") }}</p>
                  <p>{{ $t("geolocation.streetview7") }}</p>
                  <p>{{ $t("geolocation.streetview8") }}</p>
                  <ul>
                    <li>{{ $t("geolocation.streetHigh") }}</li>
                    <li>{{ $t("geolocation.streetMedium") }}</li>
                    <li>{{ $t("geolocation.streetLow") }}</li>
                  </ul>
                  <div style="align-self: flex-end">
                    <button
                      class="button is-secondary"
                      @click="showTips = false"
                    >
                      {{ $t("geolocation.gotIt") }}
                    </button>
                  </div>
                </div>
              </h2>
            </div>
            <div class="control-mobile">
              <gmap-autocomplete
                class="input"
                @place_changed="setPlace"
              ></gmap-autocomplete>
            </div>
            <div class="fill-height-or-more-mobile">
              <gmap-map
                ref="gmap"
                :zoom="zoom"
                :center="latLng"
                style="height: 90%"
                @zoom_changed="zoomChanged"
                :options="mapOptions"
              >
                <gmap-marker
                  ref="marker"
                  @dragend="getMarkerPosition($event.latLng)"
                  :position="latLng"
                  :clickable="step === 2"
                  :draggable="step === 2"
                ></gmap-marker>
                <gmap-polyline
                  v-if="path.length &gt; 0"
                  v-bind:path.sync="path"
                  v-bind:options="{ strokeColor: '#900000' }"
                ></gmap-polyline>
                <gmap-polygon
                  v-if="polygon.length &gt; 0"
                  :paths="polygon"
                  v-bind:options="{
                    strokeColor: '#FF0000',
                    fillColor: '#900000',
                  }"
                ></gmap-polygon>
              </gmap-map>
            </div>
          </div>
        </div>
        <div v-show="step === 3">
          <div class="steps" style="max-width: 450px; padding: 0px 10px">
            <h2>{{ step }} - {{ $t("geolocation.greatPleaseMeasure") }}</h2>
            <options
              ref="optionsPrecision"
              key="precisionLocation"
              :options="mobilePrecisionOptions"
              :overflow="false"
              :storeValue.sync="accuracy"
              :active="true"
            ></options>
          </div>
        </div>
        <div v-show="step === 4">
          <div
            class="steps"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <img
              src="/completed.svg"
              style="padding-left: 20px; height: 145px"
            />
            <h1
              class="title"
              style="font-size: 24px; margin-top: 15px; margin-bottom: 15px"
              v-if="approxLocationOptions.length"
            >
              {{ $t("geolocation.taskCompleted") }}
            </h1>
            <button
              class="button is-secondary"
              :disabled="approxLocation === '' || accuracy === ''"
              @click="saveMarker"
            >
              {{ $t("geolocation.submitAndNext") }}
            </button>
          </div>
        </div>
        <div class="bottom">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <a
                  class="button is-transparent has-text-weight-bold"
                  @click="skip"
                  >{{ $t("actions.skip") }}</a
                >
              </div>
            </div>
            <div class="level-item">
              <div>{{ $t("geolocation.steps", { start: step, end: 4 }) }}</div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button
                  class="button is-secondary"
                  :disabled="step === 1"
                  style="margin-right: 5px"
                  @click="decStep"
                >
                  <b-icon icon="arrow-left"></b-icon>
                </button>
                <button
                  class="button is-secondary"
                  :disabled="step === 4 || approxLocation === ''"
                  @click="incStep"
                >
                  <b-icon icon="arrow-right"></b-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div
      v-if="currentTask.hasOwnProperty('id')"
      style="color: black; margin-top: -20px; padding: 0px"
    >
      <Split direction="horizontal">
        <SplitArea class="column-image" :size="30">
          <section
            v-if="currentTask.hasOwnProperty('id')"
            style="padding: 27px"
          >
            <figure class="image-container is-clickable">
              <img
                v-if="currentTask.hasOwnProperty('info') &amp;&amp; currentTask.info.source !== 'youtube'"
                @click="toggleModal"
                :src="tweetImage"
                @load="loaded"
                @error="error"
              />
              <no-ssr v-else>
                <div style="width: 100%; height: 100%">
                  <youtube
                    :video-id="videoId"
                    @ready="ready"
                    player-width="100%"
                  ></youtube>
                </div>
              </no-ssr>
            </figure>
            <br />
            <p class="post-text">{{ currentTask.info.text }}</p>
            <br /><span class="post-author"
              >{{ currentTask.info.author }} &nbsp;</span
            ><span class="post-handle"
              >{{ tweetHandle }}&nbsp;-@&nbsp;{{
                post_time(currentTask.info.date_created)
              }}</span
            ><br />
            <p class="link" style="margin-top: 10px">
              <a
                v-if="currentTask.info.source !== 'youtube'"
                target="blank"
                :href="urlOriginalPost"
                ><b-icon icon="file-document" size="is-small"></b-icon>
                {{ $t("geolocation.seeOriginal") }}</a
              ><a v-else target="blank" :href="currentTask.info.url"
                ><b-icon icon="file-document" size="is-small"></b-icon>
                {{ $t("geolocation.seeOriginal") }}</a
              >
            </p>
            <p class="link">
              <a class="link" target="blank" :href="searchImg"
                ><b-icon icon="camera" size="is-small"></b-icon>
                {{ $t("geolocation.googleReverse") }}</a
              >
            </p>
            <p class="link">
              <a class="link" target="blank" :href="translate"
                ><b-icon icon="translate" size="is-small"></b-icon>
                {{ $t("geolocation.googleTranslate") }}</a
              >
            </p>
            <comments linkClass="link" wrapperClass="link"></comments>
          </section>
        </SplitArea>
        <SplitArea
          class="is-paddingless column-middle column-questions"
          :size="70"
        >
          <div class="centered" v-show="step&lt;2">
            <div>
              <h1
                class="title"
                style="font-size: 24px; margin: 0; max-width: 425px"
                v-if="approxLocationOptions.length"
              >
                {{ step }} - {{ $t("geolocation.isItLocatedIn") }}
                {{ approxLocationOptions[0].storeValue }}?
              </h1>
              <h2
                class="subtitle"
                v-if="currentTask.info.source !== 'youtube'"
                style="margin-top: 12px; font-size: 16px; position: relative"
              >
                {{ $t("geolocation.checkOriginalImage") }}.
                <span
                  class="is-clickable"
                  style="color: #2f67df"
                  @click="showTips = true"
                  ><b-icon icon="help-circle-outline"></b-icon>
                  {{ $t("geolocation.tips") }}</span
                >
              </h2>
              <h2
                class="subtitle"
                v-else
                style="margin-top: 12px; font-size: 16px; position: relative"
              >
                {{ $t("geolocation.checkOriginalVideo") }}
                <span
                  class="is-clickable"
                  style="color: #2f67df"
                  @click="showTips = true"
                  ><b-icon icon="help-circle-outline"></b-icon>
                  {{ $t("geolocation.tips") }}</span
                >
                <div class="tips" :class="{ hidden: !showTips }">
                  <h3>{{ $t("geolocation.tipsHeadline") }}</h3>
                  <p>{{ $t("geolocation.readTheFullPost") }}</p>
                  <p>{{ $t("geolocation.useGoogleImages") }}</p>
                  <button
                    class="button is-secondary"
                    style="align-self: flex-end"
                    @click="showTips = false"
                  >
                    {{ $t("geolocation.gotIt") }}
                  </button>
                </div>
              </h2>
              <options
                ref="optionsApprox"
                key="approxLocation"
                :options="approxLocationOptions"
                :storeValue.sync="approxLocation"
                :active="true"
              ></options>
            </div>
          </div>
          <div class="centered" v-show="step === 2">
            <div style="width: 100%">
              <div style="padding: 0px 68px">
                <h1 class="title">
                  {{ $t("geolocation.locateExactPositionDesktop") }}
                </h1>
                <h2 class="subtitle" style="position: relative">
                  {{ $t("geolocation.useSearchbox") }}
                  <span
                    class="is-clickable"
                    style="color: #2f67df"
                    @click="showTips = true"
                    ><b-icon icon="help-circle-outline"></b-icon>
                    {{ $t("geolocation.tips") }}</span
                  >
                  <div
                    class="tips"
                    :class="{ hidden: !showTips }"
                    style="width: 500px"
                  >
                    <h3>{{ $t("geolocation.tipsHeadline") }}</h3>
                    <p>
                      {{ $t("geolocation.streetview1Desktop") }}
                      <b-icon icon="account"></b-icon>
                      {{ $t("geolocation.streetview2Desktop") }}
                    </p>
                    <p>{{ $t("geolocation.streetview3Desktop") }}</p>
                    <p>
                      {{ $t("geolocation.streetview4Desktop") }}
                      <b-icon icon="fullscreen"></b-icon>
                    </p>
                    <p>{{ $t("geolocation.streetview5Desktop") }}</p>
                    <p>{{ $t("geolocation.streetview6Desktop") }}</p>
                    <p>{{ $t("geolocation.streetview7Desktop") }}</p>
                    <ul>
                      <li>{{ $t("geolocation.streetHigh") }}</li>
                      <li>{{ $t("geolocation.streetMedium") }}</li>
                      <li>{{ $t("geolocation.streetLow") }}</li>
                    </ul>
                    <button
                      class="button is-secondary"
                      style="align-self: flex-end"
                      @click="showTips = false"
                    >
                      {{ $t("geolocation.gotIt") }}
                    </button>
                  </div>
                </h2>
              </div>
              <div class="control">
                <gmap-autocomplete
                  class="input"
                  @place_changed="setPlace"
                ></gmap-autocomplete>
              </div>
              <Split class="fill-height-or-more" direction="vertical">
                <SplitArea :size="80">
                  <gmap-map
                    ref="gmap"
                    :zoom="zoom"
                    :center="latLng"
                    style="width: 100%; height: 100%"
                    @zoom_changed="zoomChanged"
                  >
                    <gmap-marker
                      ref="marker"
                      @dragend="getMarkerPosition($event.latLng)"
                      :position="latLng"
                      :clickable="step === 2"
                      :draggable="step === 2"
                    ></gmap-marker>
                    <gmap-polyline
                      v-if="path.length &gt; 0"
                      v-bind:path.sync="path"
                      v-bind:options="{ strokeColor: '#900000' }"
                    ></gmap-polyline>
                    <gmap-polygon
                      v-if="polygon.length &gt; 0"
                      :paths="polygon"
                      v-bind:options="{
                        strokeColor: '#FF0000',
                        fillColor: '#900000',
                      }"
                    ></gmap-polygon>
                  </gmap-map>
                </SplitArea>
                <SplitArea :size="20">
                  <gmap-map
                    v-show="streetViewEnabled"
                    ref="gmap2"
                    :zoom="zoom"
                    :center="latLng"
                    style="width: 100%; height: 100%"
                    @zoom_changed="zoomChanged"
                    :options="{ streetViewControl: false }"
                  >
                    <gmap-marker
                      ref="marker2"
                      @dragend="getMarkerPosition($event.latLng)"
                      :position="latLng"
                      :clickable="step === 2"
                      :draggable="step === 2"
                    ></gmap-marker>
                    <gmap-polyline
                      v-if="path.length &gt; 0"
                      v-bind:path.sync="path"
                      v-bind:options="{ strokeColor: '#900000' }"
                    ></gmap-polyline>
                    <gmap-polygon
                      v-if="polygon.length &gt; 0"
                      :paths="polygon"
                      v-bind:options="{
                        strokeColor: '#FF0000',
                        fillColor: '#900000',
                      }"
                    ></gmap-polygon>
                  </gmap-map>
                </SplitArea>
              </Split>
            </div>
          </div>
          <div class="centered" v-show="step === 3">
            <div class="steps" style="max-width: 450px">
              <h1
                class="title"
                style="font-size: 24px; margin: 0"
                v-if="approxLocationOptions.length"
              >
                {{ step }} - {{ $t("geolocation.greatPleaseMeasure") }}
              </h1>
              <options
                ref="optionsPrecision"
                key="precisionLocation"
                :options="precisionOptions"
                :overflow="false"
                :storeValue.sync="accuracy"
                :active="true"
              ></options>
            </div>
          </div>
          <div class="centered" v-show="step === 4">
            <div
              class="steps"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <img src="/completed.svg" style="padding-left: 20px" />
              <h1
                class="title"
                style="font-size: 24px; margin-top: 15px; margin-bottom: 15px"
                v-if="approxLocationOptions.length"
              >
                {{ $t("geolocation.taskCompleted") }}
              </h1>
              <button
                class="button is-secondary"
                :disabled="approxLocation === '' || accuracy === ''"
                @click="saveMarker"
              >
                {{ $t("geolocation.submitAndNext") }}
              </button>
            </div>
          </div>
          <div class="bottom">
            <div class="level">
              <div class="level-item">
                <a
                  class="button is-transparent has-text-weight-bold"
                  @click="skip"
                  >{{ $t("actions.skip") }}</a
                >
              </div>
              <div
                class="level-item square"
                :class="{ completed: step === 1 }"
              ></div>
              <div
                class="level-item square"
                :class="{ completed: step === 2 }"
              ></div>
              <div
                class="level-item square"
                :class="{ completed: step === 3 }"
              ></div>
              <div
                class="level-item square"
                :class="{ completed: step === 4 }"
              ></div>
              <div class="level-item">
                <div>
                  {{ $t("geolocation.steps", { start: step, end: 4 }) }}
                </div>
              </div>
              <div class="level-item">
                <button
                  class="button is-secondary"
                  :disabled="step === 1"
                  style="margin-right: 5px"
                  @click="decStep"
                >
                  <b-icon icon="arrow-left"></b-icon>
                </button>
                <button
                  class="button is-secondary"
                  :disabled="step === 4 || approxLocation === ''"
                  @click="incStep"
                >
                  <b-icon icon="arrow-right"></b-icon>
                </button>
              </div>
            </div>
          </div>
        </SplitArea>
      </Split>
    </div>
  </div>
</template>

<script>
import Onboarding from "@/components/onboardingvariant.vue";
import Carrousel from "@/components/carrousel.vue";
import basic from "@/mixins/basic.js";
import moment from "moment";
// import Button from '@/components/BottomButton.vue'
import options from "@/components/optionlist.vue";
import _ from "lodash";
import comments from "@/components/comments.vue";
import localConfig from "@/assets/localConfig.js";

const ZOOMMIN = 5;
const ZOOMMAX = 14;
export default {
  mixins: [basic],
  components: { options, Onboarding, Carrousel, comments },
  data() {
    return {
      badJson: false,
      showTips: false,
      showFirstTutorial: false,
      tweetActiveImg: 0,
      step: 1,
      isLoading: true,
      isModalActive: false,
      showTutorial: false,
      searchLatLng: null,
      streetViewEnabled: false,
      markerLatLng: null,
      zoom: ZOOMMIN,
      path: [],
      polygon: [],
      accuracy: "",
      approxLocation: "",
      precisionLocation: "",
      approxLocationOptions: [],
      canProvideMoreAccurate: "",
      mapOptions: {
        zoomControl: true,
        streetViewControl: true,
        fullScreenControl: true,
      },
    };
  },
  async mounted() {
    await this.signTask(this.$route.params.slug, this.$route.params.id);
    // this.$store.commit("set", { key: "navBarColor", val: "is-secondary" });
    let step = `step${this.step}`;
    if (this.tasks.length > 0) {
      this.initializeTutorial();
    } else {
      this.isLoading = false;
    }
    this.$store.commit("set", {
      key: "projectNavTutorial",
      val: this.showProjectTutorial,
    });
  },
  async created() {
    if (this.currentTask.hasOwnProperty("id") === false) {
      var url = `${localConfig.baseURL}api/task/${this.$route.params.id}`;
      var task_aux = await fetch(url, {
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
      });
      let task = await task_aux.json();
      url = `${localConfig.baseURL}api/project?short_name=${this.$route.params.slug}`;
      var project_aux = await fetch(url, {
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
      });

      let project = await project_aux.json();
      if (project.length && project[0].id === task.project_id) {
        this.$store.commit("ADD_TASKS", [task]);
      } else {
        this.$router.push("/404");
      }
    }
    this.project_id = this.currentTask.project_id;
  },
  computed: {
    mobilePrecisionOptions() {
      return [
        {
          activationKey: "a",
          storeValue: "high",
          text: this.$t("geolocation.high"),
        },
        {
          activationKey: "b",
          storeValue: "medium",
          text: this.$t("geolocation.medium"),
        },
        {
          activationKey: "c",
          storeValue: "low",
          text: this.$t("geolocation.low"),
        },
      ];
    },

    precisionOptions() {
      return [
        {
          activationKey: "a",
          storeValue: "high",
          text: this.$t("geolocation.high"),
          extra: this.$t("geolocation.highExtra"),
        },
        {
          activationKey: "b",
          storeValue: "medium",
          text: this.$t("geolocation.medium"),
          extra: this.$t("geolocation.mediumExtra"),
        },
        {
          activationKey: "c",
          storeValue: "low",
          text: this.$t("geolocation.low"),
          extra: this.$t("geolocation.lowExtra"),
        },
      ];
    },
    canProvideMoreAccurateOptions() {
      return [
        {
          activationKey: "a",
          storeValue: "yes",
          text: this.$t("geolocation.yes"),
        },
        {
          activationKey: "b",
          storeValue: "no",
          text: this.$t("geolocation.no"),
        },
      ];
    },
    videoId() {
      if (
        this.currentTask.hasOwnProperty("info") &&
        this.currentTask.info.source === "youtube"
      ) {
        return this.$youtube.getIdFromURL(this.currentTask.info.url);
      } else {
        return "";
      }
    },
    urlOriginalPost() {
      return `https://${this.currentTask.info.url}`;
    },
    searchImg() {
      return `https://www.google.com/searchbyimage?image_url=${this.tweetImage}`;
    },
    translate() {
      return `https://translate.google.com/#auto/${this.$store.state.locale}/${this.currentTask.info.text}`;
    },
    postTaskrun() {
      return this.$store.state.postTaskRun;
    },
    tweetHandle() {
      let handle = "";
      if (
        this.currentTask !== undefined &&
        this.currentTask.hasOwnProperty("info")
      ) {
        if (this.currentTask.info.hasOwnProperty("author_screen_name")) {
          return this.currentTask.info.author_screen_name;
        } else if (this.currentTask.info.hasOwnProperty("url")) {
          let regex =
            /^(http)?s?(:\/\/)?(www\.)?twitter\.com\/(#!\/)?([^\/]+)(\/\w+)*$/g;
          let match = regex.exec(this.currentTask.info.url);
          if (match !== null && !_.isUndefined(match[5])) {
            return "@" + match[5];
          }
        }
      }
      return "";
    },
    tweetImage() {
      let broken = `/broken-img-icon.svg?id=${this.currentTask.id}`;
      if (
        this.currentTask !== undefined &&
        this.currentTask.hasOwnProperty("info")
      ) {
        let url = this.currentTask.info.media[this.tweetActiveImg] || broken;
        url = url.replace(/^http:\/\//i, "https://");
        return url;
      } else {
        return broken;
      }
    },
    hasEntities() {
      if (this.currentTask.hasOwnProperty("id")) {
        return this.currentTask.info.hasOwnProperty("entities");
      } else {
        return false;
      }
    },
    hasMedia() {
      if (this.currentTask.info.media.length) {
        return true;
      } else {
        return false;
      }
    },
    nMedia() {
      if (this.hasMedia) {
        return this.currentTask.info.media.length;
      } else {
        return 0;
      }
    },
    latLng() {
      if (this.searchLatLng != null) {
        return this.searchLatLng;
      }
      if (this.currentTask.info) {
        let locationEncoded = _.filter(this.currentTask.info.tags, {
          name: "CIME_geolocation_centre",
        });
        return this.getLatLng(locationEncoded);
      }
    },
  },
  methods: {
    getLatLng(locationEncoded) {
      let newLat;
      let newLng;
      if (locationEncoded.length === 1) {
        locationEncoded = locationEncoded[0].value;
        try {
          // let location = JSON.parse(locationEncoded);
          let location = locationEncoded;
          console.log("******************", location);
          newLat = location[0][0];
          newLng = location[0][1];
        } catch (err) {
          newLat = 0;
          newLng = 0;
          let location = JSON.parse(locationEncoded.replace(/\\/g, ""));
          newLat = parseFloat(location[0][0].replace(",", "."));
          newLng = parseFloat(location[0][1].replace(",", "."));
          console.warn(
            "ERROR: JSON parse of location failed for task",
            this.currentTask.id
          );
          console.warn(
            `Check task for more details https://e2mcadmin.pybossa.com/api/task/${this.currentTask.id}`
          );
          console.warn(err.message);
        }
      } else {
        newLat = this.currentTask.info.latitude;
        newLng = this.currentTask.info.longitude;
      }
      return { lat: newLat, lng: newLng };
    },
    ready() {
      this.isLoading = false;
      this.loaded();
    },
    zoomChanged(level) {
      console.log("Zoom:" + level);
      if (level < ZOOMMIN) {
        this.zoom = ZOOMMIN;
      }
      // info: use ZOOMMAX + 1 because we cannot set for unknown reasons same zoom level twice (as on init) :/
      if (level > ZOOMMAX + 1) {
        this.zoom = ZOOMMAX + 1;
      }
    },
    showProjectTutorial() {
      this.$store.commit("RESET_TUTORIAL_STEP");
      this.$store.commit("SET_MODAL", Onboarding);

      let carousel = [
        {
          html: `<img src="/tutorial/step0.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Kindly Validate the suggested location of the image.</h1><div class="text"><p>Is this image is located in Rieti, Lazio? Please read the text and confirm</p></div>`,
        },
        {
          html: `<img src="/tutorial/step1.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Tips</h1><div class="text"><p>Read the text under the image, including links. (Original Tweet and Google Image Search ) See if the location of the picture is mentioned.<p>‘Original Post’ and ‘Google Image Search’ will provide you clues of where the image has been taken</p></div>`,
        },
        {
          html: `<img src="/tutorial/step2.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Locate the position of the damage on the map as precisely as possible</h1><div class="text"><p>Use Google Street View , Google Image Search or the Google Explore.</p></div>`,
        },
        {
          html: `<img src="/tutorial/step1.1.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Tips</h1><div class="text"><p><strong>In the text</strong>: look for specific cues in the information associated with the image. Look for <em>reference points</em> like landmarks, Road,</p><p><strong>In the picture:</strong> look for visual cues in the image, ie.prominent land mark, (bridges, towers, shops, building elements..etc.,) Try to search with any given cues in the google map (map view). Look also in the “satellite view” or street view. You can navigate the map full screen to facilitate the search.</p></div>`,
        },
        {
          html: `<img src="/tutorial/step3.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Save location</h1><div class="text"><p>Enter the location of the given place, move the pin in the map until you find the place. Then click the next (arrow) button. </p>`,
        },
        {
          html: `<img src="/tutorial/step5.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Be as precise as you can</h1><div class="text"><p>There are 3 levels of precision: <p><strong>High</strong> (at the level of building or the exact point of which the picture is taken</p><p><strong>Medium</strong> (street or road level)</p><p><strong>Low</strong> (town or neighbourhood level)</p></div>`,
        },
        {
          html: `<img src="/tutorial/step6.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">Submit and check the next task</h1>`,
        },
        {
          html: `<img src="/tutorial/step7.png" style="max-height:430px;"/><h1 class="title is-5" style="margin-top:1.5rem;">You can always go back!</h1><div class="text"><p>At any given point you can bo back to a particular step or you can skip the task.</p></div>`,
        },
      ];

      this.$store.commit("SET_MODAL_PROPS", {
        customClass: "is-secondary",
        img: "/geolocation-tutorial-small.svg",
        title: this.$t("geolocation.modalTitle"),
        subtitle: this.$t("geolocation.modalSubtitle"),
        carrousel: carousel,
      });
      this.$store.commit("SET_MODAL_ACTIVE", true);
    },
    getMarkerPosition(latlng) {
      console.log(latlng.lat());
      console.log(latlng.lng());
      this.markerLatLng = { lat: latlng.lat(), lng: latlng.lng() };
      this.$refs.marker.$markerObject.setPosition(this.markerLatLng);
      this.$refs.marker2.$markerObject.setPosition(this.markerLatLng);
    },
    setPlace(place) {
      if (place != null) {
        this.markerLatLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.searchLatLng = place.geometry.location;
      }
    },
    decStep() {
      if (this.step === 2) {
        this.canProvideMoreAccurate = "";
        // this.$refs.optionsMoreAccurate.clear()
      }
      if (this.step > 1) {
        this.step--;
      }
    },
    incStep(event) {
      if (!_.isUndefined(event) && event.target.attributes.disabled) {
        return;
      }
      if (!this.isLoading && this.step < 5) {
        this.step++;
      }
    },
    async loaded() {
      // polygon
      console.log("loaded called");
      if (
        typeof this.currentTask.info !== "undefined" &&
        typeof this.currentTask.info.tags !== "undefined" &&
        this.currentTask.info.tags.length > 0
      ) {
        for (let tag of this.currentTask.info.tags) {
          if (tag.name === "CIME_geolocation_geojson") {
            let polygonEncoded = tag.value || '["unkown"]';
            let polygons = JSON.parse(polygonEncoded) || "unknown";
            // TODO: multi polygons
            let polygon0 = JSON.parse(polygons[0]) || "unknown";
            this.path = [];
            this.polygon = [];
            if (polygon0 !== "unknown") {
              if (polygon0 === "Point") {
                this.path.push(polygon0.coordinates);
              }
              if (polygon0.type === "LineString") {
                for (let coordinate of polygon0.coordinates) {
                  let gmapCoordinate = {
                    lat: coordinate[1],
                    lng: coordinate[0],
                  };
                  this.path.push(gmapCoordinate);
                }
              } else if (polygon0.type === "Polygon") {
                this.polygon = polygon0.coordinates.map((linearRing) =>
                  linearRing
                    .slice(0, linearRing.length - 1)
                    .map(([lng, lat]) => ({
                      lat,
                      lng,
                    }))
                );
              }
            }
            break;
          }
        }

        // fit google maps to bounds
        let bounds = new google.maps.LatLngBounds();
        for (let point of this.path) {
          bounds.extend(new google.maps.LatLng(point.lat, point.lng));
        }
        for (let polygon of this.polygon) {
          for (let point of polygon) {
            bounds.extend(new google.maps.LatLng(point.lat, point.lng));
          }
        }
        if (this.markerLatLng != null) {
          bounds.extend(
            new google.maps.LatLng(this.markerLatLng.lat, this.markerLatLng.lng)
          );
        } else {
          bounds.extend(
            new google.maps.LatLng(this.latLng["lat"], this.latLng["lng"])
          );
        }

        if (!_.isUndefined(this.$refs.gmap)) {
          let self = this;
          self.$refs.gmap.$mapPromise.then((map) => {
            console.log("NEW BOUNDS!");
            let pn = map.getStreetView();
            map.fitBounds(bounds);

            pn.addListener("position_changed", function () {
              let streetvpos = pn.getPosition();
              console.log(streetvpos.lat(), streetvpos.lng());
              self.getMarkerPosition(streetvpos);
            });

            pn.addListener("visible_changed", function () {
              console.log("streetview listo");
              if (pn.getVisible()) {
                self.streetViewEnabled = true;
              } else {
                self.streetViewEnabled = false;
              }
            });
          });
        }

        if (this.path.length + this.polygon.length === 0) {
          this.zoom = ZOOMMAX;
        }
      }
      this.canProvideMoreAccurate = "";
      await this.getAllApproxLocationOptions();
      this.isLoading = false;
    },
    async error() {
      await this.loaded();
    },
    async skip() {
      this.markerLatLng = null;
      this.searchLatLng = null;
      this.isLoading = true;
      this.$store.commit("DEL_TASK", this.currentTask);
      if (this.isModalActive) {
        this.isModalActive = false;
      }
      this.step = 1;
      this.approxLocation = "";
      this.approxLocationOptions = [];
      this.accuracy = "";
      this.$refs.optionsApprox.clear();
      if (this.$refs.hasOwnProperty("optionsPrecision")) {
        this.$refs.optionsPrecision.clear();
      }
      await this.loaded();
    },
    toggleModal() {
      this.isModalActive = !this.isModalActive;
      // if (this.isModalActive && this.$mq === "sm") {
      //   this.$store.commit("BOTTOM_NAVBAR", false);
      // }
      // if (this.isModalActive === false && this.$mq === "sm") {
      //   this.$store.commit("BOTTOM_NAVBAR", true);
      // }
    },
    post_time(val) {
      return moment(val).format("MMM D");
    },
    async getReverseGeo(obj) {
      if (obj.length) {
        let tmp = [];
        try {
          // tmp = JSON.parse(obj[0].value);
          tmp = obj[0].value;
        } catch (err) {
          tmp = JSON.parse(obj[0].value.replace(/\\/g, ""));
          tmp[0][0] = parseFloat(tmp[0][0].replace(",", "."));
          tmp[0][1] = parseFloat(tmp[0][1].replace(",", "."));
        }
        if (tmp.length) {
          let lat = tmp[0][0];
          let lng = tmp[0][1];
          let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
          let data_aux = await fetch(url);
          const data = await data_aux.json();
          if (data.hasOwnProperty("address")) {
            return data.address;
          }
        }
      }
    },
    async fixNoCIME() {
      let address = await this.getReverseGeo(
        _.filter(this.currentTask.info.tags, {
          name: "CIME_geolocation_centre",
        })
      );
      if (address.hasOwnProperty("village")) {
        return address.village;
      } else if (address.hasOwnProperty("state")) {
        return address.state;
      } else {
        return "Pin is correct";
      }
    },
    async getAllApproxLocationOptions() {
      let locations = [];

      // search for CIME_geolocation_string places
      if (
        typeof this.currentTask.info !== "undefined" &&
        typeof this.currentTask.info.tags !== "undefined"
      ) {
        for (let tag of this.currentTask.info.tags) {
          if (tag.name === "CIME_geolocation_string") {
            if (tag.value === "") {
              locations.push(await this.fixNoCIME());
            } else {
              let locationEncoded =
                tag.value || `'["${await this.fixNoCIME()}"]'`;
              let locationParsed = await this.fixNoCIME();
              try {
                // locationParsed = JSON.parse(locationEncoded);
                locationParsed = locationEncoded;
              } catch (err) {
                locationParsed = JSON.parse(locationEncoded.replace(/\\/g, ""));
              }
              if (locationParsed !== "Pin is correct") {
                locations = locationParsed;
              }
            }
            break;
          }
        }
      }
      // use info.place as fallback if no CIME_geolocation_string
      if (locations.length < 1) {
        if (this.currentTask.info.place) {
          if (this.currentTask.info.place === "") {
            locations.push(await this.fixNoCIME());
          } else {
            locations.push(this.currentTask.info.place) ||
              (await this.fixNoCIME());
          }
        } else {
          locations.push(await this.fixNoCIME());
        }
      }

      // create approxLocationOptions
      let i, location;
      this.approxLocationOptions = [];
      this.approxLocation = "";
      for ([i, location] of locations.entries()) {
        this.approxLocationOptions.push({
          activationKey: String.fromCharCode("a".charCodeAt() + i),
          storeValue: locations[i],
          text: locations[i],
        });
      }
      this.approxLocationOptions.push({
        activationKey: String.fromCharCode("a".charCodeAt() + i + 1),
        storeValue: "Another location",
        text: "Another location",
      });
      if (this.approxLocationOptions.length === 2) {
        this.approxLocationOptions[0].text = this.$t("geolocation.yes");
        this.approxLocationOptions[1].text = this.$t("geolocation.no");
      }
    },
    saveMarker() {
      if (this.markerLatLng != null) {
        this.save(this.markerLatLng.lat, this.markerLatLng.lng);
      } else {
        this.save(this.latLng["lat"], this.latLng["lng"]);
      }
    },
    async save(lat, lng) {
      this.isLoading = true;
      var url = `${localConfig.baseURL}api/taskrun`;
      var infoData = {
        approxLocation: this.approxLocation,
        accuracy: this.accuracy,
        locationPin: {
          lat: lat,
          lng: lng,
        },
      };
      console.log(infoData);
      var taskrun = {
        project_id: this.currentTask.project_id,
        task_id: this.currentTask.id,
        info: infoData,
      };
      var slug = this.$route.params.slug;
      await this.signTask(this.$route.params.slug, this.currentTask.id);
      let res = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskrun), // body data type must match "Content-Type" header
      });
      if (res.task_id === this.currentTask.id) {
        this.isSaving = false;
        this.$store.commit("DEL_TASK", this.currentTask);
        this.$store.commit("POST_TASK_RUN", false);
        if (this.tasks.length) {
          this.$route.params.id = this.currentTask.id;
          this.$router.push({
            name: "project-slug-task-id",
            params: { slug: slug, id: this.currentTask.id },
          });
        } else {
          this.isLoading = false;
        }
      }
    },
  },
  watch: {
    latLng() {
      if (this.latLng.lat === 0 && this.latLng.lng === 0) {
        this.step = 2;
      }
    },
    tasks() {
      if (this.tasks.length > 0) {
        this.initializeTutorial();
      }
    },

    videoId() {
      if (this.videoID !== "") {
        this.isLoading = false;
      }
    },

    approxLocation() {
      // this.incStep()
    },
    // currentTask() {
    //   if (this.currentTask.hasOwnProperty("id")) {
    //     let url = `/project/${this.$route.params.slug}/task/${this.currentTask.id}`;
    //     history.pushState({}, "Title", url);
    //   } else {
    //     let url = `/project/${this.$route.params.slug}/task/0`;
    //     history.pushState({}, "Title", url);
    //   }
    // },
    isModalActive(newVal) {
      // if (this.isModalActive && this.$mq === "sm") {
      //   this.$store.commit("BOTTOM_NAVBAR", false);
      // }
      // if (this.isModalActive === false && this.$mq === "sm") {
      //   this.$store.commit("BOTTOM_NAVBAR", true);
      // }
    },
    tasks() {
      if (this.tasks.length > 0 && this.tasks.length <= 5) {
        this.newTask(this.project_id, [], 2, this.currentTask.id);
      }
    },
    // $mq (newVal) {
    //   if (newVal) {
    //     this.$store.commit('BOTTOM_NAVBAR', true)
    //   } else {
    //     this.$store.commit('BOTTOM_NAVBAR', false)
    //   }
    // },
    postTaskrun(newVal) {
      if (newVal) {
        this.save(this.$store.state.taskrunInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$color-post: #021f27;

.gray {
  background-color: #f8f8f8;
}

@mixin post-font($weight: normal) {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: $weight;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: $color-post;
}

.post-text {
  @include post-font();
  min-height: 75px;
}

.post-author {
  @include post-font(600);
  height: 25px;
  text-align: left;
}

.post-handle {
  height: 25px;
  opacity: 0.5;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: rgb(2, 31, 39);
}

.post-details {
  height: 23px;
  opacity: 0.5;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
}

.image-container {
  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-container > img {
  height: auto;
  max-height: 50vh;
  border-radius: 10px;
}

.mobile-image > img {
  max-height: 100%;
  max-width: auto;
  border-radius: 10px;
}

.fill-height-or-more {
  height: calc(100vh - 330px);
}

.fill-height-or-more-mobile {
  height: calc(100vh - 430px);
}

.column-image {
  z-index: 1;
}

.column-questions {
  background-color: #fcf7ea;
  width: 100%;
  height: calc(100vh - 64px);
  // z-index: -1;
}

.mobile-column-questions {
  background-color: #fcf7ea;
  width: 100%;
  height: calc(100vh - 185px);
  // z-index: -1;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  margin-top: 13px;
}

.btn-where {
  margin-top: 20px;
  margin-bottom: 12px;
}

.hero.is-geolocation {
  background-color: #e9a751;
}

// .column > .hero.is-fullheight {
//   min-height: calc(100vh - (40px));
//   max-height: calc(100vh - (40px));
//   height: calc(100vh - (40px));
//     display: flex;
//     flex-direction: row;
//     justify-content: stretch;
// }

.pybossa-options {
  overflow-y: visible !important;
}

.notyet {
  display: none;
  visibility: hidden;
}

.link,
.linkMobile {
  margin-bottom: 8px;
  a {
    color: #2f67df;
    font-size: 16px;
  }
}

.linkMobile {
  a {
    font-size: 13px;
  }
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  flex-direction: column;
  height: calc(100% - 50px);
  .steps {
    height: calc(100% - 145px);
  }
}

.centered-mobile {
  display: flex;
  justify-content: top;
  align-items: center;
  align-content: center;
  justify-items: center;
  flex-direction: column;
  height: calc(100% - 45px);
  .steps {
    height: calc(100% - 145px);
  }
  padding-left: 6px;
  padding-right: 6px;
}

.square.completed {
  background-color: #dfa72f;
}

.square {
  background-color: rgba(223, 167, 47, 0.4);
  content: " ";
  width: 100px;
  height: 12px;
  margin-right: 2px;
}
.bottom {
  padding-left: 10px;
  padding-right: 10px;
}
.control {
  padding: 0px 68px;
  display: flex;
  margin: 14px 0px;
}
.control-mobile {
  padding: 0px 20px;
  display: flex;
  margin: 10px 0px;
}
.tips,
.tipsMobile {
  position: absolute;
  border: 1px solid #dfa72f;
  border-radius: 3px;
  background: white;
  padding: 20px 30px;
  font-size: 16px;
  width: 300px;
  z-index: 99;
  top: 0;
  right: -40px;
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 600;
  }
  p {
    margin-top: 15px;
  }
  button {
    margin-top: 15px;
  }
}
.tipsMobile {
  top: 100px;
  left: 30px;
}
.hidden {
  visibility: hidden;
}

.myColumns {
  display: flex;
  padding: 0 0.75rem;
}

.videoMobile {
  flex-direction: column;
}
</style>
<style>
.box.is-success {
  background-color: rgba(223, 167, 47, 0.13) !important;
  color: black !important;
  border: 1px solid #dfa72f !important;
}
.box {
  background-color: transparent !important;
}
span.button.is-capitalized {
  background: transparent;
}

.modal-background {
  background-color: rgba(10, 10, 10, 0.86) !important;
}

.gutter.gutter-horizontal {
  /* box-shadow: 3px 0px 14px 0px rgba(0, 0, 0, 0.20); */
  /* z-index: 1; */
  height: calc(100vh - 64px);
}
</style>
