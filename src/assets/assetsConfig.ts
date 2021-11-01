const gameBackIndex = Math.floor(Math.random() * 7)
export default () => {
  return [
    { name: "game_back", path: `assets/images/game_back${gameBackIndex}.jpg`},
    { name: "bar", path: `assets/images/bar.json` },
    { name: "main_buttons", path: `assets/images/main_btns.json` },
    { name: "people_man_icons", path: `assets/images/people_man.json` },
    { name: "people_woman_icons", path: `assets/images/people_woman.json` },
    
    
    //sounds
    { name: "snd_music", path: "assets/sounds/music.mp3" },

  ];
};
