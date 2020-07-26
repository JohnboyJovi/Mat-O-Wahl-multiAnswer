///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// DE: Bei Problemen benutzen Sie bitte die /QUICKTEST.HTML 
// oder lesen in der /SYSTEM/MAT-O-WAHL-HILFE.PDF nach.
// Diese Datei am besten in einem Editor mit Syntaxhervorhebung bearbeiten. z.B. Notepad++, gedit, kate, ...

// ********************************************************************

// EN: Please try QUICKTEST.HTML in case of problems.
// Edit this file with an editor that uses syntax-highlighting, e.g.  Notepad++, gedit, kate, ...

///////////////////////////////////////////////////////////////////////
// 1. ALLGEMEINE / EINFACHE EINSTELLUNGEN:

// DE: Bei den CSV-Dateien bitte beachten: 
// - ueberall das gleiche Trennzeichen benutzen (z.B. immer nur Komma)
// - Zweispaltig aufbauen, z.B.
// -- richtig: 1,"Wir sind dafür" 
// -- richtig: 1,"" 
// -- grenzwertig: 1,
// -- falsch:  1

// Bei Problemen mit Umlauten und Sonderzeichen benutzen Sie bitte
// den entsprechenden HTML-Code. z.B. ä = ae = &auml; Siehe: 
// http://de.selfhtml.org/html/allgemein/zeichen.htm#umlaute

// ********************************************************************

// 1. GENERAL / SIMPLE SETTINGS

// EN: When creating the CSV files, please take care of:
// - use always the same separator (e.g. always comma)
// - use two rows, e.g.
// -- right: 1,"We support it" 
// -- right: 1,"" 
// -- borderline: 1,
// -- wrong:  1

// In case of problems with special characters, please use its HTML code
// see here: https://www.utexas.edu/learn/html/spchar.html

// --------------------------------------------------------------------
// 1.1. FRAGENKATALOG:
// DE: Die erste Spalte der CSV-Datei enthält eine Kurzzusammenfassung der Frage, die zweite Spalte enthält die eigentliche Frage.
// z.B. "Flughafenausbau","Der Flughafen soll ausgebaut werden."

// ********************************************************************

// 1.1. LIST OF QUESTIONS:
// EN: First row always contains a short summary of the question while the second row holds the question itself. 
// e.g. "Airport","The airport shall be expanded."

var fileQuestions = "Fragen.csv";
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1.2. LISTE DER PARTEIEN und KANDIDATEN:

// 1.2.1. Liste der Parteipositionen und Begruendungen.
// DE: Die Inhalte der Listen bitte mit Komma trennen, Reihenfolge beachten und mit "" umschliessen
// - richtig: "Partei-A, Partei-B"
// - falsch:  "Partei-A, Partei-B -> fehlendes " am Ende
// - falsch:  "Partei-A Partei-B" -> fehlendes Komma

// ********************************************************************

// 1.2. LIST OF PARTIES and CANDIDATES:

// 1.2.1. List of party positions and reasons.
// EN: Please separate the contents of lists with comma, follow the right order and enclose it with ""
// - right: "Party-A, Party-B"
// - wrong:  "Party-A, Party-B -> missing " at the end
// - wrong:  "Party-A Party-B" -> missing comma
var strPartyFiles = "CDU.csv, SPD.csv, Gruene.csv, LINKE.csv, FDP.csv, Piraten.csv, UWG.csv";

// 1.2.2. Liste der Parteinamen - kurz
// 1.2.2. List of party names - short
var strPartyNamesShort = "CDU, SPD, Grüne, Linke, FDP, Piraten, UWG";

// 1.2.3. Liste der Parteinamen - lang
// 1.2.2. List of party names - long
var strPartyNamesLong = "Christlich Demokratische Union, Sozialdemokratische Partei Deutschland, Bündnis 90/Die Grünen, Die Linke, Freie Demokratische Partei, Piratenpartei, Unabhängige Wähler*innen Gemeinschaft";

