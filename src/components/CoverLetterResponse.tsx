import { useEffect, useMemo, useRef, useState } from "react";

const CoverLetterResponse = ({ response }: { response: string }) => {
  const [text, setText] = useState("");
  const lastIndex = useRef(0);
  const parsedText = useMemo(
    () => response.replaceAll("\n", "<br/>"),
    [response]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastIndex.current < parsedText.length) {
        const char =
          parsedText[lastIndex.current] === "\n" ? (
            <br />
          ) : (
            parsedText[lastIndex.current]
          );
        setText((prevText) => prevText + char);
        lastIndex.current++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [parsedText]);

  return (
    <div className="my-4">
      <h2 className="mb-4 text-4xl">Your Cover Letter</h2>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default CoverLetterResponse;
