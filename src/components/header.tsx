import "../styles/header.css";
import {RxInfoCircled} from "react-icons/rx";
import IGEDialog from "./primitives/IGEDialog.tsx";
import React from "react";

export default function Header() {
    const [infoDialogOpen, setInfoDialogOpen] = React.useState<boolean>(false);

    return (
        <>
            <div id="header" className="row justify-between align-center">
                <h2 className="text-xl">I Guess Express</h2>
                <div
                    className="row w-max h-5 items-center gap-1 cursor-pointer hover:text-teal-500 hover:stroke-teal-500"
                    onClick={() => setInfoDialogOpen(true)}
                >
                    <p className="text-inherit transition-colors">About</p>
                    <RxInfoCircled className="stroke-inherit transition-colors" style={{width: "18px", height: "18px"}}/>
                </div>

                <IGEDialog
                    title="About This Page"
                    description="All the basic info you may need."
                    open={infoDialogOpen}
                    onOpenChange={(state) => setInfoDialogOpen(state)}
                    content={(
                        <div className="column max-w-5xl h-full gap-4 overflow-y-auto" style={{width: "calc(100vw - 48px)"}}>
                            <div className="column w-full h-max gap-0">
                                <h3 className="font-bold">What is this?</h3>
                                <p className="text-[0.875rem]">
                                    The <strong>I Guess Express</strong> is a Discord server run by <strong>Jess I Guess</strong>, inspired by the Excess Express from Paper Mario: The Thousand Year Door. This app simply exists to create a fake "boarding ticket" to serve as an alternative means to introduce yourself.
                                </p>
                            </div>

                            <div className="column w-full h-max gap-0">
                                <h3 className="font-bold">How do I use this app?</h3>
                                <p className="text-[0.875rem]">
                                    Although most of the process should be self-explanatory, the "identities" field is slightly more complex.<br/>You can add identities by selecting an option, though only 4 identities can be selected at once. To remove active identities, click one of the flags. This can also be used to rearrange flags: simply remove and re-add as necessary.
                                </p>
                            </div>

                            <div className="column w-full h-max gap-0">
                                <h3 className="font-bold">What information should I add?</h3>
                                <p className="text-[0.875rem]">
                                    This process exists purely for fun, so <strong>do not add any sensitive information</strong> such as your personal address. Other personal information including your actual age or first name may be added if you really desire, but this is absolutely not expected. You may populate fields with whatever fun, nonsensical data you wish, and any optional fields left blank will not be shown in the final ticket.
                                </p>
                            </div>

                            <div className="column w-full h-max gap-0">
                                <h3 className="font-bold">Is this app safe to use?</h3>
                                <p className="text-[0.875rem]">
                                    The original plan was to use an external API to create the image, which posed challenges with sending data and scaling for a growing community. However, this was immediately solved with the use of a client-side HTML-to-image library. This means the image is generated entirely within your browser; <strong>none of the data you enter here is stored outside of your local environment</strong>. Feel free to enter whatever you want and generate as many images as you please!
                                </p>
                            </div>

                            <div className="column w-full h-max gap-0">
                                <h3 className="font-bold">Who created this app?</h3>
                                <p className="text-[0.875rem]">
                                    This app was created purely with React by <strong>Jess I Guess</strong>, and the original pitch for the idea was created by <strong>Aven</strong>. For privacy, further contact info for these users is not displayed here, but can be found on the Discord server.
                                </p>
                            </div>
                        </div>
                    )}
                />
            </div>
        </>
    )
}