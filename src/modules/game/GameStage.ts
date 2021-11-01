import gsap from "gsap";
import { Container } from "pixi.js";
import GameModel from "../../model/GameModel";
import GameBar from "./bar/GameBar";
import { PageNames } from "./pages/data/GamePageNames";
import GameScenePage from "./pages/gamescene/GameScenePage";
import MainPage from "./pages/main/MainPage";
export default class GameStage extends Container {
    private currenPage: any;

    constructor() {
        super();
        
        window.methods.sounds.play('snd_music');
        window.methods.gameModel = new GameModel();
        
        window.methods.gameBar = new GameBar();
        window.app.stage.addChild(window.methods.gameBar);
        
        window.methods.gameBar.y = -150;
        
        this.showPage(PageNames.MAIN);
    }

    showPage(pageName: string) {
        window.methods.gameRam.alpha = 0;
        gsap.to(window.methods.gameBar, 0.5, {y : -150});
        if (this.currenPage) {
            this.removeChild(this.currenPage);
            this.currenPage.destroy();
        }
        switch (pageName) {
            case PageNames.MAIN : {
                this.currenPage = new MainPage();
                break;
            }

            case PageNames.GAME_SCENE: {
                this.currenPage = new GameScenePage();
                break;
            }
        }

        this.currenPage.alpha = 0;
        this.addChild(this.currenPage);
        this.currenPage.on('Page.Load', this.pageLoaded.bind(this));
        this.currenPage.show();
    }

    private pageLoaded() {
        window.app.stage.setChildIndex(window.methods.gameRam, window.app.stage.children.length - 1);
        gsap.to(window.methods.gameRam, 1, {alpha : 1});
        
        gsap.to(this.currenPage, 1, {alpha : 1});

        gsap.to(window.methods.gameBar, 0.5, {y : 0});

        window.app.stage.setChildIndex(window.methods.gameBar, window.app.stage.children.length - 1);
        window.app.stage.setChildIndex(window.methods.gameRam, window.app.stage.children.length - 1);
        
    }

}