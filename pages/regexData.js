
// import React, { useState } from 'react';

// const RegexEditor = () => {
//   const [regex, setRegex] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState([]);

//   const handleRegexChange = (e) => {
//     setRegex(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const handleRegexSelect = (selectedRegex) => {
//     setRegex(selectedRegex);
//   };

//   const applyRegex = () => {
//     try {
//       if (regex === '<img\\b[^>]*>') {
//         const modifiedInput = input.replace(/<img\b[^>]*>/g, '');
//         setOutput([modifiedInput]);
//       } else if (regex === '<td>\s*<\/td>') {
//         const modifiedInput = input.replace(/<td>\s*<\/td>/g, '');
//         setOutput([modifiedInput]);
//       } else if (regex === '/\s+/g') {
//         const modifiedInput = input.replace(/\s+/g, '');
//         setOutput([modifiedInput]);
//       } else {
//         const re = new RegExp(regex, 'g');
//         const matches = input.match(re);
//         if (matches) {
//           setOutput(matches);
//         } else {
//           setOutput([]);
//         }
//       }
//     } catch (error) {
//       setOutput([]);
//     }
//   };

//   const basicRegexOptions = [
//     { value: '', label: 'Select a basic regex pattern' },
//     { value: '\\d+', label: 'Digits (\\d+)' },
//     { value: '\\w+', label: 'Word Characters (\\w+)' },
//     { value: '[A-Za-z]+', label: 'Alphabets (A-Za-z+)' },
//     { value: '\\b\\d{2}-\\d{2}-\\d{4}\\b', label: 'Date (dd-mm-yyyy)' },
//     { value: '<img\\b[^>]*>', label: 'Remove Image' },
//     { value: '<td>\s*<\/td>', label: 'Remove Empty Columns' },
//     { value: '/\s+/g', label: 'Remove Empty Spaces' }, // New option to remove empty spaces
//     // Add more basic regex patterns as needed
//   ];

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <h2 className="text-2xl font-bold mb-4">Regex Editor</h2>
//       <div className="mb-4">
//         <label htmlFor="regex-input" className="mr-2">
//           Regex:
//         </label>
//         <input
//           id="regex-input"
//           type="text"
//           value={regex}
//           onChange={handleRegexChange}
//           className="p-2 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="basic-regex-select" className="mr-2">
//           Basic Regex:
//         </label>
//         <select
//           id="basic-regex-select"
//           value={regex}
//           onChange={(e) => handleRegexSelect(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         >
//           {basicRegexOptions.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="input" className="mr-2">
//           Input:
//         </label>
//         <textarea
//           id="input"
//           value={input}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded"
//           rows={4}
//         />
//       </div>
//       <div>
//         <button
//           onClick={applyRegex}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Apply Regex
//         </button>
//       </div>
//       <div className="mt-4">
//         <h3 className="text-lg font-bold mb-2">Output:</h3>
//         {output.length > 0 ? (
//           <ul className="list-disc list-inside">
//             {output.map((match, index) => (
//               <li key={index}>{match}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No matches found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegexEditor;


import React, { useState } from 'react';

const RegexEditor = () => {
  const [regex, setRegex] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const handleRegexChange = (e) => {
    setRegex(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRegexSelect = (selectedRegex) => {
    setRegex(selectedRegex);
  };

  const applyRegex = () => {
    try {
      if (regex === 'remove-img') {
        const modifiedInput = input.replace(/<img\b[^>]*>/g, '');
        setOutput([modifiedInput]);
      } else if (regex === 'remove-empty-columns') {
        const modifiedInput = input.replace(/<td>\s*<\/td>/g, '');
        setOutput([modifiedInput]);
      } else if (regex === 'remove-empty-spaces') {
        const modifiedInput = input.replace(/\s+/g, '');
        setOutput([modifiedInput]);
      } else if (regex === 'uppercase-to-lowercase') {
        const modifiedInput = input.toLowerCase();
        setOutput([modifiedInput]);
      } else if (regex === 'underScore-after-two-characters') {
        const modifiedInput = input.replace(/^(.{2})(.*)/g, (match, p1, p2) => p1.toLowerCase() + '_' + p2.toLowerCase());
        setOutput([modifiedInput]);
      } else {
        const re = new RegExp(regex, 'g');
        const matches = input.match(re);
        if (matches) {
          setOutput(matches);
        } else {
          setOutput([]);
        }
      }
    } catch (error) {
      setOutput([]);
    }
  };
  

  const basicRegexOptions = [
    { value: '', label: 'Select a basic regex pattern' },
    { value: '\\d+', label: 'Digits (\\d+)' },
    { value: '\\w+', label: 'Word Characters (\\w+)' },
    { value: '[A-Za-z]+', label: 'Alphabets (A-Za-z+)' },
    { value: '\\b\\d{2}-\\d{2}-\\d{4}\\b', label: 'Date (dd-mm-yyyy)' },
    { value: 'remove-img', label: 'Remove Image' },
    { value: 'remove-empty-columns', label: 'Remove Empty Columns' },
    { value: 'remove-empty-spaces', label: 'Remove Empty Spaces' },
    { value: 'uppercase-to-lowercase', label: 'Uppercase to Lowercase' },
    { value: 'underScore-after-two-characters', label: 'Custom Pattern - Add Underscore after Two Characters' },
    // Add more basic regex patterns as needed
  ];

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Regex Editor</h2>
      <div className="mb-4">
        <label htmlFor="regex-input" className="mr-2">
          Regex:
        </label>
        <input
          id="regex-input"
          type="text"
          value={regex}
          onChange={handleRegexChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="basic-regex-select" className="mr-2">
          Basic Regex:
        </label>
        <select
          id="basic-regex-select"
          value={regex}
          onChange={(e) => handleRegexSelect(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {basicRegexOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="input" className="mr-2">
          Input:
        </label>
        <textarea
          id="input"
          value={input}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
          rows={6}
        />
      </div>
      <div>
        <button
          onClick={applyRegex}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Regex
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Output:</h3>
        {output.length > 0 ? (
          <ul className="list-disc list-inside">
            {output.map((match, index) => (
              <li key={index}>{match}</li>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default RegexEditor;
