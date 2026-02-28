import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

const footerSections = [
  {
    title: "Sitemap",
    links: [
      {
        title: "Contact us",
        href: "#",
      },
      {
        title: "About us",
        href: "#",
      },
      {
        title: "Work",
        href: "#",
      },

    ],
  },
  {
    title: "Other Pages",
    links: [
     {
        title: "Terms & Conditions",
        href: "#",
      },
      {
        title: "Privacy Policy",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="py-10">
      <div className=" md:px-[8%] px-4 mx-auto">
        <div className="flex flex-col gap-6 ">
          <div className="py-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-x-8 gap-y-10 px-6 xl:px-0">
            <div className="col-span-full lg:col-span-4">
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                  <Link href="/" className='flex items-center space-x-2 mr-4'>
                        <Image src="/logo.png" alt="logo" width="82" height="82" />
                    </Link>

                <p className="text-base font-normal text-muted-foreground">
                  Empowering businesses with innovative solutions. Let's create
                  something amazing together.
                </p>

                
              </div>
            </div>

            <div className="col-span-1 lg:block hidden"></div>

            {footerSections.map(({ title, links }, index) => (
              <div key={index} className="col-span-2">
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                  <p className="text-base font-medium text-foreground">
                    {title}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {links.map(({ title, href }) => (
                      <li key={title}>
                        <a
                          href={href}
                          className="text-base font-normal text-muted-foreground hover:text-foreground"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="col-span-3">
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                <p className="text-base font-medium text-foreground">
                  Contact Details
                </p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <p className="text-base font-normal text-muted-foreground">
                      Kalyan , Maharashtra
                    </p>
                  </li>
                  <li>
                    <a
                      href="mailto:contact@example.com"
                      className="text-base font-normal text-muted-foreground hover:text-foreground"
                    >
                      ishwarsinghbhandari46@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+01051923556"
                      className="text-base font-normal text-muted-foreground hover:text-foreground"
                    >
                     9760027295
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Separator orientation="horizontal" />
          <p className="text-sm font-normal text-muted-foreground text-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
            ©2026 Ishwar Singh Bhandari. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;