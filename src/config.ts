const config = {
  
  language: 'ru',
  // Desktop
  WIDTH: 1920,
  HEIGHT: 1080,
  // Mobile landscape
  WIDTH_M_LANDSCAPE: 1920,
  HEIGHT_M_LANDSCAPE: 1080,
  // Mobile portrait
  WIDTH_M_PORTRAIT: 1920,
  HEIGHT_M_PORTRAIT: 1080,

  // Enable portrait mode when the user is at the PC
  portraitMode: true,
  tints: [0x666666, 0xffffff],
  colors: ["#fff", "#fff"],

  textStyles: [
    {
      dropShadow: true,
      dropShadowAlpha: 0.5,
      dropShadowAngle: 0.97,
      dropShadowBlur: 2,
      dropShadowDistance: 4,
      fill: ["#ffff8f", "#f5b500"],
      fontFamily: "FredokaOne-Regular",
      fontSize: 50,
      stroke: "#421a04",
      strokeThickness: 4
    },
    {
      fontFamily: "FredokaOne-Regular",
      fill: "#fdfb55",
      stroke: "#000000",
      strokeThickness: 10,
      letterSpacing: 5
    },
    {
      fontFamily: "FredokaOne-Regular",
      fill: "#ffffff",
      letterSpacing: -1,
      align: "center",
      dropShadow: true,
      dropShadowDistance: 1,
      wordWrap: true,
      wordWrapWidth: 900
    },
    {
      fontFamily: "FredokaOne-Regular",
      fill: "0xffffff",
      align: "center"
    },
    {
      fontFamily: "FredokaOne-Regular",
      fill: "#6c311b"
    },
    {
      dropShadow: true,
      dropShadowAlpha: 0.5,
      dropShadowAngle: 0.97,
      dropShadowBlur: 2,
      dropShadowDistance: 4,
      fill: ["#ffff8f", "#f5b500"],
      fontFamily: "FredokaOne-Regular",
      fontSize: 50,
      stroke: "#421a04",
      strokeThickness: 4
    }
  ]

};

export default config;
