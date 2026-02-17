export interface INotificationFormValues {
    articleId: string;
    recipients: string;
    subject: string;
}

export interface INotificationFormProps {
    onSubmit: (values: INotificationFormValues) => void;
}
