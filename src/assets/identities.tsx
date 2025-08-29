import flagLesbian from "./images/flags/flagLesbian.png";
import flagGayMen from "./images/flags/flagGayMen.png";

export interface Identity {
    name: string;
    key: string;
    flag: string;
}

export const allIdentities: Identity[] = [
    {
        name: "Lesbian",
        key: "lesbian",
        flag: flagLesbian
    },
    {
        name: "Gay Men",
        key: "gay-men",
        flag: flagGayMen
    }
]