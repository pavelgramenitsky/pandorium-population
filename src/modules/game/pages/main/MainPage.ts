import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import gsap from "gsap/all";
import GameRam from "../../GameRam";
import BackgroundPage from "../background/BackgroundPage";
import MainButtonPlay from "./ui/MainButtonPlay";
import MainControlls from "./ui/MainControlls";

export default class MainPage extends Container {
    private _background: BackgroundPage;
    private _controlls: MainControlls;
    constructor() {
        super();
        
    }

    show() {

        this._background = new BackgroundPage();
        this._background.on('Page.Load', this.onPageLoad.bind(this));
        this._background.show();
        this.addChild(this._background);
    }

    hide() {
        this.destroy();
    }
    
    private onPageLoad() {
        this.emit('Page.Load');

        this._controlls = new MainControlls();
        this.addChild(this._controlls);
    }

    destroy() {
        this.removeChild(this._background);
        this._background.destroy();

        this.removeChild(this._controlls);
        this._controlls.destroy();
    }
}