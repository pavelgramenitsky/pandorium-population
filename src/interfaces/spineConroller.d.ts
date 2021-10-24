import * as PIXI from "pixi.js";

import SpineController from "../helpers/spineController";

export interface ICallback {
  event?: () => void;
  complete?: () => void;
  start?: () => void;
  end?: () => void;
  dispose?: () => void;
  destroy?: () => void;
}

export interface IOptions {
  customName?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  zIndex?: number;
}

export interface IRunOptions {
  loop?: boolean;
  loopCount?: number;
  timeScale?: number;
  callback?: ICallback;
  destroy?: boolean;
}

export interface ISpines {
  column: number;
  line: number;
  name: string;
  animationName: number | string;
  options: IOptions;
  runOptions: IRunOptions;
  container: PIXI.Container;
  spine: SpineController;
}
