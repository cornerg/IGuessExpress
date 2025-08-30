import { Select } from "radix-ui";
import {RxChevronDown, RxChevronUp} from "react-icons/rx";
import "../styles/select.css";
import clsx from "clsx";
import React from "react";

export interface SelectOption {
    key: string;
    label: string;
    flag?: string;
}

interface Props extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {
    options: SelectOption[];
    value: string;
    onChange: (value: string | null | undefined) => void;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    placeholder?: string;
}

export default function IGESelect({options, value, onChange, className, style, disabled, placeholder, ...props}: Props) {
    const trigger = React.useRef<HTMLButtonElement>(null);

    const width = React.useMemo(() => {
        return trigger.current?.getBoundingClientRect()?.width ?? 64;
    }, [trigger.current]);

    return (
        <Select.Root
            value={value}
            onValueChange={(value) => onChange(value)}
        >
            <Select.Trigger
                className={clsx(
                    "SelectTrigger py-0.5 px-2 row justify-between flex-nowrap items-center border-1 rounded-md border-gray-600 min-h-8 h-8 transition-colors",
                    {
                        "hover:border-teal-500 cursor-pointer": !disabled,
                        "opacity-50 pointer-events-none": disabled,
                    },
                    className,
                )}
                aria-label="Identities"
                style={style}
                ref={trigger}
                {...props}
            >
                <Select.Value placeholder={placeholder || "Select an option…"} />
                <Select.Icon className="SelectIcon">
                    <RxChevronDown />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    className="SelectContent border-1 rounded-md border-gray-600 overflow-hidden"
                    position="popper"
                    style={{width: `${width}px`}}
                >
                    <Select.ScrollUpButton className="SelectScrollButton w-full">
                        <RxChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport w-full">
                        {options.map((option) => {
                            return (
                                <Select.Item
                                    value={option.key}
                                    key={option.key}
                                    className="SelectItem w-full row gap-1 justify-between px-2 py-1 hover:bg-teal-900 transition-colors cursor-pointer"
                                >
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                    {option.flag && (
                                        <div
                                            key={option.key}
                                            style={{backgroundImage: `url(${option.flag})`}}
                                            className="w-6 h-6 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden border-1 border-black"
                                        />
                                    )}
                                </Select.Item>
                            )
                        })}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                        <RxChevronDown />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>

    )
}