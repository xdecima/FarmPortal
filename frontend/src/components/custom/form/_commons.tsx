import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/components/custom/form/_context";

import { cn } from "@/lib/utils";

type FormItemContextValue = { id: string };

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue,
);

export const useFormField = () => {
    const field = useFieldContext();
    const { id } = React.useContext(FormItemContext);

    return {
        id,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        field,
    };
};

export const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    );
});

export const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { field, formItemId } = useFormField();
    const isError = field.state.meta.errors.length > 0;

    return (
        <Label
            ref={ref}
            className={cn(isError && "text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    );
});

export const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { field, formItemId, formDescriptionId, formMessageId } =
        useFormField();
    const isError = field.state.meta.errors.length > 0;

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !isError
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!isError}
            {...props}
        />
    );
});

export const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});

export const FormMessage = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
    const { field, formMessageId } = useFormField();

    if (field.state.meta.errors.length === 0) {
        return null;
    }

    return (
        <div ref={ref} id={formMessageId} {...props}>
            {field.state.meta.errors.map((error, i) => (
                <p key={i} className="text-sm font-medium text-destructive">
                    {error.message}
                </p>
            ))}
        </div>
    );
});

type FormRootProps = Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "noValidate" | "autoComplete"
>;

export const FormRoot = React.forwardRef<HTMLFormElement, FormRootProps>(
    ({ onSubmit, children, className, ...props }, ref) => {
        return (
            <form
                ref={ref}
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onSubmit) onSubmit(e);
                }}
                className={cn("flex flex-col gap-4", className)}
                {...props}
            >
                {children}
            </form>
        );
    },
);
