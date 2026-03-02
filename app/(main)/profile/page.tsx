import { ERROR_MESSAGE } from '@/app/util/constant';
import { ROUTE } from '@/app/util/pageRoutes';
import ProfilePage from '@/components/ProfilePage';
import { headers } from 'next/headers';

const fetchUser = async () => {
    try {
        const headersList = await headers();
        const cookieHeader = headersList.get('cookie') || '';

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${ROUTE.API.USER}`, { 
            cache: 'no-store',
            headers: {
                cookie: cookieHeader,
            }
        });


        const data = await response.json();
        return data;
    } catch (error) {
        console.error(ERROR_MESSAGE.FAILED_TO_FETCH_USER, error);
        return null;
    }
};
export const dynamic = 'force-dynamic';

export default async function Page() {
    const user = await fetchUser();

    return (
        <>
            <ProfilePage user={user} />
        </>
    );
}