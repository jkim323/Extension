// content.js
const hideRecommendations = () => {
  const selectors = [
    'ytd-watch-next-secondary-results-renderer',
    'ytd-compact-video-renderer',
    'ytd-compact-autoplay-renderer'
  ];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
  });
};

let isNotesVisible = true; // Assume notes are visible by defaultå

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "toggleRecommendationsAndNotes") {
      isNotesVisible = !isNotesVisible; // Toggle the visibility state
      toggleNotesAndRecommendations(isNotesVisible);
    }
  }
);

function toggleNotesAndRecommendations(visible) {
  // Logic to show/hide recommendations - adjust according to your implementation
  document.querySelectorAll('ytd-watch-next-secondary-results-renderer, ytd-compact-video-renderer, ytd-compact-autoplay-renderer')
    .forEach(el => el.style.display = visible ? 'none' : 'block'); // Adjust display logic as needed

  // Show/hide note-taking area
  const noteContainer = document.getElementById('customNoteContainer');
  if (noteContainer) {
    noteContainer.style.display = visible ? 'block' : 'none';
  }
}

const toggleNoteTakingArea = (show) => {
  const existingContainer = document.getElementById('customNoteContainer');
  if (show) {
    if (!existingContainer) {
      const noteContainer = document.createElement('div');
      noteContainer.id = 'customNoteContainer';
      noteContainer.style.cssText = `
        position: fixed;
        top: 56px;
        right: 0;
        width: 350px;
        height: calc(100vh - 56px);
        background-color: #f1f1f1;
        padding: 20px;
        box-shadow: -2px 0 2px rgba(0,0,0,0.1);
        overflow-y: auto;
        z-index: 1000;
      `;
      const textArea = document.createElement('textarea');
      textArea.id = 'noteTextArea';
      textArea.style.cssText = 'width: 100%; height: 90%;';
      noteContainer.appendChild(textArea);
      document.body.appendChild(noteContainer);

      // Create the Save button
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save Notes';
      saveButton.style.cssText = 'width: 100%; margin-top: 10px;';
      saveButton.onclick = saveNotes;

      noteContainer.appendChild(textArea);
      noteContainer.appendChild(saveButton);
      document.body.appendChild(noteContainer);
    }
  } else if (existingContainer) {
    existingContainer.remove();
  }
};

// Function to save notes
const saveNotes = () => {
  const textArea = document.getElementById('noteTextArea');
  const text = textArea.value;

  // Prompt the user for a filename
  const fileName = prompt("Save as:", "MyYouTubeNotes.txt");
  if (fileName) { // Proceed only if the user didn't cancel the prompt
    // Create a Blob with the text
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link and set the URL as the href
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Use the user-provided filename
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

const checkForVideoPlayerAndPage = () => {
  // Improved check based on URL path to determine if on a video page
  const isVideoPage = window.location.pathname.startsWith('/watch');
  hideRecommendations();
  toggleNoteTakingArea(isVideoPage);
};

// MutationObserver to observe body for page navigation changes
const observer = new MutationObserver(checkForVideoPlayerAndPage);
observer.observe(document.body, { childList: true, subtree: true });

// Listen for history state updates to handle SPA navigation
window.addEventListener('popstate', checkForVideoPlayerAndPage);
window.addEventListener('pushState', checkForVideoPlayerAndPage);
window.addEventListener('replaceState', checkForVideoPlayerAndPage);

// Initial check
checkForVideoPlayerAndPage();


