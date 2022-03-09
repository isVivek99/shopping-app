import React, { FC, useEffect, useState } from "react";
import "assets/scss/common/button/button.scss";
import "https://kit.fontawesome.com/637b14841d.js";

interface BtnProps {
  type: string;
  size: string;
  text: string;
  arrow: string;
}

const Button: FC<BtnProps> = ({
  type,
  size,
  text,
  arrow,
}: BtnProps): JSX.Element => {
  const [style, setStyle] = useState<BtnProps>({
    type: "pri",
    size: "mid",
    text: "Text",
    arrow: "",
  });

  useEffect(() => {
    setStyle({ type: type, size: size, text: text, arrow: arrow });
  }, []);

  return (
    <div>
      <button
        className={`${style.type} ${style.size}`}
        style={{ borderRadius: "12px", fontWeight: "700", fontSize: "15px" }}
      >
        {arrow === "la" && (
          <i className="fas fa-angle-left" aria-hidden="true"></i>
        )}
        {style.text}
        {arrow === "ra" && (
          <i className="fas fa-angle-right" aria-hidden="true"></i>
        )}
      </button>
    </div>
  );
};

export default Button;
