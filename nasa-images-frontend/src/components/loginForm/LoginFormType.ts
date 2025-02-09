export type UserAuthType = {
    email: string;
    password: string;
}

export interface LoginFormType {
    onSubmit: (data: UserAuthType) => Promise<void>;
    loading: boolean
}
