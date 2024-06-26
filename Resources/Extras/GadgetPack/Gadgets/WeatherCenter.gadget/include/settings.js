//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////



function onSettingsLoad()
{

	hide("load_indicator");

	hideLand.checked = System.Gadget.Settings.read("noCountry");
	showLastTimeUpdate.checked = System.Gadget.Settings.read("showLastTimeUpdate");
	showForecastToday.checked = System.Gadget.Settings.read("showForecastToday");
	showFlyoutForecast.checked = System.Gadget.Settings.read("showFlyoutForecast");
	showDayNameForecast.checked = System.Gadget.Settings.read("showDayNameForecast");
	hideBarSettings.checked = System.Gadget.Settings.read("hideBarSettings");
	showWeatherAfterRestart.checked = System.Gadget.Settings.read("showWeatherAfterRestart");

	changeSkin.checked = System.Gadget.Settings.read("changeSkin");
	
	var CurrentSkin = System.Gadget.Settings.read('Skin');
	var CurrentSkinNumber = CurrentSkin.substring(CurrentSkin.indexOf("skin") + 4, CurrentSkin.lengh);
	if (System.Gadget.Settings.read("changeSkin") == 1) {
		if (CurrentSkinNumber == '1') {SkinFolderCounter(); skin[System.Gadget.Settings.read('MaxSkin') - 1].selected = "1";}
		else skin[CurrentSkinNumber - 2].selected = "1";
	}
	else skin[CurrentSkinNumber - 1].selected = "1";
	
	
	if (System.Gadget.Settings.read("tunits") == "m") tunits[0].selected="1";
	if (System.Gadget.Settings.read("tunits") == "f") tunits[1].selected="1";

	if (System.Gadget.Settings.read("sunits") == "ms") sunits[0].selected="1";
	if (System.Gadget.Settings.read("sunits") == "km") sunits[1].selected="1";
	if (System.Gadget.Settings.read("sunits") == "mp") sunits[2].selected="1";

	if (System.Gadget.Settings.read("punits") == "mb") punits[0].selected="1";
	if (System.Gadget.Settings.read("punits") == "mm") punits[1].selected="1";
	if (System.Gadget.Settings.read("punits") == "in") punits[2].selected="1";
	if (System.Gadget.Settings.read("punits") == "kpa") punits[3].selected="1";

	if (System.Gadget.Settings.read("dunits") == "km") dunits[0].selected="1";
	if (System.Gadget.Settings.read("dunits") == "mi") dunits[1].selected="1";



	var SourceOfUpdates = System.Gadget.Settings.read("SourceOfUpdates");
	if (SourceOfUpdates == "weatherchannel")
		{
		GetSourceOfUpdates[0].selected = "true";
		listSearchesResults("W");
		WeatherChannelLoadSettings();
		}

	if (SourceOfUpdates == "accuweather")
		{
		GetSourceOfUpdates[1].selected = "true";
		listSearchesResults("A");
		AccuLoadSettings();
		}
	
	if (SourceOfUpdates == "wunderground")
		{
		GetSourceOfUpdates[2].selected = "true";
		listSearchesResults("WU");
		WUndergroundLoadSettings();
		}

	if (SourceOfUpdates == "msn")
		{
		GetSourceOfUpdates[3].selected = "true";
		listSearchesResults("MSN");
		MSNLoadSettings();
		}

	if (SourceOfUpdates == "weathereye")
		{
		GetSourceOfUpdates[4].selected = "true";
		listSearchesResults("WE");
		WeatherEyeLoadSettings();
		}

	if (SourceOfUpdates == "weatherbug")
		{
		GetSourceOfUpdates[5].selected = "true";
		listSearchesResults("WB");
		WeatherBugLoadSettings();
		}

	if (SourceOfUpdates == "gismeteo")
		{
		GetSourceOfUpdates[6].selected = "true";
		listSearchesResults("GIS");
		GismeteoLoadSettings();
		}

	if (SourceOfUpdates == "yandex")
		{
		GetSourceOfUpdates[7].selected = "true";
		listSearchesResults("YA");
		YandexLoadSettings();
		}

	if (SourceOfUpdates == "meteonova")
		{
		GetSourceOfUpdates[8].selected = "true";
		listSearchesResults("METEONOVA");
		MeteonovaLoadSettings();
		}

	if (SourceOfUpdates == "noaa")
		{
		GetSourceOfUpdates[6].selected = "true";
		listSearchesResults("NOAA");
		NOAALoadSettings();
		}

	
	System.Gadget.onSettingsClosing = settingsClosing;
}

