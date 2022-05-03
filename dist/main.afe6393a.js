// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"d6sW":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var startBtn = document.getElementById("start");
var form = document.querySelector(".tester-infor");
var test = document.querySelector(".test");
var displayTime = document.querySelector('.counting-clock');
var empName, empID, empDept; // base infor

var quesNumber = 10;
var testTime = 60; // prevent refresh when submit form

preventRefresh(); // start test

startTest();

function preventRefresh() {
  function handleForm(event) {
    event.preventDefault();
  }

  form.addEventListener("submit", handleForm);
  test.addEventListener("submit", handleForm);
}

function startTest() {
  startBtn.addEventListener("click", function () {
    // check all input was filled
    if (!validateform()) {
      alert("nhap du thong tin");
      return;
    } // set emp infor for submit result later


    empName = document.getElementById("emp_name").value;
    empID = document.getElementById("emp_id").value;
    empDept = document.getElementById("emp_dept").value; //   get Q&A and render

    google.script.run.withSuccessHandler(function (qa) {
      renderQA(qa); //   start counting time      

      startTimer(testTime, displayTime);
    }).makeQuiz(quesNumber);
  });
}

function validateform() {
  var validate = true;
  var emp_inputs = document.querySelector(".tester-infor").getElementsByTagName("input");
  emp_inputs = _toConsumableArray(emp_inputs);
  emp_inputs.forEach(function (input) {
    if (input.value == null || input.value == "") {
      validate = false;
    }
  });
  return validate;
}

function renderQA(qa) {
  var wrapper = document.querySelector(".test"); //   render qa

  Object.keys(qa).forEach(function (key) {
    var quest = qa[key];
    wrapper.innerHTML = wrapper.innerHTML + "\n        <div class=\"qa\">\n            <h2 class=\"question\" id=\"".concat(quest.id, "\">").concat(quest.question, "</h2>\n            <form class=\"answers\">\n                <div class=\"answer\">\n                    <input type=\"radio\" name=\"q_").concat(quest.id, "\" id=\"").concat(quest.id, "a\" value=\"a\">\n                    <label for=\"").concat(quest.id, "a\">").concat(quest.a, "</label>\n                </div>\n                <div class=\"answer\">\n                    <input type=\"radio\" name=\"q_").concat(quest.id, "\" id=\"").concat(quest.id, "b\" value=\"b\">\n                    <label for=\"").concat(quest.id, "b\">").concat(quest.b, "</label>\n                </div>\n                <div class=\"answer\">\n                    <input type=\"radio\" name=\"q_").concat(quest.id, "\" id=\"").concat(quest.id, "c\" value=\"c\">\n                    <label for=\"").concat(quest.id, "c\">").concat(quest.c, "</label>\n                </div>\n                <div class=\"answer\">\n                    <input type=\"radio\" name=\"q_").concat(quest.id, "\" id=\"").concat(quest.id, "d\" value=\"d\">\n                    <label for=\"").concat(quest.id, "d\">").concat(quest.d, "</label>\n                </div>\n            </div>\n        </div>\n        ");
  });
  wrapper.innerHTML = wrapper.innerHTML + "<button id=\"submit\">N\u1ED9p b\xE0i</button>";
  test.style.display = 'block';
  form.style.display = 'none'; //   addfunction for submit button

  var submitBtn = document.getElementById("submit");
  submitBtn.addEventListener('click', function () {
    if (countAnswer < quesNumber) {
      alert('Hãy trả lời hết câu hỏi');
    } else {
      var answer = getAnswer();
      google.script.run.withSuccessHandler(getScore).handleAnswer(answer);
    }
  });
}

function startTimer(duration, display) {
  var timer = duration,
      minutes,
      seconds;
  var myInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(myInterval);
      var answer = getAnswer();
      google.script.run.withSuccessHandler(getScore).handleAnswer(answer);
    }
  }, 1000);
}

function getAnswer() {
  var qas = _toConsumableArray(document.querySelectorAll('.qa'));

  var res = [];
  qas.forEach(function (qa) {
    var qa_id = qa.querySelector('.question').id;

    var answers = _toConsumableArray(qa.querySelectorAll('input'));

    var answer;
    answers.forEach(function (a) {
      if (a.checked) {
        answer = a.value;
      }
    });
    res.push({
      id: qa_id,
      answer: answer
    });
  });
  res = {
    "empName": empName,
    "empID": empID,
    "empDept": empDept,
    "QA": res
  };
  return res;
}

function getScore(score) {
  alert("B\u1EA1n \u0111\xE3 tr\u1EA3 l\u1EDDi \u0111\xFAng ".concat(score, "/").concat(quesNumber));
}

function countAnswer() {
  var qas = _toConsumableArray(document.querySelectorAll('.qa'));

  var counter;
  qas.forEach(function (qa) {
    var answers = _toConsumableArray(qa.querySelectorAll('.answer'));

    answers.forEach(function (a) {
      if (a.checked) {
        counter = counter + 1;
      }
    });
  });
  return counter;
}
},{}]},{},["d6sW"], null)