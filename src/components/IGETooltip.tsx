import { Tooltip } from "radix-ui";
import React from "react";
import "../styles/tooltip.css";

interface Props {
    content: string;
    children: React.ReactNode;
}

export default function IGETooltip({content, children}: Props) {
    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={50}>
                <Tooltip.Trigger asChild>
                    {children}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent rounded-md p-2 leading-none bg-teal-900 text-xs" sideOffset={5}>
                        {content}
                        <Tooltip.Arrow className="TooltipArrow fill-teal-900" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}