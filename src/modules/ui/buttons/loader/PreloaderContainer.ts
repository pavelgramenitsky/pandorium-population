import config from "../../../../config";
import gsap from "gsap";
import { Container, Sprite, Text, TextStyle, Ticker } from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
export default class PreloaderContainer extends Container {
    private _ticker: Ticker;
    private _dt: number;
    private _percent: number;
    private _txt: Text;
    private _sprites: Sprite[] = [];
    constructor() {
        super();

        this.filters = [new DropShadowFilter()];
        
        this._ticker = new Ticker()
        this._dt = 0
       
        this._percent = 0

        const style = new TextStyle({
            fontFamily: 'ComicaAxis',
            fontSize: 62,
            align: 'center',
            fill: ['#ffffff'],
            stroke: '#000000',
            strokeThickness: 9,
        });

        this._txt = new Text('0%', style)
        this._txt.x = config.WIDTH / 2 - this._txt.width / 2
        this._txt.y = config.HEIGHT / 2 - this._txt.height / 2
        this.addChild(this._txt)

        for (let i = 0; i < 4; i++) {
            const sprt = Sprite.from(`loader${i}.png`);
            sprt.x = config.WIDTH / 2; 
            sprt.y = config.HEIGHT / 2; 
            sprt.pivot.set(sprt.width / 2, sprt.height / 2)
            this._sprites.push(sprt)
            this.addChild(sprt)
        }
        this.setChildIndex(this._txt, this.children.length - 1)

        this.visible = false;
    }

    show() {
        gsap.killTweensOf(this);
        this.alpha = 1
        this.percent = 0
        this.visible = true
        this._animate(true)
    }

    hide() {
        gsap.to(this, {duration: 1, alpha: 0, onComplete: () => {
            this.visible = false;
            this._animate(false);
        }})
    }

    _animate(isStart) {
       
        if (isStart){
            this._ticker.add(this._update.bind(this))
            this._ticker.start()
        }else {
            this._ticker.stop()
            this._ticker.remove(this._update.bind(this))
        }
    }
    
    _update(){
        this._dt += 0.5
        
        if (this._dt >= 1)
        {
            this._dt = 0
           
            for (let i = 0; i < this._sprites.length; i++) {
                
                this._sprites[i].rotation += (i % 2 === 0 ? 0.1 : -0.1)
            } 
        }

        this._txt.text = `${Math.floor(this._percent).toString()}%`
        this._txt.x = 1920 / 2 - this._txt.width / 2
    }

    set percent(value: number) {
        this._percent = value
    }

}