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

  return (
    <div className="my-4">
      <h2 className="mb-4 text-4xl">Your Cover Letter</h2>
      <div>Generating cover letter {text}</div>
    </div>
  );
};

export default CoverLetterResponseLoader;
