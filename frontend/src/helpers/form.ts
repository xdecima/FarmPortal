import { FormRoot } from "@/components/custom/form/_commons";
import { fieldContext, formContext } from "@/components/custom/form/_context";
import { FormInput } from "@/components/custom/form/input";
import { SubmitButton } from "@/components/custom/form/submit";
import { createFormHook } from "@tanstack/react-form";

export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        Input: FormInput,
        // Checkbox: FormCheckbox,
        // Combobox: FormCombobox,
        // DateRange: FormDateRange,
        // Date: FormDate,
        // Select: FormSelect,
        // Textarea: FormTextArea,
        // MultiSelect: FormMultiSelect,
    },
    formComponents: {
        Form: FormRoot,
        Submit: SubmitButton,
    },
});