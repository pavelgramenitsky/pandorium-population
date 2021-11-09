import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import gsap from "gsap";
import { getRandomCharacterVO } from "../../data/CharactersData";
import CharacterVO from "../../data/CharacterVO";

export default class CharacterIcon extends Container {
    private _id: number;
    private _back: Sprite;
    private _cont: Container;

    private _body: Sprite;
    private _hair: Sprite;
    private _hair2: Sprite;
    private _head: Sprite;

    private _vo: CharacterVO;

    private _interval: NodeJS.Timeout;
    private _lock = false;
    private _isMissing: boolean;
    private _isSelect = false;

    constructor(id: number, vo: CharacterVO, missing: boolean = false) {
        super();

        this._id = id;

        this._isMissing = missing;

        this._back = Sprite.from('avatar_back_icon_0.png');
        this.addChild(this._back);

        this._cont = new Container();
        this.addChild(this._cont);

        this.createPerson(vo);
    }

    createPerson(vo: CharacterVO) {
        this._vo = vo;
        this.destroy(true);

        this._back.texture = Texture.from(`avatar_back_icon_${vo.data.kinder === -1 ? '0' : '2'}.png`);

        const isKinder = vo.data.kinder === -1 ? '' : '_k' + vo.data.kinder.toFixed();
        const bodyStr = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_body${isKinder}`;
        const hairStr = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_hair${isKinder}_${vo.data.hair}`;
        const hair2Str = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_hair2${isKinder}_${vo.data.hair}`;
        const headStr = `${vo.data.race}_${vo.data.nacional}_${vo.data.sex}_head${isKinder}_${vo.data.head}`;
        
        if (vo.data.sex === 'g') {
            this._hair2 = Sprite.from(`${hair2Str}.png`);
            this._cont.addChild(this._hair2);
        }
        
        this._body = Sprite.from(`${bodyStr}_0.png`);
        this._cont.addChild(this._body);
        
        this._head = Sprite.from(`${headStr}.png`);
        this._cont.addChild(this._head);
        
        this._hair = Sprite.from(`${hairStr}.png`);
        this._cont.addChild(this._hair);

        if (this._isMissing) {
            this._body.tint = 0;
            this._head.tint = 0;
            this._hair.tint = 0;
            if (this._hair2) {
                this._hair2.tint = 0;
            }

            this._body.alpha = 0;
            this._head.alpha = 0;
            this._hair.alpha = 0;
            if (this._hair2) {
                this._hair2.alpha = 0;
            }

            gsap.to(this._body, 0.5, {alpha : 1});
            gsap.to(this._head, 0.5, {alpha : 1});
            gsap.to(this._hair, 0.5, {alpha : 1});
            if (this._hair2) {
                gsap.to(this._hair2, 1, {alpha : 1});
            }

            this._back.texture = Texture.from(`avatar_back_icon_1.png`);

            this._interval = setTimeout(() => {
                gsap.to(this._body, 0.3, {alpha : 0});
                gsap.to(this._head, 0.3, {alpha : 0});
                gsap.to(this._hair, 0.3, {alpha : 0, onComplete: () => {
                    const vo = getRandomCharacterVO();
                    this.createPerson(new CharacterVO(vo));
                }});
                if (this._hair2) {
                    gsap.to(this._hair2, 0.5, {alpha : 0});
                }
                
            }, 3000);
        }
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
        gsap.killTweensOf(this._back);
        gsap.killTweensOf(this._head);
        gsap.killTweensOf(this._hair);
        gsap.killTweensOf(this._back.scale);

        if (this._body) {
            this._cont.removeChild(this._body);
            this._body.destroy();
            this._body = null;
        }
        if (this._hair) {
            this._cont.removeChild(this._hair);
            this._hair.destroy();
            this._hair = null;
        }
        if (this._head) {
            this._cont.removeChild(this._head);
            this._head.destroy();
            this._head = null;
        }
        
        if (this._hair2) {
            this._cont.removeChild(this._hair2);
            this._hair2.destroy();
            this._hair2 = null;
        }

        if (!isReinit) {
            clearTimeout(this._interval);

            this.removeChild(this._back);
            this._back.destroy();
            this._back = null;

            this.removeChild(this._cont);
            this._cont.destroy();
            this._cont = null;
        }
    }

    private animate(isAnimate: boolean = false) {
        const speed = 0.3;
        gsap.killTweensOf(this._back);
        gsap.killTweensOf(this._back.scale);
        if (isAnimate) {
            gsap.to(
                this._back.scale,
                speed, 
                {
                    x: this._back.scale.x === 1 ? 1.05 : 1,
                    y: this._back.scale.x === 1 ? 1.05 : 1,
                    onComplete: () => {
                        this.animate(isAnimate);
                    }
            });
            gsap.to(
                this._back,
                speed,
                {
                    x: this._back.scale.x === 1 ? -2.5 : 0,
                    y: this._back.scale.x === 1 ? -2.5 : 0,
                });
        } else {
            gsap.to(
                this._back.scale,
                speed, 
                {
                    x: 1,
                    y: 1,
            });
            gsap.to(
                this._back,
                speed,
                {
                    x: 0,
                    y: 0,
                });
        }
        
    }

    set select(value: boolean) {
        this._isSelect = value;
        this.animate(value);
        this._back.texture = Texture.from(`avatar_back_icon_${value ? '2' : '0'}.png`);
        if (this._isMissing) {
            this._back.texture = Texture.from(`avatar_back_icon_1.png`);
        }
    }

    get select(): boolean {
        return this._isSelect;
    }

    get lock(): boolean {
        return this._lock;
    }

    get isMissing(): boolean {
        return this._isMissing;
    }

    get vo(): CharacterVO {
        return this._vo;
    }

    get id(): number {
        return this._id;
    }
}