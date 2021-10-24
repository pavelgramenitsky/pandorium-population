import * as PIXI from "pixi.js";
import gsap from "gsap";

export const setCenter = (dim1: number, dim2: number, { scale = 1, anchorCenter = false } = {}): number => {
  let value = dim1 / 2 - (dim2 * scale) / 2;

  if (anchorCenter) {
    value = value + dim2 / 2;
  }

  return +value.toFixed();
};

export const getRndInteger = (min: number, max: number, excluded: number[] = []): number => {
  let getRnd = null;

  do {
    getRnd = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excluded.includes(getRnd));

  return getRnd;
};

export const shuffle = (array: any[]): any[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const sortArray = (array: number[], value?: string): number[] => {
  if (value) {
    return [...array].sort((a, b) => a[value] - b[value]);
  }

  return [...array].sort((a, b) => a - b);
};

export const gsapTimer = (callback: () => void, time: number): GSAPAnimation => {
  const obj = { x: 0 };
  return gsap.to(obj, { duration: time, x: 1, onComplete: () => callback() });
};

export const delay = async (time: number): Promise<string> => {
  return await new Promise((resolve) => gsapTimer(() => resolve("ok"), time));
};

export const throttle = (callback: () => void, lastTime: number, throttle: number) => {
  if (new Date().getTime() - lastTime > throttle) {
    callback();
  }
};

export const mask = ({ x, y, width, height }) => {
  const mask = new PIXI.Graphics();
  mask.beginFill();
  mask.drawRect(x, y, width, height);
  mask.endFill();

  return mask;
};

export const gradient = (from: string, to: string, width: number, height: number): PIXI.Texture => {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  const grd = ctx.createLinearGradient(0, 0, 0, height);
  grd.addColorStop(0, from);
  grd.addColorStop(1, to);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);
  return PIXI.Texture.from(c);
};

export const sumEqualParts = (value: number, step: number, options?): number[] => {
  const array = [];
  const stepValue = value / step;
  const addAmount = options?.addAmount || 0;
  let dynamicValue = 0;

  do {
    const plus = dynamicValue + stepValue;
    dynamicValue = plus >= value ? value : plus;
    array.push(dynamicValue + addAmount);
  } while (value > dynamicValue);

  return array.map((number: number) => Math.ceil(number));
};

export const getCurrency = (): string => {
  return !window.state.settings.hideCurrency ? window.state.currency : "";
};

export const getAmount = (amount: number): string | number => {
  return !window.state.settings.hideCurrency ? cashToString(amount) : amount;
};

export const cashToString = (amount: number): string => {
  var formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(amount / 100);
};

export const checkConditions = (conditions: boolean[]): boolean => {
  return !!conditions.filter((condition: boolean) => condition).length;
};

export const removeDublicate = (array: any[], value?: number | string): any[] => {
  const seen = {};
  const out = [];
  const len = array.length;
  let j = 0;

  for (let index = 0; index < len; index++) {
    const item = value ? array[index][value] : array[index];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = array[index];
    }
  }
  return out;
};
