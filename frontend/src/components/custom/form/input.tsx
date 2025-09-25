import React, { type RefObject } from "react";

import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/custom/form/_commons";
import { useFieldContext } from "@/components/custom/form/_context";

export type FormInputProps = Omit<
    React.ComponentProps<"input">,
    "name" | "value" | "onChange" | "onBlur"
> & {
    label?: string;
    helperText?: string;
    ref?: RefObject<typeof FormItem | null>;
};

export const FormInput = ({ ref, label, helperText, ...props }: FormInputProps) => {
    const field = useFieldContext<string>();
    return (
        <FormItem ref={ref} className="flex flex-1 flex-col space-y-2">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
                <Input
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={() => field.handleBlur()}
                    {...props}
                />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
        </FormItem>
    );
}
