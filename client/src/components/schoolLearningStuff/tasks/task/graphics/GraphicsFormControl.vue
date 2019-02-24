<template>
  <v-card class="graphics-form elevation-1 mb-2">
    <v-progress-linear v-if="!isDataInitialized" indeterminate></v-progress-linear>
    <v-card-text v-else>
      <v-layout wrap>
        <v-flex xs12>
          <v-item-group class="graphics-form-controls align-center">
            <v-item-group class="v-btn-group">
              <v-tooltip bottom>
                <v-btn
                  @click="replotNonTablePlot"
                  slot="activator"
                  flat>
                  Plot
                </v-btn>
                <span>Plot graphics with current settings</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn
                  slot="activator"
                  @click.prevent="downloadImage"
                  flat>
                  Download
                </v-btn>
                <span>Download image</span>
              </v-tooltip>
            </v-item-group>
            <v-item-group class="ml-3">
              <v-layout align-center>
                <v-tooltip bottom>
                  <v-checkbox
                    slot="activator"
                    label="b\w"
                    v-model="settings.blackWhite">
                  </v-checkbox>
                  <span>Use only black and white for graphics</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-checkbox
                    slot="activator"
                    class="ml-2"
                    label="equal scale"
                    v-model="settings.eqScale">
                  </v-checkbox>
                  <span>Force equal scale for X and Y axes</span>
                </v-tooltip>

                <v-item-group class="v-input-group ml-3">
                  <v-tooltip bottom class="fill-height">
                    <v-btn
                      class="fill-height"
                      slot="activator"
                      flat>
                      ↕A
                    </v-btn>
                    <span>Font size</span>
                  </v-tooltip>
                  <v-divider
                    vertical>
                  </v-divider>
                  <v-text-field
                    v-model="settings.fontSize"
                    type="number"
                    min="1"
                    hide-details
                    solo
                    flat>
                  </v-text-field>
                </v-item-group>

                <v-item-group class="v-input-group ml-2">
                  <v-tooltip bottom class="fill-height">
                    <v-btn
                      class="fill-height"
                      slot="activator"
                      flat>
                      —
                    </v-btn>
                    <span>Line thickness</span>
                  </v-tooltip>
                  <v-divider
                    vertical>
                  </v-divider>
                  <v-text-field
                    v-model="settings.lineThickness"
                    type="number"
                    min="1"
                    hide-details
                    solo
                    flat>
                  </v-text-field>
                </v-item-group>

                <v-item-group class="v-input-group ml-2">
                  <v-tooltip bottom class="fill-height">
                    <v-btn
                      class="fill-height"
                      slot="activator"
                      flat>
                      ↑
                    </v-btn>
                    <span>Axes thickness</span>
                  </v-tooltip>
                  <v-divider
                    vertical>
                  </v-divider>
                  <v-text-field
                    v-model="settings.axesThickness"
                    type="number"
                    min="1"
                    hide-details
                    solo
                    flat>
                  </v-text-field>
                </v-item-group>
              </v-layout>
            </v-item-group>
          </v-item-group>
        </v-flex>

        <v-flex xs12 v-if="withParameters">
          <v-item-group class="graphics-form-controls">
            <v-layout align-center>
              <v-item-group class="v-input-group">
                <v-tooltip bottom class="fill-height">
                  <v-btn
                    style="width: 80px;"
                    class="fill-height"
                    slot="activator"
                    flat>
                    #frames
                  </v-btn>
                  <span>Number of frames</span>
                </v-tooltip>
                <v-divider
                  vertical>
                </v-divider>
                <v-text-field
                  v-model="settings.frames"
                  type="number"
                  min="1"
                  hide-details
                  solo
                  flat>
                </v-text-field>
              </v-item-group>

              <v-btn-toggle v-model="parameters.toggleParameters" class="ml-2">
                <v-btn
                  v-for="(item, index) in parameters.ringParametersWithValues"
                  :key="index"
                  flat
                  class="parameter-btn">
                  {{ item.parameter }} = {{ item.value }}
                </v-btn>
              </v-btn-toggle>
              <v-slider
                class="ring-parameters-slider ml-3 mt-4"
                :disabled="isParameterSliderDisabled"
                v-model="parameters.ringParametersWithValues[isParameterSliderDisabled ? 0 : parameters.toggleParameters].value"
                min="0"
                max="1"
                step="0.01">
              </v-slider>
            </v-layout>
          </v-item-group>
        </v-flex>

        <v-flex xs12 v-if="isTablePlot">
          <v-btn-toggle v-model="parameters.toggleParameters">
            <v-btn
              flat>
              Cut line
            </v-btn>
            <v-btn
              flat>
              Set new line
            </v-btn>
            <v-btn
              flat>
              Del old line
            </v-btn>
            <v-btn
              flat>
              Del new line
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { delay } from './../../../../../utils/utils.js';

