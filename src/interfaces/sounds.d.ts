import * as PIXI from "pixi.js";

export interface ISoundsFades {
  ticker: PIXI.Ticker;
  fade: () => void;
}

export interface ISoundPlayFadeIn {
  soundName: string;
  sprite?: string;
  forcePlay?: boolean;
}

export interface ISoundFadeOut {
  soundName: string;
  volumeDecreaseSpeed?: number;
}

export interface ISoundStop {
  soundName: string;
}

export interface ISoundVolume {
  soundName: string;
  volume: number;
}

export interface ISoundsControl {
  play: (props: ISoundPlayFadeIn, callback: { end: () => void }) => void;
  stop: (props: ISoundStop) => void;
  fadeIn: (props: ISoundPlayFadeIn, callback?: { end: () => void }) => void;
  fadeOut: (props: ISoundFadeOut, callback?: { end: () => void }) => void;
}

export interface ISoundsMethod {
  playButton: (data?: any) => void;
  mainTheme: (data?: any) => void;
  freespinsTheme: (data?: any) => void;
  fadeInTheme?: () => void;
  fadeOutTheme?: () => void;
  pendingMusic?: () => void;
  switchInfoPage: (data?: any) => void;
  switchAutoplay: (data?: any) => void;
  infoPageEnter: (data?: any) => void;
  spinBtn: (data?: any) => void;
  stakeMinus: (data?: any) => void;
  stakePlus: (data?: any) => void;
  stopButton: (data?: any) => void;
  FGBallAppear: (data?: any) => void;
  FGIntro: (data?: any) => void;
  FGOutroWinPopup: (data?: any) => void;
  FGShoot: (data?: any) => void;
  ballAppear: (data?: any) => void;
  ballDestroyed: (data?: any) => void;
  ballMovement: (data?: any) => void;
  reelSpin: (data?: any) => void;
  reelStop: (data?: any) => void;
  oak5: (data?: any) => void;
  bigWin: (data?: any) => void;
  megaWin: (data?: any) => void;
  tickUp: (data?: any) => void;
  tickupEnd: (data?: any) => void;
  winSkip: (data?: any) => void;
  winCount: (data?: any) => void;
}
