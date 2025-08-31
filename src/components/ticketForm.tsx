import React, {type ChangeEvent} from "react";
import IGEInput from "./primitives/IGEInput.tsx";
import {allIdentities, getIdentity} from "../assets/identities.tsx";
import IGEButton from "./primitives/IGEButton.tsx";
import IGESelect from "./primitives/IGESelect.tsx";
import IGETooltip from "./primitives/IGETooltip.tsx";
import {RxQuestionMarkCircled, RxUpload} from "react-icons/rx";
import clsx from "clsx";
import IGEDialog from "./primitives/IGEDialog.tsx";
import {baseTicketData, type TicketData} from "../models/types.ts";
import RenderedTicket from "./renderedTicket.tsx";



interface Props extends React.HTMLProps<HTMLDivElement> {
    submit: () => void;
    cancel: () => void;
    formHeight: number;
    restrictHeight: boolean;
}

export default function TicketForm({submit, cancel, formHeight, restrictHeight, ...props}: Props) {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [ticketData, setTicketData] = React.useState<TicketData>(baseTicketData);
    
    const addIdentity = React.useCallback((key: string) => {
        if(!ticketData.identities.find(id => id.key === key)) {
            const identity = getIdentity(key);
            if (identity) {
                setTicketData({...ticketData, identities: [...ticketData.identities, identity]});
            }
        }
    }, [ticketData])

    const removeIdentity = React.useCallback((key: string)=> {
        setTicketData({
            ...ticketData,
            identities: ticketData.identities.filter(id => id.key !== key)
        });
    }, [ticketData]);

    const uploadPhoto = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const image = event.target?.files?.[0];
        if(image) {
            setTicketData({...ticketData, photo: URL.createObjectURL(image)});
        }
    }, [ticketData]);
    
    const editField = React.useCallback((field: keyof TicketData, value: string | number | boolean | undefined) => {
        setTicketData({...ticketData, [field]: String(value)});
    }, [ticketData]);

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
                        value={ticketData.name}
                        placeholder="Your display name..."
                        onChange={(val) => editField("name", val)}
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
                            value={ticketData.age}
                            onChange={(val) => editField("age", val)}
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
                            value={ticketData.pronouns}
                            placeholder=". . . / . . ."
                            onChange={(val) => editField("pronouns", val)}
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
                            value={ticketData.region}
                            placeholder={`Where you're "from"...`}
                            onChange={(val) => editField("region", val)}
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
                        style={ticketData.photo ? {backgroundImage: `url(${ticketData.photo})`} : undefined}
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
                                    "bg-teal-900 opacity-0 hover:opacity-80": !!ticketData.photo
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
                        placeholder={ticketData.identities.length >= 4 ? "Max flags" : "Add a flag..."}
                        value={""}
                        options={allIdentities}
                        onChange={(value) => addIdentity(value ?? "")}
                        className="w-full flex-1"
                        disabled={ticketData.identities.length >= 4}
                    />

                    <div className="row gap-1 w-[140px]">
                        {ticketData.identities.map(identity => {
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
                    value={ticketData.interests}
                    placeholder="Hobbies, games and pursuits..."
                    onChange={(val) => editField("interests", val)}
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
                    value={ticketData.about}
                    placeholder="What makes you, you..."
                    onChange={(val) => editField("about", val)}
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
                            <RenderedTicket data={ticketData} />
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