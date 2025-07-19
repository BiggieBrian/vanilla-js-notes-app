const pages = {
  savedNotesContent: `
    <div class="bg-[#181818] rounded-xl p-5 flex justify-between shadow-xl">
      <h1>Saved Notes</h1>
      <button id="clear-button">Clear</button>
    </div>`,
  newNoteContent: `
    <div class="bg-black rounded-t-2xl p-5">
        <h1>Create a New Note</h1>
    </div>
    <form
        id="noteForm"
        action=""
        class="flex flex-col justify-center items-center gap-4"
          >
            <input
              type="text"
              class="border-1 border-white w-full min-h-10 rounded-b-xl p-2"
              placeholder="Note Title...."
            />
            <textarea
              name=""
              id=""
              class="border-1 border-white w-full min-h-80 rounded-xl p-2"
              placeholder="Note Details..."
            ></textarea>
            <button
              type="submit"
              class="bg-black w-full p-2 rounded-xl cursor-pointer"
            >
              Add Note
            </button>
    </form>
  `,
};

const { savedNotesContent, newNoteContent } = pages;
const tabs = document.querySelector(".mini-nav").children;
const content = document.querySelector("#content");
let notesList = [];
const newNotesPage = () => {
  content.innerHTML = newNoteContent;
  newNoteFunctionality();
};
const savedNotesPage = () => {
  content.innerHTML = savedNotesContent;
  savedNotesFunctionality();
};

for (let i = 0; i < tabs.length; i++) {
  const tab = tabs[i];
  const tabId = tab.id;
  tab.addEventListener("click", () => {
    if (tabId === "saved") {
      savedNotesPage();
    } else {
      newNotesPage();
    }
  });
}

function newNoteFunctionality() {
  const noteForm = document.querySelector("#noteForm");
  const noteTitle = noteForm[0];
  const noteDetails = noteForm[1];
  const noteButton = noteForm[2];

  const formSubmit = (e) => {
    e.preventDefault();
    title = noteTitle.value;
    details = noteDetails.value;

    const note = {
      title,
      details,
      date: new Date().toLocaleDateString(),
    };
    notesList.unshift(note);
    localStorage.setItem("notesList", JSON.stringify(notesList));
    noteForm.reset();
    savedNotesPage();
  };
  noteForm.onsubmit = formSubmit;
}
function savedNotesFunctionality() {
  const loadNotes = () => {
    notesList.forEach((note) => {
      const noteTemplate = `
    <div class="bg-black rounded-xl p-4 flex flex-col gap-4 my-8">
        <span id="note-content">
            <h1 class="text-2xl font-bold">${note.title}</h1>
            <p>
               ${note.details}
            </p>
        </span>
       
    </div>`;
      content.innerHTML += noteTemplate;
    });
  };
  loadNotes();
  const clearButton = document.querySelector("#clear-button");
  console.log(clearButton);
  clearButton.addEventListener("click", () => {
    notesList = [];
    localStorage.clear();
    savedNotesPage();
  });
}
window.onload = () => {
  const savedNotes = JSON.parse(localStorage.getItem("notesList"));
  if (savedNotes) {
    notesList = savedNotes;
  }
  content.innerHTML = newNoteContent;
  newNoteFunctionality();
};
