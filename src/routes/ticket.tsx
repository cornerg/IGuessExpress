import { createFileRoute } from '@tanstack/react-router';
import "../styles/ticket.css";
import * as React from "react";
import getCopy from "../copy/copy.tsx";
import IGEButton from "../components/IGEButton.tsx";
import IGEInput from "../components/IGEInput.tsx";
import {allIdentities, type Identity} from "../assets/identities.tsx";

function Ticket() {
    const [formOpen, setFormOpen] = React.useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);
    const [buttonHeight, setButtonHeight] = React.useState<number>(48);
    const [formHeight, setFormHeight] = React.useState<number>(0);

    const [name, setName] = React.useState<string | undefined>();
    const [age, setAge] = React.useState<number | undefined>();
    const [pronouns, setPronouns] = React.useState<string | undefined>();
    const [identities, setIdentities] = React.useState<Identity[]>([]);
    const [interests, setInterests] = React.useState<string | undefined>();
    const [about, setAbout] = React.useState<string | undefined>();

    const title = getCopy("ticket_title");
    const description = getCopy("ticket_description");

    const handleStart = React.useCallback(async () => {
        if (isTransitioning) {
            return;
        }
        setIsTransitioning(true);
        setButtonHeight(0);
        await new Promise(resolve => setTimeout(resolve, 250));
        setFormOpen(true);
        await new Promise(resolve => setTimeout(resolve, 10));
        setFormHeight(512);
    }, []);

    return (
        <div className="w-full h-max column justify-center pb-8" style={{minHeight: "calc(100vh - 7rem)"}}>
            <div className="page justify-self-center gap-8">
                <div className="column w-full h-max">
                    <h1 className="w-full text-center">{title}</h1>
                    <p>{description}</p>
                </div>

                {!formOpen && (
                    <div id="form-start" className="column w-full items-center">
                        <IGEButton
                            variant="solid"
                            colour="primary"
                            size="large"
                            stretch
                            text={isTransitioning ? "" : "Get started!"}
                            disabled={isTransitioning}
                            onClick={() => handleStart()}
                            style={{height: `${buttonHeight}px`, minHeight: `${buttonHeight}px`, transition: "height 250ms ease, min-height 250ms ease"}}
                        />
                    </div>
                )}

                {formOpen && (
                    <div
                        id="ticket-form"
                        className="column w-full h-max p-4 gap-6 overflow-hidden rounded-lg"
                        style={{maxHeight: `${formHeight}px`, minHeight: `${formHeight}px`, transition: "min-height 250ms ease, max-height 250ms ease"}}
                    >
                        <div className="row w-full gap-4">
                            <div className="column gap-0 flex-5">
                                <p>Display Name</p>
                                <IGEInput
                                    limit={32}
                                    value={name}
                                    placeholder="Your display name..."
                                    onChange={(val) => setName(String(val))}
                                    className="w-full"
                                />
                            </div>
                            <div className="column gap-0 flex-3">
                                <p>Age</p>
                                <IGEInput
                                    type="number"
                                    value={age}
                                    onChange={(val) => setAge(val as number)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="row w-full gap-4">
                            <div className="column gap-0 flex-3">
                                <p>Pronouns</p>
                                <IGEInput
                                    limit={16}
                                    value={pronouns}
                                    placeholder=". . . / . . ."
                                    onChange={(val) => setPronouns(String(val))}
                                    className="w-full"
                                />
                            </div>
                            <div className="column gap-0 flex-5">
                                <p>Identity</p>
                                <div className="row w-full items-center">
                                    <IGEInput
                                        limit={16}
                                        value={pronouns}
                                        placeholder=". . . / . . ."
                                        onChange={(val) => setPronouns(String(val))}
                                        className="flex-1"
                                    />
                                    <div className="row gap-1 flex-1">
                                        {identities.map(identity => {
                                            return (
                                                <div
                                                    key={identity.key}
                                                    style={{backgroundImage: `url(${identity.flag})`}}
                                                    className="w-6 h-6 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-black hover:border-white transition-colors cursor-pointer"
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column w-full gap-0">
                            <p>Interests</p>
                            <IGEInput
                                limit={128}
                                value={interests}
                                placeholder="Hobbies, games and pursuits..."
                                onChange={(val) => setInterests(String(val))}
                                className="w-full"
                            />
                        </div>

                        <div className="column w-full gap-0">
                            <p>About</p>
                            <IGEInput
                                limit={128}
                                value={about}
                                placeholder="What makes you, you..."
                                onChange={(val) => setAbout(String(val))}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export const Route = createFileRoute('/ticket')({
    component: Ticket,
})