//достаємо імя файла та номер завдання
var fileNameforExercise1 = new String(location.pathname.match(/[^/]*$/));
var indexTM1 = fileNameforExercise1.indexOf("Exercise_") + 9;
var indexTM2 = fileNameforExercise1.includes("-tm") ? fileNameforExercise1.indexOf("-tm.html") : fileNameforExercise1.indexOf(".html");
var numberEx1 = parseInt(new String(fileNameforExercise1.substring(indexTM1, indexTM2))); //номер завдання
var title1 = "Exercise " + numberEx1;
var fileNameforExercise = "txt\\Exercise_" + numberEx1 + ".txt";
//alert("fileNameforExercise1 = " + fileNameforExercise1); alert("numberEx1 = " + numberEx1);

//Перевірка на teacherMode
var modeTM = fileNameforExercise1.includes("-tm") ? "-tm.html" : ".html";
document.getElementById("title").innerHTML = title1;


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
  var xmlhttp = getXmlHttp();   //xmlhttp.open("GET", "Exercise_8.6.txt", false);
  xmlhttp.open("GET", fileNameforExercise, false);

  xmlhttp.send(null);

  if (xmlhttp.status == 200) {
    response = xmlhttp.responseText;    //alert("response =  " + response);
  }
})(); //кінець блоку читання з txt

var arSent = response.split("\n");
var numberEx2 = parseInt(arSent[0]);//кількість завдань 
//alert("numberEx2 = " + numberEx2);


setUpPage();
function setUpPage(){

  document.write("<div class='container my-5'><div class='row'><div class='col'><h1 class='fw-light text-center'>"+
  title1 +   "</h1></div>");

  for (k = 0; k < numberEx2; k++){
        var exWord1 = "Exercise_" + numberEx1 + "." + (k+1)  + modeTM;
        var exWord2 = "Exercise " + numberEx1 + "." + (k+1);
   // alert("exWord1 = " + exWord1 + "\n" + "exWord2 = " + exWord2);

    document.write("<div class='row gy-1'><a href='"+
    exWord1
    +"' class='btn btn-primary' target='loadpost'>"+
    exWord2 +
    "</a></div>");
  }

  document.write("</div>");
}