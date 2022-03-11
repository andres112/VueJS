<template>
  <div
    class="pybossa-options is-outilineness"
    tabindex="0"
    v-on:keyup="checkKeyCode"
    style="padding-top: 1.8rem"
  >
    <p v-if="multi" class="title is-6">{{ $t("optionlist.choose") }}</p>
    <template v-for="(option, index) in options">
      <div
        v-bind:key="index"
        class="box"
        :class="{
          'is-success animated pulse': isSelected(option.activationKey),
        }"
        @click="toggleSelected(option.activationKey)"
        v-on:mouseover="showTooltip(option.activationKey)"
        v-on:mouseout="hideTooltip(option.activationKey)"
        style="animation-duration: 0.3s"
      >
        <article class="media">
          <div class="media-left">
            <!-- <b-tooltip
              :active="isTooltipActive(option.activationKey)"
              always
              :label="$t('optionlist.press')"
              position="is-top"
            >
              <span
                class="button is-capitalized"
                :class="{
                  'has-text-weight-semibold is-green is-outlined': isSelected(
                    option.activationKey
                  ),
                }"
                style="font-size: 12px"
                >{{ option.activationKey }}</span
              >
            </b-tooltip> -->
          </div>
          <div class="media-content">
            <div class="content">
              <template
                v-if="
                  option.hasOwnProperty('other') &&
                  isSelected(option.activationKey)
                "
              >
                <b-input v-model="other"></b-input>
              </template>
              <template v-else>
                <p
                  :class="{
                    'has-text-weight-semibold': isSelected(
                      option.activationKey
                    ),
                  }"
                >
                  {{ option.text }}
                </p>
                <p v-if="option.extra">{{ option.extra }}</p>
              </template>
            </div>
          </div>
          <div v-if="multi" class="media-right">
            <b-icon
              v-if="multi && isSelected(option.activationKey)"
              class="is-pulled-right"
              icon="check"
            ></b-icon>
          </div>
        </article>
      </div>
    </template>
  </div>
</template>
<script>
import _ from "lodash";
import keycodes from "@/data/keycodes.json";
export default {
  props: {
    options: Array,
    storeValue: null,
    active: Boolean,
    multi: { type: Boolean, default: false },
  },
  data() {
    return {
      selected: "",
      multiSelected: [],
      tooltipActive: "",
      other: "",
      disableShortcuts: false,
    };
  },
  mounted() {
    debugger;
    if (this.multi) {
      for (const option of this.storeValue) {
        let found = _.find(this.options, { storeValue: option });
        if (found !== undefined) {
          this.multiSelected.push(found.activationKey);
        } else {
          let other = _.find(this.options, { other: true });
          this.multiSelected.push(other.activationKey);
          this.other = option;
        }
      }
    } else {
      let found = _.find(this.options, { storeValue: this.storeValue });
      if (found !== undefined) {
        this.selected = found.activationKey;
      }
    }
    this.$el.focus();
  },
  computed: {
    hasOther() {
      let other = _.find(this.options, { other: true });
      if (other !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    clear() {
      this.selected = "";
      this.multiSelected = [];
      this.tooltipActive = "";
      this.other = "";
      this.disableShortcuts = false;
    },
    isTooltipActive(activationKey) {
      if (this.tooltipActive === activationKey) {
        return true;
      } else {
        return false;
      }
    },
    customTooltip(option) {
      let l = option.activationKey.toUpperCase();
      return `Press ${l} to select it`;
    },
    showTooltip(activationKey) {
      this.tooltipActive = activationKey;
    },
    hideTooltip(activationKey) {
      this.tooltipActive = "";
    },
    isSelected(activationKey) {
      if (this.multi) {
        if (this.multiSelected.indexOf(activationKey) !== -1) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.selected === activationKey) {
          return true;
        } else {
          return false;
        }
      }
    },
    saveValue(option) {
      let found = _.find(this.options, { activationKey: option });
      if (this.multi) {
        if (found.hasOwnProperty("storeValue")) {
          let tmp = this.storeValue;
          tmp.push(found.storeValue);
          tmp = _.uniq(tmp);
          this.$emit("update:storeValue", tmp);
        } else {
          let tmp = this.storeValue;
          tmp.push(option);
          tmp = _.uniq(tmp);
          this.$emit("update:storeValue", tmp);
        }
      } else {
        if (
          found.hasOwnProperty("storeValue") &&
          found.hasOwnProperty("other") === false
        ) {
          this.$emit("update:storeValue", found.storeValue);
        } else {
          this.$emit("update:storeValue", this.other);
        }
      }
    },
    toggleSelected(activationKey) {
      let found = _.find(this.options, { activationKey: activationKey });
      let del = false;
      if (found) {
        if (found.hasOwnProperty("other")) {
          this.disableShortcuts = true;
        } else {
          this.disableShortcuts = false;
        }
        if (this.multi) {
          if (this.multiSelected.indexOf(activationKey) !== -1) {
            if (found.hasOwnProperty("other") === false) {
              this.multiSelected = _.remove(this.multiSelected, function (n) {
                return n !== activationKey;
              });
              let d = _.cloneDeep(this.storeValue);
              _.remove(d, function (n) {
                return n === found.storeValue;
              });
              this.$emit("update:storeValue", d);
              del = true;
            } else {
              if (this.other !== "") {
                let o = this.other;
                this.multiSelected = _.remove(this.multiSelected, function (n) {
                  return n !== activationKey;
                });
                let d = _.cloneDeep(this.storeValue);
                _.remove(d, function (n) {
                  return n === o;
                });
                this.$emit("update:storeValue", d);
                del = true;
                this.other = "";
              }
            }
          } else {
            this.multiSelected.push(activationKey);
            this.multiSelected = _.uniq(this.multiSelected);
          }
        } else {
          this.selected = activationKey;
        }
        if (found.hasOwnProperty("other") === false && del === false) {
          this.saveValue(activationKey);
        }
        if (found.hasOwnProperty("other") && this.other !== "") {
          this.saveValue(activationKey);
        }
      }
    },
    checkKeyCode(e) {
      if (this.disableShortcuts === false) {
        let found = _.find(keycodes, { keyCode: e.keyCode });
        if (found !== undefined) {
          this.toggleSelected(found.key);
        }
      }
    },
  },
  watch: {
    other(newVal, oldVal) {
      let tmp = _.find(this.options, { other: true });
      if (tmp !== undefined) {
        if (this.multi) {
          if (tmp.hasOwnProperty("storeValue")) {
            let data = _.cloneDeep(this.storeValue);
            _.remove(data, function (n) {
              return n === oldVal;
            });
            _.remove(data, function (n) {
              return n === newVal;
            });
            _.remove(data, function (n) {
              return n === "";
            });
            if (newVal !== "") {
              data.push(newVal);
            }
            this.$emit("update:storeValue", data);
          }
        } else {
          if (tmp.hasOwnProperty("storeValue")) {
            this.$emit("update:storeValue", this.other);
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 0.5rem !important;
}
.is-outilineness {
  outline: none;
}
.pybossa-options {
  padding: 0.75rem;
  overflow-y: scroll;
  max-height: 300px;
}
</style>
