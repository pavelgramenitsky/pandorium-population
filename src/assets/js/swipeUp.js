import viewport from "./viewport";

export default (deviceDetector, options) => {
  function activeFullscreen() {
    return (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    )
  }

  window.toggleFullScreen = function toggleFullScreen({ allowExit = true }) {
    if (!document.fullscreenEnabled) return;

    if (activeFullscreen()) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }

      return;
    }

    if (allowExit) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  window.addEventListener("touchend", () => {
    if ((viewport.getOrientation().portrait && !options.portraitMode) || !options.toggleFullScreen) return;
    window.toggleFullScreen({ allowExit: false });
  }, false);

  if (deviceDetector.device.type === "desktop") return;

  // ===== Orientation settings =====
  const orientation     = document.createElement("div");
  orientation.id        = "orientation";
  orientation.innerHTML = `
    <div class="orientationInner">
      <div class="orientationPhone"></div>
      <div class="orientationPhoneText">Please rotate your device!</div>
    </div>
  `;

  const swipeUp     = document.createElement("div");
  swipeUp.id        = "swipeUp";
  swipeUp.innerHTML = `
    <div class="swipeUpInner">
      <div>SWIPE UP</div>
      <div>TO ENABLE FULLSCREEN</div>
    </div>
  `;

  !options.portraitMode && document.body.appendChild(orientation);
  options.enableSwipe && document.body.appendChild(swipeUp);

  if (!options.enableSwipe) return;

  // ===== Init settings =====
  let lastViewportH = window.innerHeight;

  if (viewport.getOrientation().landscape) { swipeControl(1); }
  if (viewport.getOrientation().portrait) { swipeControl(0); }

  // ===== Swipe control =====
  function swipeControl(type) {
    if (type && activeFullscreen()) {
      window.scrollTo(0, 0);
      swipeUp.style = "visibility: visible";
    } else {
      swipeUp.style = "visibility: hidden;";
    }
  }

  // ===== Init listeners =====
  window.addEventListener("resize", () => {
    const viewportH = window.innerHeight;
    const landscape = viewport.getOrientation().landscape;
    const portrait  = viewport.getOrientation().portrait;

    if (lastViewportH > viewportH && landscape) {
      swipeControl(1);
    }

    if (portrait) {
      swipeControl(0);
    }

    lastViewportH = viewportH;
  }, false);

  window.addEventListener("scroll", function () {
    if (viewport.getOrientation().portrait) {
      swipeUp.style = "visibility: hidden;";
      return;
    }

    if (this.scrollY < 100) {
      swipeUp.style = "visibility: visible";
    }

    if (this.scrollY > 100) {
      swipeUp.style = "visibility: hidden;";
    }
  }, false);
};
