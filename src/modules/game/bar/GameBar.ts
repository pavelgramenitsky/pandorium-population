import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";
import { Ticker } from "@pixi/ticker";
import config from "../../../config";
import { gsapTimer } from "../../../helpers";
import GameBarIcon from "./ui/GameBarIcon";
import GameBarUserIcon from "./ui/GameBarUserIcon";

export default class GameBar extends Container {
    private _mounths_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    private _mounths_ru = ["Январь", "Ферваль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    private _txtDay: Text;
    private _txtYour: Text;
    private _txtMounth: Text;
    private _txtTime: Text;

    private _iconLeaves: GameBarIcon;
    private _iconMoney: GameBarIcon;
    private _iconPeople: GameBarIcon;
    private _iconMinerals: GameBarIcon;

    private _userIcon: GameBarUserIcon;

    constructor() {
        super();

        const lineBack = Sprite.from('bar_line.png');
        lineBack.scale.x = config.WIDTH / lineBack.width;
        this.addChild(lineBack);

        const barDownPanel = Sprite.from('bar_down_panel.png');
        barDownPanel.y = 53;
        this.addChild(barDownPanel);

        this._txtDay = new Text('00', {
            fontSize: 86,
            fontFamily: 'ComicaAxis',
            fill: 0x00C8FA,
            stroke: 0x000000,
            strokeThickness: 10,
        });
        this._txtDay.y = -26;
        this._txtDay.x = 20;
        this.addChild(this._txtDay);

        this._txtYour = new Text('3015', {
            fontSize: 34,
            fontFamily: 'ComicaAxis',
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 10,
        });
        this._txtYour.y = 60;
        this._txtYour.x = this._txtDay.x + this._txtDay.width / 2 - this._txtYour.width / 2;
        this.addChild(this._txtYour);

        this._txtMounth = new Text(this._mounths_ru[0], {
            fontSize: 18,
            fontFamily: 'ComicaAxis',
            fill: 0x00C8FA,
        });
        this._txtMounth.y = 27;
        this._txtMounth.x = 172;
        this.addChild(this._txtMounth);

        this._txtTime = new Text(' 00:00 ', {
            fontSize: 30,
            fontFamily: 'ComicaAxis',
            fill: 0xffcc00,
        });
        this._txtTime.y = 53;
        this._txtTime.x = 160;
        this.addChild(this._txtTime);

        this._iconLeaves = new GameBarIcon('bar_icon_leaves.png');
        this._iconLeaves.x = 400;
        this.addChild(this._iconLeaves);

        this._iconPeople = new GameBarIcon('bar_icon_people.png');
        this._iconPeople.x = this._iconLeaves.x + this._iconLeaves.width;
        this.addChild(this._iconPeople);

        this._iconMoney = new GameBarIcon('bar_icon_money.png');
        this._iconMoney.x = this._iconPeople.x + this._iconPeople.width;
        this.addChild(this._iconMoney);

        this._iconMinerals = new GameBarIcon('bar_icon_minerals.png');
        this._iconMinerals.x = this._iconMoney.x + this._iconMoney.width;
        this.addChild(this._iconMinerals);

        const backPanel = Sprite.from('bar_back_panel.png');
        backPanel.x = config.WIDTH - backPanel.width;
        this.addChild(backPanel);

        this._userIcon = new GameBarUserIcon();
        this._userIcon.x = backPanel.x + 155;
        this._userIcon.y = 58;
        this.addChild(this._userIcon);



        gsapTimer( () => { this.update() }, 0.01);
    }

    private update() {
        const date = new Date();
        this._txtDay.text = (date.getDate() < 10 ? '0' + date.getDate().toFixed() : date.getDate().toFixed());
        this._txtDay.x = 86 - this._txtDay.width / 2;
        this._txtYour.text = (date.getFullYear() + 1100).toFixed();
        this._txtTime.text = `${date.getHours() < 10 ? '0' + date.getHours().toFixed() : date.getHours().toFixed()}:${date.getMinutes() < 10 ? '0' + date.getMinutes().toFixed() : date.getMinutes().toFixed()}`;
        this._txtMounth.text = this[`_mounths_${config.language}`][date.getMonth()];
        gsapTimer( () => { this.update.bind(this) }, 1);

        
    }
}