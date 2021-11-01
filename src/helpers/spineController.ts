import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { gsapTimer } from "./index";
import { IOptions, IRunOptions } from "../interfaces/spineConroller";

class SpineController {
  parentContainer: PIXI.Container;
  spine: any;
  animations: any;
  spineName: string;

  loopAmount = 0;
  runOptions: IRunOptions = {
    loop: false,
    loopCount: 0,
    timeScale: 1,
    callback: {
      event: null,
      complete: null,
      start: null,
      end: null,
      dispose: null
    },
    destroy: false
  };
  currentAnimationName: string | number;
  loopEnd: boolean;

  constructor(parentContainer: PIXI.Container, spineName: string, options?: IOptions) {
    if (!window.resources[spineName]) {
      console.warn(`The name "${window.resources[spineName]}" does not exist`, spineName);
      return;
    }

    if (!window.resources[spineName].spineData) {
      console.warn(window.resources[spineName]);
      console.warn(spineName);
      console.error("spineData is missing!");
      return;
    }

    this.parentContainer = parentContainer;

    this.spine = new Spine(window.resources[spineName].spineData);
    this.spine.name = options?.customName || spineName;
    this.spineName = options?.customName || spineName;
    this.animations = this.spine.spineData.animations;

    options?.width && (this.spine.width = options.width);
    options?.height && (this.spine.height = options.height);
    options?.x && (this.spine.x = options.x);
    options?.y && (this.spine.y = options.y);
    options?.scale && this.spine.scale.set(options.scale);
    options?.scaleX && (this.spine.scale.x = options.scaleX);
    options?.scaleY && (this.spine.scale.y = options.scaleY);
    options?.zIndex && (this.spine.zIndex = options.zIndex);

    this.parentContainer.addChild(this.spine);
    this.listeners();
  }

  listeners() {
    this.spine.state.addListener({
      event: (entry: any, event: any) => {
        if (!this.runOptions.callback.event) return;
      },
      complete: (entry: any) => {
        if (this.runOptions.loopCount) {
          this.loopAmount++;

          if (this.loopAmount >= this.runOptions.loopCount - 1 && !this.loopEnd) {
            this.loopEnd = true;
            this.spine.state.setAnimation(0, this.currentAnimationName, false);
          }
        }

        if (this.runOptions.callback.complete) {
          this.runOptions.callback.complete();
        }

        if (this.runOptions.destroy) {
          this.destroy();
        }
      },
      start: (entry: any) => {
        if (!this.runOptions.callback.start) return;
      },
      end: (entry: any) => {
        if (!this.runOptions.callback.end) return;
      },
      dispose: (entry: any) => {
        if (!this.runOptions.callback.dispose) return;
      }
    });
  }

  spineRun(animationName: string | number, options?: IRunOptions) {
    if (!this.spine) {
      console.warn(`The spine does not exist`);
      return;
    }

    this.loopAmount = 0;
    this.runOptions = {
      loop: options?.loop,
      loopCount: options?.loopCount,
      timeScale: options?.timeScale || 1,
      callback: {
        event: options?.callback?.event,
        complete: options?.callback?.complete,
        start: options?.callback?.start,
        end: options?.callback?.end,
        dispose: options?.callback?.dispose,
        destroy: options?.callback?.destroy
      },
      destroy: options?.destroy
    };
    this.loopEnd = false;

    this.currentAnimationName =
      typeof animationName === "string"
        ? this.animations.find(({ name }) => name === animationName).name
        : this.animations[animationName].name;

    this.spine.state.timeScale = this.runOptions.timeScale;
    this.spine.state.setAnimation(0, this.currentAnimationName, this.runOptions.loop);
  }

  destroy() {
    gsapTimer(
      () =>  {
        this.spine.destroy();
      }
      , 0.01);
  }
}

export default SpineController;
