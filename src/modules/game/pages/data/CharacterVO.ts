export interface ICharacterData {
    race: string,
    nacional: string,
    sex: string,
    hair: number,
    head: number,
    kinder: number
}

export default class CharacterVO {
    private _data: ICharacterData;

    constructor(data: ICharacterData) {
        this._data = data;
    }
    
    get data(): ICharacterData {
        return this._data;
    }
}