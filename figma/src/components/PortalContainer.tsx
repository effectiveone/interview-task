import React, { useEffect, useRef, ReactNode, isValidElement } from "react";
import ReactDOM from "react-dom";

export const PortalContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const portalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const portalContainer = portalContainerRef.current;
    if (portalContainer) {
      portalContainer.innerHTML = ""; // Wyczyść kontener przy każdej zmianie children

      React.Children.forEach(children, (child) => {
        if (isValidElement(child)) {
          const portalElement = document.createElement("div");
          portalContainer.appendChild(portalElement);
          ReactDOM.render(child, portalElement);
        }
      });
    }
  }, [children]);

  return <div className="portal-container" ref={portalContainerRef} />;
};
