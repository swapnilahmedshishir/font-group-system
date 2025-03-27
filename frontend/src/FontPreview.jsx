import { useEffect } from "react";

const FontPreview = ({ fontUrl, fontName }) => {
  useEffect(() => {
    if (fontUrl && fontName) {
      const style = document.createElement("style");
      style.innerHTML = `
        @font-face {
          font-family: '${fontName}';
          src: url('${fontUrl}') format('truetype');
        }
      `;
      document.head.appendChild(style);
    }
  }, [fontUrl, fontName]);

  return (
    <div style={{ fontFamily: fontName, fontSize: "20px" }}>
      Sample Text in {fontName}
    </div>
  );
};

export default FontPreview;
