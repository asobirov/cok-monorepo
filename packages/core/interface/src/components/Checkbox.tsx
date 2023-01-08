import { forwardRef } from "react";
import { Check } from 'iconoir-react';

type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ checked, onChange, className }, ref) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="opacity-0 absolute"
            />
            <div
                aria-label={checked ? "Checked" : "Unchecked"}
                className={"w-4 h-4 p-2 text-indigo-600 border border-whiteAlpha-300 bg-transparent-black rounded-md focus:ring-indigo-50"}
            >
                {checked && (
                    <Check />
                )}
            </div>
        </div>
    )
})
