import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { gsapTimer } from "../../../../helpers";
import CharacterVO, { ICharacterData } from "../data/CharacterVO";
import CharacterIcon from "./ui/CharacterIcon";

export default class GameScenePage extends Container {
    private _background: Sprite;

    constructor() {
        super();
    }

    show() {
        this._background = Sprite.from('game_back');
        this.addChild(this._background);

        const vo = <ICharacterData>{
            race: 'p',
            hair: 2,
            head: 2,
            kinder: -1,
            nacional: 'af',
            sex: 'g'
        }
        const ch = new CharacterVO(vo);
        let px = 200;
        let py = 200;
        let size0 = 8
        let size1 = 6
        for (let i = 0; i < size0 * size1; i++) {
            const c = new CharacterIcon(ch);
            c.x = px;
            c.y = py;
            this.addChild(c);

            px += 110;
            if (i % size0 === size0 - 1) {
                px = 200;
                py += 110;
            }
        }

        setTimeout(() => {
            document.documentElement.requestFullscreen();
        }, 3000);
        
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