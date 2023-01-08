import { forwardRef } from "react";
import { Check } from 'iconoir-react';

type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ checked, onChange, className }, ref) => {
    return (
        <div className="flex items-center relative">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="opacity-0 absolute w-full h-full"
            />
            <div
                aria-label={checked ? "Checked" : "Unchecked"}
                className={"flex items-start justify-center w-5 h-5 aspect-square text-emerald-300 border border-whiteAlpha-300 bg-transparent-black rounded-md focus:ring-indigo-50"}
            >
                {checked && (
                    <Check className="w-full h-full" />
                )}
            </div>
        </div>
    )
})
