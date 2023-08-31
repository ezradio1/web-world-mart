import clsx from "clsx";
import type { ItemMenuProps } from "./index.types";
import { useRouter } from "next/navigation";

const ItemMenu = (props: ItemMenuProps) => {
  const { label, icon, route, isActive } = props;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(route)}
      className={clsx(
        "hover:bg-primary-dark py-4 px-4 cursor-pointer transition-all text-white text-sm flex items-center gap-2",
        {
          "bg-primary-dark font-medium": isActive,
          "bg-primary font-light": !isActive,
        }
      )}
    >
      <div>{icon}</div>
      <p>{label}</p>
    </div>
  );
};

export default ItemMenu;
