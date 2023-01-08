import { forwardRef } from "react";

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
                className={className}
            />
        </div>
    )
})
