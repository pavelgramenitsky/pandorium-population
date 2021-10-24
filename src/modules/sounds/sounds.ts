import  sound  from 'pixi-sound';
class Sounds {
  soundList = {};
  _sound = sound;
  _soundList = {};

  constructor() {
    
    this.soundList = {
      snd_music               : { options: { type: "snd_mainTheme", volume: 0.0, loop: true } },
    };
    
    Object.keys(this.soundList).forEach((item) => {
      // Init settings for sound
      this._sound.add(item, window.resources[item]);
    });
    
  }

  play(sound: string, onComplete: () => void): void {
    this._sound.play(sound, {
      loop: this.soundList[sound].options.loop || false,
      volume: this.soundList[sound].options.volume
    })
  }

  stop(sound: string): void {
    this._sound.stop(sound);
  }
}

export default Sounds;
