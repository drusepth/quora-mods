$('div.answer_count_row.light_gray').filter(function (index, row) {
  return $(row).text().split("•")[1].trim() == "Free to Ask";
}).map(function (index, row) {
  return $(row).closest('div.WantedAnswerSuggestionRow').find('a.ask_to_answer')[0];
}).click();
