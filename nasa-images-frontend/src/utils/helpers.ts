export const emailValidate = {
    required: 'Email is required.',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email is inválid.'
    },
    minLength: {
        value: 5,
        message: 'The email must be at least 5 characters.'
      },
      maxLength: {
        value: 254,
        message: 'The email cannot exceed 254 characters.'
    }
}

export const passwordValidate = {
    required: 'Password is required.',
    pattern: {
        value: /^(?=.*[A-Z])(?=.*\d)(?=.).{8,15}$/,
        message: 'Password is invalid. Make sure the password contains at least one uppercase letter and one numeric character.'
    },
    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters.'
      },
      maxLength: {
        value: 15,
        message: 'Password cannot exceed 15 characters.'
    }
}

export const namesValidate = {
    required: 'This field is required.',
    minLength: {
        value: 1,
        message: 'This field must be at least 5 characters.'
      },
      maxLength: {
        value: 50,
        message: 'The email cannot exceed 50 characters.'
    }
}

export const phoneValidate = {
    required: 'Phone number is required.',
    pattern: {
        value: /^[0-9]+$/,
        message: 'The phone number must contain only numbers.'
    },
    minLength: {
        value: 10,
        message: 'Phone number must be at least 10 characters.'
      },
      maxLength: {
        value: 15,
        message: 'Phone number cannot exceed 15 characters.'
    }
}

export const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return formattedDate;
}


export const convertTitleText = (text: string): string => {
    return text.toUpperCase().replace(/ /g, "  ").split("").join(" ");
}
