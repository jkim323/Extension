document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleButton');
  if(toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      // Send message to content script to toggle recommendations and note-taking
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleRecommendationsAndNotes"});
      });
    });
  }
});
