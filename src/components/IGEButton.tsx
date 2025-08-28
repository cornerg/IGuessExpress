import "../styles/button.css";
import React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import type {IconType} from "react-icons";
import clsx from "clsx";


const button = cva(
    "row h-max justify-center align-center gap-2 rounded-lg flex-nowrap shrink-0 px-2 py-1 transition-colors",
    {
        variants: {
            variant: {
                solid: "border-0 text-white stroke-white",
                outline: "border bg-white hover:bg-gray-100"
            },
            colour: {
                primary: "border-cyan-600 hover:border-teal-500",
                secondary: "border-gray-400 hover:border-gray-300",
                destructive: "border-red-600 hover:border-red-400",
            },
            size: {
                smallXs: "h-max min-h-max w-max min-w-max px-1 py-0.5",
                small: "h-6 min-h-6 w-6 min-w-6",
                medium: "h-9 min-h-9 w-9 min-w-9",
                large: "h-10 min-h-10 w-10 min-w-10"
            },
            disabled: {
                true: "opacity-40 cursor-not-allowed pointer-events-none",
                false: "cursor-pointer",
                undefined: "cursor-pointer"
            },
            stretch: {
                true: "w-full",
                false: "w-max",
            }
        },
        compoundVariants: [
            {
                variant: "solid",
                colour: "primary",
                className: "bg-teal-500 hover:bg-teal-400"
            },
            {
                variant: "solid",
                colour: "secondary",
                className: "bg-gray-400 hover:bg-gray-300"
            },
            {
                variant: "solid",
                colour: "destructive",
                className: "bg-red-600 hover:bg-red-400"
            },
            {
                variant: "outline",
                colour: "primary",
                className: "text-teal-600 stroke-teal-600"
            },
            {
                variant: "outline",
                colour: "secondary",
                className: "text-gray-600 stroke-gray-600"
            },
            {
                variant: "outline",
                colour: "destructive",
                className: "text-red-600 stroke-red-600"
            },
        ],
        defaultVariants: {
            variant: "solid",
            colour: "primary",
            size: "medium",
            disabled: false,
            stretch: false,
        }
    }
)


type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "color"> & VariantProps<typeof button> & {
    style?: React.CSSProperties
    text?: string;
    leftIcon?: IconType;
    rightIcon?: IconType;
    iconBefore?: boolean;
    disabled?: boolean;
}
const IGEButton = React.forwardRef<HTMLButtonElement, ButtonProps>((
    {
        variant,
        colour,
        size,
        disabled,
        stretch,
        className,
        style,
        text,
        leftIcon,
        rightIcon,
        ...props
    }, ref) => {


    const paddingX = text ? ((size == "smallXs") ? "4px" : "8px") : ((size == "smallXs") ? "2px" : "4px");
    const iconSize = (size == "smallXs") ? "18px" : "22px";

    return (
        <button
            ref={ref}
            className={clsx(button({variant, colour, size, disabled, stretch}), className)}
            style={{paddingLeft: paddingX, paddingRight: paddingX, ...style}}
            {...props}
        >
            {!!leftIcon && leftIcon({size: iconSize})}
            {text &&
                <p className={clsx(
                    "bold w-max whitespace-nowrap",
                    {
                        "leading-none": size == "smallXs",
                        "textLarge": size != "smallXs"
                    }
                )}
                   style={{color: "inherit"}}
                >
                    {text}
                </p>
            }
            {!!rightIcon && rightIcon({size: iconSize})}
        </button>
    )
})


export default IGEButton;