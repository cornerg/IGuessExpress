import {Dialog} from "radix-ui";
import React from "react";
import {RxCross2} from "react-icons/rx";
import "../styles/dialog.css";
import clsx from "clsx";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
    children: React.ReactNode;
    title: string;
    description: string;
    content: React.ReactNode;
    open: boolean;
    onOpenChange: (newState: boolean) => void;
}

export default function IGEDialog({children, title, description, content, open, onOpenChange, className, ...props}: Props) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay"/>

                <Dialog.Content className={clsx("DialogContent border-gray-600", className)} {...props}>
                    <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
                    <Dialog.Description className="DialogDescription">{description}</Dialog.Description>
                    {content}
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <RxCross2/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}