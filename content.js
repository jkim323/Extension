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
      textArea.style.cssText = 'width: 100%; height: 100%;';
      noteContainer.appendChild(textArea);
      document.body.appendChild(noteContainer);
    }
  } else if (existingContainer) {
    existingContainer.remove();
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
