import flagPride from "./images/flags/flagPride.png";
import flagAgender from "./images/flags/flagAgender.png";
import flagAsexual from "./images/flags/flagAsexual.png";
import flagBi from "./images/flags/flagBi.png";
import flagDemi from "./images/flags/flagDemi.png";
import flagFluid from "./images/flags/flagFluid.png";
import flagGayMen from "./images/flags/flagGayMen.png";
import flagInter from "./images/flags/flagInter.png";
import flagLesbian from "./images/flags/flagLesbian.png";
import flagNonBinary from "./images/flags/flagNonBinary.png";
import flagPan from "./images/flags/flagPan.png";
import flagQueer from "./images/flags/flagQueer.png";
import flagTrans from "./images/flags/flagTrans.png";

export interface Identity {
    label: string;
    key: string;
    flag: string;
}

export const allIdentities: Identity[] = [
    {
        label: "Pride",
        key: "pride",
        flag: flagPride
    },
    {
        label: "Agender",
        key: "agender",
        flag: flagAgender
    },
    {
        label: "Asexual",
        key: "asexual",
        flag: flagAsexual
    },
    {
        label: "Bisexual",
        key: "bisexual",
        flag: flagBi
    },
    {
        label: "Demisexual",
        key: "demisexual",
        flag: flagDemi
    },
    {
        label: "Gender fluid",
        key: "genderfluid",
        flag: flagFluid
    },
    {
        label: "Gay Men",
        key: "gay-men",
        flag: flagGayMen
    },
    {
        label: "Intersex",
        key: "intersex",
        flag: flagInter
    },
    {
        label: "Lesbian",
        key: "lesbian",
        flag: flagLesbian
    },
    {
        label: "Non-binary",
        key: "nonbinary",
        flag: flagNonBinary
    },
    {
        label: "Pansexual",
        key: "pansexual",
        flag: flagPan
    },
    {
        label: "Gender queer",
        key: "genderqueer",
        flag: flagQueer
    },
    {
        label: "Transexual",
        key: "transexual",
        flag: flagTrans
    }
]

export function getIdentity(key: string): Identity | undefined {
    return allIdentities.find(id => id.key === key);
}