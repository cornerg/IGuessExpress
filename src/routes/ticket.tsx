import { createFileRoute } from '@tanstack/react-router';
import "../styles/ticket.css";
import * as React from "react";
import IGEButton from "../components/IGEButton.tsx";
import TicketForm from "../components/ticketForm.tsx";
import * as htmlToImage from 'html-to-image';

const BUTTON_HEIGHT = 48;
const FORM_HEIGHT = 708;

function Ticket() {
    const [formOpen, setFormOpen] = React.useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);
    const [buttonHeight, setButtonHeight] = React.useState<number>(48);
    const [formHeight, setFormHeight] = React.useState<number>(0);

    const openForm = React.useCallback(async () => {
        if (isTransitioning) {
            return;
        }
        setIsTransitioning(true);
        setButtonHeight(0);
        await new Promise(resolve => setTimeout(resolve, 250));
        setFormOpen(true);
        await new Promise(resolve => setTimeout(resolve, 10));
        setFormHeight(FORM_HEIGHT);
        await new Promise(resolve => setTimeout(resolve, 210));
        setIsTransitioning(false);
    }, [isTransitioning]);

    const closeForm = React.useCallback(async () => {
        if (isTransitioning) {
            return;
        }
        setIsTransitioning(true);
        await new Promise(resolve => setTimeout(resolve, 210));
        setFormHeight(0);
        await new Promise(resolve => setTimeout(resolve, 210));
        setFormOpen(false);
        await new Promise(resolve => setTimeout(resolve, 10));
        setButtonHeight(BUTTON_HEIGHT);
        setIsTransitioning(false);
    }, [isTransitioning]);

    const submit = React.useCallback(() => {
        const element = document.getElementById("ticket-element")
        if (!element) {
            console.error("Could not find a ticket element.");
            return;
        }
        htmlToImage
            .toPng(element)
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    const cancel = React.useCallback(() => {
        closeForm().then(() => console.log("Form reset."));
    }, [closeForm]);

    return (
        <div className="w-full h-max column justify-center pb-8" style={{minHeight: "calc(100vh - 7rem)"}}>
            <div className="page justify-self-center gap-8">
                <div className="column w-full h-max">
                    <h1 className="w-full text-center">
                        Welcome aboard the I Guess Express!
                    </h1>
                    <p>
                        As a passenger of the Express, you are invited to create your very own <strong>boarding ticket!</strong> A way to represent who you are to share with the rest of the community.
                    </p>
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
                            onClick={() => openForm()}
                            style={{height: `${buttonHeight}px`, minHeight: `${buttonHeight}px`, transition: "height 250ms ease, min-height 250ms ease"}}
                        />
                    </div>
                )}

                {formOpen && (
                    <TicketForm submit={submit} cancel={cancel} formHeight={formHeight} restrictHeight={isTransitioning}/>
                )}
            </div>
        </div>
    )
}

export const Route = createFileRoute('/ticket')({
    component: Ticket,
})