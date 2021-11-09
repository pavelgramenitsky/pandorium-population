import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import config from "../../../../config";
import { gsapTimer } from "../../../../helpers";
import CharacterVO, { ICharacterData } from "../data/CharacterVO";
import GameGrid from "./GameGrid";
import CharacterIcon from "./ui/CharacterIcon";

export default class GameScenePage extends Container {
    private _background: Sprite;
    private _gameGrid: GameGrid;

    constructor() {
        super();
    }

    show() {
        this._background = Sprite.from('game_back');
        this.addChild(this._background);

        this._gameGrid = new GameGrid();
        this._gameGrid.x = config.WIDTH / 2 - this._gameGrid.width / 2;
        this._gameGrid.y = (config.HEIGHT + 130) / 2 - this._gameGrid.height / 2;
        this.addChild(this._gameGrid);
        /*setTimeout(() => {
            document.documentElement.requestFullscreen();
        }, 3000);*/
        
        gsapTimer(() => {
            this.emit('Page.Load');
        }, 1);
    }

    hide() {
        this.destroy();
    }

    destroy() {
        this.removeChild(this._background);
        this._background.destroy();
    }
}