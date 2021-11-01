import config from "../config";

const language: {key: string, ru: string, en: string}[] = [
    {key: 'menu',   ru: 'ИГРАТЬ', en: 'PLAY'},
]

export const LanguageGetText = ( key: string ) => {
    return language.find(item => item.key === key)[config.language];
} 