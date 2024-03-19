// content.js
const manageContentBasedOnURL = () => {
  const isVideoPage = window.location.pathname.startsWith('/watch');
  const recommendations = document.querySelectorAll('ytd-watch-next-secondary-results-renderer, ytd-compact-video-renderer, ytd-compact-autoplay-renderer');

  // Always attempt to hide recommendations
  recommendations.forEach(element => element.style.display = 'none');

  // Check for the existence of the note container
  const noteContainerExists = document.getElementById('customNoteContainer') !== null;

  if (isVideoPage && !noteContainerExists) {
    // Display note-taking area only on video pages
    displayNoteTakingArea();
  } else if (!isVideoPage && noteContainerExists) {
    // Remove note-taking area when not on video pages
    document.getElementById('customNoteContainer').remove();
  }
};

const displayNoteTakingArea = () => {
  // Create a floating container for the notes
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
  textArea.style.cssText = 'width: 100%; height: 100%;';
  noteContainer.appendChild(textArea);

  document.body.appendChild(noteContainer);
};

// React to navigation and URL changes within YouTube
let lastURL = location.href;
setInterval(() => {
  const urlHasChanged = lastURL !== location.href;
  if (urlHasChanged) {
    lastURL = location.href;
    manageContentBasedOnURL();
  }
}, 1000); // Check every second for URL change

// Initial setup
manageContentBasedOnURL();
