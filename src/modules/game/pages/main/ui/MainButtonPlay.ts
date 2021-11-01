import { Container } from "@pixi/display";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";
import { Ticker } from "@pixi/ticker";
import { LanguageGetText } from "../../../../../language/Language";

export default class MainButtonPlay extends Container {
    private _cont: Container;
    private _sprites: Sprite[] = [];
    private _ticker: Ticker = new Ticker();
    private _text: Text;
    private _levelText: Text;
    
    constructor() {
        super();
        this.scale.set(1.5);
    
        this._cont = new Container();
        this.addChild(this._cont);
        this._cont.filters = [new DropShadowFilter()];
        
        for (let i = 0; i < 3; i++) {
            const sprt = Sprite.from(`button_paly_f_${i}.png`);
            sprt.anchor.set(0.5);
            this._cont.addChild(sprt);

            this._sprites.push(sprt);
        }

        this._text = new Text(` ${LanguageGetText('menu')} `, {
            fontFamily: 'ComicaAxis',
            fontSize: 32,
            fill: 0x00C8FA,
            stroke: 0x000000,
            strokeThickness: 5,
        });
        this._text.x = -this._text.width / 2;
        this._text.y = -this._sprites[0].height / 2 + 15;
        this._cont.addChild(this._text);

        this._levelText = new Text(` ${window.methods.gameModel.nextLevel} `, {
            fontFamily: 'ComicaAxis',
            fontSize: 26,
            fill: 0xff9900,
            stroke: 0x000000,
            strokeThickness: 5,
        });
        this._levelText.x = -this._levelText.width / 2;
        this._levelText.y = this._text.y + this._text.height - 5;
        this._cont.addChild(this._levelText);

        this._ticker.add(this.update.bind(this));
        this._ticker.start();
    }

    destroy() {
        this._ticker.stop();
        this._ticker.destroy();

        for (let i = 0; i < this._sprites.length; i++) {
            this.removeChild(this._sprites[i]);
            this._sprites[i].destroy();
        }
        this._sprites = [];
    }

    private update() {
        const speed = [0.01, 0.03, -0.02]
        for (let i = 0; i < this._sprites.length; i++) {
            this._sprites[i].rotation += speed[i];
        }
    }
}