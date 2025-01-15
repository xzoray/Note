let noteTitles = [];
let notes = [];

let trashNoteTitles = [];
let trashNotes = [];

function init() {
    getFromLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
        for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }
}

function getNoteTemplate(i) {
    return `<div class="note" id="note">
                <h3>${noteTitles[i]}:</h3>
                <p>${notes[i]}</p>
                <div class="buttonContainer">
                    <button onclick="pushToTrash(${i})" class="deleteButton">X</button>
                </div>
            </div>
            `
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trashContent');
    trashContentRef.innerHTML = "";
    for (let i = 0; i < trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function getTrashNoteTemplate(i) {
    return `<div class="note" id="note">
                <h3>${trashNoteTitles[i]}:</h3>
                <p>${trashNotes[i]}</p>
                <div class="buttonContainer">
                    <button onclick="deleteNote(${i})" class="deleteButton">X</button>
                </div>
            </div>
            `
}

function addNote() {
    let titleInput = document.getElementById('titleInput');
    let noteInput = document.getElementById('noteInput');
    if (titleInput.value != "" && noteInput.value != "") {
        noteTitles.push(titleInput.value);
        notes.push(noteInput.value);
        saveToLocalStorage()
        init();
        titleInput.value = "";
        noteInput.value = "";
    } else {
        alert("invalid input");
    }
}

function saveToLocalStorage() {
    localStorage.setItem('Title', JSON.stringify(noteTitles));
    localStorage.setItem('Note', JSON.stringify(notes));
    localStorage.setItem('TrashTitle', JSON.stringify( trashNoteTitles));
    localStorage.setItem('TrashNote', JSON.stringify(trashNotes));
}

function getFromLocalStorage() {
    let dataTitle = JSON.parse(localStorage.getItem('Title'));
    let dataNote = JSON.parse(localStorage.getItem('Note'));
    let dataTrashTitle = JSON.parse(localStorage.getItem('TrashTitle'));
    let dataTrashNote = JSON.parse(localStorage.getItem('TrashNote'));
    if (dataTitle != null && dataNote != null) {
        noteTitles = dataTitle;
        notes = dataNote;
    }
    if (dataTrashTitle !=null && dataTrashNote != null) {
        trashNoteTitles = dataTrashTitle;
        trashNotes = dataTrashNote
    }
}

function pushToTrash(i) {
    let trashTitle = noteTitles.splice(i, 1);
    trashNoteTitles.push(trashTitle[0])
    let trashNote = notes.splice(i, 1);
    trashNotes.push(trashNote[0]);
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function deleteNote(i) {
    trashNoteTitles.splice(i, 1);
    trashNotes.splice(i, 1);
    localStorage.setItem('TrashTitle', JSON.stringify( trashNoteTitles));
    localStorage.setItem('TrashNote', JSON.stringify(trashNotes));
    renderTrashNotes();
}