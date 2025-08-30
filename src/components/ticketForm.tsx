import React, {type ChangeEvent} from "react";
import IGEInput from "./IGEInput.tsx";
import {allIdentities, getIdentity, type Identity} from "../assets/identities.tsx";
import IGEButton from "./IGEButton.tsx";
import IGESelect from "./IGESelect.tsx";
import IGETooltip from "./IGETooltip.tsx";
import {RxQuestionMarkCircled, RxUpload} from "react-icons/rx";
import clsx from "clsx";

interface Props extends React.HTMLProps<HTMLDivElement> {
    submit: () => void;
    cancel: () => void;
    formHeight: number;
    restrictHeight: boolean;
}

export default function TicketForm({submit, cancel, formHeight, restrictHeight, ...props}: Props) {
    const [name, setName] = React.useState<string | undefined>();
    const [age, setAge] = React.useState<number | undefined>();
    const [pronouns, setPronouns] = React.useState<string | undefined>();
    const [identities, setIdentities] = React.useState<Identity[]>([]);
    const [region, setRegion] = React.useState<string | undefined>();
    const [photo, setPhoto] = React.useState<string | undefined>();
    const [interests, setInterests] = React.useState<string | undefined>();
    const [about, setAbout] = React.useState<string | undefined>();
    
    const addIdentity = React.useCallback((key: string) => {
        if(!identities.find(id => id.key === key)) {
            const identity = getIdentity(key);
            if (identity) {
                setIdentities([...identities, identity]);
            }
        }
    }, [identities])

    const removeIdentity = React.useCallback((key: string)=> {
        setIdentities(identities.filter(id => id.key !== key));
    }, [identities]);

    const uploadPhoto = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const image = event.target?.files?.[0];
        if(image) {
            setPhoto(URL.createObjectURL(image));
        }
    }, []);

    return (
        <div
            id="ticket-form"
            className="column w-full h-max justify-start p-4 gap-6 overflow-hidden rounded-lg"
            style={{
                maxHeight: restrictHeight ? `${formHeight}px` : undefined,
                minHeight: restrictHeight ? `${formHeight}px` : undefined,
                transition: "min-height 250ms ease, max-height 250ms ease"
            }}
            {...props}
        >
            <p>Fill out only the information you feel comfortable providing, and avoid adding any private information.</p>
            <div className="row w-full gap-4 justify-center">
                <div className="column gap-0 flex-1 max-w-96">
                    <div className="w-max row gap-1 items-center">
                        <p>Display Name</p>
                        <IGETooltip content={"What do you want to be known as in the community?"}>
                            <RxQuestionMarkCircled/>
                        </IGETooltip>
                    </div>
                    <IGEInput
                        limit={32}
                        value={name}
                        placeholder="Your display name..."
                        onChange={(val) => setName(String(val))}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="row w-full items-stretch gap-4">
                <div className="column gap-4 flex-5">
                    <div className="column gap-0 w-full flex-1">
                        <div className="w-max row gap-1 items-center">
                            <p>Age</p>
                            <IGETooltip content={"Only enter your age if you're comfortable and wish to do so."}>
                                <RxQuestionMarkCircled/>
                            </IGETooltip>
                        </div>
                        <IGEInput
                            type="number"
                            value={age}
                            onChange={(val) => setAge(val as number)}
                            className="w-full"
                        />
                    </div>

                    <div className="column gap-0 w-full flex-1">
                        <div className="w-max row gap-1 items-center">
                            <p>Pronouns</p>
                            <IGETooltip content={"How do you want people to refer to you?"}>
                                <RxQuestionMarkCircled/>
                            </IGETooltip>
                        </div>
                        <IGEInput
                            limit={16}
                            value={pronouns}
                            placeholder=". . . / . . ."
                            onChange={(val) => setPronouns(String(val))}
                            className="w-full"
                        />
                    </div>

                    <div className="column gap-0 w-full flex-1">
                        <div className="w-max row gap-1 items-center">
                            <p>Region</p>
                            <IGETooltip content={"State? Country? Planet Earth? Mushroom Kingdom? Go crazy! But avoid stating your real address."}>
                                <RxQuestionMarkCircled/>
                            </IGETooltip>
                        </div>
                        <IGEInput
                            limit={16}
                            value={region}
                            placeholder={`Where you're "from"...`}
                            onChange={(val) => setRegion(String(val))}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="column gap-0 w-full h-auto justify-stretch flex-2">
                    <div className="w-max row gap-1 items-center">
                        <p>Profile Picture</p>
                        <IGETooltip content={"Your display image. Could be Discord photo or something different."}>
                            <RxQuestionMarkCircled/>
                        </IGETooltip>
                    </div>
                    <div
                        className="column justify-stretch items-stretch w-full h-full flex-1 border-1 rounded-md border-gray-600 bg-black bg-cover bg-center"
                        style={photo ? {backgroundImage: `url(${photo})`} : undefined}
                    >
                        <input type="file"
                               id="image-uploader-logo"
                               accept="image/x-png, image/jpeg, image/webp, image/svg+xml, image/gif"
                               style={{display: "none"}}
                               onChange={uploadPhoto}
                        />
                        <label
                            htmlFor="image-uploader-logo"
                            className={clsx(
                                "w-auto h-auto flex-1 column justify-stretch items-stretch transition-opacity cursor-pointer",
                                {
                                    "bg-teal-900 opacity-0 hover:opacity-80": !!photo
                                }
                            )}
                        >
                            <div className="row justify-center items-center w-auto h-auto flex-1">
                                <RxUpload style={{width: "32px", height: "32px", flex: 1}}/>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="column w-full gap-0 flex-5">
                <div className="w-max row gap-1 items-center">
                    <p>Identities</p>
                    <IGETooltip content={"Add up to 4 flags to represent your identity."}>
                        <RxQuestionMarkCircled/>
                    </IGETooltip>
                </div>
                <div className="row w-full items-center">
                    <IGESelect
                        placeholder={identities.length >= 4 ? "Max flags" : "Add a flag..."}
                        value={""}
                        options={allIdentities}
                        onChange={(value) => addIdentity(value ?? "")}
                        className="w-full flex-1"
                        disabled={identities.length >= 4}
                    />

                    <div className="row gap-1 w-[140px]">
                        {identities.map(identity => {
                            return (
                                <div
                                    key={identity.key}
                                    style={{backgroundImage: `url(${identity.flag})`}}
                                    className="w-8 h-8 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-black hover:border-white transition-colors cursor-pointer"
                                    onClick={() => removeIdentity(identity.key)}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="column w-full gap-0">
                <div className="w-max row gap-1 items-center">
                    <p>Interests</p>
                    <IGETooltip content={"What specific games, hobbies, or other interests do you have?"}>
                        <RxQuestionMarkCircled/>
                    </IGETooltip>
                </div>
                <IGEInput
                    limit={128}
                    value={interests}
                    placeholder="Hobbies, games and pursuits..."
                    onChange={(val) => setInterests(String(val))}
                    className="w-full"
                />
            </div>

            <div className="column w-full gap-0">
                <div className="w-max row gap-1 items-center">
                    <p>About</p>
                    <IGETooltip content={"No instructions here. Write whatever you like!"}>
                        <RxQuestionMarkCircled/>
                    </IGETooltip>
                </div>
                <IGEInput
                    limit={128}
                    value={about}
                    placeholder="What makes you, you..."
                    onChange={(val) => setAbout(String(val))}
                    className="w-full"
                />
            </div>

            <div className="row w-full gap-2 justify-end align-items-center">
                <IGEButton
                    variant="outline"
                    colour="secondary"
                    size="medium"
                    text="Cancel"
                    onClick={() => cancel()}
                />
                <IGEButton
                    variant="solid"
                    colour="primary"
                    size="medium"
                    text="Submit"
                    onClick={() => submit()}
                />
            </div>
        </div>
    )
}