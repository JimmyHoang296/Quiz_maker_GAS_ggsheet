var startBtn = document.getElementById("start");
var form = document.querySelector(".tester-infor");
var test = document.querySelector(".test")
var displayTime = document.querySelector('.counting-clock') 
var empName, empID, empDept
var isSubmited = false

// base infor
var quesNumber = 10
var testTime = 60

// prevent refresh when submit form
preventRefresh()

// start test
startTest()


function preventRefresh(){
    function handleForm(event) {event.preventDefault()}
    form.addEventListener("submit", handleForm);
    test.addEventListener("submit", handleForm);
}

function startTest(){
    startBtn.addEventListener("click", () => {

      // check all input was filled
      if (!validateform()) {
        alert("nhap du thong tin");
        return;
      }

    // set emp infor for submit result later
        empName = document.getElementById("emp_name").value
        empID = document.getElementById("emp_id").value
        empDept = document.getElementById("emp_dept").value

    //   get Q&A and render
            google.script.run.withSuccessHandler((qa)=>{
                renderQA(qa)
                //   start counting time      
                startTimer(testTime, displayTime)
                displayTime.style.display = "unset"
            })
            .makeQuiz(quesNumber);
    });
}

function validateform() {
  let validate = true;
  let emp_inputs = document
    .querySelector(".tester-infor")
    .getElementsByTagName("input");
  emp_inputs = [...emp_inputs];
  emp_inputs.forEach((input) => {
    if (input.value == null || input.value == "") {
      validate = false;
    }
  });
  return validate;
}

function renderQA(qa) {
  let wrapper = document.querySelector(".test");
//   render qa
  Object.keys(qa).forEach((key) => {
    let quest = qa[key];
    wrapper.innerHTML = wrapper.innerHTML +
      `
        <div class="qa">
            <h2 class="question" id="${quest.id}">${quest.question}</h2>
            <form class="answers">
                <div class="answer">
                    <input type="radio" name="q_${quest.id}" id="${quest.id}a" value="a">
                    <label for="${quest.id}a">${quest.a}</label>
                </div>
                <div class="answer">
                    <input type="radio" name="q_${quest.id}" id="${quest.id}b" value="b">
                    <label for="${quest.id}b">${quest.b}</label>
                </div>
                <div class="answer">
                    <input type="radio" name="q_${quest.id}" id="${quest.id}c" value="c" style="display:${quest.c == ""?"none":"unset"}">
                    <label for="${quest.id}c">${quest.c}</label>
                </div>
                <div class="answer">
                    <input type="radio" name="q_${quest.id}" id="${quest.id}d" value="d" style="display:${quest.d == ""?"none":"unset"}">
                    <label for="${quest.id}d">${quest.d}</label>
                </div>
            </div>
        </div>
        `;
  });

  wrapper.innerHTML = wrapper.innerHTML +  `<button id="submit">Nộp bài</button>`
  test.style.display = 'block'
  form.style.display = 'none'

//   addfunction for submit button
  var submitBtn = document.getElementById("submit")
  submitBtn.addEventListener('click', ()=>{
    if(countAnswer() < quesNumber){
        alert ('Hãy trả lời hết câu hỏi')
    }else{
        let answer = getAnswer()
        google.script.run.withSuccessHandler(getScore).handleAnswer(answer);
        submitBtn.disabled = true
        isSubmited = true
    }

  })

//   add count for input
    var inputs = [...test.getElementsByTagName('input')]
    inputs.forEach(input =>{
        input.addEventListener('click', countAnswer)
    })
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(myInterval)
            let answer = getAnswer()
            google.script.run.withSuccessHandler(getScore).handleAnswer(answer);
        }
        // already submitted
        if (isSubmited){
            clearInterval(myInterval)
        }
    }, 1000);
}

function getAnswer() {
    let qas = [...document.querySelectorAll('.qa')]
    let res = []
    qas.forEach(qa =>{
        let qa_id = qa.querySelector('.question').id
        let answers = [...qa.querySelectorAll('input')]
        let answer
        answers.forEach(a =>{
            if (a.checked){answer = a.value}
        })
        res.push({id:qa_id, answer:answer})
    })
    res = {
        "empName":empName,
        "empID":empID,
        "empDept":empDept,
        "QA":res
    }
    return res
}

function getScore(score){
    var modalElement = document.querySelector('.modal')
    var resultDisplay = document.querySelector('.result')
    resultDisplay.innerHTML = `Bạn đã hoàn thành bài kiểm tra và đúng ${score}/${quesNumber} câu`
    modalElement.style.display = "flex"
}

function countAnswer(){
    var qas = [...document.querySelectorAll('.qa')]
    var counter = 0
    qas.forEach(qa => {
        var answers = [...qa.getElementsByTagName('input')]
        answers.forEach(a =>{
            if(a.checked){counter = counter + 1}
        })
    })
    return counter
}