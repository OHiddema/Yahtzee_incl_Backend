var steen = []; // images van de getoonde stenen
var waarde = []; // aantal ogen op de getoonde stenen
var beurten = 3; // aantal beurten binnen een ronde loopt af van 3 naar 1
var rondes = 1; // aantal rondes loopt op van 1 naar 13
var ChooseScore = false;  // geeft aan of speler een score mag kiezen in de tabel
var i; //loop counter
var blnLoggedIn = false;
var myInterval;

const clrGreen500 = "#4CAF50";

// zet DOM-elementen in variabelen
var id_btnDobbel = document.getElementById("btnDobbel");
var id_Var = document.getElementById("variabel");
var id_Vast = document.getElementById("vast");
var cl_TdClick = document.getElementsByClassName("td_clickable");
var cl_TdClick_after = document.getElementsByClassName("td_clickable_after");

var id_worp1 = document.getElementById("worp1");
var id_worp2 = document.getElementById("worp2");
var id_worp3 = document.getElementById("worp3");

var id_audioDice = document.getElementById("audioDice");
var id_volumeMin = document.getElementById("volumeMin");
var id_volumeMax = document.getElementById("volumeMax");

id_volumeMin.onclick = function () {
  id_audioDice.volume = 1;
  this.style.display = "none";
  id_volumeMax.style.display = "inline";
};

id_volumeMax.onclick = function () {
  id_audioDice.volume = 0;
  this.style.display = "none";
  id_volumeMin.style.display = "inline";
};

for (i = 0; i < 5; i++) {
  steen[i] = document.createElement("img");
  id_Var.appendChild(steen[i]);
  steen[i].style.display = "none"; // maak de stenen nog niet zichtbaar
  steen[i].addEventListener("click", verplaatsSteen);
}
getHighscores();

function verplaatsSteen() {
  if (id_Var.contains(this)) {
    id_Var.removeChild(this);
    id_Vast.appendChild(this);
  }
  else {
    id_Vast.removeChild(this);
    id_Var.appendChild(this);
  }
}

id_btnDobbel.onclick = function () {

  id_audioDice.load(); //forceert opnieuw afspelen als geluidsfragment nog niet is afgelopen
  id_audioDice.play();

  for (i = 0; i < 5; i++) {
    let j = 0;
    // dobbel met de stenen op de 1e rij
    if (id_Var.contains(steen[i])) {
      waarde[i] = (Math.floor(6 * Math.random()) + 1);
      steen[i].src = `image/dice${waarde[i]}.svg`;
      steen[i].style.display = "none";
      j++;
      myDelayDisplay(i, j);
    }
  }

  // setTimeout kan niet in de for-loop staan, omdat de argumenten niet mogen veranderen tijdens het wachten!
  function myDelayDisplay(a, b) {
    setTimeout(() => steen[a].style.display = "inline", 500 * b);
  }

  ChooseScore = true;

  beurten = beurten - 1;
  switch (beurten) {
    case 0: {
      id_btnDobbel.disabled = true;
      id_btnDobbel.innerHTML = "Kies een score!";
      id_worp3.style.visibility = "visible";
    }
      break;
    case 1: {
      id_worp2.style.visibility = "visible";
    }
      break;
    default: {  // beurten = 2 is de enige optie die overblijft
      id_worp1.style.visibility = "visible";
    }
  }
  score_opties();
};

