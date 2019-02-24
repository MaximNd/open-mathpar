/* eslint-disable no-unused-expressions */
import * as THREE from 'three';

export default {
  methods: {
    toVector3(vert) {
      return new THREE.Vector3(vert[0], vert[1], vert[2]);
    },
    createAxisLabel(text, position, rotation) {
      return new Promise((resolve, reject) => {
        const loader = new THREE.FontLoader();
        loader.load('fonts/helvetiker_regular.typeface.json',
          (font) => {
            const textGeom = new THREE.TextGeometry(text, {
              size: 1,
              height: 0.2,
              curveSegments: 6,
              font,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
            const textMesh = new THREE.Mesh(textGeom, textMaterial);
            textMesh.position.x = position.x;
            textMesh.position.y = position.y;
            textMesh.position.z = position.z;
            textMesh.setRotationFromEuler(rotation);
            resolve(textMesh);
          },
          (xhr) => {
            console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
          },
          reject);
      });
    },
    animate() {
      requestAnimationFrame(() => {
        this.animate();
      });
      this.render();
      this.update();
    },
    update() {
      this.controls.update();
      this.xLabel && this.xLabel.setRotationFromEuler(this.camera.rotation);
      this.yLabel && this.yLabel.setRotationFromEuler(this.camera.rotation);
      this.zLabel && this.zLabel.setRotationFromEuler(this.camera.rotation);
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
  },
};
