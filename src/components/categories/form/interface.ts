export interface ICategoryFormInput {
    id?: string | number;
    name: string;
    description: string;
    color: string;
}

export interface ICategoryFormProps {
    open: boolean;
    loading: boolean;
    category?: ICategoryFormInput;
    onSubmit: (input: ICategoryFormInput) => void;
    onCancel: () => void;
}