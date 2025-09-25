import React, { type RefObject } from "react";
import { useStore } from "@tanstack/react-form";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/components/custom/form/_context";

type ButtonProps =  React.ComponentProps<typeof Button> & {
    ref?: RefObject<typeof Button | null>
}

export const SubmitButton = ({ ref, children, disabled, ...props }: ButtonProps) => {
    const form = useFormContext();
    const { isSubmitting, canSubmit } = useStore(form.store, (store) => ({
        isSubmitting: store.isSubmitting,
        canSubmit: store.canSubmit,
    }));

    return (
        <Button
            ref={ref}
            disabled={disabled || isSubmitting || !canSubmit}
            type="submit"
            {...props}
        >
            {isSubmitting && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {children}
        </Button>
    );
}