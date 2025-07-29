import * as React from "react";

/**
 * Reports whether the current viewport width is considered mobile. A mobile
 * breakpoint of 768px is used to match the one defined in TailwindCSS
 * configuration. When the window crosses this threshold the hook
 * updates accordingly.
 */
export function useIsMobile() {
  const MOBILE_BREAKPOINT = 768;
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    typeof window === "undefined" ? undefined : window.innerWidth < MOBILE_BREAKPOINT
  );

  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", onResize);
    // Initialize state on mount
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return !!isMobile;
}