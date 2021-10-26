import SpineController from "../../../../helpers/spineController";
import { Container, Sprite } from "pixi.js";
import { BACK_INDEX } from "../../../../assets/assetsConfig";
import { 
    PositionsBack0,
    PositionsBack1,
    PositionsBack2,
    PositionsBack3,
    PositionsBack4,
    PositionsBack5 } from "./BackgroundSpinePositions";

export default class BackgroundPage extends Container {
    private _backImage: Sprite;
    private _spinesControllers: {controller: SpineController, container: Container}[] = [];
    private _positions0 = PositionsBack0;
    private _positions1 = PositionsBack1;
    private _positions2 = PositionsBack2;
    private _positions3 = PositionsBack3;
    private _positions4 = PositionsBack4;
    private _positions5 = PositionsBack5;
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