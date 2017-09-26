var defaultAnswers = [
  {
    name: 'Issue: thanks! help fix?',
    description: "Thanks a lot for filing this issue! Would you like to write a patch for this? We'd be more than happy to walk you through the steps involved."
  },
  {
    name: 'Issue: thanks! looking!',
    description: "Thanks a lot for filing this issue! We'll triage and take a look at it as soon as possible!"
  }
];

function getAnswersListFromStorage() {
  // Load the answers from local storage.
  var localStorageKey = '__GH_CANNED_ANSWERS__EXT__';
  var saved = localStorage.getItem(localStorageKey);
  var answers;

  if (!saved || saved === '') {
    localStorage.setItem(localStorageKey, JSON.stringify(defaultAnswers));
    answers = defaultAnswers;
  } else {
   answers = JSON.parse(localStorage.getItem(localStorageKey));
  }
  return answers;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'load') {
    var answers = getAnswersListFromStorage();
    sendResponse({'answers': answers});
  }
  if (request.action === 'save') {
    // Save the answers to local storage.
    var localStorageKey = '__GH_CANNED_ANSWERS__EXT__';
    localStorage.setItem(localStorageKey, JSON.stringify(request.answers));
    sendResponse();
  }
});
