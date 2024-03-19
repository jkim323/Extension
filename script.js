document.addEventListener('DOMContentLoaded', function() {
  const hideBtn = document.getElementById('hideBtn');
  hideBtn.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "hideRecommendations"});
  });
});