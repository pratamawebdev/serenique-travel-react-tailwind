import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";

export default function useColorMode() {
  const [colorMode, setColorMode] = useLocalStorage("color-mode", "light");

  useEffect(() => {
    const className = "dark";
    const setDark = document.documentElement.classList;

    colorMode === "dark" ? setDark.add(className) : setDark.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
}
