import * as PIXI from "pixi.js";
import gsap from "gsap";
import { MotionPathPlugin, PixiPlugin } from "gsap/all";

// ===== Import JS =====
import viewport from "./assets/js/viewport";
import swipeUp from "./assets/js/swipeUp";
import assetsConfig from "./assets/assetsConfig";
import loadResources from "./loadResources";
import initModules from "./initModules";
import config from "./config";


// ===== Import CSS =====
import "./assets/scss/common.scss";
import "./assets/scss/swipeUp.scss";
import "./assets/scss/media-queries.scss";
import optimization from "./modules/optimization";
import State from "./state";
import Orientation from "./modules/orientation";

window.PIXI = PIXI;

PIXI.utils.skipHello();
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

window.app = new PIXI.Application({
  view: document.getElementById("mainCanvas") as HTMLCanvasElement,
  antialias: false,
  backgroundAlpha: 0
});

const ticker = PIXI.Ticker.shared;
window.methods = {};
window.state = new State();

function enableSwipeUp() {
  const initSwipeUp = {
    portraitMode: true,
    enableSwipe: true,
    toggleFullScreen: true
  };

  swipeUp(window.state.deviceDetector, initSwipeUp);
}



const loadApp = async () => {
  window.methods.orientation = new Orientation();
  window.methods.orientation.handleOrientation();
  viewport.handleResize(config);

  loadResources.load(new PIXI.Loader(), assetsConfig(), () => {
    startApp();
  });
  
  viewport.handleResize(config);

  function startApp() {
    optimization();
    initModules();
    
    
  }
};
loadApp();

