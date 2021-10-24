export default (t: any) => `
  <div id="menuContent">
    <div class="menuContentTab" data-name="bet">
      <div id="menuContentTabBet" class="menuContentTabInner">
        <div class="menuContentTabTitle">${t.tab_title_bet}</div>
        <div class="bidBlocks"></div>

        <div id="menuSliderBet" class="menuSlider">
          <div class="menuSliderEdge edgeLeft"></div>
          <div class="menuSliderInner">
            <div class="menuSliderTooltip">
              <div class="tooltipSlide"></div>
            </div>
            <div class="menuSliderProgress"></div>
            <input type="range" step="1" min="0" max="10" data-name="bet" />
          </div>
          <div class="menuSliderEdge edgeRight"></div>
        </div>

        <div class="btnWrapper btnWrapperBet">
          <button id="selectBetBtn">${t.tab_selectBet}</button>
        </div>
      </div>
    </div>

    <div class="menuContentTab" data-name="settings">
      <div id="menuContentTabSettings" class="menuContentTabInner">
        <div class="menuContentTabTitle">${t.tab_title_settings}</div>
        <div class="menuSwitch">
          <span class="menuSwitchTitle">${t.tab_sound}</span>
          <label id="sound" class="settingsCheckbox">
            <span class="settingsCheckboxButton"></span>
            <input type="checkbox" name="sound" />
          </label>
        </div>
        <div class="menuSwitch">
          <span class="menuSwitchTitle">${t.tab_turboSpin}</span>
          <label id="quickSpin" class="settingsCheckbox">
            <span class="settingsCheckboxButton"></span>
            <input type="checkbox" name="quickSpin" />
          </label>
        </div>
        <div class="menuSwitch">
          <span class="menuSwitchTitle">${t.tab_hideCurrency}</span>
          <label id="hideCurrency" class="settingsCheckbox">
            <span class="settingsCheckboxButton"></span>
            <input type="checkbox" name="hideCurrency" />
          </label>
        </div>
        ${
          window.state.deviceDetector.device.type !== "desktop"
            ? `<div class="menuSwitch">
              <span class="menuSwitchTitle">${t.tab_leftHandMode}</span>
              <label id="leftHandMode" class="settingsCheckbox">
                <span class="settingsCheckboxButton"></span>
                <input type="checkbox" name="leftHandMode" />
              </label>
            </div>`
            : ""
        }
      </div>
    </div>

    <div class="menuContentTab" data-name="autoplay">
      <div id="menuTabAutoplay" class="menuContentTabInner">
        <div class="menuContentTabTitle">${t.tab_title_autoplay}</div>
        <div class="autoplayLine">
          <div class="autoplayLineTitle">${t.tab_bet}</div>
          <div id="menuSliderBetAP" class="menuSlider">
            <div class="menuSliderEdge edgeLeft"></div>
            <div class="menuSliderInner">
              <div class="menuSliderTooltip">
                <div class="tooltipSlide">0</div>
              </div>
              <div class="menuSliderProgress"></div>
              <input type="range" step="1" min="0" max="0" data-name="betAP" />
            </div>
            <div class="menuSliderEdge edgeRight"></div>
          </div>
        </div>

        <div class="autoplayLine">
          <div class="autoplayLineTitle">${t.tab_autoplay}</div>
          <div class="menuSlider">
            <div class="menuSliderEdge edgeLeft"></div>
            <div class="menuSliderInner">
              <div class="menuSliderTooltip">
                <div class="tooltipSlide"></div>
              </div>
              <div class="menuSliderProgress"></div>
              <input type="range" step="1" min="0" max="0" data-name="autoplayCountAP" />
            </div>
            <div class="menuSliderEdge edgeRight"></div>
          </div>
        </div>

        <div>${t.tab_stopAutoplay}:</div>

        <div class="autoplayLine autoplayLineCustom">
          <div class="autoplayLineTitle">${t.tab_ifBalanceIncreasesBy}</div>
          <div class="menuSlider">
            <div class="menuSliderEdge edgeLeft"></div>
            <div class="menuSliderInner">
              <div class="menuSliderTooltip">
                <div class="tooltipSlide"></div>
              </div>
              <div class="menuSliderProgress"></div>
              <input type="range" step="1" min="0" max="0" data-name="balanceIncAP" />
            </div>
            <div class="menuSliderEdge edgeRight"></div>
          </div>
        </div>
        <div class="autoplayLine autoplayLineCustom">
          <div class="autoplayLineTitle">${t.tab_ifBalanceDecreasesBy}</div>
          <div class="menuSlider">
            <div class="menuSliderEdge edgeLeft"></div>
            <div class="menuSliderInner">
              <div class="menuSliderTooltip">
                <div class="tooltipSlide"></div>
              </div>
              <div class="menuSliderProgress"></div>
              <input type="range" step="1" min="0" max="0" data-name="balanceDecAP" />
            </div>
            <div class="menuSliderEdge edgeRight"></div>
          </div>
        </div>
        <div class="menuSwitch" style="display: none;">
          <span class="menuSwitchTitle">${t.tab_IfFreeSpinsAreWon}</span>
          <label id="freeSpinsWonAP" class="settingsCheckbox">
            <span class="settingsCheckboxButton"></span>
            <input type="checkbox" name="freeSpinsWonAP" />
          </label>
        </div>

        <div class="btnWrapper btnWrapperAutoplay">
          <button id="startAutoplayBtn">${t.tab_start}</button>
        </div>
      </div>
    </div>

    <div class="menuContentTab" data-name="paytables">
      <div class="viewContainer menuContentTabInner menuContentTabInnerPaytables">${t.paytables}</div>
      <button id="closePaytableBtn" class="closePaytableIcon uiIcon icon"></button>
    </div>
  </div>
`;
