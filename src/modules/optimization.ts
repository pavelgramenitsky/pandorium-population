import * as PIXI from "pixi.js";

import SpineController from "../helpers/spineController";
import { gsapTimer } from "../helpers";

// Preload all spines to the memory and delete

export default () => {
  const mainContainer = new PIXI.Container();

  const images = [];

  const spines = [
    // ===== Spine symbols =====
    { name: "person0", destroy: true },
    
  ];

  mainContainer.name = "optimize";
  mainContainer.x = 9999;

  images.forEach(({ name }) => {
    const sprite = PIXI.Sprite.from(name);
    mainContainer.addChild(sprite);
  });
  

  spines.forEach(({ name, destroy }) => {
    const spine = new SpineController(mainContainer, name);
    // spine.spineRun(0, { destroySpine: true });
    if (destroy) {
      gsapTimer(() => mainContainer.removeChild(spine.spine), 0.5);
    }
  });

  window.app.stage.addChild(mainContainer);
};
