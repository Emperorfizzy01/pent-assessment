export const Errormessage = {

    UserExist: {
        success: false,
        apiErrorCode: '403',
        errorMessage: 'User already exist'
    },

    IncorrectData: {
        success: false,
        apiErrorCode: '401',
        errorMessage: 'Email or password incorrect'
    },

    InvalidToken: {
        success: false,
        apiErrorCode: '401',
        errorMessage: 'Token has either expired or not provided'
    },
};