//////////////////

function onChangeSource()
{
	ClearOptionsFast("ShowParametersOption1");
	ClearOptionsFast("ShowParametersOption2");
	ClearOptionsFast("ShowParametersOption3");
	ClearOptionsFast("ShowParametersOption4");
	document.getElementById("results").options.length = 0;

	
	if (GetSourceOfUpdates.value == "weatherchannel") {listSearchesResults("W"); WeatherChannelLoadSettings();}
	if (GetSourceOfUpdates.value == "accuweather") {listSearchesResults("A"); AccuLoadSettings();}
	if (GetSourceOfUpdates.value == "wunderground") {listSearchesResults("WU"); WUndergroundLoadSettings();}
	if (GetSourceOfUpdates.value == "msn") {listSearchesResults("MSN"); MSNLoadSettings();}
	if (GetSourceOfUpdates.value == "weathereye") {listSearchesResults("WE"); WeatherEyeLoadSettings();}
	if (GetSourceOfUpdates.value == "weatherbug") { listSearchesResults("WB"); WeatherBugLoadSettings();}
	if (GetSourceOfUpdates.value == "yandex") {listSearchesResults("YA"); YandexLoadSettings();}
	if (GetSourceOfUpdates.value == "gismeteo") {listSearchesResults("GIS"); GismeteoLoadSettings();}
	if (GetSourceOfUpdates.value == "meteonova") {listSearchesResults("METEONOVA"); MeteonovaLoadSettings();}
	if (GetSourceOfUpdates.value == "noaa") {listSearchesResults("NOAA"); NOAALoadSettings();}

}


function onLocationSelect()
{
	if (GetSourceOfUpdates.value == "weatherbug" && WeatherBugCityFlag == 1) {loccode_id.value = loccode_id.value + "|" + results.options[results.selectedIndex].value; WeatherBugCityFlag = 2; return;}
	if (GetSourceOfUpdates.value == "noaa" && NOAACityFlag == 1) {loccode_id.value = loccode_id.value + "|" + results.options[results.selectedIndex].value; NOAACityFlag = 2; return;}
	
	loccode_id.value = results.options[results.selectedIndex].value;
	
	loccodestr = results.options[results.selectedIndex].text;
	if (loccodestr.indexOf("(") != -1) loccode.value = loccodestr.substring(0, loccodestr.indexOf("("));
	else loccode.value = loccodestr;
	
	if (GetSourceOfUpdates.value == "weatherbug" && WeatherBugCityFlag == 0) {WeatherBugCityFlag = 1; WeatherBugSearchStationCode();}
	if (GetSourceOfUpdates.value == "noaa" && NOAACityFlag == 0) {NOAACityFlag = 1; NOAAParseStationResults(loccode_id.value, loccode.value.slice(loccode.value.indexOf(", ") + 2,loccode.value.length));}
}

/////////////////


function settingsClosing(event)
{
	if (event.closeAction == event.Action.commit)
	{
		writeSettings();
	}
   	event.cancel = false;
}

////////////////



