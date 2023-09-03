"use client";

import clsx from "clsx";
import Header from "./components/Header";
import ItemMenu from "./components/ItemMenu";
import { SIDEBAR_MENUS } from "./index.constants";
import type { SidebarProps } from "./index.types";
import useIndex from "./index.hook";

const Sidebar = (props: SidebarProps) => {
  const { isCollapse } = props;
  const { isActiveMenu } = useIndex();

  return (
    <aside
      className={clsx(
        "bg-primary z-10 h-screen overflow-hidden relative transition-all duration-500 ease-out",
        {
          "w-[200px]": !isCollapse,
          "w-0": isCollapse,
        }
      )}
    >
      <Header />

      <div className="mt-8">
        {SIDEBAR_MENUS.map((menu, key) => (
          <ItemMenu key={key} {...menu} isActive={isActiveMenu(menu.route)} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
