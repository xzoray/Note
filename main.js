let allNotes = {
    'noteTitles': [],
    'notes': [],
    'trashNoteTitles': [],
    'trashNotes': []
}

function init() {
    getFromLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
        for (let i = 0; i < allNotes.notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }
}

function getNoteTemplate(i) {
    return `<div class="note" id="note">
                <h3>${allNotes.noteTitles[i]}:</h3>
                <p>${allNotes.notes[i]}</p>
                <div class="buttonContainer">
                    <button onclick="pushToTrash(${i})" class="deleteButton">X</button>
                </div>
            </div>
            `
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trashContent');
    trashContentRef.innerHTML = "";
    for (let i = 0; i < allNotes.trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function getTrashNoteTemplate(i) {
    return `<div class="note" id="note">
                <h3>${allNotes.trashNoteTitles[i]}:</h3>
                <p>${allNotes.trashNotes[i]}</p>
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
        allNotes.noteTitles.push(titleInput.value);
        allNotes.notes.push(noteInput.value);
        saveToLocalStorage()
        init();
        titleInput.value = "";
        noteInput.value = "";
    } else {
        alert("invalid input");
    }
}

function saveToLocalStorage() {
    localStorage.setItem('Title', JSON.stringify(allNotes.noteTitles));
    localStorage.setItem('Note', JSON.stringify(allNotes.notes));
    localStorage.setItem('TrashTitle', JSON.stringify(allNotes.trashNoteTitles));
    localStorage.setItem('TrashNote', JSON.stringify(allNotes.trashNotes));
}

function getFromLocalStorage() {
    let dataTitle = JSON.parse(localStorage.getItem('Title'));
    let dataNote = JSON.parse(localStorage.getItem('Note'));
    let dataTrashTitle = JSON.parse(localStorage.getItem('TrashTitle'));
    let dataTrashNote = JSON.parse(localStorage.getItem('TrashNote'));
    if (dataTitle != null && dataNote != null) {
        allNotes.noteTitles = dataTitle;
        allNotes.notes = dataNote;
    }
    if (dataTrashTitle !=null && dataTrashNote != null) {
        allNotes.trashNoteTitles = dataTrashTitle;
        allNotes.trashNotes = dataTrashNote
    }
}

function pushToTrash(i) {
    let trashTitle = allNotes.noteTitles.splice(i, 1);
    allNotes.trashNoteTitles.push(trashTitle[0])
    let trashNote = allNotes.notes.splice(i, 1);
    allNotes.trashNotes.push(trashNote[0]);
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function deleteNote(i) {
    allNotes.trashNoteTitles.splice(i, 1);
    allNotes.trashNotes.splice(i, 1);
    localStorage.setItem('TrashTitle', JSON.stringify(allNotes.trashNoteTitles));
    localStorage.setItem('TrashNote', JSON.stringify(allNotes.trashNotes));
    renderTrashNotes();
}