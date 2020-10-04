import { useEffect, useState } from "react";

// when putting a react component inside of another, the first one always receives it as the prop "children".
const Route = ({ path, children }) => {
  // This state is only used to make Route rerender itself. It is equivalent to window.location.pathname.
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    // Listener to listen for the URL change event that the Link component dispatches.
    window.addEventListener("popstate", onLocationChange);

    // Cleanup to remove the manual event listener that I just added in the line above.
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);
  return currentPath === path ? children : null;
};

export default Route;
