import SpineController from "../../../../helpers/spineController";
import { Container, Sprite, Loader } from "pixi.js";
import { 
    PositionsBack0,
    PositionsBack1,
    PositionsBack2,
    PositionsBack3,
    PositionsBack4,
    PositionsBack5 } from "./BackgroundSpinePositions";
import gsap from "gsap/all";

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
    private _loader: Loader;
    private _loaderIndex = 0;
    private _pageIndex = 0;
    constructor() {
        super();

    }

    show() {
        this._loaderIndex++;
        this._pageIndex = Math.floor(Math.random() * 6);
        this._loader = new Loader();
        this._loader.add(`background${this._pageIndex}`, `assets/images/background${this._pageIndex}.jpg`);
        for (let i = 0; i < 19; i++) {
            this._loader.add(`person${i}_${this._loaderIndex}`, `assets/images/spines/background/${this._pageIndex}/person${i}/anim.json`)
        }
        this._loader.load();

        this._loader.onComplete.add((loader) => {
            
            window.methods.preloader.hide()
            window.resources = {
                ...window.resources,
                ...loader.resources
            };
            this.generatePage();
            this.emit('Page.Load');
        })
    }

    private generatePage() {
        
        this._backImage = Sprite.from(`background${this._pageIndex}`);
        this.addChild(this._backImage);
        
        for (let i = 0; i < this[`_positions${this._pageIndex}`].length; i++) {
            const cont = new Container();
            cont.position.set(this[`_positions${this._pageIndex}`][i].x, this[`_positions${this._pageIndex}`][i].y)
            this.addChild(cont);
            const anim = new SpineController(cont, `person${i}_${this._loaderIndex}`, { scaleX: this[`_positions${this._pageIndex}`][i].sc});
            anim.spineRun(0, { loop: true });

            this._spinesControllers.push({ container: cont, controller: anim});
            
            this._currentSpine = cont;
        }
    }

    destroy() {
        this.removeChild(this._backImage);
        this._backImage.destroy();

        for (let i = 0; i < this._spinesControllers.length; i++) {
            this.removeChild(this._spinesControllers[i].container);
            this._spinesControllers[i].controller.destroy();
        }

        this._loader.destroy();
    }

    
}