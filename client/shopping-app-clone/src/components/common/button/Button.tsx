import React from "react";
import "assets/scss/common/button/button.scss";

interface BtnProps {
  type: string;
  size: string;
  text: string;
  arrow: string;
}

const Button = ({ type, size, text, arrow }: BtnProps): JSX.Element => {
  // const [style, setStyle] = useState<BtnProps>({
  //   type: "pri",
  //   size: "mid",
  //   text: "Text",
  //   arrow: "",
  // });

  // useEffect(() => {
  //   setStyle({ type: type, size: size, text: text, arrow: arrow });
  // }, []);

  return (
    <div>
      <button
        className={`${type} ${size}`}
        style={{ borderRadius: "12px", fontWeight: "700", fontSize: "15px" }}
      >
        {arrow === "la" && <i className="fas fa-angle-left"></i>}
        {text}
        {arrow === "ra" && <i className="fas fa-angle-right"></i>}
      </button>
    </div>
  );
};

export default Button;
