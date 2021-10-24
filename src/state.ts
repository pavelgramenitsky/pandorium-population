import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

class State {
  deviceDetector = deviceDetector.parse(navigator.userAgent);
  orientation = { mainCanvasHeight: 0, mainCanvasWidth: 0, orientationType: "" };
  urlParams: any = {};
  spinData = {};
  spinRunning = false;
  spinning = false;
  quickSpin = false;
  paylines = [];

  constructor() {
    window.methods = {};

    const urlParams = new URLSearchParams(window.location.search);
    this.urlParams.session = urlParams.get("session");
  }

  setOrientation({ orientationType, mainCanvasWidth, mainCanvasHeight }) {
    this.orientation = { orientationType, mainCanvasWidth, mainCanvasHeight };
  }
}

export default State;
