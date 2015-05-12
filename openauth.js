/*
 * Copyright 2015 TheShark34
 *
 * This file is part of OpenAuth.

 * OpenAuth is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OpenAuth is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with OpenAuth.  If not, see <http://www.gnu.org/licenses/>.
 */

function startInstallation() {
    setPercentage(55);
    sendRequest("installer.php", "install", deleteInstaller);
}

function deleteInstaller() {
	setPercentage(90);
	sendRequest("installer.php", "deleteInstaller", redirect);
}

function redirect() {
    setPercentage(100);
    window.location.replace("config.php");
}

function finish() {
    alert("Finished !");
    window.location.replace("index.php");
}

function sendRequest(file, request, callback) {
    var http = new XMLHttpRequest();
    http.open("GET", file + "?request=" + request, true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && (http.status == 200 || http.status == 0))
            if(http.responseText == "success") {
            		if(callback != null)
                    	callback();
            } else {
                alert("An error occured, page returned : " + http.responseText + "\nMake sure the installer you didn't changed the files name and you have a working internet connection.");
                closeWindow();
            }
    }
    http.send(null);
}

function setPercentage(percentage) {
    $('#pb').css('width', percentage + '%').attr('aria-valuenow', percentage);
}

function closeWindow() {
	window.open('','_self').close();
}

function displaySecondPage() {
  document.getElementById("first-page").style.display = "none";
  document.getElementById("second-page").text = '
    Donc maintenant, passons à la configuration de la base de donnée.
    <br />
    Merci d\'entrer le pseudo et le mot de passe du serveur SQL, et le nom de la BDD que vous voulez créer, <b>mais si elle existe déjà elle sera supprimée !</b>
    <br /><br /><br />

    <label for="bdd-username">Pseudo du serveur : </label> : <input class="text-field" type="text" name="bdd-username" id="bdd-username" required/>
    <br />
    <label for="bdd-password">Mot de Passe du serveur :</label> : <input class="text-field" type="password" name="bdd-password" id="bdd-password" required/>
    <br /><br />
    <label for="bdd-name">Nom de la BDD : </label> : <input class="text-field" type="text" name="bdd-name" id="bdd-name" required/>
    <br /><br />

    <input class="submit-button" type="submit" value="Appliquer" />
  ';
}
