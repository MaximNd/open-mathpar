<template>
  <div ref="plot3d-parametric-container" class="plot3d-parametric-container">

  </div>
</template>

<script>
import * as THREE from 'three';
import OrbitControlsLibrary from 'three-orbit-controls';
const OrbitControls = OrbitControlsLibrary(THREE);
import plot3dMixin from './../../../../../../mixins/plot3DMixin.js';

export default {
  mixins: [plot3dMixin],
  props: {
    sectionId: {
      type: Number,
      required: true,
    },
    task: {
      type: String,
      required: true
    },
    canvasWidth: {
      type: Number,
      required: true
    },
    canvasHeight: {
      type: Number,
      required: true
    },
  },
  data() {
    const VIEW_ANGLE = 45;
    const ASPECT = this.canvasWidth / this.canvasHeight;
    const NEAR = 0.1;
    const FAR = 20000;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.Geometry();
    return {
      scene,
      camera,
      renderer,
      controls,
      geometry,
      xLabel: null,
      yLabel: null,
      zLabel: null
    };
  },
  methods: {
    init() {
      this.scene.add(this.camera);
      this.camera.position.set(20, 20, 10);
      this.camera.up = new THREE.Vector3(0, 0, 1);
      this.camera.lookAt(this.scene.position);

      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
      this.renderer.setClearColor(0x000000, 0);
    },
    initData() {
      this.$store.dispatch('plot3dparametric', { sectionId: this.sectionId, task: this.task })
        .then(({ body }) => {
          const xMin = body[0][0];
          const xMax = body[0][1];
          const yMin = body[0][2];
          const yMax = body[0][3];
          const zMin = body[0][4];
          const zMax = body[0][5];
          const stacks = body[0][6];
          const lightX = 10;
          const lightY = 12;
          const lightZ = 0;
          const color = body[0][10];
          const axesSize = 1.2 * Math.max(xMax, yMax, zMax);

          const axisHelper = new THREE.AxesHelper(axesSize);
          this.scene.add(axisHelper);

          Promise.all([
            this.createAxisLabel('x', new THREE.Vector3(axesSize, 0, 0), this.camera.rotation),
            this.createAxisLabel('y', new THREE.Vector3(0, axesSize, 0), this.camera.rotation),
            this.createAxisLabel('z', new THREE.Vector3(0, 0, axesSize), this.camera.rotation),
          ])
          .then(([ xLabel, yLabel, zLabel ]) => {
            this.xLabel = xLabel;
            this.yLabel = yLabel;
            this.zLabel = zLabel
            this.scene.add(this.xLabel);
            this.scene.add(this.yLabel);
            this.scene.add(this.zLabel);
          });
          // LIGHT
          const light = new THREE.PointLight(0xffffff, 1.2);
          light.position.set(lightX, lightY, lightZ);
          this.scene.add(light);

          for (let i = 1; i < body.length; ++i) {
            this.geometry.vertices.push(this.toVector3(body[i]));
          }

          let a, b, c, d;
          let uva, uvb, uvc, uvd;
          let sliceCount = stacks + 1;

          for (let i = 0; i < stacks; ++i) {
            for (let j = 0; j < stacks; ++j) {
              a = i * sliceCount + j;
              b = i * sliceCount + j + 1;
              c = (i + 1) * sliceCount + j + 1;
              d = (i + 1) * sliceCount + j;

              uva = new THREE.Vector2(j / stacks, i / stacks);
              uvb = new THREE.Vector2((j + 1) / stacks, i / stacks);
              uvc = new THREE.Vector2((j + 1) / stacks, (i + 1) / stacks);
              uvd = new THREE.Vector2(j / stacks, (i + 1) / stacks);

              this.geometry.faces.push(new THREE.Face3(a, b, d));
              this.geometry.faces.push(new THREE.Face3(b, c, d));
            }
          }
          this.geometry.computeFaceNormals();
          this.geometry.computeVertexNormals();

          const colorMaterial = new THREE.MeshLambertMaterial({
            color: '#' + Math.floor(Math.random()*16777215).toString(16),
            side: THREE.DoubleSide,
            flatShading: true
          });

          const mesh = new THREE.Mesh(this.geometry, colorMaterial);
          this.scene.add(mesh);

          this.render();
          this.animate();
        })
        .catch(console.log);
    },
  },
  mounted() {
    const canvas = this.renderer.domElement;
    canvas.classList.add('plot3d-parametric-canvas');
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    this.$refs['plot3d-parametric-container'].appendChild(canvas);
  },
  created() {
    this.init();
    this.initData();
  }
}
</script>

<style>
  .plot3d-parametric-container {
    width: 100%;
    height: 100%;
  }
  .plot3d-parametric-canvas {
    z-index: 2;
    border: 1px solid blue;
  }
</style>
