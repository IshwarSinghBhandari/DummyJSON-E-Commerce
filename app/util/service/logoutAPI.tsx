"use client"
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/store/userSlice';
import { SUCCESS_MESSAGE } from '@/app/util/constant';
import { ROUTE } from '@/app/util/pageRoutes';
import { toast } from 'sonner';

export const useLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        try {
            const response = await fetch(ROUTE.API.LOGOUT, { method: 'POST' });
            if (response.ok) {
                dispatch(logout());
                toast.success(SUCCESS_MESSAGE.LOGOUT_SUCCESS);
                router.push(ROUTE.LOGIN);
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return logoutUser;
};