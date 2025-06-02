/** 
 * Це javascript файл для вправи "CLICK_type"/"Клікни слова"
 * Даний вид вправ іде під номером .3 (Наприклад 5.3, 6.3 чи 25.3)
 * Текстовий файл з завданням повинен називатися так як і файл *.html 
 * Наприклад для Exercise_5.3.html тектовий файл повинен бути Exercise_5.3.txt
 * Файл з режимом вчителя для Exercise_5.3.html повинен бути Exercise_5.3-tm.html
 * 
 * Файл промальовує всю сторінку в тому числі:
 * номер вправи, тему, завдання, вправи (7шт), кнопки та поле виводу результатів
*/

//достаємо імя файла (імя html повинно бути таким, як і txt з завданнями)
var teacherModeText = new String("-"+"tm"); //слово для вмикання режиму вчителя
//наприклад для завдання 8.3 простий виклик буде: /Exercise_8.3.html режим вчителя: /Exercise_8.3-tm.html
var fileNameforExercise1 = new String(location.pathname.match(/[^/]*$/));
if (fileNameforExercise1.includes(teacherModeText)){//Перевірка на режим вчителя
  var indexTM = fileNameforExercise1.indexOf(teacherModeText);
  teacherMode = 1;
}
else {
  var indexTM = fileNameforExercise1.indexOf(".html");
  teacherMode = 0;}
var fileNameforExercise = new String(fileNameforExercise1.substring(0, indexTM) + ".txt");
fileNameforExercise = "txt/" + fileNameforExercise;
//alert("шлях = " + fileNameforExercise1); alert("файл = " + fileNameforExercise);


//блок читання з txt
function getXmlHttp() {
  var xmlhttp;

  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }

  if (!xmlhttp && typeof XMLHttpRequest != "undefined") {
    xmlhttp = new XMLHttpRequest();
  }

  return xmlhttp;
}

var fileNameExercise;
var response;
(function () {
  var xmlhttp = getXmlHttp();   //xmlhttp.open("GET", "Exercise_8.3.txt", false);
  xmlhttp.open("GET", fileNameforExercise, false);

  xmlhttp.send(null);

  if (xmlhttp.status == 200) {
    response = xmlhttp.responseText;    //alert("response =  " + response);
  }
})(); //кінець блоку читання з txt

// блок. Ріжемо зчитані стрічки в масив по "переносу стрічки"
var arSent = response.split("\n");

// блок. Ріжемо кожну стрічку в масиви по знаку ";"
var marka = ";";//чим розділені частини речень
for (k = 3; k < arSent.length; k++) {
  var texta = "question" + (k - 2);
  window[texta] = arSent[k].split(marka);
  // alert(texta);
}

var questionArray = new Array(question1,question2,question3,question4,question5,question6,question7);	

/******************************************** */
//блок заповнення титула, номера вправи, теми, завдання
document.getElementById("title").innerHTML = arSent[0] + " - " + arSent[1];
document.getElementById("exerciseNumber").innerHTML = arSent[0];
document.getElementById("exerciseThema").innerHTML = arSent[1];
document.getElementById("exerciseTask").innerHTML = arSent[2];

var tDcnt = questionArray.length; // Кількість питань
//Скид всіх завдань в нуль (для кнопки внизу завдань)
function again() {
  for (rindex = 0; rindex < questionArray.length; rindex++) {
    answerArray[rindex].value = "";
    progress[rindex] = 0;
    imageArray[rindex].src = "/image/clocktransparent.gif";
  }
}

//Первірка порядку кліків (0,1,2,3,....) та зміна статусу картинки якщо завдання ОК
function clicked(qnumber, wnumber) {
  var answerArray = new Array(
    document.form1.answer1,
    document.form1.answer2,
    document.form1.answer3,
    document.form1.answer4,
    document.form1.answer5,
    document.form1.answer6,
    document.form1.answer7
  );
  var imageArray = new Array(
    document.images.im1,
    document.images.im2,
    document.images.im3,
    document.images.im4,
    document.images.im5,
    document.images.im6,
    document.images.im7
  );

  if (progress[qnumber] != questionArray[qnumber].length) {
    if (progress[qnumber] == wnumber) {
      answerArray[qnumber].value += " " + questionArray[qnumber][wnumber];
      progress[qnumber]++;
      if (progress[qnumber] == questionArray[qnumber].length) {
        imageArray[qnumber].src = "/image/clocktick.gif";
      }
    } else {
      alert("Wrong order! Please try again!");
    }
  }
}

