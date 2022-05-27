import React from "react";

export const Popup = ({ isOpen, onClose, children, sectionClassName }) => {
  const ESC_CODE = "Escape";

  React.useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === ESC_CODE) {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEsc);

    //disable body scroll

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <section className={sectionClassName}>
      <div className="popup__overlay" onClick={onClose}></div>
      {children}
    </section>
  );
};
