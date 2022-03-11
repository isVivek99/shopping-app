import React from "react";
import "assets/scss/common/tags/tags.scss";

interface TagProps {
  type: string;
  size: string;
  text: string;
  close: boolean;
}

const Tags = ({ type, size, text, close }: TagProps): JSX.Element => {
  // const [style, setStyle] = useState<TagProps>({
  //   type: "priT",
  //   size: "midT",
  //   text: "Text",
  //   close: false,
  // });

  // useEffect(() => {
  //   setStyle({ type: type, size: size, text: text, close: close });
  // }, []);

  return (
    <span
      className={`tag ${type} ${size}`}
      style={{
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        fontStyle: "normal",
        fontSize: "12px",
        fontWeight: "600",
        maxWidth: "fit-content",
      }}
    >
      {text}
      {close === true && <i className="fas fa-x"></i>}
    </span>
  );
};

export default Tags;
