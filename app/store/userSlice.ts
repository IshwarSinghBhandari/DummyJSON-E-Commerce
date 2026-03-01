import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTypes } from '../types/slice';

const initialState: UserTypes = {
    id: null,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    loggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Omit<UserTypes, 'loggedIn'>>) => {
            Object.assign(state, action.payload);
            state.loggedIn = true;
        },
        logout: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;