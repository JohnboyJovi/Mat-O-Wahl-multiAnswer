// GENERAL.JS http://www.mat-o-wahl.de
// General functions / Allgemeine Verarbeitungen
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

var version = "0.4.1.20200228"

// Globale Variablen
var arQuestionsShort = new Array();	// Kurzform der Fragen: Atomkraft, Flughafenausbau, ...
var arQuestionsLong = new Array();		// Langform der Frage: Soll der Flughafen ausgebaut werden?
var arQuestionAnswers = new Array()	// wenn individuelle Antworten genutzt werden sollen, als zusätzliche Spalten in Fragen.csv

var arPartyPositions = new Array();	// Position der Partei als Zahl aus den CSV-Dateien (1/0/-1)
var arPartyOpinions = new Array();		// Begründung der Parteien aus den CSV-Dateien
var arPersonalPositions = new Array();	// eigene Position als Zahl (1/0/-1)
var arVotingDouble = new Array();

var arPartyFiles = new Array();		// Liste mit den Dateinamen der Parteipositionen
var arPartyNamesShort = new Array();	// Namen der Parteien - kurz
var arPartyNamesLong = new Array();	// Namen der Parteien - lang
var arPartyLogosImg = new Array();		// Logos der Parteien
var arPartyInternet = new Array();		// Internetseiten der Parteien

var arSortParties=new Array();		//Nummern der Listen, nach Punkten sortiert

var activeQuestion=0; //aktuell angezeigte Frage

arPartyFiles 	= fnTransformDefinitionStringToArray(strPartyFiles);
arPartyNamesShort = fnTransformDefinitionStringToArray(strPartyNamesShort);
arPartyNamesLong= fnTransformDefinitionStringToArray(strPartyNamesLong);
arPartyLogosImg	= fnTransformDefinitionStringToArray(strPartyLogosImg);
arPartyInternet	= fnTransformDefinitionStringToArray(strPartyInternet);


// Anzeige der Fragen (aus fnStart())
function fnShowQuestions(csvData)
{
	// Einlesen der Fragen ...
	// fnSplitLines(csvData,1);
	fnTransformCsvToArray(csvData,1)
	
	// ... und Anzeigen
	var questionNumber = -1;
	
	fnShowQuestionNumber(questionNumber);
} 



// Einlesen der Parteipositionen (aus fnStart())
function fnReadPositions(csvData)
{
	// Einlesen der Parteipositionen und Vergleichen
	// fnSplitLines(csvData,0);
	fnTransformCsvToArray(csvData,0)
}


