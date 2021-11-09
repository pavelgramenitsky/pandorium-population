function getOrientation() {
  if (window.matchMedia("(orientation: landscape)").matches) return { landscape: true, text: "landscape", short: "l" };
  if (window.matchMedia("(orientation: portrait)").matches) return { portrait: true, text: "portrait", short: "p" };
}

function getOrientationType(deviceType) {
  switch (deviceType) {
    case "desktop":
      return deviceType;
    default:
      return `mobile_${getOrientation().short}`;
  }
}

const resizeViewport = (config, deviceType) => {
  const viewport = document.getElementById("viewport");
  const portraitMode = config.portraitMode && window.innerWidth < window.innerHeight;

  let currentWidth = 0;
  let currentHeight = 0;

  if (getOrientationType(deviceType) === "mobile_p" || portraitMode) {
    document.body.id = "mobileView";
    currentWidth = config.WIDTH_M_PORTRAIT;
    currentHeight = config.HEIGHT_M_PORTRAIT;
  }

  if (getOrientationType(deviceType) === "mobile_l") {
    document.body.id = "mobileView";
    currentWidth = config.WIDTH_M_LANDSCAPE;
    currentHeight = config.HEIGHT_M_LANDSCAPE;
  }

  if (getOrientationType(deviceType) === "desktop" && !portraitMode) {
    document.body.id = "desktopView";
    currentWidth = config.WIDTH;
    currentHeight = config.HEIGHT;
  }
  
  const scaleWidth = window.innerWidth / currentWidth;
  const scaleHeight = window.innerHeight / currentHeight;
  const top = (window.innerHeight - currentHeight * scaleWidth) / 2;
  const left = (window.innerWidth - currentWidth * scaleHeight) / 2;

  const transformScale = scaleHeight > scaleWidth ? scaleWidth.toFixed(3) : scaleHeight.toFixed(3);
  window.app.renderer.resize(currentWidth, currentHeight);
  viewport.style = `
    transform: scale(${transformScale});
    top: ${top <= 0 ? 0 : top}px;
    left: ${left <= 0 ? 0 : left}px;
    display: block;
  `;
  return { currentWidth, currentHeight };
};

const handleResize = (config) => {
  let resizeTimeout;

  const resizeCommon = () => {
    resizeViewport(config, window.state.deviceDetector.device.type);
    window.methods.orientation.handleOrientation();
  };

  resizeCommon();

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => resizeCommon(), 100);
    },
    false
  );
};

export default {
  getOrientation,
  getOrientationType,
  resizeViewport,
  handleResize
};
