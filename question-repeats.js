
var question_text = $('.question_text_edit').innerText.trim();
var answers = document.getElementsByClassName('AnswerPagedList')[0].getElementsByClassName('pagedlist_item');
for (i = 0; i < answers.length - 1; i++) {
  var answer_dom = answers[i];
  
  var parts = answer_dom.innerText.split("\n")
  var [_, author, timestamp, ...answer_text] = parts
  answer_text = answer_text.slice(0, answer_text.length - 4).join("\n")
  
  // If the question starts within the first 5 characters of the answer, suggest edits
  var index = answer_text.indexOf(question_text);
  if (index == -1 || index > 5) {
    continue;
  }

  // Open the suggest-edits UI:
  // 1. Load the lazy-loaded overflow menu
  answer_dom.getElementsByClassName('overflow_link')[1].click();
  
  // 2. Click the suggest edits link
  var suggest_edits_button = answer_dom.getElementsByClassName('menu_list_item')[4].getElementsByTagName('a')[0];
  if (suggest_edits_button.innerText == 'Suggestions Pending') {
    console.log("Skipping suggesting edits for answer " + (i + 1) + " since they're still pending.");
    continue;
  } else {
    suggest_edits_button.click();
  }  
  
  // Make the edit
  var doc_dom = answer_dom.getElementsByClassName('doc')[0];
  doc_dom.innerHTML = doc_dom.innerHTML.replace(question_text, '');
  
  // Write explanation for edit:
  answer_dom.getElementsByClassName('doc')[1].innerText = "It's unnecessary to repeat the question text at the top of your question.";
  
  // Click the submit button
  console.log("Suggesting edits for " + (i + 1) + ": " + answer_text);
  //answer_dom.getElementsByClassName('submit_button')[0].click();
}
