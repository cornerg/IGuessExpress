import React, {type ChangeEvent} from "react";
import clsx from "clsx";
import "../styles/input.css";

interface Props extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
    limit?: number;
    onChange?: (value: string | number | boolean | undefined) => void;
    isInvalid?: boolean;
}

export default function IGEInput({limit, className, onChange, value, isInvalid, ...props}: Props) {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const charCount = React.useMemo(() => {
        if (typeof value === "string") {
            return value.length;
        }
        if (typeof value === "number") {
            return value.toString().length;
        }
        return 0;
    }, [value]);

    const handleChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (onChange) {
            if ((limit && (limit ?? 0) > 0) && newValue.length > limit) {
                onChange(newValue.substring(0, limit));
            } else {
                onChange(newValue);
            }
        }
    }, [onChange, limit]);

    return (
        <div
            className={clsx(
                "IGEInput row relative border-1 rounded-md min-h-8 h-8 transition-colors",
                {
                    "border-gray-600": !isFocused,
                    "border-teal-500": isFocused,
                    "border-red-500": isInvalid,
                },
                className
            )}
        >
            <input
                className={clsx(
                    "h-full w-full py-0.5 px-2 focus-visible:outline-0",
                    {
                        "pr-7": typeof limit === "number" && limit > 0
                    }
                )}
                onChange={handleChange}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />

            {(typeof limit === "number" && limit > 0) && (
                <div className="absolute w-max h-full column top-0 right-1 justify-center gap-0 items-end">
                    <p
                        className={clsx(
                            "text-[11px] text-end leading-none select-none",
                            {
                                "text-red-300": typeof value === "string" && value.length >= limit
                            }
                        )}
                    >
                        {charCount.toLocaleString("en-US")}
                    </p>
                    <p className="text-[11px] text-end leading-none select-none">/{limit.toLocaleString("en-US")}</p>
                </div>
            )}
        </div>
    )
}