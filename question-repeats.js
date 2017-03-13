function click_submit_button_later(answer_dom) {
  setTimeout(function () {
    console.log("Submitting edit suggestion to remove quoting the question.")
    //answer_dom.getElementsByClassName('submit_button')[0].click();
  }, 500);
};

function remove_question_text_from_answer(answer_dom) {
  setTimeout(function () {
    var doc_dom = answer_dom.getElementsByClassName('doc')[0];
    
    // Rather than using _.innerHTML = _.innerHTML.replace(question, ''), we want to walk down to the first/lowest
    // div containing the question text and use innerText instead since we lose event handlers on nested elements 
    // by serializing/deserializing the full innerHTML body.
    first_section = doc_dom.getElementsByClassName('section')[0];
    section_spans = first_section.getElementsByClassName('span');
    target_dom = null;
    for (i = 0; i < section_spans.length - 1; i++) {
      span = section_spans[i];
      
      if (span.innerText.includes(question_text)) {
        target_dom = span.getElementsByClassName('content')[0];
        break;
      }
    }
    
    if (target_dom == null) {
      // Couldn't find the proper section/span -- debug and exit
      console.log("Couldn't find target_dom");
    }

    // Do the replacement inline
    target_dom.innerText = target_dom.innerText.replace(question_text, '');
    
    // Write explanation for edit:
    answer_dom.getElementsByClassName('doc')[1].innerText = "It's unnecessary to repeat the question text at the top of your question.";
    
    // Click the submit button
    click_submit_button_later(answer_dom);
  }, 1000);
};

function suggest_edits_for_answer_dom(answer_dom) {
  // This is wrapped in a setTimeout to give the lazy-loading menu time to load
  setTimeout(function () {
    // 2. Click the suggest edits link
    var suggest_edits_button = answer_dom.getElementsByClassName('menu_list_item')[4].getElementsByTagName('a')[0];
    if (suggest_edits_button.innerText == 'Suggestions Pending') {
      console.log("Skipping suggesting edits for answer since they're still pending.");
      return;
    } else {
      suggest_edits_button.click();
    }

    // Make the edit and submit it
    remove_question_text_from_answer(answer_dom);
  }, 500);
};

var question_text = document.getElementsByClassName('question_text_edit')[0].innerText.trim();
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
  
  suggest_edits_for_answer_dom(answer_dom);
}
