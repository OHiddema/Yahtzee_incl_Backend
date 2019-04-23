<!DOCTYPE html>
<html>

<head>
  <title>Yahtzee</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="modal.css">
  <link href="https://fonts.googleapis.com/css?family=Fondamento:400i" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <script src="script.js" defer></script>
  <!-- <script src="https://code.jquery.com/jquery-3.4.0.js"></script> -->
  <meta name="author" content="Oege Hiddema">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

  <div id=iconContainer>
    <a href="#openModal">Log in</a>
    <a id="icnUitleg" href="uitleg.html" target="_blank"><i class="far fa-question-circle fa-2x"></i></a>
    <i id="volumeMax" class="fas fa-volume-up fa-lg"></i>
    <i id="volumeMin" class="fas fa-volume-off fa-lg"></i>
  </div>

  <!-- modal dialog box used for login -->
  <div id="openModal" class="modalDialog">
    <div>
      <a href="#close" title="Close" class="close">X</a>
      <h2>aanmelden of inloggen</h2>
      <label for="usrn">Naam:</label>
      <input type="text" id="usrn" name="usrn" maxlength="15"><br><br>
      <label for="pswd">Wachtwoord:</label>
      <input type="password" id="pswd" name="pswd" maxlength="15"><br><br>
      <button onclick="inloggen(false)">Inloggen (bekende speler)</button>
      <button onclick="inloggen(true)">Aanmelden (nieuw speler)</button>
      <div id="txtHint"></div>
    </div>
  </div>

  <header>Yahtzee!</header>
  <main>
    <div class="container">
      <button id="btnDobbel">Dobbel</button>
      <audio id="audioDice">
        <source src="rolling_dice.wav" type="audio/wav">
      </audio>
      <div class="div_stenen" id="variabel"></div>
      <div class="div_stenen" id="vast"></div>
      <div id="worpenContainer">
        <div>worpen:</div>
        <div id="worpen">
          <div class="worp" id="worp1"></div>
          <div class="worp" id="worp2"></div>
          <div class="worp" id="worp3"></div>
        </div>
      </div>
      <button onclick="playAgain()">Opnieuw spelen</button>
    </div>
    <div class="container">
      <table>
        <tr>
          <th></th>
          <th>Punten</th>
        </tr>
        <tr>
          <td>Enen</td>
          <td class="td_clickable" id="td1"></td>
        </tr>
        <tr>
          <td>Tweeën</td>
          <td class="td_clickable" id="td2"></td>
        </tr>
        <tr>
          <td>Drieën</td>
          <td class="td_clickable" id="td3"></td>
        </tr>
        <tr>
          <td>Vieren</td>
          <td class="td_clickable" id="td4"></td>
        </tr>
        <tr>
          <td>Vijfen</td>
          <td class="td_clickable" id="td5"></td>
        </tr>
        <tr>
          <td>Zessen</td>
          <td class="td_clickable" id="td6"></td>
        </tr>
        <tr class="tr_dk">
          <td>Totaal</td>
          <td id="totaal"></td>
        </tr>
        <tr class="tr_dk">
          <td>Bonus</td>
          <td id="bonus"></td>
        </tr>
        <tr>
          <td>Drie dezelfde</td>
          <td class="td_clickable" id="threeofakind"></td>
        </tr>
        <tr>
          <td>Vier dezelfde</td>
          <td class="td_clickable" id="fourofakind"></td>
        </tr>
        <tr>
          <td>Full house</td>
          <td class="td_clickable" id="fullhouse"></td>
        </tr>
        <tr>
          <td>Kleine straat</td>
          <td class="td_clickable" id="kleinestraat"></td>
        </tr>
        <tr>
          <td>Grote straat</td>
          <td class="td_clickable" id="grotestraat"></td>
        </tr>
        <tr>
          <td>Chance</td>
          <td class="td_clickable" id="chance"></td>
        </tr>
        <tr>
          <td>Yahtzee</td>
          <td class="td_clickable" id="yahtzee"></td>
        </tr>
        <tr class="tr_dk">
          <td>Totaalscore</td>
          <td id="score"></td>
        </tr>
      </table>
    </div>

    <div class="container">
      <div class="kopje">Highscore top 10</div>
      <table id="tblHighscores">
      </table>
      <div class="kopje">Inloggegevens</div>
      <table id=tblPersonal>
        <tr>
          <td>naam:</td>
          <td>highscore:</td>
        </tr>
        <tr>
          <td id="tdName">---</td>
          <td id="tdScore">---</td>
        </tr>
      </table>
    </div>
  </main>
  <footer>© <a href="mailto:oegehidddema@gmail.com">Oege Hiddema</a> , versie 2.0.1 31-3-2019 10:56</footer>
</body>

</html>