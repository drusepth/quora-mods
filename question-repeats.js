var question_text = $('.question_text_edit').innerText.trim();
var answers = document.getElementsByClassName('AnswerPagedList')[0].getElementsByClassName('pagedlist_item');
for (i = 0; i < answers.length; i++) {
  var answer_dom = answers[i];
  
  var parts = answer_dom.innerText.split("\n")
  var [_, author, timestamp, ...answer_text] = parts
  answer_text = answer_text.slice(0, answer_text.length - 4).join("\n")
  
  // If the question starts within the first 5 characters of the answer, suggest edits
  var index = answer_text.indexOf(question_text);
  if (index != -1 && index < 5) {
    console.log("SUGGEST EDITS for " + answer_text);
  
  }
  
  
}
