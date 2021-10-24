import { Container, Graphics } from "pixi.js";
import config from "../../config";

export default class GameRam extends Container {
    constructor() {
        super();
        const weight = 4;
        const gr = new Graphics();
        gr.beginFill(0);
        gr.drawRect(0, 0, config.WIDTH, weight);
        gr.drawRect(config.WIDTH - weight, 0, weight, config.HEIGHT);
        gr.drawRect(0, config.HEIGHT - weight, config.WIDTH, weight);
        gr.drawRect(0, 0, weight, config.HEIGHT);

        this.addChild(gr);
    }
}