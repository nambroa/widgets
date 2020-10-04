import React, { useCallback, useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false); // Handles whether the dropdown is open (extended) or not.
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = event => {
      // If the current DOM element referenced by ref contains event.target, this means that we have made a click inside of the Dropdown
      // (since the referenced DOM element is the parent div of the Dropdown, see below).
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      // The event listener gets removed so that when the Dropdown dissapears by clicking the toggle, ref.current.contains doesnt throw
      // an Exception (since ref is null due to the Dropdown having dissapeared).
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map(option => {
    // Don't render the currently selected option a second time in the dropdown.
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        onClick={() => onSelectedChange(option)}
        className="item"
      >
        {option.label}
      </div>
    );
  });
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
