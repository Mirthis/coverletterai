import { useEffect, useState } from "react";

const CoverLetterResponseLoader = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => (prevText === "..." ? "." : prevText + "."));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Generating cover letter {text}</div>;
};

export default CoverLetterResponseLoader;