//Перемішування слів для РАНДОМНОГО представлення
function randomize(Alength) {
  var tempA = new Array(Alength);
  var outArray = new Array(Alength);
  for (i = 0; i < Alength; i++) {
    tempA[i] = i;
  }
  for (i = 0; i < Alength; i++) {
    randindex = Math.floor(Math.random() * tempA.length);
    outArray[i] = tempA[randindex];
    tempB = tempA.slice(0, randindex);
    tempC = tempA.slice(randindex + 1, tempA.length);
    tempA = tempB.concat(tempC);
  }
  return outArray;
}

//Заповнення сторінки html контентом
setUpPage();
function setUpPage() {
  document.write("<form name = 'form1'>");
  var qlinktext = new Array();
  var answerKey = new Array();
  for (qindex = 0; qindex < tDcnt; qindex++) {

    //створюємо стрічку прихованої відповіді
    var textAnswerString = "";
    for (k = 0; k < eval("question" + (qindex + 1)).length; k++) {
      textAnswerString =
        textAnswerString + " " + eval("question" + (qindex + 1))[k];
    }

    var qrandom = randomize(questionArray[qindex].length);
    nextanswerKey = answerKey.length + 1;
    answerKey[nextanswerKey] = qrandom;
    qlinktext[qindex] = "";

    for (linkindex = 0; linkindex < questionArray[qindex].length; linkindex++) {
      //створюємо стрічку слів/словосполучень
      qlinktext[qindex] = qlinktext[qindex] +
        "<a class='btn btn-secondary btn-sm' href='javascript:clicked(" +
        qindex + "," + qrandom[linkindex] +
        ")' class='exercise_linktext'> " +
        questionArray[qindex][qrandom[linkindex]] +
        "</a> ";
      //alert(qlinktext[qindex]);
    }

    //стрічка нижче: пишемо в html номер питання
    document.write(
      "<div class='row lead justify-content-center text-muted align-middle'>" +
        "<div class='col-8 justify-content-center text-start'>" +
        (qindex + 1) +
        ".&nbsp;"
    );

    //стрічка нижче: пишемо в html перелік слів/словосполучень (які будемо клікати)
    document.write(
      "  " +
        qlinktext[qindex] +
        "<i><small class = 'hide-answer'>&nbsp;&nbsp;" +
        //стрічка нижче: пишемо в html стрічку прихованої відповіді
        textAnswerString +
        "</small></i></div><div class='col-7 justify-content-center'>" +
        //стрічка нижче: пишемо в html заТеговане поле вводу (куди збиратимемо відповіді)
        "<input type='text' name='answer" +
        (qindex + 1) +
        "' size='100%' READONLY class='exercise_inputbox' style='width: 100%; box-sizing: border-box'>" +
        //стрічка нижче: пишемо в html заТеговане поле з картинкою (маркування правильної відповіді)
        "</div><div class='col-1 justify-content-center align-middle'>&nbsp;&nbsp;<img src='/image/clocktransparent.gif' name='im" +
        +(qindex + 1) +
        "' alt='mark'></div></div>"
    );
  }

     //блок вставки кнопок   
     document.write("</form><div id='results'><form name='form2'><center>"+
     "<input type='button' name='pbSubmit' value='Start again' onclick='again()' class='btn btn-primary m-2' />");
     if (teacherMode == 1){ //якщо режим вчителя, то додатково малююємо кнопку "ПОКАЗАТИ/СХОВАТИ ВІДПОВІДЬ"
     document.write("<input type='button' name='pbSubmit' value='SHOW/HIDE ANSWER' onclick='showAnswer()' class='btn btn-primary m-2'/> ");
     }
     document.write("</center></div></form>");

  progress = new Array(questionArray.length);
  for (pindex = 0; pindex < questionArray.length; pindex++) {
    progress[pindex] = 0;
  }
}

var answerArray = new Array(
  document.form1.answer1,
  document.form1.answer2,
  document.form1.answer3,
  document.form1.answer4,
  document.form1.answer5,
  document.form1.answer6,
  document.form1.answer7
);
var imageArray = new Array(
  document.images.im1,
  document.images.im2,
  document.images.im3,
  document.images.im4,
  document.images.im5,
  document.images.im6,
  document.images.im7
);

var progress = new Array(questionArray.length);
for (pindex = 0; pindex < questionArray.length; pindex++) {
  progress[pindex] = 0;
}

//функція показу правильних відповідей 
var flag = 0;
function showAnswer() {
  if (flag == 0) {
    flag = 1;
    showValue = "inline-block";
  } else {
    flag = 0;
    showValue = "none";
  }
  for (i = 0; i < tDcnt; i++) {
    document.form1.getElementsByClassName("hide-answer")[i].style.display =
      showValue;
  }
}//кінець функції показу правильних відповідей 