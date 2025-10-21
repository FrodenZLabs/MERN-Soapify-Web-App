import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterSection = () => {
  return (
    <Footer container className="bg-[#172134]">
      <div className="w-full">
        <div className="grid w-full items-center justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="px-10">
            <FooterBrand href="/" src="/vite.svg" alt="footer">
              <span className="text-3xl text-gray-200 font-semibold">
                Soapify Shop
              </span>
            </FooterBrand>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" className="text-gray-400" />
              <FooterLinkGroup col>
                <FooterLink
                  href="#"
                  className="text-white hover:text-yellow-500"
                >
                  Home
                </FooterLink>
                <FooterLink
                  href="#"
                  className="text-white hover:text-yellow-500"
                >
                  Products
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" className="text-gray-400" />
              <FooterLinkGroup col>
                <FooterLink
                  href="#"
                  className="text-white hover:text-yellow-500"
                >
                  Github
                </FooterLink>
                <FooterLink
                  href="#"
                  className="text-white hover:text-yellow-500"
                >
                  Discord
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" className="text-gray-400" />
              <FooterLinkGroup col>
                <FooterLink
                  href="#"
                  className="text-white hover:text-yellow-500"
                >
                  Privacy Policy
                </FooterLink>
                <FooterLink
                  href="#"
                  className="text-white hover:text-yellow-500"
                >
                  Terms &amp; Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="KibeTech Solutions" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="#"
              icon={BsFacebook}
              className="text-white hover:text-yellow-500"
            />
            <FooterIcon
              href="#"
              icon={BsInstagram}
              className="text-white hover:text-yellow-500"
            />
            <FooterIcon
              href="#"
              icon={BsTwitter}
              className="text-white hover:text-yellow-500"
            />
            <FooterIcon
              href="#"
              icon={BsGithub}
              className="text-white hover:text-yellow-500"
            />
            <FooterIcon
              href="#"
              icon={BsDribbble}
              className="text-white hover:text-yellow-500"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSection;
