import * as PIXI from "pixi.js";
import { AxiosResponse } from "axios";

import SpineController from "../helpers/spineController";

declare global {
  interface Window {
    PIXI: PIXI;
    dat: any;
    appIsLoaded: any;
    app: PIXI.Application;
    resources: any;
    managers: any;
    methods: any;
    state: any;
    toggleFullScreen: ({ allowExit: boolean }) => void;
    sockets: any;
    autoplayAvailable: number;
    hideCurrencyAllowed: number;
    initData: any;
    BACKEND_URL: string;
    cheat: number[];
  }
}

export interface IAutoplayConfig {
  credits: number;
  betAP: number;
  autoplayCountAP: number;
  balanceIncAP: number;
  balanceDecAP: number;
  freeSpinsWonAP: boolean;
}

interface IPrefs {
  sound: boolean;
  quickSpin: boolean;
  hideCurrency: boolean;
  spinOnRelease: boolean;
}

export interface ICallback {
  success: (response: AxiosResponse | {}) => void;
  fail: (response: AxiosResponse | {}) => void;
}

export interface IOptions {
  data: {};
  callback: ICallback;
  retryTimeout: number;
  retryCount: number;
  ownCatch?: boolean;
  cancelTimeout?: number;
  currentRetry?: number;
}

export interface IReelSymbol {
  number: number;
  type: string;
}

export interface IReelsOptions {
  mainSpeed: number;
  maxSpeed: number;
  speedUp: number;
  pullUpStartSpeed: number;
  pullDiffStart: number;
  slowDownSpeed: number;
  pullDownSpeed: number;
  pullUpEndSpeed: number;
  pullDiffEnd: number;
  delayTick: number;
  changeSpeedTo?: number;
  rateChangeSpeed?: number;
  cutOff?: number;
}

interface IPopupData {
  content: IPopupDataContent[];
  buttonsText: string[];
}

interface IPopupDataContent {
  text: string;
  options: { y: number };
  textOptions?: Partial<PIXI.ITextStyle>;
}

interface IPopupOptions {}

interface IHoverOptions {
  interactive: boolean;
  buttonMode: boolean;
  fill: number;
  color: number;
  duration: number;
  disableSetNextStep?: boolean;
}

interface ICloseHoverOptions {
  duration: number;
}

interface IBall {
  ball: SpineController;
  ballContainer: PIXI.Container;
  options: IBallOptions;
}

interface IBallOptions {
  column: number;
  line: number;
}
