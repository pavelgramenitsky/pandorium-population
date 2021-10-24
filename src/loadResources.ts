import WebFont from "webfontloader";
import * as PIXI from "pixi.js";
import PreloaderContainer from "./modules/ui/buttons/loader/PreloaderContainer";

interface IAssets {
  name: string;
  path: string;
  options?: any;
}
export const webFontLoad = () => {
  WebFont.load({
    custom: {
      urls: [`assets/fonts/main.css`]
    }
  });
};

function load(loader: PIXI.Loader, assets: IAssets[], onLoaded: () => void) {
  webFontLoad();

  assets.forEach(({ name, path, options }) => loader.add(name, path, options));
  
  const loaderPreloader = new PIXI.Loader();
  loaderPreloader.add('preloaderImages', 'assets/images/loader_images.json');

  
  loaderPreloader.load();
  loaderPreloader.onComplete.add(({resources}) => {
    window.methods.preloader = new PreloaderContainer();
    window.methods.preloader.show();
    window.app.stage.addChild(window.methods.preloader);

    loader.load();

    loader.onProgress.add(({ progress }) => {
      window.methods.preloader.percent = progress;
    });
    loader.onComplete.add(({ resources }) => {
      window.methods.preloader.percent = 100;
      window.methods.preloader.hide()
      window.resources = {
        ...window.resources,
        ...resources
      };
      onLoaded();
      window.app.stage.setChildIndex(window.methods.preloader, window.app.stage.children.length - 1);
      
    });
  })

}

export default {
  load
};
