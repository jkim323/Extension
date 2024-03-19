// Function to hide recommendations
const hideRecommendations = () => {
  // Selector for recommendations on the video playback page, adjust if necessary
  const recommendationSelectors = [
    'ytd-watch-next-secondary-results-renderer', // Sidebar recommendations
    'ytd-compact-video-renderer', // Compact video renderer often used in recommendations
    'ytd-compact-autoplay-renderer' // Autoplay recommendation specifically
  ];

  // Query and hide each type of recommendation
  recommendationSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => element.style.display = 'none');
  });
};

// Run once and set up a MutationObserver to handle AJAX page loads
const observer = new MutationObserver(hideRecommendations);
observer.observe(document.body, {childList: true, subtree: true});

// Initial run in case the page doesn't reload completely when navigating to a video
hideRecommendations();
