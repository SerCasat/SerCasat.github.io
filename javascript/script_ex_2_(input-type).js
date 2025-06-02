/** 
 * Це javascript файл для вправи "INPUT_type"/"Введи варіант"
 * Даний вид вправ іде під номером .2 (Наприклад 5.2, 6.2 чи 25.2)
 * Текстовий файл з завданням повинен називатися так як і файл *.html 
 * Наприклад для Exercise_5.2.html тектовий файл повинен бути Exercise_5.2.txt
 * Файл з режимом вчителя для Exercise_5.2.html повинен бути Exercise_5.2-tm.html
 * 
 * Файл промальовує всю сторінку в тому числі:
 * номер вправи, тему, завдання, вправи (7шт), кнопки та поле виводу результатів
*/

//достаємо імя файла (імя html повинно бути таким, як і txt з завданнями)
var teacherModeText = new String("-"+"tm"); //слово для вмикання режиму вчителя
//наприклад для завдання 8.2 простий виклик буде: /Exercise_8.2.html режим вчителя: /Exercise_8.2-tm.html
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
  var xmlhttp = getXmlHttp();   //xmlhttp.open("GET", "Exercise_8.2.txt", false);
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

/******************************************** */
setUpPage(); //Заповнення html сторінки
var tDcnt = 7; //arSent.length-3; // Кількість питань

//блок заповнення титула, номера вправи, теми, завдання
document.getElementById("title").innerHTML = arSent[0] + " - " + arSent[1];
document.getElementById("exerciseNumber").innerHTML = arSent[0];
document.getElementById("exerciseThema").innerHTML = arSent[1];
document.getElementById("exerciseTask").innerHTML = arSent[2];

function setUpPage() {
  document.write("<form name = 'form1'>");

  //блок рандома для перемішування варіантів відповіді
  for (k = 3; k < 10; k++) {
    //блок запису завдання
    document.write(
      "<div class='row justify-content-center lead text-start text-muted m-1'>" +
        "<div class='col-10 text-start m-1 p-1'>" +
        (k-2) + ".&nbsp;" +
        eval("question" + (k-2))[0] +
        "&nbsp;<input type='text' class='exercise_inputbox' size='15%' name='rb" +
        (k-2) + "'>&nbsp;" +
        "<i><small>" + 
        eval("question" + (k-2))[2] +"</small></i>&nbsp;"+    eval("question" + (k-2))[3]             );

        //блок вставки прихованої відповіді
        document.write("&nbsp;&nbsp;&nbsp;"+
        "<i><small class='hide-answer' id='rs" +         (k-2) +        "'>" +
            eval("question" + (k-2))[1] +         "</small></i>"
        );

    document.write("</div>"); //закриваю колонку завдань + прихованих відповідей

    //блок вставки картинок (добре, погано)
    document.write(
      "<div class='col-1 text-start m-1 p-1'>" +
        "&nbsp;<img class='fit-picture' src='/image/clockcross.gif' id='ima_wrong" +
        (k-2) +
        "' alt='mark'><img class='fit-picture' src='/image/clocktick.gif' id='ima_correct" +
        (k-2) +
        "' alt='mark'></div>" //закриваю колонку картинок
    );

    document.write("</div>"); //закриваю стрічку завдань 
  }

   //блок вставки кнопок   
  document.write("</form><div id='results'><form name='form2'><center>"+
  "<input type='button' name='pbSubmit' value='YOUR RESULTS' onclick='makeDiagnosis()' class='btn btn-primary m-2' />");
  if (teacherMode == 1){ //якщо режим вчителя, то додатково малююємо кнопку "ПОКАЗАТИ/СХОВАТИ ВІДПОВІДЬ"
  document.write("<input type='button' name='pbSubmit' value='SHOW/HIDE ANSWER' onclick='showAnswer()' class='btn btn-primary m-2'/> ");
  }
  document.write("<br /><textarea name='tDiagnosis' rows='3' cols='70' wrap></textarea></center></form></div>");
} // Кінець заповнення html сторінки
/******************************************** */

//блоки перевірки, рандомів
//перевірка результатів вибору та вивід результатів
function makeDiagnosis() {
  var summa = 0;

  for (i = 0; i < tDcnt; i++) {
    var text_cor = "ima_correct" + (i + 1);
    var text_wro = "ima_wrong" + (i + 1);
    var text_rs = "rs" + (i + 1);
    var bCorr = document.getElementById(text_cor);
    var bWron = document.getElementById(text_wro);
    var ans = document.getElementById(text_rs);
    var a = ans.textContent || ans.innerText;
    var b = document.form1["rb" + (i + 1)].value;
    if (a.toLowerCase().trim() == b.toLowerCase().trim()) {
      summa++;
      bCorr.className = "nonfit-picture";
      bWron.className = "fit-picture";
    } else {
      bWron.className = "nonfit-picture";
      bCorr.className = "fit-picture";
    }
  }


  //блок виводу результатів
  document.form2.tDiagnosis.value =
    "Your score is  " +
    ((summa * 10) / tDcnt).toFixed(1) +
    "\n" +
    "\n" +
    "The total is correct " +
    summa +
    " with " +
    tDcnt +
    " which is equal " +
    ((summa * 100) / tDcnt).toFixed(1) +
    "%";
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
