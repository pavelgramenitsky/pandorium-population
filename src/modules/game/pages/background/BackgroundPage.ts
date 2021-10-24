import SpineController from "../../../../helpers/spineController";
import { Container, Sprite } from "pixi.js";
import { BACK_INDEX } from "../../../../assets/assetsConfig";

export default class BackgroundPage extends Container {
    private _backImage: Sprite;
    private _spinesControllers: {controller: SpineController, container: Container}[] = [];
    private _positions0: {x: number, y: number, sc: number}[] = [
        { x: 1840, y: 180, sc: 1},
        { x: 1760, y: 560, sc: 1},
        { x: 1780, y: 220, sc: -1 },
        { x: 1760, y: 610, sc: 1 },
        { x: 1690, y: 600, sc: -1 },
        { x: 1280, y: 210, sc: 1 },
        { x: 1370, y: 1030, sc: -1 },
        { x: 1210, y: 230, sc: -1 },
        { x: 570, y: 840, sc: -1 },
        { x: 550, y: 910, sc: -1 },
        { x: 1470, y: 1030, sc: 1 },
        { x: 550, y: 510, sc: 1 },
        { x: 630, y: 480, sc: 1 },
        { x: 340, y: 620, sc: 1 },
        { x: 650, y: 900, sc: 1 },
        { x: 1100, y: 730, sc: 1 },
        { x: 1040, y: 760, sc: 1 },
        { x: 1370, y: 600, sc: 1 },
        { x: 1300, y: 640, sc: 1 },
    ];
    private _currentSpine: Container;
    constructor() {
        super();

        this._backImage = Sprite.from('background');
        this.addChild(this._backImage);
        
        for (let i = 0; i < this[`_positions${BACK_INDEX}`].length; i++) {
            const cont = new Container();
            cont.position.set(this[`_positions${BACK_INDEX}`][i].x, this[`_positions${BACK_INDEX}`][i].y)
            this.addChild(cont);

            const anim = new SpineController(cont, `person${i}`, { scaleX: this[`_positions${BACK_INDEX}`][i].sc});
            anim.spineRun(0, { loop: true });

            this._spinesControllers.push({ container: cont, controller: anim});
            
            this._currentSpine = cont;
        }
        
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        const inc = 10;
        if (e.keyCode === 65) this._currentSpine.x -= inc;
        if (e.keyCode === 87) this._currentSpine.y -= inc;
        if (e.keyCode === 68) this._currentSpine.x += inc;
        if (e.keyCode === 83) this._currentSpine.y += inc;

        console.log(`{ x: ${this._currentSpine.x}, y: ${this._currentSpine.y} }`);
       
    }
}