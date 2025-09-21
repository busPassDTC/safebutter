// import React, { useState, useEffect } from 'react';
// import { FaTrash, FaListUl, FaCheckSquare, FaFont } from 'react-icons/fa'; // Added FaFont for text


// const NoteModal = ({ note, onSave, onClose, onDelete }) => {
//   const [content, setContent] = useState('');
//   const [noteType, setNoteType] = useState('text'); // 'text', 'bullet', or 'checklist'

//   useEffect(() => {
//     if (note) {
//       const type = note.noteType || 'text';
//       let safeContent;
//       type == 'checklist' ? safeContent = JSON.parse(note.content) : safeContent = note.content;
//       if (safeContent == null) {
//         safeContent = type === 'checklist' ? [{ text: '', completed: false }] : '';
//       }
//       setContent(safeContent);
//       setNoteType(type);
//     } else {
//       setContent('');
//       setNoteType('text');
//     }
//   }, [note]);


//   const handleTypeChange = (newType) => {
//     if (newType === noteType) return;

//     let newContent = content;

//     // --- FROM Checklist ---
//     if (noteType === 'checklist' && Array.isArray(content)) {
//       let text = content.map(item => item.text).join('\n');
//       if (newType === 'bullet') {
//         newContent = text.split('\n').map(line => line.trim() ? `• ${line}` : '').join('\n');
//       } else {
//         newContent = text;
//       }
//     } 
//     // --- FROM Text or Bullet ---
//     else if (typeof content === 'string') {
//       // TO Checklist
//       if (newType === 'checklist') {
//         const lines = content.split('\n').filter(line => line.trim() !== '');
//         newContent = lines.map(line => ({
//           text: line.trim().replace(/^• \s*/, ''),
//           completed: false,
//         }));
//         if (newContent.length === 0) newContent = [{ text: '', completed: false }];
//       }
//       // TO Bullet
//       else if (newType === 'bullet') {
//         newContent = content.split('\n').map(line => line.trim() ? `• ${line.trim().replace(/^•\s*/, '')}` : '').join('\n');
//       }
//       // TO Text
//       else if (newType === 'text') {
//         newContent = content.split('\n').map(line => line.trim().replace(/^• \s*/, '')).join('\n');
//       }
//     }

//     setContent(newContent);
//     setNoteType(newType);
//   };

//   /**
//    * Smartly handles the "Enter" key for bullet lists.
//    */
//   const handleBulletKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const { selectionStart, value } = e.target;
//       const newValue = `${value.substring(0, selectionStart)}\n• ${value.substring(selectionStart)}`;
//       setContent(newValue);

//       // This ensures the cursor moves to the correct position after the new bullet
//       setTimeout(() => {
//         e.target.selectionStart = e.target.selectionEnd = selectionStart + 3;
//       }, 0);
//     }
//   };

// const handleSave = () => {
//   let saveContent = content;
//   if (noteType === 'checklist') {
//     saveContent = JSON.stringify(content);
//   }
//   onSave({ ...note, content: saveContent, noteType });
// };


//   const handleDelete = () => note && onDelete(note.$id);
//   const handleTextareaChange = (e) => setContent(e.target.value);
//   const handleChecklistTextChange = (index, newText) => {
//     const newItems = [...content];
//     newItems[index].text = newText;
//     setContent(newItems);
//   };
//   const toggleChecklistItem = (index) => {
//     const newItems = [...content];
//     newItems[index].completed = !newItems[index].completed;
//     setContent(newItems);
//   };
//   const addChecklistItem = () => {
//     if (Array.isArray(content)) {
//       setContent([...content, { text: '', completed: false }]);
//     }
//   };

