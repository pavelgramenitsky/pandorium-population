export default (t: any) => `
  <div class="volumeWrapper">
    <button id="volumeBtn" class="volumeIcon uiIcon icon"></button>
    <div class="volControl">
      <div class="volControlInner">
        <div id="menuSliderVolume" class="menuSlider volumeSlider">
          <div class="menuSliderProgress"></div>
          <input type="range" step="1" min="0" max="100" data-name="volume" />
        </div>
      </div>
    </div>
  </div>

  <div class="menuBtnWrapper">
    <button id="menuBtn" class="menuIcon uiIcon icon"></button>
  </div>

  <div class="rulesWrapper">
    <button id="rulesBtn" class="rulesIcon uiIcon icon"></button>
  </div>

  <div id="balanceView">
    <div class="balanceViewTop">${t.ui_balance}</div>
    <div id="uiBalance"></div>
  </div>

  <div class="betView">
    <div class="betViewTop">${t.ui_bet}</div>
    <div id="uiBet"></div>
  </div>

  <div id="winView">
    <div class="winViewTop">${t.ui_win}</div>
    <div id="uiWin"></div>
  </div>

  <div id="freespinsView">
    <div class="freespinsViewTop">${t.ui_freespins}</div>
    <div id="uiFreespins"></div>
  </div>

  <div class="betBtnWrapper">
    <button id="betBtn" class="betIcon uiIcon icon"></button>
  </div>

  <div class="minusBtnWrapper">
    <button id="minusBtn" class="minusIcon uiIcon icon"></button>
  </div>

  <div class="plusBtnWrapper">
    <button id="plusBtn" class="plusIcon uiIcon icon"></button>
  </div>

  <div class="spinBtnWrapper">
    <button id="spinBtn">
      <div id="spinPlayBtn" class="spinPlayIcon uiIcon icon"></div>
      <div id="spinStopBtn" class="spinStopIcon uiIcon icon"></div>
    </button>
  </div>

  </div>
    <div class="autoplayBtnWrapper">
    ${
      window.state.deviceDetector.device.type === "desktop"
        ? `<button id="autoplayBtn">AUTOPLAY</button>`
        : `<button id="autoplayBtn" class="autoplayIcon uiIcon icon"></button>`
    }
  </div>
`;
