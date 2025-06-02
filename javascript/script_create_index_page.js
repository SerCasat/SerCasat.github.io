//блок читання з txt
var txtName = "index.txt";
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
  var xmlhttp = getXmlHttp();
  xmlhttp.open("GET", txtName, false);

  xmlhttp.send(null);

  if (xmlhttp.status == 200) {
    response = xmlhttp.responseText;    //alert("response =  " + response);
  }
})(); //кінець блоку читання з txt

// блок. Ріжемо зчитані стрічки в масив по "переносу стрічки"
var arSent = response.split("\n");

// блок. Ріжемо кожну стрічку в масиви по знаку ";"
var marka = ";";//чим розділені частини речень


setUpPage();
function setUpPage(){

var k = 0;
for (i=0; i<3; i++) {

  document.write("<div class='col'>");
  
  for (j=0; j<12; j++){
    var senTa = arSent[k].split(marka);

    var exWord1 = "Exercise_" + (k+1) + "/Exercise_" + (k+1) + ".html";
    var exWord2 = senTa[0]; var exWord3 = senTa[1];
    //alert("exWord1 = " + exWord1 + "\n" + "exWord2 = " + exWord2 + "\n" + "exWord3 = " + exWord3);
    
    document.write("<div class='row m-1 p-1'><a href='" + exWord1 +
    "' class='btn btn-lg btn-primary mx-auto' target='_blank' style='width: 100%;' data-bs-toggle='tooltip' data-bs-html='true' title='" +
    exWord2 + "'>" +  exWord3 + "</a></div>");    

    k++;
  }

  document.write("</div>");

}
}

