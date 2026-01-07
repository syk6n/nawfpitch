import React from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  wordClass?: string;
  charClass?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = "", 
  wordClass = "split-word", 
  charClass = "split-char" 
}) => {
  // Split by words first to handle spacing and wrapping gracefully (though we are no-wrap here)
  const words = children.split(' ');

  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={`inline-block whitespace-nowrap ${wordClass}`}>
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className={`inline-block ${charClass}`}
              style={{ display: 'inline-block' }} // Ensure transforms work
            >
              {char}
            </span>
          ))}
          {/* Add a space after the word unless it's the last one */}
          {wordIndex < words.length - 1 && (
             <span className={`inline-block ${charClass}`}>&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};
