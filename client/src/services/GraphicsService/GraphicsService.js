class GraphicsService {
  /**
   *
   * @param {Number} section
   * @param {String} task
   */
  constructor(section, task) {
    this.section = section;
    this.task = task;
    this.isGraph = this.containsGraphCommand();
    this.isTablePlot = this.containsTableplotCommand();
    this.isPlot3d = this.task.indexOf('\\plot3d') >= 0 || this.task.indexOf('\\paramPlot3d') >= 0;
    this.isPlot3dImplicit = this.task.indexOf('\\implicitPlot3d') >= 0;
    this.isPlot3dExplicit = this.task.indexOf('\\explicitPlot3d') >= 0;
    this.isPlot3dParametric = this.task.indexOf('\\parametricPlot3d') >= 0;
    this.isRenderMultipleSurfaces = task.indexOf('\\show3d') >= 0;
  }

  containsGraphCommand() {
    return this.task.indexOf('\\plot') >= 0
            || this.task.indexOf('\\textPlot') >= 0
            || this.task.indexOf('\\paramPlot') >= 0
            || this.task.indexOf('\\plotGraph') >= 0
            || this.task.indexOf('\\showPlots') >= 0
            || this.task.indexOf('\\paintElement') >= 0
            || this.task.indexOf('\\pointsPlot') >= 0
            || this.task.indexOf('\\arrowPlot') >= 0;
  }

  containsTableplotCommand() {
    return this.task.indexOf('\\tablePlot') >= 0
            && this.task.indexOf('\\showPlots') < 0
            && this.task.indexOf('\\tablePlot2') < 0
            && this.task.indexOf('\\tablePlot4') < 0;
  }
}

export default GraphicsService;
