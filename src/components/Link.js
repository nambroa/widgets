import React from "react";

const Link = ({ className, href, children }) => {
  const onClick = event => {
    // If a user click command+click on MacOS, or ctrl+click on Windows, it is expected that the link will be opened on a new tab.
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    // Prevents full page reload when a user changes to a new component.
    event.preventDefault();
    // Updates the URL when the user clicks a widget from the header.
    window.history.pushState({}, "", href);
    // Tells the Route components that the URL has changed.
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
};
export default Link;
