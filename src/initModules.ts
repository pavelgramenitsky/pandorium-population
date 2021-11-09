
import GameModel from "./model/GameModel";
import GameRam from "./modules/game/GameRam";
import GameStage from "./modules/game/GameStage";
import Sounds from "./modules/sounds";

export default () => {
  new Sounds();
  window.methods.gameRam = new GameRam();
  window.methods.gameRam.alpha = 0;
  window.app.stage.addChild(window.methods.gameRam);
  
  window.methods.gameModel = new GameModel();
  
  window.methods.gameStage = new GameStage();
  window.app.stage.addChild(window.methods.gameStage);
  
 
};
