import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { cookies } from "next/headers"
import { COOKIE_NAME } from "@/app/util/constant"
export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieData = await cookies()
    const loggedIn = !!cookieData.get(COOKIE_NAME.ACCESS_TOKEN)
    return (
        <>
            <Navbar  />
            {children}
            <Footer />
        </>
    )
}