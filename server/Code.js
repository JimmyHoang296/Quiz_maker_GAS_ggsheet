function myFunction() {
  
}


function doGet() {
  // SpreadsheetApp.getUI();
  // DriveApp.getRootFolder();
  // UrlFetchApp.fetch("");
  return HtmlService.createTemplateFromFile("index").evaluate();
}


function makeQuiz(quesNumber) {
  var ss = SpreadsheetApp.openById("1Ce2B1nNgZwqthAeJF6dUJuZ9hGhLMASkZd15AHGXt9A");
  var sheet = ss.getSheetByName("QA")
  var lastRow = sheet.getLastRow()

  var qa = sheet.getRange("A2:F"+lastRow).getValues()
  
  var arr = getRandomArr(quesNumber, lastRow-1)
  var res = []

  arr.forEach(a => {
    res.push(qa[a-1])
  })

  function mapper (v){ return {
    "id": v[0],
    "question": v[1],
    "a": v[2],
    "b": v[3],
    "c": v[4],
    "d": v[5],}}
  
  return res.map(mapper)
  
}

function getRandomArr (num, total){
  var arr = [];
  while(arr.length < num){
    var r = Math.floor(Math.random() * total) + 1;
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr
}

function handleAnswer (submit){
  var ss = SpreadsheetApp.openById("1Ce2B1nNgZwqthAeJF6dUJuZ9hGhLMASkZd15AHGXt9A");
  var sheetQA = ss.getSheetByName("QA")
  var sheetResult = ss.getSheetByName("result")
  var lastRowQA = sheetQA.getLastRow()
  
  var qa = sheetQA.getRange("G1:G"+lastRowQA).getValues()
  
  let qaSubmit = []
  let score = 0

  submit.QA.forEach(a => {
    if (a.answer == qa[a.id]){
      score = score + 1
    }
    qaSubmit.push(...Object.values(a))
  })
  
  var data = [submit.empName, submit.empID, submit.empDept, score, ...qaSubmit]
  
  sheetResult.appendRow(data)
  return score
}