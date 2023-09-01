import type { ContentLayoutProps } from "./index.types";

const ContentLayout = (props: ContentLayoutProps) => {
  const { title, children } = props;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-xl uppercase">{title}</h2>
          <hr className="w-4/5 border-[2px] mt-1 border-orange-400" />
        </div>
        <div></div>
      </div>

      <div className="mt-3">{children}</div>
    </div>
  );
};

export default ContentLayout;
