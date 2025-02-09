export type UserRegisterType = {
    names: string;
    last_names: string;
    email: string;
    password: string;
    confirm_password: string;
    phone_number: string;
}


export interface SignUpFormType {
    onSubmit: (data: UserRegisterType) => Promise<void>;
    loading: boolean
}
