import { createFileRoute } from '@tanstack/react-router';
import "../styles/ticket.css";
import * as React from "react";
import getCopy from "../copy/copy.tsx";
import IGEButton from "../components/IGEButton.tsx";

function Ticket() {
    const [formOpen, setFormOpen] = React.useState<boolean>(false);

    const title = getCopy("ticket_title");
    const description = getCopy("ticket_description");

    return (
        <div className="page">
            <div className="column w-full h-max">
                <h1 className="w-full text-center">{title}</h1>
                <p>{description}</p>
            </div>
            <div id="welcome-form">
                <IGEButton
                    variant="solid"
                    colour="primary"
                    text={formOpen ? "Close" : "Get started!"}
                    onClick={() => setFormOpen(!formOpen)}
                />
            </div>
        </div>
    )
}

export const Route = createFileRoute('/ticket')({
    component: Ticket,
})