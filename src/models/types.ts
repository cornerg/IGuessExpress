import type {Identity} from "../assets/identities.tsx";

export interface TicketData {
    name: string;
    age?: string | undefined;
    pronouns?: string | undefined;
    identities: Identity[];
    region?: string | undefined;
    photo?: string | undefined;
    interests?: string | undefined;
    about?: string | undefined;
}

export const baseTicketData: TicketData = {
    name: "",
    identities: []
}