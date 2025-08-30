import React, {type ChangeEvent} from "react";
import IGEInput from "./IGEInput.tsx";
import {allIdentities, getIdentity, type Identity} from "../assets/identities.tsx";
import IGEButton from "./IGEButton.tsx";
import IGESelect from "./IGESelect.tsx";
import IGETooltip from "./IGETooltip.tsx";
import {RxQuestionMarkCircled, RxUpload} from "react-icons/rx";
import clsx from "clsx";
import IGEDialog from "./IGEDialog.tsx";
import ticketBase from "../assets/images/TicketFinalBlank.png";

function getInitials(name: string): string {
    const words = name.split(new RegExp(/[ _]/, "g"));
    let result = "";
    for (const word of words) {
        result = result + word.substring(0, 1).toUpperCase();
    }
    return result;
}

interface Props extends React.HTMLProps<HTMLDivElement> {
    submit: () => void;
    cancel: () => void;
    formHeight: number;
    restrictHeight: boolean;
}

export default function TicketForm({submit, cancel, formHeight, restrictHeight, ...props}: Props) {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    const [name, setName] = React.useState<string>("");
    const [age, setAge] = React.useState<string | undefined>();
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

    const clickSave = React.useCallback(async () => {
        setDialogOpen(true);
        await new Promise(resolve => setTimeout(resolve, 150));
        submit();
    }, [submit])

    return <>
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
                            <p>Age <i className="opacity-60">(optional)</i></p>
                            <IGETooltip content={"Only enter your age if you're comfortable and wish to do so."}>
                                <RxQuestionMarkCircled/>
                            </IGETooltip>
                        </div>
                        <IGEInput
                            limit={8}
                            value={age}
                            onChange={(val) => setAge(String(val))}
                            className="w-full"
                        />
                    </div>

                    <div className="column gap-0 w-full flex-1">
                        <div className="w-max row gap-1 items-center">
                            <p>Pronouns <i className="opacity-60">(optional)</i></p>
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
                            <p>Region <i className="opacity-60">(optional)</i></p>
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
                    <p>Identities <i className="opacity-60">(optional)</i></p>
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
                    <p>Interests <i className="opacity-60">(optional)</i></p>
                    <IGETooltip content={"What specific games, hobbies, or other interests do you have?"}>
                        <RxQuestionMarkCircled/>
                    </IGETooltip>
                </div>
                <IGEInput
                    limit={195}
                    value={interests}
                    placeholder="Hobbies, games and pursuits..."
                    onChange={(val) => setInterests(String(val))}
                    className="w-full"
                />
            </div>

            <div className="column w-full gap-0">
                <div className="w-max row gap-1 items-center">
                    <p>About <i className="opacity-60">(optional)</i></p>
                    <IGETooltip content={"No instructions here. Write whatever you like!"}>
                        <RxQuestionMarkCircled/>
                    </IGETooltip>
                </div>
                <IGEInput
                    limit={195}
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

                <IGEDialog
                    title="Your Boarding Ticket"
                    description='Once the ticket is to your liking, click the "save" button to download an image.'
                    open={dialogOpen}
                    onOpenChange={(state) => setDialogOpen(state)}
                    className="w-[1332px] h-max min-h-[684px]"
                    content={(
                        <div className="column w-full h-full justify-between items-center leading-none">
                            <div id="ticket-element" className="w-[1300px] h-[652px] relative bg-white">
                                <img src={ticketBase} alt="background for the ticket" className="absolute w-full h-full top-0 left-0 z-0"/>
                                <div className="absolute column w-full h-full top-0 left-0 pt-[128px] pl-[48px] gap-[29px] z-1">
                                    <div className="row w-full justify-between items-center gap-[42px] pr-[48px] flex-nowrap">
                                        <h1 className="min-w-[360px] w-max text-[52px] text-center text-black">
                                            {name}
                                        </h1>
                                        <div className="row w-[216px] min-w-[216px] justify-end items-center">
                                            {identities.slice(0,4).map((identity) => {
                                                return (
                                                    <div
                                                        key={identity.key}
                                                        style={{backgroundImage: `url(${identity.flag})`}}
                                                        className="w-12 h-12 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-[#CD936C]"
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="row w-full h-[360px] gap-[42px] pr-[16px]">
                                        <div
                                            className="column w-[359px] h-[359px] justify-center items-center m-[1px] rounded-[30px] bg-cover bg-center bg-no-repeat"
                                            style={photo ? {backgroundImage: `url(${photo})`} : undefined}
                                        >
                                            {(!photo) && (
                                                <h1 className="text-8xl text-[#CD936C]">{getInitials(name)}</h1>
                                            )}
                                        </div>

                                        <div className="column w-full h-full flex-1 gap-[24px] justify-between pt-[13px]">
                                            <div className="row w-full gap-2">
                                                {(typeof age === "string" && (age.trim()).length > 0) && (
                                                    <div className="column w-[102px] gap-2">
                                                        <p className="serif text-[24px] text-[#CD936C]">Age</p>
                                                        <p className="text-[36px] text-black">{age}</p>
                                                    </div>
                                                )}

                                                {(typeof pronouns === "string" && (pronouns.trim()).length > 0) && (
                                                    <div className="column w-[320px] gap-2">
                                                        <p className="serif text-[24px] text-[#CD936C]">Pronouns</p>
                                                        <p className="text-[36px] text-black">{pronouns}</p>
                                                    </div>
                                                )}

                                                {(typeof region === "string" && (region.trim()).length > 0) && (
                                                    <div className="column w-full h-max flex-1 gap-2">
                                                        <p className="serif text-[24px] text-[#CD936C]">Region</p>
                                                        <p className="text-[36px] text-black">{region}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {(typeof interests === "string" && (interests.trim()).length > 0) && (
                                                <div className="column w-full h-max gap-2">
                                                    <p className="serif text-[24px] text-[#CD936C]">Interests</p>
                                                    <p className="text-[24px] text-black">{interests}</p>
                                                </div>
                                            )}

                                            {(typeof about === "string" && (about.trim()).length > 0) && (
                                                <div className="column w-full h-max gap-2">
                                                    <p className="serif text-[24px] text-[#CD936C]">About</p>
                                                    <p className="text-[24px] text-black">{about}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <IGEButton
                        variant="outline"
                        colour="secondary"
                        size="medium"
                        text="Preview"
                    />
                </IGEDialog>

                <IGEButton
                    variant="solid"
                    colour="primary"
                    size="medium"
                    text="Save"
                    onClick={clickSave}
                />
            </div>
        </div>
    </>
}