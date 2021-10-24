import viewport from "../../assets/js/viewport";
import config from "../../config";

class Orientation {
  modules = [
    "hovers",
    "popups",
    "ui",
    "loadingScreen",
    "backgrounds",
    "reelsModule",
    "controlsView",
    "logo",
    "heroes",
    "winBanner",
    "bonusgame"
  ];

  constructor() {
    const options = this.getOrientation();
    window.state.setOrientation(options);
  }

  getOrientation() {
    const mainCanvas = document.getElementById("mainCanvas");
    const portraitMode = window.innerWidth < window.innerHeight;

    let options = {
      orientationType: viewport.getOrientationType(window.state.deviceDetector.device.type),
      mainCanvasWidth: mainCanvas.offsetWidth,
      mainCanvasHeight: mainCanvas.offsetHeight
    };

    if (portraitMode && config.portraitMode) {
      options = {
        orientationType: "mobile_p",
        mainCanvasWidth: config.WIDTH_M_PORTRAIT,
        mainCanvasHeight: config.HEIGHT_M_PORTRAIT
      };
    }

    if (options.orientationType === "mobile_p") {
      options.mainCanvasWidth = config.WIDTH_M_PORTRAIT;
      options.mainCanvasHeight = config.HEIGHT_M_PORTRAIT;
    }

    if (options.orientationType === "mobile_l") {
      options.mainCanvasWidth = config.WIDTH_M_LANDSCAPE;
      options.mainCanvasHeight = config.HEIGHT_M_LANDSCAPE;
    }

    if (options.orientationType === "desktop") {
      options.mainCanvasWidth = config.WIDTH;
      options.mainCanvasHeight = config.HEIGHT;
    }

    return options;
  }

  handleOrientation() {
    const options = this.getOrientation();
    window.state.setOrientation(options);

    this.modules.forEach((moduleName: string) => {
      window.methods[moduleName] && window.methods[moduleName].orientation(options);
    });

  }
}

export default Orientation;
