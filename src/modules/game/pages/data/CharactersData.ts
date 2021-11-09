import CharacterVO, { ICharacterData } from "./CharacterVO"

const characterData = {
    race: ['p'],
    sex: ['b', 'g'],
    nacional: ['ev', 'af', 'as'],
    hairs_ev_b: 21,  
    hairs_af_b: 8,  
    hairs_as_b: 5,  
    hairs_ev_g: 34,  
    hairs_af_g: 13,  
    hairs_as_g: 12, 
    heads_ev_b: 8,
    heads_af_b: 8,
    heads_as_b: 5,
    heads_ev_g: 10,
    heads_af_g: 10,
    heads_as_g: 8,

}

export const getRandomCharacterVO = (characterSex = '') => {
    const race = characterData.race[Math.floor(Math.random() * characterData.race.length)];
    let sex = characterData.sex[Math.floor(Math.random() * characterData.sex.length)];
    if (characterSex !== '') {
        sex = characterSex;
    }
    const nacional = characterData.nacional[Math.floor(Math.random() * characterData.nacional.length)];
    const hair = Math.floor(Math.random() * (characterData[`hairs_${nacional}_${sex}`] + 1));
    const head = Math.floor(Math.random() * (characterData[`heads_${nacional}_${sex}`] + 1));
    const vo = <ICharacterData>{
        hair,
        head,
        nacional,
        race,
        sex,
        kinder: -1
    }
    return vo;
}

export const getKinderCharacterVOO = (b: CharacterVO, g: CharacterVO) => {
    const race = b.data.race === g.data.race ?
        b.data.race :
        [g.data.race, b.data.race][Math.floor(Math.random() * [g.data.race, b.data.race].length)];
    const sex = characterData.sex[Math.floor(Math.random() * characterData.sex.length)];
    const nacional = b.data.nacional === g.data.nacional ?
        b.data.nacional :
        [g.data.nacional, b.data.nacional][Math.floor(Math.random() * [g.data.nacional, b.data.nacional].length)];
    const head = Math.floor(Math.random() * (characterData[`heads_${nacional}_${sex}`] + 1));
    const hair = Math.floor(Math.random() * (characterData[`hairs_${nacional}_${sex}`] + 1));

    const vo = <ICharacterData>{
        hair,
        head,
        nacional,
        race,
        sex,
        kinder: 0
    }
}