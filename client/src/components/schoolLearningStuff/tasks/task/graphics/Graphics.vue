<template>
  <div v-if="isShow">
    <appGraphicsFormControl
      :sectionId="sectionId"
      :imgPath="imgPath"
      :isPlot3d="isPlot3d"
      :isPlot3dImplicit="isPlot3dImplicit"
      :isPlot3dExplicit="isPlot3dExplicit"
      :isPlot3dParametric="isPlot3dParametric"
      :isRenderMultipleSurfaces="isRenderMultipleSurfaces"
      :isTablePlot="isTablePlot"
      :getImageUrl="getImageUrl"
      @update:imgPath="updateImgPath">
    </appGraphicsFormControl>
    <div class="graphics-container">
      <appPlot3D
        v-if="isPlot3d"
        :sectionId="sectionId"
        :task="task"
        :canvasWidth="imageWidth"
        :canvasHeight="imageHeight"
        :getImageUrl="getImageUrl"
        @update:imgPath="updateImgPath"></appPlot3D>
      <appPlot3DImplicit
        v-else-if="isPlot3dImplicit"
        :sectionId="sectionId"
        :task="task"
        :canvasWidth="1024"
        :canvasHeight="717"></appPlot3DImplicit>
      <appPlot3DExplicit
        v-else-if="isPlot3dExplicit && isRenderMultipleSurfaces === false"
        :sectionId="sectionId"
        :task="task"
        :canvasWidth="1024"
        :canvasHeight="717"></appPlot3DExplicit>
      <appPlot3DParametric
        v-else-if="isPlot3dParametric && isRenderMultipleSurfaces === false"
        :sectionId="sectionId"
        :task="task"
        :canvasWidth="1024"
        :canvasHeight="717"></appPlot3DParametric>
      <img v-if="imgPath" ref="image" class="plot" :src="imgPath" alt="plot">
    </div>
  </div>
</template>

<script>
import GraphicsFormControl from './GraphicsFormControl.vue';
import Plot3D from './3DPlots/Plot3D';
import Plot3DImplicit from './3DPlots/Plot3DImplicit';
import Plot3DExplicit from './3DPlots/Plot3DExplicit';
import Plot3DParametric from './3DPlots/Plot3DParametric';

export default {
  props: {
    sectionId: {
      type: Number,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      DEFAULT_SETTINGS: [false, 3, 3, 1],
      imageWidth: 0,
      imageHeight: 0,
      isGraph: false,
      isTablePlot: false,
      isPlot3d: false,
      isPlot3dImplicit: false,
      isPlot3dExplicit: false,
      isPlot3dParametric: false,
      isRenderMultipleSurfaces: false,
      imgPath: '',
      oldParameters: [],
      oldSettings: [],
      parameters: [],
      settings: [],
      paramSettingsChanged: false,
    };
  },
  computed: {
    isShow() {
      return (this.isGraph || this.isPlot3d || this.isPlot3dImplicit
            || this.isPlot3dExplicit || this.isPlot3dParametric || this.isTablePlot
            || this.isRenderMultipleSurfaces);
    },
  },
  methods: {
    initData() {
      this.isGraph = this.containsGraphCommand();
      this.isTablePlot = this.containsTableplotCommand();
      this.isPlot3d = this.task.indexOf('\\plot3d') >= 0 || this.task.indexOf('\\paramPlot3d') >= 0;
      this.isPlot3dImplicit = this.task.indexOf('\\implicitPlot3d') >= 0;
      this.isPlot3dExplicit = this.task.indexOf('\\explicitPlot3d') >= 0;
      this.isPlot3dParametric = this.task.indexOf('\\parametricPlot3d') >= 0;
      this.isRenderMultipleSurfaces = this.task.indexOf('\\show3d') >= 0;
      if (!(this.isPlot3d
        || this.isPlot3dImplicit
        || this.isPlot3dImplicit
        || this.isPlot3dExplicit
        || this.isPlot3dParametric
        || this.isRenderMultipleSurfaces)) {
          (this.isGraph || this.isTablePlot) && this.updateImgPath(this.getImageUrl());
      }
      this.oldSettings = this.DEFAULT_SETTINGS;
      this.parameters = [];
    },
    getImageUrl(frame) {
      return `${process.env.VUE_APP_API}/servlet/image?section_number=${this.sectionId}${frame ? `&frame=${frame}` : ''}&timestamp=${new Date().getTime()}`;
    },
    containsGraphCommand() {
      return this.task.indexOf('\\plot') >= 0
              || this.task.indexOf('\\textPlot') >= 0
              || this.task.indexOf('\\paramPlot') >= 0
              || this.task.indexOf('\\plotGraph') >= 0
              || this.task.indexOf('\\showPlots') >= 0
              || this.task.indexOf('\\paintElement') >= 0
              || this.task.indexOf('\\pointsPlot') >= 0
              || this.task.indexOf('\\arrowPlot') >= 0;
    },
    containsTableplotCommand() {
      return this.task.indexOf('\\tablePlot') >= 0
              && this.task.indexOf('\\showPlots') < 0
              && this.task.indexOf('\\tablePlot2') < 0
              && this.task.indexOf('\\tablePlot4') < 0;
    },
    updateImgPath(newImgPath) {
      const image = new Image();
      image.src = newImgPath;
      image.onload = () => {
        this.imgPath = newImgPath;
        this.$nextTick(() => {
          this.imageWidth = this.$refs.image.clientWidth;
          this.imageHeight = this.$refs.image.clientHeight;
        });
      };
    },
  },
  created() {
    this.$http.post('http://localhost:8080/api/space-memory')
      .then(({ body }) => {
        this.space = body.space;
      });
    this.initData();
  },
  components: {
    appGraphicsFormControl: GraphicsFormControl,
    appPlot3D: Plot3D,
    appPlot3DImplicit: Plot3DImplicit,
    appPlot3DExplicit: Plot3DExplicit,
    appPlot3DParametric: Plot3DParametric,
  },
};
</script>

<style scoped>
  .graphics-container {
    position: relative;
    width: 100%;
  }
  .plot {
    user-select: none;
    z-index: 1;
    max-width: 100%;
    width: 100%;
  }
</style>
