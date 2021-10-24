
import GameRam from "./modules/game/GameRam";
import GameStage from "./modules/game/GameStage";
import Sounds from "./modules/sounds";

export default () => {
  new Sounds();
  window.methods.gameStage = new GameStage();
  window.app.stage.addChild(window.methods.gameStage);
  window.app.stage.addChild(new GameRam());
 
};