// 1.2.4. Logos der Parteien (und Bildgroesse fuer alle, Ursprungseinstellung = 50x25px)
// 1.2.4. Logos of parties (and picture size for all, default = 50x25px)
var strPartyLogosImg = "CDU.png, SPD.png, gruene.png, linke.png, fdp.png, Piraten.png, UWG.png";

// DEMNÄCHST VERALTET und wird ersetzt durch schicke, automatisch skalierte Bilder (Bootstrap) 
// TO BE DEPRECATED and to be replaced with fancy, automatic sized images (Bootstrap) 
var intPartyLogosImgWidth = 75;
var intPartyLogosImgHeight = 75;

// 1.2.5. Internetseiten der Parteien/Kandidaten beginnend mit http(s):// - Link oeffnet sich im neuen Fenster.
// 1.2.5. Website of parties/candidates starting with http(s):// - Link opens in a new window.
var strPartyInternet = "https://www.cdu-aachen.de/, https://www.spd-aachen.eu/, https://www.gruene-aachen.de/, https://dielinke-aachen.de/, https://www.fdp-aachen.de/, https://www.piratenpartei-aachen.de/, http://uwg-aachen.de/";

// DEPRECATED v.0.3
// 1.2.6. Anzahl der Parteien, die in der detaillierten Auswertung sofort angezeigt werden sollen. 0 = alle
// 1.2.6. Number of parties to show in the detailed analysis. 0 = all
// var intPartyDefaultShow = 3
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1.3. UeBERSCHRIFTEN UND TEXTE:
// 1.3. HEADLINES AND TEXTS:

// 1.3.1. Hauptueberschrift
// 1.3.1. Main headline
var heading1 = "KLIMA-KOMMUNAL-O-MAT";

// 1.3.2. Zweite Ueberschrift
// 1.3.2. Second Headline
var heading2 = "<p style=\"color:red;\"><strong>Das ist nur eine vorläufige Version - nicht für die Veröffentlichung gedacht!!!</strong></p><br>Der KLIMA-KOMMUNAL-O-MAT zur Kommunalwahl in Aachen 2020 umfasst die Bereiche Klimaschutz, Ressourceneffizienz und Klimafolgenanpassung. Er wurde auf Basis der Antworten der vom Runden Tisch Klimanotstand Aachen befragten Parteien erstellt. Die Antworten der Parteien können auch unter <a href=\"https://www.runder-tisch-klimanotstand-ac.de/wahlpruefsteine/\">https://www.runder-tisch-klimanotstand-ac.de/wahlpruefsteine/</a> eingesehen werden.";

// 1.3.3. Kurzer Text um was es bei der Wahl geht
// 1.3.3. Short (explaining) text on what's the election about
var explainingText = "Die hier präsentierten Themengebiete stellen nur einen Auszug der relevanten Themen für die Kommunalwahl 2020 dar. Insofern erhebt dieser KLIMA-KOMMUNAL-O-MAT keinen Anspruch auf Vollständigkeit."; 
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1.4. IMPRESSUM, KONTAKT:
// 1.4. IMPRINT, CONTACT:
// 

// ********************************************************************

// DE: Option A) Eigenes Impressum -> Link anpassen, Option B ignorieren
// Muster finden Sie z.B. auf: http://www.e-recht24.de/muster-disclaimer.htm oder http://www.datenschutz-generator.de/

// EN: Option A) own legal notice -> change link, ignore option B
// 1.4.A  
var imprintLink = "https://www.runder-tisch-klimanotstand-ac.de/impressum/"
//var imprintLink = "system/imprint.html"

// ********************************************************************

// Option B) (kurzes) Mat-o-Wahl-Impressum nutzen.
// Wenn Sie keine (oder eigene) Angaben machen, so lassen Sie bitte die Variablen stehen.
// Loeschen Sie stattdessen einfach den Text, z.B.
// var imprintEditorialNames = "";

// Option B) Use (short) legal notice of Mat-o-Wahl.
// If you prefer to leave these information blank, please do not delete these lines 
// but only its content, e.g.
// var imprintEditorialNames = "";

