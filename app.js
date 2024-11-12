
const overlayer = document.getElementById('overlay');
const notesContainer = document.getElementById('notes-container');
let notecreatebtn = document.getElementById('create-note-btn');
let editbtn = document.getElementById('edit-save');

let isEditing = false;  
let editingIndex = null;  

window.onload = function() {
    displayNotes();
};


function notePopup() {
    overlayer.style.display = 'flex';

    // If editing, show the edit button, otherwise show the create button
    if (isEditing) {
        editbtn.style.display = 'block';
        notecreatebtn.style.display = 'none';
    } else {
        editbtn.style.display = 'none';
        notecreatebtn.style.display = 'block';
    }
}

// Close the popup and reset editing mode
function closePopup() {
    overlayer.style.display = 'none';
    resetEditing();
}

// Reset editing state
function resetEditing() {
    isEditing = false;
    editingIndex = null;
    document.getElementById('note-title').value = '';
    document.getElementById('note-area').value = '';
    notecreatebtn.style.display = 'block';
    editbtn.style.display = 'none';
}

// Function to create or update a note based on isEditing 
function saveNote() {
    const title = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-area').value;

    if (!title || !noteContent) {
        alert('Please provide both title and content for the note.');
        return;
    }

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (isEditing && editingIndex !== null) {
        // Update the existing note
        notes[editingIndex] = { title, note: noteContent };
    } else {
        // Add a new note
        notes.push({ title, note: noteContent });
    }

    // Save updated notes to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Close the popup and refresh notes display
    closePopup();
    displayNotes();
}

// Display all notes in the container
function displayNotes() {
    notesContainer.innerHTML = '';  

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.note}</p>
            <img src="./img/pen.png" class="edit-note-btn" onclick="editNotePopup(${index})" alt="edit-note">
            <img class="delete-img" src="./img/delete.png" onclick="deleteNote(${index})" alt="delete">
        `;

        notesContainer.appendChild(noteElement);
    });
}

// Function to delete a note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Open popup for editing a specific note
function editNotePopup(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    isEditing = true;
    editingIndex = index;

    // occupy fields with the note data to be edited
    document.getElementById('note-title').value = notes[index].title;
    document.getElementById('note-area').value = notes[index].note;

    notePopup();
}