function writeSettings() 
{
	if (GetSourceOfUpdates.value == "weatherchannel")
	{
		System.Gadget.Settings.write("SourceOfUpdates", "weatherchannel");
		
		if (loccode.value != lng_NoData && (loccode.value).search(",") > -1) {
			System.Gadget.Settings.write("WlastSearch", loccode.value);
			System.Gadget.Settings.write("WlocationCode", loccode_id.value);
		}

		
		if (updateInt[0].checked) System.Gadget.Settings.write("WupdateInterval", "0");
		if (updateInt[1].checked) {
			if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("WupdateInterval", updateIntValue.value);
			else System.Gadget.Settings.write("WupdateInterval", "30");
		}

	
		System.Gadget.Settings.write("WShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("WShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("WShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("WShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("W");
	
	}


 
	if (GetSourceOfUpdates.value == "accuweather")
	{
 		System.Gadget.Settings.write("SourceOfUpdates", "accuweather");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("AlastSearch", loccode.value);
		System.Gadget.Settings.write("AlocationCode", loccode_id.value);

				
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("AupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("AupdateInterval", "15");
		
		
		System.Gadget.Settings.write("AShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("AShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("AShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("AShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("A");

	}




	if (GetSourceOfUpdates.value == "wunderground")
	{

 		System.Gadget.Settings.write("SourceOfUpdates", "wunderground");

		System.Gadget.Settings.write("WUlastSearch", loccode.value);
		System.Gadget.Settings.write("WUlocationCode", loccode_id.value);
		

		if (updateInt[0].checked) System.Gadget.Settings.write("WUupdateInterval", "0");
		if (updateInt[1].checked) {
			if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("WUupdateInterval", updateIntValue.value);
			else System.Gadget.Settings.write("WUupdateInterval", "30");
		}
	
	
		System.Gadget.Settings.write("WUShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("WUShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("WUShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("WUShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("WU");

	}


	if (GetSourceOfUpdates.value == "msn")
	{
 		System.Gadget.Settings.write("SourceOfUpdates", "msn");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("MSNlastSearch", loccode.value);
		System.Gadget.Settings.write("MSNlocationCode", loccode_id.value);

		
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("MSNupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("MSNupdateInterval", "15");

	
		System.Gadget.Settings.write("MSNShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("MSNShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("MSNShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("MSNShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("MSN");
		
	}



	if (GetSourceOfUpdates.value == "weathereye")
	{
 		System.Gadget.Settings.write("SourceOfUpdates", "weathereye");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("WElastSearch", loccode.value);
		System.Gadget.Settings.write("WElocationCode", loccode_id.value);

		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("WEupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("WEupdateInterval", "15");

	
		System.Gadget.Settings.write("WEShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("WEShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("WEShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("WEShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("WE");

	}


	if (GetSourceOfUpdates.value == "weatherbug")
	{
		if (WeatherBugCityFlag == 1) return;
		
 		System.Gadget.Settings.write("SourceOfUpdates", "weatherbug");

		if (loccode.value != lng_NoData && WeatherBugCityFlag != 0) System.Gadget.Settings.write("WBlastSearch", loccode.value);
		System.Gadget.Settings.write("WBlocationCode", loccode_id.value);

		
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("WBupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("WBupdateInterval", "15");

	
		System.Gadget.Settings.write("WBShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("WBShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("WBShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("WBShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("WB");

	}


	if (GetSourceOfUpdates.value == "yandex")
	{
 		System.Gadget.Settings.write("SourceOfUpdates", "yandex");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("YAlastSearch", loccode_id.value);
		System.Gadget.Settings.write("YAlocationCode", loccode_id.value);

				
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("YAupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("YAupdateInterval", "15");
		
		
		System.Gadget.Settings.write("YAShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("YAShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("YAShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("YAShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("YA");

	}


	if (GetSourceOfUpdates.value == "gismeteo")
	{
 		System.Gadget.Settings.write("SourceOfUpdates", "gismeteo");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("GISlastSearch", loccode.value);
		System.Gadget.Settings.write("GISlocationCode", loccode_id.value);

				
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("GISupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("GISupdateInterval", "15");
		
		
		System.Gadget.Settings.write("GISShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("GISShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("GISShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("GISShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("GIS");

	}

	if (GetSourceOfUpdates.value == "meteonova")
	{
 		System.Gadget.Settings.write("SourceOfUpdates", "meteonova");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("METEONOVAlastSearch", loccode.value);
		System.Gadget.Settings.write("METEONOVAlocationCode", loccode_id.value);

				
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("METEONOVAupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("METEONOVAupdateInterval", "15");
		
		
		System.Gadget.Settings.write("METEONOVAShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("METEONOVAShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("METEONOVAShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("METEONOVAShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("METEONOVA");

	}

	if (GetSourceOfUpdates.value == "noaa")
	{
		if (NOAACityFlag == 1) return;

 		System.Gadget.Settings.write("SourceOfUpdates", "noaa");

		if (loccode.value != lng_NoData) System.Gadget.Settings.write("NOAAlastSearch", loccode.value);
		System.Gadget.Settings.write("NOAAlocationCode", loccode_id.value);

				
		if (updateIntValue.value != "0" && updateIntValue.value != "") System.Gadget.Settings.write("NOAAupdateInterval", updateIntValue.value);
		else System.Gadget.Settings.write("NOAAupdateInterval", "15");
		
		
		System.Gadget.Settings.write("NOAAShowParametersOption1", ShowParametersOption1.value);
		System.Gadget.Settings.write("NOAAShowParametersOption2", ShowParametersOption2.value);
		System.Gadget.Settings.write("NOAAShowParametersOption3", ShowParametersOption3.value);
		System.Gadget.Settings.write("NOAAShowParametersOption4", ShowParametersOption4.value);

		WritelistSearchesResults("NOAA");

	}


	System.Gadget.Settings.write("Skin", skin.value);
	System.Gadget.Settings.write("changeSkin", changeSkin.checked);
	System.Gadget.Settings.write("noCountry", hideLand.checked);
	System.Gadget.Settings.write("showLastTimeUpdate", showLastTimeUpdate.checked);
	System.Gadget.Settings.write("showForecastToday", showForecastToday.checked);
	System.Gadget.Settings.write("showFlyoutForecast", showFlyoutForecast.checked);
	System.Gadget.Settings.write("showDayNameForecast", showDayNameForecast.checked);
	System.Gadget.Settings.write("hideBarSettings", hideBarSettings.checked);
	System.Gadget.Settings.write("showWeatherAfterRestart", showWeatherAfterRestart.checked);

	System.Gadget.Settings.write("tunits", tunits.value);
	System.Gadget.Settings.write("sunits", sunits.value);
	System.Gadget.Settings.write("punits", punits.value);
	System.Gadget.Settings.write("dunits", dunits.value);


	WriteSettings();
	
}

/////////////////


function searchCityCode()
{
	if (loccode.value == "" || loccode.value.length < 4) {
		var SourceOfUpdates = System.Gadget.Settings.read("SourceOfUpdates");
		if (SourceOfUpdates == "weatherchannel") {
			loccode.value = System.Gadget.Settings.read("WlastSearch");
			loccode_id.value = System.Gadget.Settings.read("WlocationCode");
		}
		if (SourceOfUpdates == "accuweather") {
			loccode.value = System.Gadget.Settings.read("AlastSearch");
			loccode_id.value = System.Gadget.Settings.read("AlocationCode");
		}
		if (SourceOfUpdates == "wunderground") {
			loccode.value = System.Gadget.Settings.read("WUlastSearch");
			loccode_id.value = System.Gadget.Settings.read("WUlocationCode");
		}
		if (SourceOfUpdates == "msn") {
			loccode.value = System.Gadget.Settings.read("MSNlastSearch");
			loccode_id.value = System.Gadget.Settings.read("MSNlocationCode");
		}
		if (SourceOfUpdates == "weathereye") {
			loccode.value = System.Gadget.Settings.read("WElastSearch");
			loccode_id.value = System.Gadget.Settings.read("WElocationCode");
		}
		if (SourceOfUpdates == "weatherbug") {
			loccode.value = System.Gadget.Settings.read("WBlastSearch");
			loccode_id.value = System.Gadget.Settings.read("WBlocationCode");
		}
		if (SourceOfUpdates == "yandex") {
			loccode.value = System.Gadget.Settings.read("YAlastSearch");
			loccode_id.value = System.Gadget.Settings.read("YAlocationCode");
		}
		if (SourceOfUpdates == "gismeteo") {
			loccode.value = System.Gadget.Settings.read("GISlastSearch");
			loccode_id.value = System.Gadget.Settings.read("GISlocationCode");
		}
		if (SourceOfUpdates == "meteonova") {
			loccode.value = System.Gadget.Settings.read("METEONOVAlastSearch");
			loccode_id.value = System.Gadget.Settings.read("METEONOVAlocationCode");
		}
		if (SourceOfUpdates == "noaa") {
			loccode.value = System.Gadget.Settings.read("NOAAlastSearch");
			loccode_id.value = System.Gadget.Settings.read("NOAAlocationCode");
		}

		return;
	}

	show("load_indicator");

	if (GetSourceOfUpdates.value == "weatherchannel") WeatherChannelSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "accuweather") AccuSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "wunderground") WUndergroundSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "msn") MSNSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "weathereye") WeatherEyeSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "weatherbug") WeatherBugSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "yandex") YandexSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "gismeteo") GismeteoSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "meteonova") MeteonovaSearchCityCode(loccode.value);
	if (GetSourceOfUpdates.value == "noaa") NOAASearchCityCode(loccode.value);
}
	
//////////////////


/////////////////////


function clearResults()
{
	results.innerHTML = "";
}



function ClearOptionsFast(id)
{
	var selectObj = document.getElementById(id);
	var selectParentNode = selectObj.parentNode;
	var newSelectObj = selectObj.cloneNode(false);
	selectParentNode.replaceChild(newSelectObj, selectObj);
	
}



////////////////////

function onKeyPressBlockLetters(e)
{
	var key = window.event ? e.keyCode : e.charCode;
	var keychar = String.fromCharCode(key);
	reg = /\d/;
	return reg.test(keychar);
}


function OpenHelp()
{
		var filename=System.Gadget.path + "\\" + navigator.systemLanguage + "\\help\\help.html";
		window.location.href(filename);	
}


function AutomaticallySearchCity()
{
	var locationip = "http://api.ipinfodb.com/v2/ip_query.php?key=cbc862c51d9da89e999d21406d01ce5c8dc99ceb1a1eb0730ff7ff0dda56d452&timezone=false";
	var geoipdata = loadXmlDoc(locationip);

	if (geoipdata.parseError.errorCode != 0) return;
	if (geoipdata.getElementsByTagName('City')[0].firstChild == null || geoipdata.getElementsByTagName('CountryName')[0].firstChild == null) return;

	var citybyip = geoipdata.getElementsByTagName('City')[0].firstChild.nodeValue;
	var countrybyip = geoipdata.getElementsByTagName('CountryName')[0].firstChild.nodeValue;

	if (citybyip && countrybyip) {
		if (GetSourceOfUpdates.value == "weatherchannel") WeatherChannelSearchCityCode(citybyip + ", " + countrybyip);
		if (GetSourceOfUpdates.value == "accuweather") AccuSearchCityCode(citybyip + ", " + countrybyip);
		if (GetSourceOfUpdates.value == "wunderground") WUndergroundSearchCityCode(citybyip);
		if (GetSourceOfUpdates.value == "msn") MSNSearchCityCode(citybyip + ", " + countrybyip);
		if (GetSourceOfUpdates.value == "weathereye") WeatherEyeSearchCityCode(citybyip);
		if (GetSourceOfUpdates.value == "weatherbug") WeatherBugSearchCityCode(citybyip + ", " + countrybyip);
		if (GetSourceOfUpdates.value == "noaa") NOAASearchCityCode(citybyip + ", " + countrybyip);
	}


	var locationip = "http://export.yandex.ru/bar/reginfo.xml?rnd=" + Math.random();
	var geoipdata = loadXmlDoc(locationip);
	var citybyip = geoipdata.getElementsByTagName('title')[0].firstChild.nodeValue;
	
	if (citybyip) {		
		if (GetSourceOfUpdates.value == "yandex") YandexSearchCityCode(citybyip);
		if (GetSourceOfUpdates.value == "gismeteo") GismeteoSearchCityCode(citybyip);
		if (GetSourceOfUpdates.value == "meteonova") MeteonovaSearchCityCode(citybyip);
	}

}


function showtab(id){
 names = new Array ("tabname_1","tabname_2","tabname_3");
 conts= new Array ("tabcontent_1","tabcontent_2","tabcontent_3");
 for(i=0;i<names.length;i++) { document.getElementById(names[i]).className = 'nonactive'; }
 for(i=0;i<conts.length;i++) { document.getElementById(conts[i]).className = 'hide'; }
 document.getElementById('tabname_' + id).className = 'active';
 document.getElementById('tabcontent_' + id).className = 'show';
}


function hide(id) {document.getElementById(id).style.visibility = "hidden";}
function show(id) {document.getElementById(id).style.visibility = "visible";}




function listSearchesResults(source)
{
	for (var i = 9; i > -1; i--) {
		if (System.Gadget.Settings.read(source+"SearchesResultsID"+i)) {
			var option = document.createElement("OPTION");
			option.value = System.Gadget.Settings.read(source+"SearchesResultsID"+i);
			option.innerText = System.Gadget.Settings.read(source+"SearchesResultsTEXT"+i);
			results.appendChild(option);
		}
	}
}



function WritelistSearchesResults(source)
{
	
	for (var i = 0; i < 9; i++) {
		if (System.Gadget.Settings.read(source+"SearchesResultsID"+i) == System.Gadget.Settings.read(source+"locationCode")) break;
		if (!System.Gadget.Settings.read(source+"SearchesResultsID"+i)) {
			System.Gadget.Settings.write(source+"SearchesResultsID"+i, System.Gadget.Settings.read(source+"locationCode"));
			System.Gadget.Settings.write(source+"SearchesResultsTEXT"+i, System.Gadget.Settings.read(source+"lastSearch"));
			break;
		}

		if(i==8) {
			for (var a = 0; a < 8; a++) {
				var n = a + 1;
				System.Gadget.Settings.write(source+"SearchesResultsID"+a, System.Gadget.Settings.read(source+"SearchesResultsID"+n));
				System.Gadget.Settings.write(source+"SearchesResultsTEXT"+a, System.Gadget.Settings.read(source+"SearchesResultsTEXT"+n));
			}
			System.Gadget.Settings.write(source+"SearchesResultsID8", "");
			System.Gadget.Settings.write(source+"SearchesResultsTEXT8", "");
		}
	}
}

	