function score_opties() {
  var aantal = []; //het aantal gedobbelde enen, tweeeen, ... , zessen in de worp
  var som_stenen = 0; // de som van de waarde van alle stenen in de worp
  var id; //als tijdelijke opslag DOM variabele

  // initialisatie array
  for (i = 1; i <= 6; i++) { aantal[i] = 0; }

  // tel het aantal enen, tweeen, ... zessen
  for (i = 0; i < 5; i++) { aantal[waarde[i]] += 1; }

  // bepaal de som van alle stenen (voor chance)
  for (i = 1; i <= 6; i++) { som_stenen += aantal[i] * i; }

  // zet punten voor enen t/m zessen in de tabel
  for (i = 1; i <= 6; i++) {
    id = document.getElementById("td" + i);
    if (id.classList.contains("td_clickable")) { id.innerHTML = aantal[i] * i; }
  }

  //Let's use Regular Expressions!
  var tmp = waarde.slice(); //maak een kopie van het array
  tmp.sort(function (a, b) { return a - b; }); //sorteer het array met numerieke waarden
  var tmpStr = tmp.join(""); //maak van de inhoud van het array een string

  var blnThree = /(.)\1{2}/.test(tmpStr);
  var blnFour = /(.)\1{3}/.test(tmpStr);
  var blnFullHouse = /(.)\1{2}(.)\2|(.)\3(.)\4{2}/.test(tmpStr);
  var blnKleineStraat = /1234|2345|3456/.test(tmpStr.replace(/(.)\1/, "$1"));
  var blnGroteStraat = /12345|23456/.test(tmpStr);
  var blnYahtzee = /(.)\1{4}/.test(tmpStr);

  id = document.getElementById("threeofakind");
  if (id.classList.contains("td_clickable")) { id.innerHTML = blnThree * som_stenen; }

  id = document.getElementById("fourofakind");
  if (id.classList.contains("td_clickable")) { id.innerHTML = blnFour * som_stenen; }

  id = document.getElementById("fullhouse");
  if (id.classList.contains("td_clickable")) { id.innerHTML = blnFullHouse * 25; }

  id = document.getElementById("kleinestraat");
  if (id.classList.contains("td_clickable")) { id.innerHTML = blnKleineStraat * 30; }

  id = document.getElementById("grotestraat");
  if (id.classList.contains("td_clickable")) { id.innerHTML = blnGroteStraat * 40; }

  id = document.getElementById("chance");
  if (id.classList.contains("td_clickable")) { id.innerHTML = som_stenen; }

  id = document.getElementById("yahtzee");
  if (id.classList.contains("td_clickable")) { id.innerHTML = blnYahtzee * 50; }
}

// Hier wordt het klikken op een scoreveld afgehandeld
for (i = 0; i < cl_TdClick.length; i++) {
  cl_TdClick[i].addEventListener("click", clickScoreveld);
}

function clickScoreveld() {
  var myId, totaal, j, k;
  if (ChooseScore) {
    this.classList.replace("td_clickable", "td_clickable_after");
    this.removeEventListener("click", clickScoreveld);
    id_btnDobbel.innerHTML = "Dobbel";
    ChooseScore = false;
    beurten = 3;
    rondes += 1;
    id_btnDobbel.disabled = (rondes > 13);
    id_worp1.style.visibility = "hidden";
    id_worp2.style.visibility = "hidden";
    id_worp3.style.visibility = "hidden";

    // bepaal totaal bovenste helft (1 t/m 6)
    var Totaal_EenTotZes = 0;

    for (i = 1; i <= 6; i++) {
      myId = "td" + i;
      var id = document.getElementById(myId);
      if (id.classList.contains("td_clickable_after")) {
        Totaal_EenTotZes += Number(id.innerHTML);
      }
    }

    if (Totaal_EenTotZes > 0) {
      document.getElementById("totaal").innerHTML = Totaal_EenTotZes;
    }

    // bereken totaalscore
    totaal = 0;
    for (j = 0; j < cl_TdClick_after.length; j++) {
      totaal = totaal + Number(cl_TdClick_after[j].innerHTML);
    }

    if (Totaal_EenTotZes >= 63) {
      totaal += 35;
      document.getElementById("bonus").innerHTML = 35;
    }

    // maak nog niet gekozen velden weer leeg
    for (j = 0; j < cl_TdClick.length; j++) {
      cl_TdClick[j].innerHTML = "";
    }

    document.getElementById("score").innerHTML = totaal;

    if (rondes > 13) {
      // spel is afgelopen
      myInterval = setInterval(function () {
        id = document.getElementById("score");
        if (id.style.backgroundColor != "white") {
          id.style.backgroundColor = "white";
        } else {
          id.style.backgroundColor = clrGreen500;
        }
      }, 500);
      checkScore(totaal);
    }

    // zet alle stenen terug naar de eerste rij en maak ze onzichtbaar
    for (k = 0; k < 5; k++) {
      if (id_Vast.contains(steen[k])) {
        id_Vast.removeChild(steen[k]);
        id_Var.appendChild(steen[k]);
      }
      steen[k].style.display = "none";
    }
  }
}