//   const renderContent = () => {
//     switch (noteType) {
//       case 'checklist':
//         if (!Array.isArray(content)) return (
//           <div>
//             {content.split('\n').filter(line => line.trim() !== '').map((item, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input type="checkbox" checked={item.completed || false} onChange={() => toggleChecklistItem(index)} className="mr-3 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
//                 <input type="text" value={item.text || ''} onChange={(e) => handleChecklistTextChange(index, e.target.value)} className={`w-full bg-transparent focus:outline-none ${item.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`} placeholder="List item"/>
//               </div>
//             ))}
//             <button onClick={addChecklistItem} className="mt-2 text-blue-500 hover:text-blue-600 font-semibold">+ Add item</button>
//           </div>
//         );
//         return (
//           <div>

//             {content.map((item, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input type="checkbox" checked={item.completed || false} onChange={() => toggleChecklistItem(index)} className="mr-3 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
//                 <input type="text" value={item.text || ''} onChange={(e) => handleChecklistTextChange(index, e.target.value)} className={`w-full bg-transparent focus:outline-none ${item.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`} placeholder="List item"/>
//               </div>
//             ))}

//             <button onClick={addChecklistItem} className="mt-2 text-blue-500 hover:text-blue-600 font-semibold">+ Add item</button>
//           </div>
//         );

//       case 'bullet':
//         return (
//           <textarea
//             placeholder="List..."
//             value={typeof content === 'string' ? content : ''}
//             onChange={handleTextareaChange}
//             onKeyDown={handleBulletKeyDown} // This is the key for auto-bullets
//             className="w-full h-48 bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none"
//           ></textarea>
          
//         );

//       case 'text':
//       default:
//         return (
//           <textarea
//             placeholder="Take a note..."
//             value={typeof content === 'string' ? content : ''}
//             onChange={handleTextareaChange}
//             className="w-full h-48 bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none"
//           ></textarea>
//         );
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg flex flex-col">
//         <div className="flex-grow">{renderContent()}</div>
//         <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//           <div>
//             {note && <button onClick={handleDelete} title="Delete note" className="p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><FaTrash /></button>}
//           </div>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => handleTypeChange('text')} title="Text Note" className={`p-2 rounded-full ${noteType === 'text' ? 'bg-gray-300 dark:bg-gray-600' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}><FaFont /></button>
//             <button onClick={() => handleTypeChange('bullet')} title="Bulleted List" className={`p-2 rounded-full ${noteType === 'bullet' ? 'bg-gray-300 dark:bg-gray-600' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}><FaListUl /></button>
//             <button onClick={() => handleTypeChange('checklist')} title="Checklist" className={`p-2 rounded-full ${noteType === 'checklist' ? 'bg-gray-300 dark:bg-gray-600' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}><FaCheckSquare /></button>
//           </div>
//           <div className="flex space-x-4">
//             <button onClick={onClose} className="px-1.5 py-0.5 md:px-4 md:py-2  text-gray-800 dark:text-white font-semibold bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">Close</button>
//             <button onClick={handleSave} className="px-1.5 py-0.5 md:px-4 md:py-2  text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteModal;

import React, { useState, useEffect } from 'react';
import { FaTrash, FaListUl, FaCheckSquare, FaFont } from 'react-icons/fa'; // Added FaFont for text

