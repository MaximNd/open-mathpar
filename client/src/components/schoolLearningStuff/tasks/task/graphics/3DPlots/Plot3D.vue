<template>
  <canvas
    ref="plot3dCanvas"
    class="plot3d"
    :width="canvasWidth"
    :height="canvasHeight"
    @mousemove="onMoveCube"
    @mousedown.left="onCanvasFocused"
    @mouseup.left="onCanvasBlurred"></canvas>
</template>

<script>
export default {
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
    getImageUrl: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      SPEED: 100,
      MATRIX_PROJ: [
        [500, 0, 500, 250000],
        [0, 500, 350, 175000],
        [0, 0, 1, 0],
        [0, 0, 1, 500]
      ],
      points3D: [[-20, -20, -20], [-20, 20, -20], [20, -20, -20], [20, 20, -20], [-20, -20, 20], [-20, 20, 20], [20, -20, 20], [20, 20, 20]],
      points2D: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      matrix: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
      oldX: 0,
      oldY: 0,
      mouseDown: false,
      shiftDown: false
    };
  },
  methods: {
    init() {
      this.getMatrix3D();
      window.addEventListener('keydown', this.onShiftPressed, false);
      window.addEventListener('keyup', this.onShiftReleased, false);
    },
    onCanvasFocused(event) {
      this.mouseDown = true;
    },
    onCanvasBlurred(event) {
      this.mouseDown = false;
      this.shiftDown = false;
      this.update3d();
      const canvas = this.$refs.plot3dCanvas;
      /** @type {CanvasRenderingContext2D} */
      const ctx = canvas && canvas.getContext('2d');
      if (!canvas || !ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    onShiftPressed(event) {
      this.shiftDown = event.keyCode === 16;
    },
    onShiftReleased() {
      this.shiftDown = false;
    },
    onMoveCube(event) {
      if (!this.mouseDown) {
        return;
      }
      const rect = this.$refs.plot3dCanvas.getBoundingClientRect();

      const newX = event.clientX - rect.left;
      const newY = event.clientY - rect.top;
      const alpha = (newY - this.oldY) / this.SPEED;
      const betta = -(newX - this.oldX) / this.SPEED;
      if (alpha < 360 && betta < 360) {
        this.calc(alpha, betta, -alpha);
      }
      this.oldX = event.clientX - rect.left;
      this.oldY = event.clientY - rect.top;
      requestAnimationFrame(() => {
        this.draw();
      });
    },
    getMatrix3D() {
      this.$store.dispatch('getMatrix3d', this.sectionId)
        .then(({ bodyText }) => {
          const respParts = bodyText.split('*');
          this.matrix = JSON.parse(respParts[0]);
          this.points3D = JSON.parse(respParts[1]);
          this.points3D[7][0] += this.points3D[6][0];
          this.points3D[7][1] += this.points3D[6][1];
          this.points3D[7][2] += this.points3D[5][2];
          this.$emit('update:imgPath', this.getImageUrl());
        });
    },
    setMatrix3D() {
      return new Promise((resolve, reject) => {
        const matrixString = this.matrix.toString();
        this.$store.dispatch('setMatrix3d', { sectionId: this.sectionId, data: `matrix=${matrixString}` })
          .then(({ body }) => {
            resolve(body);
          })
          .catch(reject);
      });
    },
    draw() {
      const canvas = this.$refs.plot3dCanvas;
      /** @type {CanvasRenderingContext2D} */
      const ctx = canvas && canvas.getContext('2d');
      if (!canvas || !ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!this.mouseDown) {
        return;
      }
      ctx.fillStyle = 'rgb(128,0,0)';
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(this.points2D[0][0], this.points2D[0][1]);
      ctx.lineTo(this.points2D[1][0], this.points2D[1][1]);
      ctx.lineTo(this.points2D[2][0], this.points2D[2][1]);
      ctx.lineTo(this.points2D[6][0], this.points2D[6][1]);
      ctx.lineTo(this.points2D[0][0], this.points2D[0][1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.points2D[5][0], this.points2D[5][1]);
      ctx.lineTo(this.points2D[7][0], this.points2D[7][1]);
      ctx.lineTo(this.points2D[3][0], this.points2D[3][1]);
      ctx.lineTo(this.points2D[4][0], this.points2D[4][1]);
      ctx.lineTo(this.points2D[5][0], this.points2D[5][1]);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.points2D[5][0], this.points2D[5][1]);
      ctx.lineTo(this.points2D[0][0], this.points2D[0][1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.points2D[7][0], this.points2D[7][1]);
      ctx.lineTo(this.points2D[6][0], this.points2D[6][1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.points2D[3][0], this.points2D[3][1]);
      ctx.lineTo(this.points2D[2][0], this.points2D[2][1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.points2D[4][0], this.points2D[4][1]);
      ctx.lineTo(this.points2D[1][0], this.points2D[1][1]);
      ctx.stroke();
      for (let i = 0; i < 8; ++i) {
        ctx.beginPath();
        ctx.arc(this.points2D[i][0], this.points2D[i][1], 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    },
    projection() {
      for (let j = 0; j < 8; ++j) {
        let x = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i = 0; i < 4; ++i) {
          x[i] = this.matrix[i][0] * this.points3D[j][0] + this.matrix[i][1] * this.points3D[j][1]
              + this.matrix[i][2] * this.points3D[j][2] + this.matrix[i][3];
        }
        this.points2D[j][0] = x[0] / x[3];
        this.points2D[j][1] = x[1] / x[3];
      }
    },
    calc(alpha, beta, scale) {
      let sin = 0;
      let cos = 0;
      let matrixOld = [];

      if (alpha !== 0 && !this.shiftDown) {
        cos = Math.cos(alpha);
        sin = Math.sin(alpha);
        let na = [[1, 0, 0, 0], [0, cos, -sin, 0], [0, sin, cos, 0], [0, 0, 0, 1]];
        this.matrixMult(na);
      }
      if (beta !== 0 && !this.shiftDown) {
        cos = Math.cos(beta);
        sin = Math.sin(beta);
        let nb = [[cos, 0, sin, 0], [0, 1, 0, 0], [-sin, 0, cos, 0], [0, 0, 0, 1]];
        this.matrixMult(nb);
      }
      if (this.shiftDown) {
        let ns = [[1 + scale, 0, 0, 0], [0, 1 + scale, 0, 0], [0, 0, 1 + scale, 0], [0, 0, 0, 1]];
        this.matrixMult(ns);
      }
      matrixOld = this.matrix;
      this.matrixMult(this.MATRIX_PROJ);
      this.projection();
      this.matrix = matrixOld;
    },
    update3d() {
      this.setMatrix3D()
        .then(() => {
          return this.$store.dispatch('calc', {
            sectionId: this.sectionId,
            task: this.task
          });
        })
        .then(() => {
          return this.$store.dispatch('space');
        })
        .then(() => {
          this.$emit('update:imgPath', this.getImageUrl());
        });
    },
    matrixMult(otherMatrix) {
      let M = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
          for (let k = 0; k < 4; ++k) {
            M[i][j] += this.matrix[k][j] * otherMatrix[i][k];
          }
        }
      }
      this.matrix = M;
    }
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onShiftPressed);
    window.removeEventListener('keyup', this.onShiftReleased);
  }
}
</script>

<style>
  .plot3d {
    position: absolute;
    z-index: 2;
    border: 1px solid blue;
  }
</style>
