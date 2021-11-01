import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import CharacterVO from "../../data/CharacterVO";

export default class CharacterIcon extends Container {
    private _back: Sprite;
    private _body: Sprite;
    private _hair: Sprite;
    private _hair2: Sprite;
    private _head: Sprite;

    private _vo: CharacterVO;

    private _interval: NodeJS.Timeout;
    private _lock = false;

    constructor(vo: CharacterVO) {
        super();

        this._back = Sprite.from('avatar_back_icon_0.png');
        this.addChild(this._back);

        this.createPerson(vo);
    }

    createPerson(vo: CharacterVO) {
        this._vo = vo;
        this.destroy(true);

        this._back.texture = Texture.from(`avatar_back_icon_${vo.data.kinder === -1 ? '0' : '1'}.png`);

        const isKinder = vo.data.kinder === -1 ? '' : '_k' + vo.data.kinder.toFixed();
        const bodyStr = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_body${isKinder}`;
        const hairStr = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_hair${isKinder}_${vo.data.hair}`;
        const hair2Str = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_hair2${isKinder}_${vo.data.hair}`;
        const headStr = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_head${isKinder}_${vo.data.head}`;
        
        if (vo.data.sex === 'g') {
            this._hair2 = Sprite.from(`${hair2Str}.png`);
            this.addChild(this._hair2);
        }
        this._body = Sprite.from(`${bodyStr}_0.png`);
        this.addChild(this._body);
        
        this._head = Sprite.from(`${headStr}.png`);
        this.addChild(this._head);

        this._hair = Sprite.from(`${hairStr}.png`);
        this.addChild(this._hair);
    }

    setKinder(/* дописать наследование */) {
        this._vo.data.kinder = 0;
        this._lock = true;
        this.createPerson(this._vo);

        this._interval = setTimeout(() => {
            this._vo.data.kinder = 1;
            this.createPerson(this._vo);
            this._interval = setTimeout(() => {
                this._vo.data.kinder = -1;
                this._lock = false;
                this.createPerson(this._vo);
            }, 3000);
        }, 3000);
    }

    destroy(isReinit = false) {
        if (!isReinit) {
            this.removeChild(this._back);
            this._back.destroy();
        }
        if (this._body) {
            this.removeChild(this._body);
            this._body.destroy();
        }
        if (this._hair) {
            this.removeChild(this._hair);
            this._hair.destroy();
        }
        if (this._head) {
            this.removeChild(this._head);
            this._head.destroy();
        }
        
        if (this._hair2) {
            this.removeChild(this._hair2);
            this._hair2.destroy();
        }
    }

    get lock(): boolean {
        return this._lock;
    }
}