export default {
  props: {
    sectionId: {
      type: Number,
      required: true
    },
    imgPath: {
      type: String,
      required: true
    },
    isPlot3d: {
      type: Boolean,
      required: true
    },
    isPlot3dImplicit: {
      type: Boolean,
      required: true
    },
    isPlot3dExplicit: {
      type: Boolean,
      required: true
    },
    isPlot3dParametric: {
      type: Boolean,
      required: true
    },
    isRenderMultipleSurfaces: {
      type: Boolean,
      required: true
    },
    isTablePlot: {
      type: Boolean,
      required: true
    },
    getImageUrl: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isDataInitialized: false,
      settings: {
        blackWhite: false,
        eqScale: false,
        fontSize: 16,
        lineThickness: 3,
        axesThickness: 3,
        frames: 1,
      },
      parameters: {
        toggleParameters: 0,
        ringParametersWithValues: []
      }
    };
  },
  computed: {
    ...mapGetters(['space']),
    withParameters() {
      return !this.isTablePlot && this.parameters.ringParametersWithValues.length > 0;
    },
    isParameterSliderDisabled() {
      return (typeof this.parameters.toggleParameters === 'undefined');
    },
    ringParameters() {
      const isGraph3d = this.isPlot3d
        || this.isPlot3dImplicit || this.isPlot3dExplicit || this.isPlot3dParametric
        || this.isRenderMultipleSurfaces;
      return this.space ? this.space.substring(this.space.indexOf('[') + 1, this.space.indexOf(']'))
        .split(',').slice(isGraph3d ? 2 : 1) : [];
    },
  },
  methods: {
    initData() {
      this.parameters.ringParametersWithValues = this.ringParameters.map(parameter => ({
        parameter,
        value: 1.00
      }));
      this.isDataInitialized = true;
    },
    getSpace() {
      return this.$store.dispatch('space');
    },
    getArraySettings() {
      return [
        this.settings.eqScale,
        this.settings.blackWhite,
        parseInt(this.settings.fontSize, 10),
        parseInt(this.settings.lineThickness, 10),
        parseInt(this.settings.axesThickness, 10),
        parseInt(this.settings.frames, 10),
      ];
    },
    getArrayParameters() {
      return this.parameters.ringParametersWithValues.map(({ value }) => value);
    },
    replotNonTablePlot() {
      const settings = this.getArraySettings();
      const parameters = this.getArrayParameters();
      const data = {
        sectionId: this.sectionId,
        task: `\\replot([${parameters.join()}], ${settings.join()});`
      };
      let initImage = '';
      this.$store.dispatch('calc', data)
        .then(() => {
          return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = this.getImageUrl();
            image.onload = function () {
              initImage = image;
              resolve();
            };
          });
        })
        .then(() => {
          return this.getSpace()
        })
        // .then(() => {
        //   return this.$http.get(`${process.env.VUE_APP_API}/servlet/image`, {
        //     params: {
        //       section_number: this.sectionId,
        //       getFramesNumber: true,
        //     }
        //   });
        // })
        .then(() => {
          return this.loadFrames(this.settings.frames, initImage);
        })
        .then(async ({ framesNumber, images }) => {
          console.log('IMAGES: ', images);
          for (let i = 0; i < framesNumber; ++i) {
            await delay(100);
            this.$emit('update:imgPath', images[i].src);
          }
        });
    },
    replotTablePlot() {

    },
    downloadImage() {
      const framesNumber = parseInt(this.settings.frames, 10);
      if (framesNumber > 1) {
        for (let i = 0; i < framesNumber; i++) {
          window.open(this.getImageUrl(i) + '&download=true');
        }
      } else {
        window.open(this.imgPath + '&download=true');
      }
    },
    loadFrames(framesNumberStr, initImage) {
      return new Promise((resolve, reject) => {
        const framesNumber = parseInt(framesNumberStr, 10);
        const images = [initImage];
        let loadedImagesCount = 0;
        const promiseData = {
          framesNumber,
          images,
        };

        if (framesNumber > 1) {
          for (let i = 1; i < framesNumber; ++i) {
            images.push(new Image());
            images[i].src = this.getImageUrl(i);
            images[i].className = 'plot';
            images[i].onload = function () {
              ++loadedImagesCount;
              if (loadedImagesCount === framesNumber - 1) {
                resolve(promiseData);
              }
            };
          }
        } else {
          resolve(promiseData);
        }
      });
    },
  },
  created() {
    this.getSpace()
      .then(() => this.initData());
  }
}
</script>

<style scoped>
  .graphics-form {
    width: 100%;
  }
  .graphics-form-controls {
    display: inline-flex;
  }
  .graphics-form .v-btn-group,
  .graphics-form .v-input-group {
    border-radius: 2px;
    display: inline-flex;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  }
  .graphics-form .v-input-group {
    justify-content: flex-start;
    align-items: flex-start;
    height: 48px;
  }

  .graphics-form .v-input-group .v-input {
    width: 70px;
  }

  .graphics-form .v-btn-group .v-btn,
  .graphics-form .v-input-group .v-btn {
    border-radius: 0;
    justify-content: center;
    margin: 0;
    min-width: auto;
    opacity: 1;
    padding: 0 8px;
    width: auto;
  }
  .graphics-form .v-input-group .v-btn {
    width: 48px;
  }
  .graphics-form .v-btn-group .v-btn:not(:last-child),
  .graphics-form .v-input-group .v-btn:not(:last-child) {
    border-right: 1px solid transparent;
  }
  .graphics-form .v-btn-group .v-btn:first-child,
  .graphics-form .v-input-group .v-btn:first-child {
    border-radius: 2px 0 0 2px;
  }
  .graphics-form .v-btn-group .v-btn:last-child,
  .graphics-form .v-input-group .v-btn:last-child {
    border-radius: 0 2px 2px 0;
  }
  .parameter-btn {
    width: 80px;
  }
  .ring-parameters-slider {
    width: 100px;
  }
</style>