// ****************** opnieuw spelen zonder F5 *******************

function playAgain() {
  beurten = 3;
  rondes = 1;
  ChooseScore = false;
  id_worp1.style.visibility = "hidden";
  id_worp2.style.visibility = "hidden";
  id_worp3.style.visibility = "hidden";

  for (k = 0; k < 5; k++) {
    if (id_Vast.contains(steen[k])) {
      id_Vast.removeChild(steen[k]);
      id_Var.appendChild(steen[k]);
    }
    steen[k].style.display = "none";
  }
  id_btnDobbel.disabled = false;
  id_btnDobbel.innerHTML = "Dobbel";

  var x = document.getElementsByClassName("td_clickable_after");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener("click", clickScoreveld);
  }
  while (x.length > 0) {
    x[0].classList.replace("td_clickable_after", "td_clickable");
  }
  x = document.getElementsByClassName("td_clickable");
  for (i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
  }
  document.getElementById("totaal").innerHTML = "";
  document.getElementById("bonus").innerHTML = "";
  document.getElementById("score").innerHTML = "";
  clearInterval(myInterval);
  document.getElementById("score").style.backgroundColor = clrGreen500;
}

// ****************** Communicatie met database ******************

function inloggen(blnNewMember) {
  var usrn = document.getElementById("usrn").value;
  var pswd = document.getElementById("pswd").value;
  var hint = document.getElementById("txtHint");
  var intResponse = -1;
  var xhttp;
  var url;

  if ((usrn == "") || (pswd == "")) {
    document.getElementById("txtHint").innerHTML = "Vul zowel naam als wachtwoord in!";
    // Hier kan de input evt. nog verder gescreend worden
    return;
  }

  if (blnNewMember) {
    url = "aanmelden.php";
  } else {
    url = "inloggen.php";
  }

  xhttp = new XMLHttpRequest();
  params = "q1=" + usrn + "&q2=" + pswd;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      intResponse = parseInt(this.responseText);
      switch (intResponse) {
        case 0:
        case 4:
          hint.innerHTML = `Welkom ${usrn}!`;
          blnLoggedIn = true;
          break;
        case 1:
          hint.innerHTML = "Deze naam bestaat al. Kies een andere naam.";
          blnLoggedIn = false;
          break;
        case 2:
          hint.innerHTML = "Onbekende naam. Probeer het nog eens.";
          blnLoggedIn = false;
          break;
        case 3:
          hint.innerHTML = "Onjuist wachtwoord. Probeer het nog eens.";
          blnLoggedIn = false;
          break;
        default:
          hint.innerthml = `Error! intResponse = ${intResponse}`;
          blnLoggedIn = false;
      }
      if (blnLoggedIn) {
        document.getElementById("tdName").innerHTML = usrn;
        getcurrenthighscore(usrn);
      }
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}


function getHighscores() {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("tblHighscores").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "gethighscores.php", true);
  xhttp.send();
}

function getcurrenthighscore(username) {
  var xhttp = new XMLHttpRequest();
  var url = "getcurrenthighscore.php";
  var params = "q1=" + username;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("tdScore").innerHTML = parseInt(this.responseText);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

function checkScore(newScore) {
  oldScore = document.getElementById("tdScore").innerHTML;
  user = document.getElementById("tdName").innerHTML;
  if (newScore > oldScore) {
    alert("Gefeliciteerd. Je hebt je higscore verbeterd. Deze zal worden bijgewerkt.");
    updatescore(user, newScore);
    document.getElementById("tdScore").innerHTML = newScore;
  }
}

function updatescore(user, newScore) {
  var xhttp = new XMLHttpRequest();
  var url = "updatescore.php";
  var params = `q1=${user}&q2=${newScore}`;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getHighscores();
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}