import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import type { PageLayoutProps } from "./index.types";
import useIndex from "./index.hook";
import clsx from "clsx";
import Navbar from "../Navbar";

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;
  const { isCollapse, setIsCollapse } = useIndex();

  return (
    <div className="flex">
      <Sidebar isCollapse={isCollapse} />
      <div
        className={clsx(
          "cursor-pointer absolute bg-primary z-10 rounded p-1 top-5 ease-out transition-all duration-500",
          {
            "-left-2": isCollapse,
            "left-[190px]": !isCollapse,
          }
        )}
        onClick={() => setIsCollapse((prevState) => !prevState)}
      >
        <GiHamburgerMenu color="white" />
      </div>

      <div
        className={clsx(
          "absolute md:relative flex flex-col justify-between w-screen h-screen",
          {
            "md:w-[calc(100vw-230px)]": !isCollapse,
            "md:w-screen": isCollapse,
          }
        )}
      >
        <Navbar />
        <div className="bg-gray-100 h-full p-4">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
