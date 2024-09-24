import React, { useState, useEffect } from 'react';
import './App.css'; // Optional for custom styling

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  // Calculate word count and character count
  useEffect(() => {
    const words = text
      .toLowerCase()
      .match(/\b\w+\b/g) || [];

    const uniqueWords = new Set(words);
    setUniqueWordCount(uniqueWords.size);

    const characters = text.replace(/[^\w]/g, '');
    setCharCount(characters.length);

    // Update highlighted text after every input change
    updateHighlightedText(text);
  }, [text]);

  // Update the highlighted text when search term is replaced
  const handleReplace = () => {
    const replacedText = text.split(searchTerm).join(replaceTerm);
    setText(replacedText);
    updateHighlightedText(replacedText);
  };

  // Function to highlight the replaced words in the text
  const updateHighlightedText = (inputText) => {
    if (searchTerm) {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      const highlighted = inputText.replace(regex, (match) => `<mark>${match}</mark>`);
      setHighlightedText(highlighted);
    } else {
      setHighlightedText(inputText);
    }
  };

  return (
    <div className="container">
      <h1>Real-Time Text Analysis and String Replacement</h1>

      <textarea
        rows="10"
        cols="50"
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        <p>Unique Word Count: {uniqueWordCount}</p>
        <p>Character Count (excluding spaces/punctuation): {charCount}</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search for"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div className="highlighted-text-container">
        <h3>Highlighted Text with Replaced Words:</h3>
        <p dangerouslySetInnerHTML={{ __html: highlightedText }}></p>
      </div>
    </div>
  );
};

export default TextAnalysis;