// 1.4.B.1. (optional) Redaktion: Person(en), die die Fragen ausgearbeitet hat
// 1.4.B.1. (optional) Editor: Person(s), who worked on the questions
var imprintEditorialNames = "Max Mustermann, Martina Mustermann, Harry Hirsch";

// 1.4.B.2. (optional) Redaktion: Kontakt-E-Mail
// 1.4.B.2. (optional) Editor: Contact email
var imprintEditorialEmail = "max@mustermann-politikfreund.de";

// 1.4.B.3. (optional) Technik: Person(en), die das System aufgesetzt hat
// 1.4.B.3. (optional) Programming: Person(s), who set up the system
var imprintTechnicsNames = "Max Mustermann, Hans Wurst";

// 1.4.B.4. (optional) Technik: Kontakt-E-Mail
// 1.4.B.4. (optional) Programming: Contact email
var imprintTechnicsEmail = "info@hans-wurst-webdesign-obsthausen.com";

// 1.4.B.5. (optional) Quellenangaben zu den Bildern
// 1.4.B.5. (optional) Sources of pictures
var imprintPictures = "Wikipedia, Max Mustermann, Foto Franz Frankfurt, Neutrale Partei";

// 1.4.B.6. (optional) Link zu einer Datenschutzerklaerung beginnend mit http(s):// - erlaubt die anonyme Statistik
// 1.4.B.6. (optional) Link to a privacy policy starting with http(s):// - allows the anonymous statistics
var imprintPrivacyUrl = "http://www.hans-wurst-webdesign-obsthausen.com/datenschutz.html";
// --------------------------------------------------------------------


///////////////////////////////////////////////////////////////////////
// 2. ERWEITERTE EINSTELLUNGEN:
// 2. ADVANCED SETTINGS

// 2.1. Trennzeichen fuer die CSV-Dateien (Excel benutzt haeufig Semikolon, OpenOffice/LibreOffice ein Komma)
// 2.1. Separator for CSV files (Excel uses often a semicolon, OpenOffice/LibreOffice a comma)
var separator = ";";

// 2.2. Designvorlage (CSS) im Ordner /styles
// 2.2. Design (CSS) in folder /styles  
var design = "default";

// Sprache / Language
// see files in folder /i18n/
var language = "de";


///////////////////////////////////////////////////////////////////////
// 3. PROFESSIONELLE EINSTELLUNGEN:
// 3. PROFESSIONAL SETTINGS

// DE: STATISTIK
// Anonyme Auswertung zulassen: true/1 oder false/0 
// Die Einwilligung des Nutzers und eine Datenschutzerklaerung (s.o.) werden benoetigt! (*)
// Als Ergebnis erhaelt man die Liste mit der persoenlichen Auswahl in der Variablen "mowpersonal" (-1,0,1,99) 
// und die Liste mit der Anzahl der Uebereinstimmungen mit den Parteien als "mowparties" (5,1,0,2) zurueck.
// Als Trennzeichen fuer die Werte dient wieder ein Komma. ;-)
// Das Skript und der Mat-O-Wahl sollten auf der gleichen Domain liegen. 

// ********************************************************************

// EN: STATISTICS
// Allow anonymous analysis: true/1 or false/0 
// Consent of the user and a privacy policy are needed! (*)
// As a result you'll get the list of personal choices in a variable "mowpersonal" (-1,0,1,99) 
// and a list with the number of party-matches as "mowparties" (5,1,0,2).
// Separator for these variables is a comma gain. ;-)
// The script and Mat-O-Wahl must be on the same domain.

var statsRecord = 0;
var statsServer = "http://localhost/extras/vote.php";

// -> POST-Aufruf der gesendeten Ergebnisse / POST-Call of sent results:
// http://localhost/extras/vote.php?mowpersonal=-1,0,1,99&mowparties=5,1,0,2

// (*) In der OUTPUT.JS etwa auf Zeile 60 kann man die Checkbox automatisch als 
// "checked" / angeklickt definieren. Das entspricht dem Opt-In Verfahren.

// (*) In OUTPUT.JS at around line 60 you can define the checkbox as "checked".
// This would be an opt-in method.
