import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { InteractionEvent } from "@pixi/interaction";
import { Point } from "@pixi/math";
import gsap from "gsap/all";
import { getDistance } from "../../../../helpers";
import { getRandomCharacterVO } from "../data/CharactersData";
import CharacterVO, { ICharacterData } from "../data/CharacterVO";
import CharacterIcon from "./ui/CharacterIcon";

export default class GameGrid extends Container {
    private _animateMoveSpeed = 0.5;
    private _bg: Graphics;
    private _currentIcon: CharacterIcon;
    private _missingIcon: CharacterIcon;
    private _charIcons: CharacterIcon[] = [];
    private _queue: CharacterIcon[] = [];
    private _iconId: number;

    constructor() {
        super();

        this.interactive = true;
        
        let px = 0;
        let py = 0;
        let size0 = window.methods.gameModel.levelGrid[0].length;
        let size1 = window.methods.gameModel.levelGrid.length;
        const missing = window.methods.gameModel.levelMissing;
        this._iconId = 0;
        for (let i = 0; i < size1; i++) {
            for (let j = 0; j < size0; j++) {
                const vo = new CharacterVO(
                    getRandomCharacterVO(
                        window.methods.gameModel.levelGrid[i][j] === 'r' ? '' : window.methods.gameModel.levelGrid[i][j]
                        )
                    );
                const isMissing = (i === missing[0] && j === missing[1]);
                const charIcon = new CharacterIcon(this._iconId, vo, isMissing ? true : false);
                charIcon.x = px;
                charIcon.y = py;
                charIcon.scale.set(1.4);
                charIcon.interactive = true;
                charIcon.buttonMode = true;
                charIcon.on('pointerdown', this.onSelectIcon.bind(this));
                this.addChild(charIcon);

                this._charIcons.push(charIcon);

                this._iconId++;
                
                if (isMissing) {
                    this._missingIcon = charIcon;
                }
                
                px += 154;
                
            }
            px = 0;
            py += 154;
        }

        this._bg = new Graphics();
        this._bg.beginFill(0, 0.75);
        this._bg.drawRoundedRect(-30, -30, this.width + 60, this.height + 60, 40);
        this.addChildAt(this._bg, 0);
    }

    private onSelectIcon(event: InteractionEvent){
        this._currentIcon = <CharacterIcon>event.currentTarget;
        let isBlock = false;
        if (getDistance(
            new Point(
                this._currentIcon.x, this._currentIcon.y),
                new Point(this._missingIcon.x, this._missingIcon.y
                )
        ) > 300) isBlock = true;

        if (this._queue.length === 1 && (getDistance(
            new Point(this._currentIcon.x, this._currentIcon.y),
            new Point(this._queue[0].x, this._queue[0].y))
                
        ) > 160) {
            isBlock = true;
        }

        if (isBlock) {
            return;
        }

        this._currentIcon.select = !this._currentIcon.select;
        this.setChildIndex(this._currentIcon, this.children.length - 1);
        if (!this._currentIcon.select) {
            this._queue = [];
        } else {
            this._queue.push(this._currentIcon);
        }
        
        if (this._queue.length === 2) {
            this.iconsSetEnabled(false);
            this.animateMove();
        }
    }

    private animateMove() {
        this._queue[0].select = false; 
        this._queue[1].select = false;
        if (this._queue[0].isMissing || this._queue[1].isMissing) {
            const tmp = {x: this._queue[1].x, y: this._queue[1].y};
            gsap.to(this._queue[1], this._animateMoveSpeed, { x: this._queue[0].x, y: this._queue[0].y });
            gsap.to(this._queue[0], this._animateMoveSpeed, { x: tmp.x, y: tmp.y, onComplete: () => { 
                this.iconsSetEnabled(true);
                this._queue = []; 
            } });
        } else if (this._queue[0].vo.data.sex === this._queue[1].vo.data.sex) {
            const tmp = {x: this._queue[1].x, y: this._queue[1].y};
            gsap.to(this._queue[1], this._animateMoveSpeed, { x: this._queue[0].x, y: this._queue[0].y });
            gsap.to(this._queue[0], this._animateMoveSpeed, { x: tmp.x, y: tmp.y, onComplete: () => { 
                const p0 = {x: this._queue[0].x, y: this._queue[0].y};
                const p1 = {x: this._queue[1].x, y: this._queue[1].y};
                gsap.to(this._queue[0], this._animateMoveSpeed, { x: p1.x, y: p1.y });
                gsap.to(this._queue[1], this._animateMoveSpeed, { x: p0.x, y: p0.y });
                this.iconsSetEnabled(true); 
                this._queue = [];
            } });
        } else {
            const pos0 = new Point(this._queue[0].x, this._queue[0].y);
            const pos1 = new Point(this._queue[1].x, this._queue[1].y);
            const direction = pos0.x === pos1.x ? 'vertical' : 'horizontal';
            const center = 
                direction === 'horizontal' ?
                Math.min(pos0.x, pos1.x) + Math.abs(pos0.x - pos1.x) / 2 :
                Math.min(pos0.y, pos1.y) + Math.abs(pos0.y - pos1.y) / 2; 
            for (let i = 0; i < this._queue.length; i++) {
                gsap.to(this._queue[i], this._animateMoveSpeed, {
                    x: direction === 'horizontal' ? center : this._queue[i].x,
                    y: direction === 'vertical' ? center : this._queue[i].y,
                    onComplete: () => {
                        if (i === this._queue.length - 1) {
                            this.createKinderIcon();
                        }
                    }
                });
            }
        }
    }

    private createKinderIcon() {
        //какая-то анимация

        this.removeCharacterIcon(this._queue[0]);
        this.removeCharacterIcon(this._queue[1]);
        
        this.iconsSetEnabled(true);
        this._queue = []; 
    }

    private removeCharacterIcon(icon: CharacterIcon) {
        for (let i = 0; i < this._charIcons.length; i++) {
            if (icon.id === this._charIcons[i].id) {
                this._charIcons.splice(i, 1);
                break;
            }
        }
        this.removeChild(icon);
        icon.destroy();
    }

    private iconsSetEnabled(disable: boolean) {
        for (let i = 0; i < this._charIcons.length; i++) {
            this._charIcons[i].interactive = disable;
        }
    }
}