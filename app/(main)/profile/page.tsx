import { ERROR_MESSAGE } from '@/app/util/constant';
import { ROUTE } from '@/app/util/pageRoutes';
import ProfilePage from '@/components/ProfilePage';

const fetchUser = async () => {
    try {
        const response = await fetch(ROUTE.API.USER, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(ERROR_MESSAGE.FAILED_TO_FETCH_USER, error);
        return null;
    }
};

export default async function Page() {
    const user = await fetchUser();

    return (
        <>
            <ProfilePage user={user} />
        </>
    );
}