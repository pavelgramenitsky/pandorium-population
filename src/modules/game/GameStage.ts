import gsap from "gsap";
import { Container } from "pixi.js";
import BackgroundPage from "./pages/background/BackgroundPage";
export default class GameStage extends Container {
    private background: BackgroundPage;

    constructor() {
        super();
        this.alpha = 0;
        gsap.to(this, 1, {alpha : 1});
        window.methods.sounds.play('snd_music');
        this.background = new BackgroundPage();
        this.addChild(this.background);
    }

}