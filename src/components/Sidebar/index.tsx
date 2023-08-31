"use client";

import clsx from "clsx";
import Header from "./components/Header";
import ItemMenu from "./components/ItemMenu";
import { SIDEBAR_MENUS } from "./index.constants";
import type { SidebarProps } from "./index.types";

const Sidebar = (props: SidebarProps) => {
  const { isCollapse } = props;
  return (
    <aside
      className={clsx(
        "bg-primary z-10 h-screen overflow-hidden relative transition-all duration-500 ease-out",
        {
          "w-[230px]": !isCollapse,
          "w-0": isCollapse,
        }
      )}
    >
      <Header />

      <div className="mt-8">
        {SIDEBAR_MENUS.map((menu, key) => (
          <ItemMenu key={key} {...menu} isActive={key % 2 === 0} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
