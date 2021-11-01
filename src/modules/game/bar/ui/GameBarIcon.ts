import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";

export default class GameBarIcon extends Container {
    private _txt: Text;

    constructor(iconTexture: string) {
        super();
        const back = Sprite.from('bar_icon_back.png');
        this.addChild(back);

        const icon = Sprite.from(iconTexture);
        icon.x = 37;
        icon.y = 25;
        this.addChild(icon);

        this._txt = new Text('123', {
            fontFamily: 'ComicaAxis',
            fontSize: 22,
            fill: 0xffffff,
            
        });
        this._txt.x = icon.x + icon.width + 20;
        this._txt.y = 22;
        this.addChild(this._txt);
    }

    set text(value: number) {
        this._txt.text = value.toFixed();
    }
} 