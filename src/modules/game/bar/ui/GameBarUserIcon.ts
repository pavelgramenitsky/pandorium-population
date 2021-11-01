import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Ticker } from "@pixi/ticker";

export default class GameBarUserIcon extends Container {
    private _ram: Sprite;
    private _msk: Graphics;
    private _avatar: Sprite;

    private _ticker: Ticker;

    constructor() {
        super();

        this._avatar = new Sprite();
        this.addChild(this._avatar);

        this._msk = new Graphics();
        this._msk.beginFill(0xff0000, 0.5);
        this._msk.drawCircle(0, 0, 50);
        this.addChild(this._msk);

        this._avatar.mask = this._msk;

        this._ram = Sprite.from('bar_back_panel_avatar_circle.png');
        this._ram.anchor.set(0.5);
        this.addChild(this._ram);

        this._ticker = new Ticker();
        this._ticker.add(this._update.bind(this));
        this._ticker.start();

        this.setAvatar('bar_user_base.png')
    }

    setAvatar(textureName: string) {
        this._avatar.texture = Texture.from(textureName);
        this._avatar.scale.set(100 / this._avatar.width);
        this._avatar.x = -this._avatar.width / 2;
        this._avatar.y = -this._avatar.height / 2;
    }

    private _update() {
        this._ram.rotation += 0.01;
    }
}