// Auswertung (Berechnung)
// Gibt ein Array "arResults" zurück für fnEvaluationShort() und fnEvaluationLong();
// Aufruf am Ende aller Fragen in fnShowQuestionNumber() und beim Prüfen auf die "doppelte Wertung" in fnReEvaluate()
function fnEvaluation()
{

	// Abstimmungsknöpfe u.a. entfernen 
	$("#explanation").fadeOut(500).empty();
	$("#progress").fadeOut(500).empty();
	$("#voting").empty();
	$("#jumpToQuestion").empty();
	$("#keepStats").hide();

	// Anzahl der Fragen bestimmen, da Positions-Array ein Vielfaches aus Fragen * Parteien enthält.
	var numberOfQuestions = arQuestionsLong.length;		// 3 Fragen
	var numberOfPositions = arPartyPositions.length; // 12 = 3 Fragen * 4 Parteien
	var indexPartyInArray = -1; // Berechnung der Position des Index der aktuellen Partei
	var positionsMatch = 0;	// Zaehler fuer gemeinsame Positionen

	var arResults = new Array();
	for (i = 0; i <= (arPartyFiles.length-1); i++)
	{
		arResults.push(0);	// Array mit leeren Werten füllen		
	}

	// Vergleichen der Positionen
	for (i = 0; i <= (numberOfPositions-1); i++)
	{
		var modulo = i % numberOfQuestions;	// 0=0,3,6,9 ; 1=1,4,7,10 ; 2=2,5,8,11
		if (modulo == 0)
		{
			indexPartyInArray++;	// neue Partei in der Array-Liste
			positionsMatch = 0;
		}

		// Frage wurde nicht uebersprungen per SKIP (99) oder GEHE ZUR NAECHSTEN FRAGE (-)
		if ( (arPersonalPositions[modulo] < 99) ) 
		{
			var faktor=1; //Faktor ist 1 normal und 2 wenn Frage doppelt gewertet werden soll
			if(arVotingDouble[modulo])
				{faktor=2;}
			
			// Klassische ja/nein/neutral Frage
			if (arQuestionAnswers[modulo].length == 0)
			{
				// Bei Uebereinstimmung, Zaehler um eins erhoehen		
				if (arPartyPositions[i] == arPersonalPositions[modulo])
				{
					positionsMatch+=faktor;
					
				}
				// Partei ist neutral -> 0,5 Punkte vergeben
				else if ( (arPartyPositions[i] == 0) )
				{
					positionsMatch+=0.5*faktor;			
				} // end: if arPartyPosition-i = arPersonalPosition
			}
			//Frage mit mehreren Antwortmöglichkeiten, hier gibt es nur Punkte wenn man genau trifft
			else
			{
				if(arPartyPositions[i] == arPersonalPositions[modulo])
				{
					positionsMatch+=faktor;
					arResults[indexPartyInArray] = positionsMatch;
				}
				else if (Math.abs(arPartyPositions[i] - arPersonalPositions[modulo])==1)
				{
					positionsMatch+=0.5*faktor;			
				}
			}
			arResults[indexPartyInArray] = positionsMatch; 
			
		} // end: Frage nicht uebersprungen
	} // end: for numberOfQuestions
	
	// Wenn Nutzer eingewilligt hat ...
	if ( $("#keepStatsCheckbox").prop("checked")==1)
	{
		// Sende Auswertung an Server
		fnSendResults(arResults, arPersonalPositions);
	}
	else
	{
	}

	$("#keepStats").hide().empty();

	return arResults;

}


/*
// ALTERNATIV - Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion - einfacher aber ohne Fehlercode
function ALT2_fnReadCsv(csvFile,fnCallback)
{

 $.get(csvFile, function(data) {  
    fnCallback(data);
 } );
	
}
*/

/*
// Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion
function fnReadCsv_ORIGINAL(csvFile,fnCallback)
{

 $.ajax({ 
	type: "GET", 
	url: csvFile,
	dataType: "text", 
	contentType: "application/x-www-form-urlencoded",
	async: false,
	success: function(data) {  
		fnCallback(data); },
	error: function(objXML, textStatus, errorThrown) {
		alert("Mat-O-Wahl ERROR - Reading CSV-file \n\nCode - objXML-Status: "+objXML.status+" \n\nCode - textStatus: "+textStatus+" \n\nCode - errorThrown: "+errorThrown+" \n\nName and folder of CSV-file should be: "+csvFile+" \n\nPossible solutions: Check for capital letters. Extension of file? File in the wrong folder? Are you working on a local machine or a server? e.g. XHR-access for Google Chrome via --allow-file-access-from-files (Issue 40787)?"); }
	} );

}
*/

// Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion
function fnReadCsv(csvFile,fnCallback)
{
// http://michaelsoriano.com/working-with-jquerys-ajax-promises-and-deferred-objects/
 $.ajax({ 
	type: "GET", 
	url: csvFile,
	dataType: "text", 
	contentType: "application/x-www-form-urlencoded",
	error: function(objXML, textStatus, errorThrown) {
		alert("Mat-O-Wahl ERROR - Reading CSV-file \n\nCode - objXML-Status: "+objXML.status+" \n\nCode - textStatus: "+textStatus+" \n\nCode - errorThrown: "+errorThrown+" \n\nName and folder of CSV-file should be: "+csvFile+" \n\nPossible solutions: Check for capital letters. Extension of file? File in the wrong folder? Are you working on a local machine or a server? e.g. XHR-access for Google Chrome via --allow-file-access-from-files (Issue 40787)?"); }
	})
  .done(function(data) {
    // console.log('success', data) 
	console.log("Mat-o-Wahl load: "+csvFile);
	fnCallback(data);
  })
  .fail(function(xhr) {
    console.log('Mat-O-Wahl file error - ', xhr);	
  });
	
}


