import { ERROR_MESSAGE } from '@/app/util/constant';
import { ROUTE } from '@/app/util/pageRoutes';
import ProfilePage from '@/components/ProfilePage';
import { headers } from 'next/headers';

const fetchUser = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://dummy-json-e-commerce.vercel.app`;//added because the versil was not takin env 

        const endpoint = `${baseUrl}${ROUTE.API.USER}`;
        
        // console.log("Fetching from URL:", endpoint);

        const headersList = await headers();
        const cookieHeader = headersList.get('cookie') || '';

        const response = await fetch(endpoint, { 
            cache: 'no-store',
            headers: {
                cookie: cookieHeader,
            }
        });

        if (!response.ok) return null;
        return await response.json();
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