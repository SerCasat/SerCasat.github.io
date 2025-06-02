//достаємо імя файла та номер завдання
var fileNameforExercise1 = new String(location.pathname.match(/[^/]*$/));
var indexTM1 = fileNameforExercise1.indexOf("Exercise_") + 9;
var indexTM2 = fileNameforExercise1.includes("-tm") ? fileNameforExercise1.indexOf("-tm.html") : fileNameforExercise1.indexOf(".html");
var numberEx1 = parseInt(new String(fileNameforExercise1.substring(indexTM1, indexTM2))); //номер завдання
var title1 = "Exercise " + numberEx1;
//alert("fileNameforExercise1 = " + fileNameforExercise1);
//alert("fnumberEx1 = " + numberEx1);

//Перевірка на teacherMode
var modeTM = fileNameforExercise1.includes("-tm") ? "-tm.html" : ".html";
var exWord1 = "Exercise_" + numberEx1 + "_content" + modeTM;
var exWord2 = "Exercise_" + numberEx1 + ".1" + modeTM;
//alert("exWord1 = " + exWord1 + "\n" + "exWord2 = " + exWord2);

document.getElementById("title").innerHTML = title1;

setUpPage();
function setUpPage(){
  document.write("<frameset cols='25%, 75%'><frame src='" + 
  exWord1 +
  "' name='Сontent' scrolling='no' noresize frameborder = '0'><frame src='" + 
  exWord2 + 
  "' id='loadpost'  name='loadpost' scrolling='no' noresize frameborder = '0'></frameset>");
}