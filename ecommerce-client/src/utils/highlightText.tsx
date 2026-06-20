const highlightText = (text: string, query: string) => {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="text-orange-400 font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export default highlightText;