// Senden der persoenlichen Ergebnisse an den Server (nach Einwilligung)
// Aufruf aus fnEvaluation()
function fnSendResults(arResults, arPersonalPositions)
{
	var strResults = arResults.join(",");
	var strPersonalPositions = arPersonalPositions.join(",");
	
	$.get(statsServer, { mowpersonal: strPersonalPositions, mowparties: strResults } );

	console.log("Mat-O-Wahl. Daten gesendet an Server: "+statsServer+" - mowpersonal: "+strPersonalPositions+" - mowparties: "+strResults+"")
}


// v.0.3 DEPRECATED
// Auslesen der Zeile und speichern der Werte in Arrays (aus fnShowQuestions() und fnReadPositions())
/*
function fnSplitLines(csvData,modus)
{
	// Auftrennen am Zeilenumbruch 
 	var arZeilen = csvData.split("\n");
	// 
 
	for(i = 0; i <= arZeilen.length-1; i++)
	{

		var posSeparator = arZeilen[i].indexOf(separator);	// CSV Zeile am ERSTEN Komma/Semikolon auftrennen
		var valueOne = arZeilen[i].substring(0,posSeparator);	// Frage in einem Stichwort
		var valueTwo = arZeilen[i].substring((posSeparator+1),arZeilen[i].length); // Ausformulierte Frage 
		
		valueOne = fnClearQuotes(valueOne);
		valueTwo = fnClearQuotes(valueTwo);
		
		if (posSeparator < 0)
		{
			// Fehler, kein Eintrag auf dieser Zeile oder zu weit gezählt.
		}
		else
		{
			// 
			if (modus == 1)
			{
				// Fragen in globales Array schreiben
				arQuestionsShort.push(valueOne);
				arQuestionsLong.push(valueTwo);
			}
			else
			{
				// Antworten und Meinungen in globales Array schreiben
				 	arPartyPositions.push(valueOne);
				 	arPartyOpinions.push(valueTwo);
			}  // end if-else modus == 1
		} // end: if-else posSeparator < 0
	} // end: for
}
*/

// v.0.3 DEPRECATED
// entfernt die Anführungszeichen am Anfang und Ende aus den CSV-Daten, falls vorhanden (MS Excel & OO Calc fügen diese ein)
/*
function fnClearQuotes(string)
{
	var strLength = string.length;
	// wenn letztes Zeichen Anführungszeichen ist ...
	if (string.charAt((strLength-1)) == '"')
	{
		string = string.substr(0,(strLength-1));
	}
	
	// wenn erstes Zeichen Anführungszeichen ist ...
	if (string.charAt(0) == '"') // nur Mozilla
	{
		string = string.substr(1,(strLength-1));
	}
	
	string = string.replace(/""/g, '"');	// doppelte Anfuehrungszeichen ersetzen (ergibt Anfuerungszeichen im Text)

	return string;
}
*/


// Berechnet Prozentwerte
function fnPercentage(value,max)
{
	var percent = value * 100 / max;
	percent = Math.round(percent);
	return percent; 
}

// v.0.3 NEU
// CSV-Daten in Array einlesen (aus fnShowQuestions() und fnReadPositions())
function fnTransformCsvToArray(csvData,modus)
{
	// benutzt externe jquery-csv-Bibliothek
	arZeilen = $.csv.toArrays(csvData, {separator: ""+separator+""});
	
	for(i = 0; i <= arZeilen.length-1; i++)
	{
		// console.log("i: "+i+" m: "+modus+" v0: "+arZeilen[i][0]+" v1: "+arZeilen[i][1] )	
		valueOne = arZeilen[i][0];
		valueTwo = arZeilen[i][1];
		
		if (modus == 1)
		{
			// FRAGEN in globales Array schreiben
			arQuestionsShort.push(valueOne);
			arQuestionsLong.push(valueTwo);
			if(arZeilen[i].length >= 3)
			{	var answers = Array()
				for(j = 2; j < arZeilen[i].length; j++)
				{
					answers.push(arZeilen[i][j])
				}
				arQuestionAnswers.push(answers)
			}
			else
			{
				arQuestionAnswers.push(Array())
			}
		}
		else
		{
			var questionNr = arPartyPositions.length%arQuestionsShort.length
			if(arQuestionAnswers[questionNr].length != 0)
			{
				//transform answers into indices
				var answerFound=false
				for(j=0; j<arQuestionAnswers[questionNr].length; j++)
				{
					if(arQuestionAnswers[questionNr][j]==valueOne)
					{
						valueOne = j
						answerFound=true
					}
				}
				if(valueOne=="-")
				{
					valueOne=99
					answerFound=true
				}
				if (answerFound==false)
				{
					console.log("Answer \""+valueOne+"\" is not a valid answer option for question: "+arQuestionsShort[questionNr]+" (Nr: "+(questionNr+1)+")")
				}
			}

			// ANTWORTEN und Meinungen in globales Array schreiben
			arPartyPositions.push(parseInt(valueOne));
			arPartyOpinions.push(valueTwo);
		}  // end: if-else modus == 1	
	}  // end: for
}

