// SuggestionBox.js
import React from 'react';
import "./suggestion.css"

const SuggestionBox = ({ suggestions }) => {
  return (
    <div className="suggestion">
      
      {suggestions.map((suggestion, index) => (
        <div key={index} className="suggestion-item">
          
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SuggestionBox;
