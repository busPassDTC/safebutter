import React, { useState, useEffect, useContext } from 'react';
import { account, databases } from '../lib/appwrite';
import { encryptNote, decryptNote } from '../utils/encryption';
import NoteModal from '../components/NoteModal';
import UserModal from '../components/UserModal';
import { ID, Query } from 'appwrite';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import conf from '../conf/conf';
// import { FaUser } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const notifyCreated = () => {
  toast('New note added', {
    duration: 3000,
    position: "bottom-center",
    removeDelay: 1000,
    className: 'flex items-center max-w-xs p-1 mb-2 md:p-2 md:mb-3 text-gray-500 bg-gray-300 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800',
  });
};

const notifyDeleted = () => {
  toast('Deleted Successfully', {
    duration: 3000,
    position: "bottom-center",
    removeDelay: 1000,
    className: 'flex items-center max-w-xs p-1 mb-2 md:p-2 md:mb-3 text-gray-500 bg-gray-300 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800',
  });
};

const notifyUpdated = () => {
  toast('Updated Successfully', {
    duration: 3000,
    position: "bottom-center",
    removeDelay: 1000,
    className: 'flex items-center max-w-xs p-1 mb-2 md:p-2 md:mb-3 text-gray-500 bg-gray-300 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800',
  });
};

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [ noteDecrypting, setDecrypting] = useState(true);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  // const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  // const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // const fetchUserAndNotes = async () => {
    //   try {
    //     // const currentUser = await account.get();
    //     // setUser(currentUser);
    //     fetchNotes();
    //   } catch (error) {
    //     console.error('Failed to fetch user', error);
    //     window.location.href = '/login';
    //   }
    // };
    // fetchUserAndNotes();
    fetchNotes()
  }, []);

  const fetchNotes = async () => {
  try {
    const response = await databases.listDocuments(
      conf.appwriteDatabaseId, conf.appwriteNotesId,
      [
        Query.orderDesc('$createdAt') // Sorting by `dateCreated` in descending order
      ]
    );
    const userNotes = await Promise.all(response.documents.map(async (note) => {
      const decryptedContent = await decryptNote(note.content);
      return { ...note, content: decryptedContent };
    }));
    setNotes(userNotes);
    setDecrypting(false);
  } catch (error) {
    setDecrypting(true);
    console.error('Failed to fetch notes', error);
  }
};


  // const handleLogout = async () => {
  //   try {
  //     await account.deleteSession('current');
  //     window.location.href = '/login';
  //   } catch (error) {
  //     console.error('Logout failed', error);
  //   }
  // };

  const handleSaveNote = async (noteToSave) => {

    const data = noteToSave
    data.content = encryptNote(noteToSave.content);
    // const data = {
    //   content: encryptedContent,
    // };
    // console.log(data);
    
    if(!data) {
      alert("Failed to encypt")
      return
    }


    try {
      if (noteToSave.$id) {
        await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteNotesId, noteToSave.$id, data);
        notifyUpdated();
      } else {
        await databases.createDocument(conf.appwriteDatabaseId, conf.appwriteNotesId, ID.unique(), data);
        notifyCreated();
      }
      fetchNotes();
    } catch (error) {
      console.error('Failed to save note', error);
    }

    closeNoteModal();
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteNotesId, noteId);
      notifyDeleted();
      fetchNotes();
    } catch (error) {
      console.error('Failed to delete note', error);
    }
    closeNoteModal();
  };

  const openNoteModal = (note = null) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setSelectedNote(null);
    notify()
  };

  // const openUserModal = () => {
  //   setIsUserModalOpen(!isUserModalOpen);
  // };

  // const closeUserModal = () => {
  //   setIsUserModalOpen(false);
  // };

  const renderNoteContent = (note) => {
    if (!note.content) {
    return <p className="text-gray-600 dark:text-gray-400">No content available</p>;
  }
    switch (note.noteType) {
      case 'checklist':
        return (
          <ul className="space-y-2">
            { JSON.parse(note.content).map((item, index) => (
              <li key={index} className="flex items-center ">
                <input type="checkbox" checked={item.completed} readOnly className="mr-2" />
                <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
              </li>
            ))}
          </ul>
        );
      case 'bullet':
        return (
          <ul className="space-y-2">
            {note.content.split('\n').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      default:
        return <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{note.content}</p>;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SafeFlow</h1>
        <div className="flex items-center">
          {/* <button onClick={toggleTheme} className="mr-4">
            {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button> */}
          {/* <button onClick={openUserModal} className="mr-4">
            <FaUser size={24} />
          </button>
          <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
            Logout
          </button> */}
        </div>
      </header>
          <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm md:text-3xl font-bold">Your Notes</h2>
        <button onClick={() => openNoteModal()} className="px-1.5 py-0.5 md:px-4 md:py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
          + New Note
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No notes available</p>
        ) : (
          notes.map(note => (
            <div key={note.$id} onClick={() => openNoteModal(note)} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg cursor-pointer">
              {noteDecrypting ? (
                <h3 className="font-bold text-lg mb-2">Decrypting...</h3>
              ) : (
                renderNoteContent(note)
              )}
            </div>
          ))
        )}
      </div>
    </main>
      {isNoteModalOpen && (
        <NoteModal 
          note={selectedNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onClose={closeNoteModal}
        />
      )}
      {/* {isUserModalOpen && user && (
        <UserModal 
          user={user}
          numNotes={notes.length}
          onClose={closeUserModal}
        />
      )} */}
    </div>
  );
};

export default HomePage;