// wandelt den String aus der DEFINITION.JS in ein ARRAY um - einfacher fuer den Benutzer
function fnTransformDefinitionStringToArray(strName)
{
	var arName = new Array();
	var arName = strName.split(",")
	for (i = 0; i <= arName.length-1; i++)
	{ 
		arName[i] = jQuery.trim(arName[i]); 
	} 
	return arName;
}


// v.0.3 DEPRECATED
// ersetzt die Position (-1, 0, 1) mit dem passenden Bild
/*
function fnTransformPositionToImage(position)
{
	var arImages = new Array("contra_icon.png","neutral_icon.png","pro_icon.png")
	var positionImage = "skip_icon.png";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionImage = arImages[(z+1)];
		}
	}
	return positionImage;
}
*/

function createCSSClass(name,rules){
	var style = document.createElement('style');
	style.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(style);
	if(!(style.sheet||{}).insertRule) 
		(style.styleSheet || style.sheet).addRule(name, rules);
	else
		style.sheet.insertRule(name+"{"+rules+"}",0);
}

function increase_hex_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

// v.0.3 NEU
// ersetzt die Position (-1, 0, 1) mit dem passenden Button
function fnTransformPositionToButton(questionNr, position)
{
	if(position==99 || position == undefined)
	{
		return "btn-default";
	}
	
	color = fnTransformPositionToColor(questionNr, position)
	hover_color = increase_hex_brightness(color, -20)
	btn_name = "btn-"+color.replace(/#/, '');
	
	createCSSClass("."+btn_name, "background: "+color)
	createCSSClass("."+btn_name, "color: white")
	createCSSClass("."+btn_name+":hover", "background: "+hover_color)
	return btn_name
}

// v.0.3 NEU
// ersetzt die Position (-1, 0, 1) mit dem passenden Icon
function fnTransformPositionToIcon(questionNr, position)
{
	if(position==99 || position == undefined)
	{
		return "&#x21B7;";
	}
	
	// standard Antworten (-1,0,1)
	if(arQuestionAnswers[questionNr].length==0 && position>=-1 && position<=1)
	{
		var arIcons = new Array("&#x2716;","&#x25EF;","&#x2714;");
		return arIcons[parseInt(position)+1];
	}
	
	//Variable Antworten
	if(arQuestionAnswers[questionNr].length!=0)
	{
		if(arQuestionAnswers[questionNr][position]=="Ja")
		{
			return "&#x2714;"; //Haken
		}
		else if(arQuestionAnswers[questionNr][position]=="Nein")
		{
			return "&#x2716;"; //X
		}
		else
		{
			return arQuestionAnswers[questionNr][position]
			//return "&#x3f"; //?
		}
	}
	
	console.log("Unknown icon for questionnr "+questionNr+" and position"+position);
	return "&#x3f";
}

// ersetzt die Partei-Position (-1, 0, 1) mit der passenden Farbe
function fnTransformPositionToColor(questionNr, position)
{
	if(position==99 || position == undefined)
	{
		return "#c0c0c0";
	}
	
	// standard Antworten (-1,0,1)
	if(arQuestionAnswers[questionNr].length==0 && position>=-1 && position<=1)
	{
		var arColors = new Array("#d9534f","#f0ad4e","#5cb85c");
		return arColors[parseInt(position)+1];
	}
	
	//Variable Antworten
	if(arQuestionAnswers[questionNr].length!=0)
	{
		if(arQuestionAnswers[questionNr][position]=="Ja")
		{
			return "#5cb85c"; //green
		}
		else if(arQuestionAnswers[questionNr][position]=="Nein")
		{
			return "#d9534f"; //red
		}
		else
		{
			return "#f0ad4e"; //yellow
		}
	}
	
	console.log("Unknown color for questionnr "+questionNr+" and position"+position);
	return "#ff0000";
	
}


// ersetzt die Partei-Position (-1, 0, 1) mit dem passenden Text
function fnTransformPositionToText(questionNr, position)
{
	if(position==99 || position == undefined)
	{
		return "[/]";
	}
	
	// standard Antworten (-1,0,1)
	if(arQuestionAnswers[questionNr].length==0 && position>=-1 && position<=1)
	{
		var arText = new Array("[-]","[o]","[+]");
		return arText[parseInt(position)+1];
	}
	
	//Variable Antworten
	if(arQuestionAnswers[questionNr].length!=0)
	{
		return arQuestionAnswers[questionNr][position]; 
	}
	
	console.log("Unknown text for questionnr "+questionNr+" and position"+position);
	return "???";
	
}

// Gibt ein Bild/CSS-Klasse für den Balken in der Auswertung entsprechend der Prozentzahl Uebereinstimmung zurück
function fnBarImage(percent)
{
	// bis v.0.3 mit PNG-Bildern, danach mit farblicher Bootstrap-Progressbar
	
	if (percent <= 33) { 
		// var barImage = "contra_px.png"; 
		var barImage = "bg-danger"; 
	}
	else if (percent <= 66) { 
		// var barImage = "neutral_px.png"; 
		var barImage = "bg-warning"; 
	}
	else { 
		// var barImage = "pro_px.png"; 
		var barImage = "bg-success"; 
	}
	
	return barImage;
}


// Berechnet die "mittlere" Farbe aus Text und Hintergrund für die Tabellenzeilen in der Auswertung 
// 0.2.4.1 DEPRECATED -> built in CSS ODD
/*
function DEPRECATED_fnCreateMiddleColor()
{
	var bodyTextcolor = $("body").css("color");
	var bodyBackcolor = $("body").css("background-color");
	
	if (bodyTextcolor.charAt(0) == "#")
	{	bodyTextcolor = fnTransformHexToDec(bodyTextcolor.substr(1,6)); }
	if (bodyBackcolor.charAt(0) == "#")
	{	bodyBackcolor = fnTransformHexToDec(bodyBackcolor.substr(1,6)); }

	var arBodyTextcolorRgb = bodyTextcolor.split(",");
	var arBodyBackcolorRgb = bodyBackcolor.split(",");

	var bodyTextcolorR = arBodyTextcolorRgb[0].substr(4,3);	// 255
	var bodyTextcolorG = arBodyTextcolorRgb[1].substr(0,4);	// 0
	var bodyTextcolorB = arBodyTextcolorRgb[2].substr(0,(arBodyTextcolorRgb[2].length-1));

	var bodyBackcolorR = arBodyBackcolorRgb[0].substr(4,3);	// 0
	var bodyBackcolorG = arBodyBackcolorRgb[1].substr(0,4);	// 255
	var bodyBackcolorB = arBodyBackcolorRgb[2].substr(0,(arBodyBackcolorRgb[2].length-1));

	var bodyBackcolorR = parseInt(bodyBackcolorR);
	var bodyBackcolorG = parseInt(bodyBackcolorG);
	var bodyBackcolorB = parseInt(bodyBackcolorB);
	
	var bodyTextcolorR = parseInt(bodyTextcolorR);
	var bodyTextcolorG = parseInt(bodyTextcolorG);
	var bodyTextcolorB = parseInt(bodyTextcolorB);

	var middleR = Math.round( (bodyBackcolorR + bodyTextcolorR) / 2);	// (255 + 0)/2 = 128
	var middleG = Math.round( (bodyBackcolorG + bodyTextcolorG) / 2);	// (0 + 255)/2 = 128
	var middleB = Math.round( (bodyBackcolorB + bodyTextcolorB) / 2);
	
	var middleR = Math.round( ( bodyBackcolorR + (middleR - bodyBackcolorR)/2) ); // 0 + (128 - 0)/2 = 0 + 128/2 = 0 + 64 = 64 
	var middleG = Math.round( ( bodyBackcolorG + (middleG - bodyBackcolorG)/2) ); // 255 + (128 - 255)/2 = 255 + -128/2 = 255 - 64 = 192
	var middleB = Math.round( ( bodyBackcolorB + (middleB - bodyBackcolorB)/2) );
	
	var middleColor = "rgb("+middleR+","+middleG+","+middleB+")";
	return middleColor;
}
*/


// wandelt HEX in DEC um 
// 0.2.4.1 DEPRECATED -> built in CSS ODD
/*
function DEPRECATED_fnTransformHexToDec(color)
{
	var colorR = color.substr(0,2);
	var colorG = color.substr(2,2);
	var colorB = color.substr(4,2);
	
	var colorR = parseInt(colorR.toUpperCase(),16)
	var colorG = parseInt(colorG.toUpperCase(),16)
	var colorB = parseInt(colorB.toUpperCase(),16)
	
	var colorRGB = "rgb("+colorR+","+colorG+","+colorB+")";
	return colorRGB;
}
*/

// v.0.3 DEPRECATED
// Bei Klick auf "Details anzeigen/verbergen", pruefe ob Partei angezeigt werden soll fuer Vergleich 
/*
function fnStartToggleTableRow(questionLength)
{
//	for (x = 0; x <= (arPartyFiles.length-1); x++) // Ver 0.2.3.2
	for (x = 0; x <= (arSortParties.length-1); x++) // 
	{		
//		fnToggleTablerow(x,questionLength); // Ver 0.2.3.2
		fnToggleTablerow(arSortParties[x],questionLength); // 
	}
}
*/

// 02/2015 BenKob (doppelte Wertung)
function fnToggleSelfPosition(i)
{
	//if it was skipped via goto question
	if (arPersonalPositions[i]==undefined)
	{
		arPersonalPositions[i] = 99
	}
	
	arPersonalPositions[i]--;
	if (arPersonalPositions[i]==-2 || (arQuestionAnswers[i].length!=0 && arPersonalPositions[i]==-1)) 
		{arPersonalPositions[i]=99}
	if (arPersonalPositions[i]==98) 
		{arPersonalPositions[i]=(arQuestionAnswers[i].length==0?1:arQuestionAnswers[i].length-1)}
//	var positionImage = fnTransformPositionToImage(arPersonalPositions[i]);
	var positionButton = fnTransformPositionToButton(i, arPersonalPositions[i]);
	var positionIcon = fnTransformPositionToIcon(i, arPersonalPositions[i]);
	// var positionColor = fnTransformPositionToColor(arPersonalPositions[i]);
	var positionText  = fnTransformPositionToText(i, arPersonalPositions[i]);
	
	// $("#selfPosition"+i).attr("src", "img/"+positionImage);
	$("#selfPosition"+i).removeClass("btn-danger btn-warning btn-success btn-default").addClass(positionButton);
	$("#selfPosition"+i).html(positionIcon);
	$("#selfPosition"+i).attr("alt", positionText);
	$("#selfPosition"+i).attr("title", positionText);
	// $(".positionRow"+i).css("border","1px solid "+positionColor);
	fnReEvaluate();
}

// 02/2015 BenKob (doppelte Wertung)
function fnToggleDouble(i)
{
	arVotingDouble[i]=!arVotingDouble[i];
	if(arVotingDouble[i])
	{
		// $("#doubleIcon"+i).attr("src","img/double-yes_icon.png");
		$("#doubleIcon"+i).removeClass("btn-outline-dark").addClass("btn-dark");
		$("#doubleIcon"+i).attr("title","'Frage wird doppelt gewertet");
	}
	else
	{
		// $("#doubleIcon"+i).attr("src","img/double-no_icon.png");
		$("#doubleIcon"+i).removeClass("btn-dark").addClass("btn-outline-dark");
		$("#doubleIcon"+i).attr("title","'Frage wird einfach gewertet");
	}
	fnReEvaluate();
}

// v.0.3 DEPRECATED
// Einblenden/Ausblenden der Spalte mit den Parteipositionen
/*
function fnToggleTablerow(partyId, questionLength)
{

	// Pruefwert fuer checked (1) / unchecked in der Tabelle von #resultsShort
	var value = $("#party"+partyId+"").attr("checked");
	
	var multiplier = arPartyFiles.length + 2; // beginne ab Spalte 3

	// Partei ist angeklickt fuer detaillierte Auswertung
	if (value == true)
	{

		$("#resultsLong").fadeIn();		// sicherstellen, dass die Tabelle auch angezeigt wird. 
		
		// Spalte einblenden
		$("#partyNameCell"+partyId).fadeIn(500);
		
		for (z = 0; z <= questionLength-1; z++)
		{	
			var cellId = partyId + 2 + (z * multiplier);	// naechste Zelle in Spalte XY
			var time = 500+i*100;
			$("#partyPositionCell"+cellId).fadeIn(time);
	
//		$("#debug").append("<br /> A val:"+value+" partyId:"+partyId+" cellId: "+cellId)
		}
	}
	// Partei ist nicht angeklickt fuer detaillierte Auswertung ...
	else
	{
		// ... und Long-Tabelle wird bereits angezeigt
		if( $('#resultsLong').is(':visible'))
		{

			// Spalte langsam ausblenden
			$("#partyNameCell"+partyId).fadeOut(500);
			
			for (z = 0; z <= questionLength-1; z++)
			{	
				var cellId = partyId + 2 + (z * multiplier);	// naechste Zelle in Spalte XY
				var time = 500+i*100;
				$("#partyPositionCell"+cellId).fadeOut(time);			
//				$("#debug").append("<br /> B val:"+value+" partyId:"+partyId+" cellId: "+cellId)
			}
		}
		// ... aber Long-Tabelle ist ausgeblendet
		else if( $('#resultsLong').is(':hidden'))
		{

//		$("#debug").append("<br /> C val:"+value+" partyId:"+partyId)

			// Spalte einfach so ausblenden - bei fadeOut muss das Element sichtbar sein			
		   $("#partyNameCell"+partyId).hide();
			for (z = 0; z <= questionLength-1; z++)
			{	
				var cellId = partyId + 2 + (z * multiplier);	// naechste Zelle in Spalte XY
				var time = 500+i*100;
				$("#partyPositionCell"+cellId).hide();			
			}
		}

	}
	
}
*/


// v.0.3 DEPRECATED
/*
function fnCalculatePieChart(radius,prozent,divName)
{
	var faktor = (25 - prozent) / 50 * -1;
	fnDrawPieChart(radius,faktor,divName);
}
*/

// v.0.3 DEPRECATED
// zeichnet einen Kreis, Halbkreis, Viertelkreis usw.
/*
function fnDrawPieChart(radius,faktor,divName)
{
	//var canvas = document.getElementById(divName);
	var canvas = document.getElementById("pieChart");
	if (canvas.getContext)
	{
		canvas = canvas.getContext('2d');

		// Rahmen um Kreis zeichnen
		bodyTextcolor = $("body").css("color");
		canvas.strokeStyle = bodyTextcolor;
		canvas.lineWidth = 1.0;
		canvas.beginPath();
		canvas.moveTo(radius, radius);	// Startposition festlegen (= Mittelpkt)
    	canvas.arc(radius, radius, radius, Math.PI*-0.5, Math.PI*2, false);
		canvas.stroke();    	
    	canvas.closePath();		

		// Kreis zeichnen
		canvas.fillStyle = bodyTextcolor;
		canvas.beginPath();	   
    	canvas.moveTo(radius, radius);	// Startposition festlegen (= Mittelpkt)
    	// http://canvas.quaese.de/index.php?nav=6,35&doc_id=24
    	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
   	canvas.arc(radius, radius, radius, Math.PI*-0.5, Math.PI*faktor, false);
    	canvas.closePath();
    	canvas.fill();
	}
}
*/