const NoteModal = ({ note, onSave, onClose, onDelete }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [noteType, setNoteType] = useState('text'); // 'text', 'bullet', or 'checklist'

  useEffect(() => {
    if (note) {
      const type = note.noteType || 'text';
      let safeContent;
      type === 'checklist' ? (safeContent = JSON.parse(note.content)) : (safeContent = note.content);

      if (safeContent == null) {
        safeContent = type === 'checklist' ? [{ text: '', completed: false }] : '';
      }

      setContent(safeContent);
      setNoteType(type);
      setTitle(note.title || ''); // load title if present
    } else {
      setContent('');
      setNoteType('text');
      setTitle('');
    }
  }, [note]);

  const handleTypeChange = (newType) => {
    if (newType === noteType) return;

    let newContent = content;

    // --- FROM Checklist ---
    if (noteType === 'checklist' && Array.isArray(content)) {
      let text = content.map(item => item.text).join('\n');
      if (newType === 'bullet') {
        newContent = text.split('\n').map(line => line.trim() ? `• ${line}` : '').join('\n');
      } else {
        newContent = text;
      }
    }
    // --- FROM Text or Bullet ---
    else if (typeof content === 'string') {
      // TO Checklist
      if (newType === 'checklist') {
        const lines = content.split('\n').filter(line => line.trim() !== '');
        newContent = lines.map(line => ({
          text: line.trim().replace(/^• \s*/, ''),
          completed: false,
        }));
        if (newContent.length === 0) newContent = [{ text: '', completed: false }];
      }
      // TO Bullet
      else if (newType === 'bullet') {
        newContent = content.split('\n').map(line => line.trim() ? `• ${line.trim().replace(/^•\s*/, '')}` : '').join('\n');
      }
      // TO Text
      else if (newType === 'text') {
        newContent = content.split('\n').map(line => line.trim().replace(/^• \s*/, '')).join('\n');
      }
    }

    setContent(newContent);
    setNoteType(newType);
  };

  const handleBulletKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { selectionStart, value } = e.target;
      const newValue = `${value.substring(0, selectionStart)}\n• ${value.substring(selectionStart)}`;
      setContent(newValue);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 3;
      }, 0);
    }
  };

  const handleSave = () => {
    let saveContent = content;
    if (noteType === 'checklist') {
      saveContent = JSON.stringify(content);
    }
    onSave({ ...note, title, content: saveContent, noteType });
  };

  const handleDelete = () => note && onDelete(note.$id);
  const handleTextareaChange = (e) => setContent(e.target.value);
  const handleChecklistTextChange = (index, newText) => {
    const newItems = [...content];
    newItems[index].text = newText;
    setContent(newItems);
  };
  const toggleChecklistItem = (index) => {
    const newItems = [...content];
    newItems[index].completed = !newItems[index].completed;
    setContent(newItems);
  };
  const addChecklistItem = () => {
    if (Array.isArray(content)) {
      setContent([...content, { text: '', completed: false }]);
    }
  };

  const renderContent = () => {
    switch (noteType) {
      case 'checklist':
        return (
          <div>
            {content.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={item.completed || false}
                  onChange={() => toggleChecklistItem(index)}
                  className="mr-3 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={item.text || ''}
                  onChange={(e) => handleChecklistTextChange(index, e.target.value)}
                  className={`w-full bg-transparent focus:outline-none ${
                    item.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                  }`}
                  placeholder="List item"
                />
              </div>
            ))}
            <button
              onClick={addChecklistItem}
              className="mt-2 text-blue-500 hover:text-blue-600 font-semibold"
            >
              + Add item
            </button>
          </div>
        );

      case 'bullet':
        return (
          <textarea
            placeholder="List..."
            value={typeof content === 'string' ? content : ''}
            onChange={handleTextareaChange}
            onKeyDown={handleBulletKeyDown}
            className="w-full h-48 bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none"
          ></textarea>
        );

      case 'text':
      default:
        return (
          <textarea
            placeholder="Take a note..."
            value={typeof content === 'string' ? content : ''}
            onChange={handleTextareaChange}
            className="w-full h-48 bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none"
          ></textarea>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg flex flex-col">
        
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 text-xl font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
        />

        {/* Content Area */}
        <div className="flex-grow">{renderContent()}</div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            {note && (
              <button
                onClick={handleDelete}
                title="Delete note"
                className="p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaTrash />
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleTypeChange('text')}
              title="Text Note"
              className={`p-2 rounded-full ${
                noteType === 'text'
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FaFont />
            </button>
            <button
              onClick={() => handleTypeChange('bullet')}
              title="Bulleted List"
              className={`p-2 rounded-full ${
                noteType === 'bullet'
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FaListUl />
            </button>
            <button
              onClick={() => handleTypeChange('checklist')}
              title="Checklist"
              className={`p-2 rounded-full ${
                noteType === 'checklist'
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FaCheckSquare />
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="px-1.5 py-0.5 md:px-4 md:py-2 text-gray-800 dark:text-white font-semibold bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-1.5 py-0.5 md:px-4 md:py-2 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
