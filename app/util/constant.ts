export const ERROR_MESSAGE = {
    PASSWORD_LENGTH: "Password must be at least 6 characters long",
    USERNAME_LENGTH: "Username must be at least 3 characters long",
    LOGIN_ERROR: "Invalid credentials",
    NO_TOKEN: "Login failed: No token received",
    SOMETHING_WENT_WRONG: "Something went wrong",
    LOGOUT_ERROR: "Error during logout",
    FAILED_TO_FETCH_USER: "Failed to fetch user",
    UNAUTHORIZED: "Unauthorized",
}
export const SUCCESS_MESSAGE = {
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logged out successfully",
}

export const COOKIE_NAME = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
}
export const LIMIT = 12;

export const SORT_OPTIONS = [
    { label: 'Default', value: '', order: 'asc' },
    { label: 'Name (A-Z)', value: 'title', order: 'asc' },
    { label: 'Name (Z-A)', value: 'title', order: 'desc' },
    { label: 'Price (Low to High)', value: 'price', order: 'asc' },
    { label: 'Price (High to Low)', value: 'price', order: 'desc' },

] as const;
