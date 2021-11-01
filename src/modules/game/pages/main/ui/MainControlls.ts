import { Container } from "@pixi/display";
import config from "../../../../../config";
import { PageNames } from "../../data/GamePageNames";
import MainButtonPlay from "./MainButtonPlay";

export default class MainControlls extends Container {
    private _mainButtonPlay: MainButtonPlay;

    constructor() {
        super();

        this._mainButtonPlay = new MainButtonPlay();
        this._mainButtonPlay.position.set(config.WIDTH / 2, config.HEIGHT - this._mainButtonPlay.height - 20);
        this._mainButtonPlay.buttonMode = true;
        this._mainButtonPlay.interactive = true;
        this._mainButtonPlay.on('pointerdown', this.onClickPlay.bind(this));
        this.addChild(this._mainButtonPlay);
    }

    private onClickPlay() {
        window.methods.gameStage.showPage(PageNames.GAME_SCENE);
    }

    destroy() {
        this.removeChild(this._mainButtonPlay);
        this._mainButtonPlay.destroy();
    }
}