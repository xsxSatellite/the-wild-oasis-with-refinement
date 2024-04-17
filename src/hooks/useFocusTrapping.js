import { useRef, useEffect } from "react";

export default function useFocusTrapping(handler) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const modalElement = ref.current;
      //add any focusable HTML element you want to include to this string
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      firstElement.focus();
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = e => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = e => {
        if (e.key === "Escape") handler();
      };

      const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) handler();
      };

      document.addEventListener("click", handleClick);
      modalElement.addEventListener("keydown", handleTabKeyPress);
      modalElement.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        document.removeEventListener("click", handleClick);
        modalElement.removeEventListener("keydown", handleTabKeyPress);
        modalElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
  }, [handler]);

  return ref;
}
