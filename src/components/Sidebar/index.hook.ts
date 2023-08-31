import { useState } from "react";

const useIndex = () => {
  const [isCollapse, setIsCollapse] = useState(false);

  return { isCollapse, setIsCollapse };
};

export default useIndex;
