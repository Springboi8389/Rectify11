//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////



function parseForecastWeatherChannel(Xml)
{
	if (Xml.length < 1000) return;

	var parametrsArray = [{"name":"nothing", "capt":"", "span":""}]

	var head = Xml.substring(Xml.indexOf("<head>") + 6, Xml.indexOf("</head>"));
	var cc = Xml.substring(Xml.indexOf("<cc>") + 4, Xml.indexOf("</cc>"));
	
	var locName = Xml.substring(Xml.indexOf("<dnam>") + 6, Xml.indexOf("</dnam>"));
	if (locName == "") var locName = System.Gadget.Settings.read('WlastSearch');
	

	setLocation(locName);

	var current = cc.substring(cc.indexOf("<t>") + 3, cc.indexOf("</t>"));
	
	
	time = Xml.substring(Xml.indexOf("<tm>") + 4, Xml.indexOf("</tm>"));
	var sunriseTm = Xml.substring(Xml.indexOf("<sunr>") + 6, Xml.indexOf("</sunr>"));
	var sunsetTm = Xml.substring(Xml.indexOf("<suns>") + 6, Xml.indexOf("</suns>"));
	
	var cclsup = cc.substring(cc.indexOf("<lsup>") + 6, cc.indexOf("</lsup>"));
	ccdate = cclsup.substring(0, cclsup.indexOf(" "));

	SunriseCapt = lng_Stats["sunrise"];
	SunriseSpan = TimeTo24Convert(sunriseTm);
	if (sunriseTm == 'N/A') SunriseSpan = lng_nodata;
	parametrsArray.push({"name":"sunrise", "capt":SunriseCapt, "span":SunriseSpan});
	
	SunsetCapt = lng_Stats["sunset"];
	SunsetSpan = TimeTo24Convert(sunsetTm);
	if (sunsetTm == 'N/A') SunsetSpan = lng_nodata;
	parametrsArray.push({"name":"sunset", "capt":SunsetCapt, "span":SunsetSpan});


	LocaltimeCapt = lng_Stats["localtime"];
	LocaltimeSpan = TimeTo24Convert(time);
	if (time == 'N/A') LocaltimeSpan = lng_nodata;
	parametrsArray.push({"name":"localtime", "capt":LocaltimeCapt, "span":LocaltimeSpan});
	

	timeupdate = cc.substring(cc.indexOf("<lsup>") + 6, cc.indexOf("</lsup>"));						//time last update
	timeupdate = timeupdate.slice(timeupdate.indexOf(" ") + 1, timeupdate.indexOf(":") + 6) ;
	lasttimeupdate24full = TimeTo24Convert(timeupdate);
	if ((System.Gadget.Settings.read("showLastTimeUpdate")) != 1 || timeupdate == "N/A") TimeLastUpdate.innerText = "";
	else TimeLastUpdate.innerText = lasttimeupdate24full;
	

	checkDayorNight(timeupdate, sunriseTm, sunsetTm, current);


	var temp = cc.substring(cc.indexOf("<tmp>") + 5, cc.indexOf("</tmp>"));							//actual temperature
	if (System.Gadget.Settings.read("tunits") == "m") {var TemperatureUnits = "C";}
	if (System.Gadget.Settings.read("tunits") == "f") {temp = Math.round(temp*(9/5) + 32); var TemperatureUnits = "F";}
	if (temp == 'N/A') TempSpan.innerText = lng_nodata;
	else TempSpan.innerText = temp + "°" + lng_Units[TemperatureUnits];

	var flik = cc.substring(cc.indexOf("<flik>") + 6, cc.indexOf("</flik>"));						//feels like temperature
	if (System.Gadget.Settings.read("tunits") == "m") {flik = flik;}
	if (System.Gadget.Settings.read("tunits") == "f") {flik = (flik*(9/5) + 32).toFixed(0);}
	FlikCapt = lng_Stats["flik"];
	FlikSpan = flik + "°" + lng_Units[TemperatureUnits];
	if (flik == 'N/A') FlikSpan = lng_nodata;
	parametrsArray.push({"name":"flik", "capt":FlikCapt, "span":FlikSpan});



	var bar = cc.substring(cc.indexOf("<bar>") + 5, cc.indexOf("</bar>"));
	var pressure_str = bar.substring(bar.indexOf("<r>") + 3, bar.indexOf("</r>"));
	if (System.Gadget.Settings.read("punits") == "mm") {pressure = (pressure_str * 0.750062).toFixed(0); var PressureUnits = "mm";}
	if (System.Gadget.Settings.read("punits") == "mb") {pressure = pressure_str; var PressureUnits = "mb";}
	if (System.Gadget.Settings.read("punits") == "in") {pressure = (pressure_str * 0.02952998).toFixed(2); var PressureUnits = "in";}
	if (System.Gadget.Settings.read("punits") == "kpa") {pressure = (pressure_str/10).toFixed(2); var PressureUnits = "kPa";}
	PressureCapt = lng_Stats["pressure"];
	PressureSpan = pressure + lng_Units[PressureUnits];

	
	if (pressure_str == 'N/A') PressureSpan = lng_nodata;
	parametrsArray.push({"name":"pressure", "capt":PressureCapt, "span":PressureSpan});

	var pressuretrend = bar.substring(bar.indexOf("<d>") + 3, bar.indexOf("</d>"));
	PressuretrendCapt = lng_Stats["pressuretrend"];
	PressuretrendSpan = pressure_Stats[pressuretrend];
	if (PressuretrendSpan == undefined) PressuretrendSpan = lng_nodata;
	parametrsArray.push({"name":"pressuretrend", "capt":PressuretrendCapt, "span":PressuretrendSpan});


	var wind = cc.substring(cc.indexOf("<wind>") + 6, cc.indexOf("</wind>"));
	var windSpeed_str = wind.substring(wind.indexOf("<s>") + 3, wind.indexOf("</s>"));
	if (windSpeed_str == 'calm') windSpeed_str = 0;
	if (System.Gadget.Settings.read("sunits") == "ms") {windSpeed = (windSpeed_str*0.277777778).toFixed(0); var SpeedUnits = "m/s";}
	if (System.Gadget.Settings.read("sunits") == "km") {windSpeed = windSpeed_str; var SpeedUnits = "km/h";}
	if (System.Gadget.Settings.read("sunits") == "mp") {windSpeed = (windSpeed_str*0.621371192).toFixed(0); var SpeedUnits = "mph";}

	var windDirection_str = wind.substring(wind.indexOf("<t>") + 3, wind.indexOf("</t>"));
	var WindDirectionSpan = winddirection_Stats[windDirection_str];

	if (WindDirectionSpan == undefined) var WindCapt = lng_Stats["wind"];
	else var WindCapt = lng_Stats["wind"] + "[" + WindDirectionSpan + "]";
	var WindSpan = windSpeed + lng_Units[SpeedUnits];
	if (windSpeed_str == 'N/A' || windSpeed_str == 'calm' || windSpeed_str == 'CALM') WindSpan = lng_nodata;
	parametrsArray.push({"name":"wind", "capt":WindCapt, "span":WindSpan});

	
	var visibility_str = cc.substring(cc.indexOf("<vis>") + 5, cc.indexOf("</vis>"));
	if (System.Gadget.Settings.read("dunits") == "km") {visibility = visibility_str; var DistanceUnits = "km";}
	if (System.Gadget.Settings.read("dunits") == "mi") {visibility = (visibility_str*0.621371192).toFixed(1); var DistanceUnits = "mi";}
        VisibilityCapt = lng_Stats["visibility"];
	VisibilitySpan = visibility + lng_Units[DistanceUnits];
	if (visibility_str == 'N/A') VisibilitySpan = lng_nodata;
	parametrsArray.push({"name":"visibility", "capt":VisibilityCapt, "span":VisibilitySpan});
        
	var humidity = cc.substring(cc.indexOf("<hmid>") + 6, cc.indexOf("</hmid>"));
	HumidityCapt = lng_Stats["humidity"];
	HumiditySpan = humidity + "%";
	if (humidity == 'N/A') HumiditySpan = lng_nodata;
	parametrsArray.push({"name":"humidity", "capt":HumidityCapt, "span":HumiditySpan});
	

	var dewpoint = cc.substring(cc.indexOf("<dewp>") + 6, cc.indexOf("</dewp>"));		//dewpoint
	if (System.Gadget.Settings.read("tunits") == "m") {var TemperatureUnits = "C";}
	if (System.Gadget.Settings.read("tunits") == "f") {dewpoint = (dewpoint*(9/5) + 32).toFixed(0); var TemperatureUnits = "F";}
	DewpCapt = lng_Stats["dewpoint"];
	DewpSpan = dewpoint + "°" + lng_Units[TemperatureUnits];
	if (dewpoint == 'N/A' || dewpoint == 'NaN') DewpSpan = lng_nodata;
	parametrsArray.push({"name":"dewpoint", "capt":DewpCapt, "span":DewpSpan});


	var uv = cc.substring(cc.indexOf("<uv>") + 4, cc.indexOf("</uv>"));			//UV-index
	var UVIndex = uv.substring(uv.indexOf("<i>") + 3, uv.indexOf("</i>"));
	UVIndexCapt = lng_Stats["uvindex"];
	UVIndexSpan = UVIndex;
	if (UVIndex == 'N/A') UVIndexSpan = lng_nodata;
	parametrsArray.push({"name":"uvindex", "capt":UVIndexCapt, "span":UVIndexSpan});

	var UVLevel = uv.substring(uv.indexOf("<t>") + 3, uv.indexOf("</t>"));			//UV-level
	UVLevelCapt = lng_Stats["uvlevel"];
	UVLevelSpan = uv_Stats[UVLevel];
	if (UVLevelSpan == undefined) UVLevelSpan = lng_nodata;
	parametrsArray.push({"name":"uvlevel", "capt":UVLevelCapt, "span":UVLevelSpan});


	var moon = cc.substring(cc.indexOf("<moon>") + 6, cc.indexOf("</moon>"));
	var moonterminator = moon.substring(moon.indexOf("<t>") + 3, moon.indexOf("</t>"));
	MoonCapt = lng_Stats["moonterminator"];
	MoonSpan = moon_Stats[moonterminator];
	if (MoonSpan == undefined) MoonSpan = lng_nodata;
	parametrsArray.push({"name":"moonterminator", "capt":MoonCapt, "span":MoonSpan});

		
	var latitude = Xml.substring(Xml.indexOf("<lat>") + 5, Xml.indexOf("</lat>"));		//latitude
	LatitudeCapt = lng_Stats["latitude"];
	LatitudeSpan = latitude;
	if (latitude == 'N/A') LatitudeSpan = lng_nodata;
	parametrsArray.push({"name":"latitude", "capt":LatitudeCapt, "span":LatitudeSpan});


	var longitude = Xml.substring(Xml.indexOf("<lon>") + 5, Xml.indexOf("</lon>"));		//longitude
	LongitudeCapt = lng_Stats["longitude"];
	LongitudeSpan = longitude;
	if (longitude == 'N/A') LongitudeSpan = lng_nodata;
	parametrsArray.push({"name":"longitude", "capt":LongitudeCapt, "span":LongitudeSpan});

	
	if (DateToMinutesConvert(time) >= 1000) var precipitation = Xml.substring(Xml.indexOf("<ppcp>", Xml.indexOf("<ppcp>") + 1) + 6, Xml.indexOf("</ppcp>", Xml.indexOf("</ppcp>") + 1));
	else var precipitation = Xml.substring(Xml.indexOf("<ppcp>") + 6, Xml.indexOf("</ppcp>"));
	PrecipitationCapt = lng_Stats["precipitation"];
	PrecipitationSpan = precipitation + "%";
	if (precipitation == 'N/A') PrecipitationSpan = lng_nodata;
	parametrsArray.push({"name":"precipitation", "capt":PrecipitationCapt, "span":PrecipitationSpan});

	
	setOptionsSettings(parametrsArray);


	currentImg.src = "images/" + System.Gadget.Settings.read('Skin') + "/" + daytime + "/" + WGetCondImage(current);

	if (daytime == "Night" && (img == "partcloudy.png" || img == "cloudy.png" || img == "mostcloudy.png" || img == "clear.png")) {

	var moon_img = {
		New: "new.png",
		"Waxing Crescent": "waxing_crescent.png",
		"First Quarter": "first_quater.png",
		"Waxing Gibbous": "waxing_gibbous.png",
		Full: "full.png",
		"Waning Gibbous": "waning_gibbous.png",
		"Last Quarter": "last_quater.png",
		"Waning Crescent": "waning_crescent.png",
		Darkened: "new.png"
		};

		currentImgMoon.src = "images/" + System.Gadget.Settings.read('Skin') + "/Night/moon/" + moon_img[moonterminator];
		if (System.Gadget.Settings.read('showFlyoutForecast') == "1") {
			currentImg.alt = moon_Stats_full[moonterminator];
			currentImgMoon.alt = moon_Stats_full[moonterminator];
		}
		if (img != "clear.png") currentImg.style.display = "block";
		else currentImg.style.display = "none";
	}
	else {
		currentImgMoon.style.display = "none";
		currentImg.alt = "";
	}
	
	
	if (lng_WeatherStatus[current] != undefined) current = lng_WeatherStatus[current];
		while (current.length > 19) {
	 		current = current.slice(0, current.lastIndexOf(" "));
			lastsymbol = current.substring(current.lastIndexOf(" ") + 1, current.length);
			if (lastsymbol.length == 1 || lastsymbol == 'and') current = current.slice(0, current.lastIndexOf(" "));
		}
	

	//alert module
	if (Xml.indexOf("<swa>") > -1 && (CondSpan.innerHTML).search(/<MARQUEE/i) == -1) {
		var swa = Xml.substring(Xml.indexOf("<swa>") + 5, Xml.indexOf("</swa>"));
		var alert1 = swa.substring(swa.indexOf("<a>") + 3, swa.indexOf("</a>"));
		var alert_url = alert1.substring(alert1.indexOf("<l>") + 3, alert1.indexOf("</l>"));
		var msgalert = alert1.substring(alert1.indexOf("<t>") + 3, alert1.indexOf("</t>"));
		CondSpan.innerHTML = "<MARQUEE WIDTH='115' SCROLLDELAY='70' SCROLLAMOUNT='2'><a href='" + alert_url + "' style='text-decoration: none;'><font color='red'>" + msgalert + "</font></a></MARQUEE>";
	}
	else CondSpan.innerText = current;
	

	WFillForecast(Xml.substring(Xml.indexOf("<dayf>") + 6, Xml.indexOf("</dayf>")));

	
	redrawGadget();

	
	//autoupdate module
	if (System.Gadget.Settings.read("WupdateInterval") == "0")
	{
		currenttime24m = time.slice(time.indexOf(":") + 1, time.indexOf(":") + 3);
		//US updates
		if (timeupdate.search(":05") > -1 || timeupdate.search(":25") > -1 || timeupdate.search(":45") > -1) {
			if (currenttime24m < 12) intervalupd = 12 - currenttime24m;
			if (currenttime24m >= 12 && currenttime24m < 32) intervalupd = 32 - currenttime24m;
			if (currenttime24m >= 32 && currenttime24m < 52) intervalupd = 52 - currenttime24m;
			if (currenttime24m >= 52) intervalupd = 60 - currenttime24m + 12;
			if ((DateToMinutesConvert(time) - DateToMinutesConvert(timeupdate)) > 21) intervalupd = 1;
		}
		//rest of the World
		else {
			if (currenttime24m < 14) intervalupd = 14 - currenttime24m;
			if (currenttime24m >= 14 && currenttime24m < 44) intervalupd = 44 - currenttime24m;
			if (currenttime24m >= 44) intervalupd = 60 - currenttime24m + 14;
			if ((DateToMinutesConvert(time) - DateToMinutesConvert(timeupdate)) > 43) intervalupd = 2;
		}
		clearTimeout(updateTimer);
		updateTimer = setTimeout('getForecastData();', 1000*60*intervalupd);
	}



	if ((System.Gadget.Settings.read("showLastTimeUpdate")) == 1 ) {
		var NextTimeUpdate = MinutesToTime24Convert(DateToMinutesConvert(time) + intervalupd);
		document.getElementById("TimeLastUpdate").title = lng_Updating_Time_Text + " " + NextTimeUpdate;
	}
	
}




////////////////////////




function WGetCondImage(condition)
{
	img="undefined.png";

	if ((condition.search(/Cloudy/i) > -1) || (condition.search(/Clouds/i) > -1))
		img="cloudy.png";

	if ((condition.search(/Light Rain/) > -1) || (condition.search(/Shower/) > -1) || (condition.search(/Drizzle/) > -1) || (condition.search(/Rain/) > -1))
		img="lightrain.png";

	if ((condition.search(/Rain/i) > -1) && (condition.search(/Heavy/i) > -1))
		img="rain.png";

	if (condition.search(/Hail/i) > -1)
		img="hail.png";

	if ((condition.search(/Sunny/i) > -1) || (condition.search(/Clear/i) > -1))
		img="clear.png";

	if ((condition.search(/Mostly Sunny/i) > -1 || condition.search(/Partly Sunny/i) > -1))
		img="mostsunny.png";

	if (condition.search(/Dust/i) > -1)
		img="dusthaze.png";

	if ((condition.search(/Fog/i) > -1) || (condition.search(/Mist/i) > -1) || (condition.search(/Haze/i) > -1)) 
		img="fog.png";

	if (condition.search(/Smoke/i) > -1)
		img="smoke.png";

	if ((condition.search(/Snow/i) > -1) || (condition.search(/Blizzard/i) > -1))
		img="snow.png";

	if ((condition.search(/Thunder/i) > -1) || (condition.search(/T-Storm/i) > -1) || (condition.search(/Storm/i) > -1))
		img="thunderstorm.png";

	if ((condition.search(/Partly Cloudy/i) > -1) || (condition.search(/Fair/i) > -1))
		img="partcloudy.png";

	if (condition.search(/Mostly Cloudy/i) > -1)
		img="mostcloudy.png";

	if ((condition.search(/Snow/) > -1) && ((condition.search(/Rain/) > -1) || (condition.search(/Shower/) > -1)) || condition.search(/Wintry Mix/) > -1 || condition.search(/Ice/) > -1)
		img="rainandsnow.png";
	
	if ((condition.search(/Snow/) > -1) && (condition.search(/Light/) > -1) || (condition.search(/Flurries/) > -1) || (condition.search(/Ice Crystals/) > -1))
		img="lightsnow.png";

	return img;
}




///////////////////////




function WFillForecast(XmlData)
{
	var a = 1;
	totalFCDays = 0;
	var nightFlag = 0;

	var flsup = XmlData.substring(XmlData.indexOf("<lsup>") + 6, XmlData.indexOf("</lsup>"));
	var fdate = flsup.substring(0, flsup.indexOf(" "));

	XmlData = XmlData.split('<day d="');

	
	for (var i = 1; i < XmlData.length; i++) {

		if (a >= 10) break;

		if ((System.Gadget.Settings.read("showForecastToday")) != 1 || (DateToMinutesConvert(lasttimeupdate24full) >= 900 && DateToMinutesConvert(lasttimeupdate24full) <= 1440))
			{
				if (System.Gadget.Settings.read("showForecastToday") != 1) {
					if (i == 1) i++;
					if (System.Gadget.Settings.read("showDayNameForecast") == 0) dayName1.innerText = lng_Tomorrow;
				}
				else {
					if (System.Gadget.Settings.read("showDayNameForecast") == 0) {
						dayName1.innerText = lng_Today;
						dayName2.innerText = lng_Tomorrow;
					}
					date1.innerText = periodsArray[2];
					nightFlag++;
					nightFlag++;
				}
			}
 		else
			{
				if (fdate != ccdate && i == 1) i++;
				if (System.Gadget.Settings.read("showDayNameForecast") == 0) {
					dayName1.innerText = lng_Today;
					dayName2.innerText = lng_Today;
					dayName3.innerText = lng_Tomorrow;
					
				}
				date1.innerText = periodsArray[5];
				date2.innerText = periodsArray[2];
				nightFlag++;
				if (nightFlag == 2) i--;
			}

		

		var dayData = XmlData[i];

		var high = dayData.substring(dayData.indexOf("<hi>") + 4, dayData.indexOf("</hi>"));
		var low = dayData.substring(dayData.indexOf("<low>") + 5, dayData.indexOf("</low>"));
		if (System.Gadget.Settings.read("tunits") == "f") {if (high != "N/A") high = Math.round(high*(9/5) + 32); low = Math.round(low*(9/5) + 32);}
		
		
		var day = dayData.substring(dayData.indexOf('t="') + 3, dayData.indexOf('" dt="'));
		day = lng_DayOfWeek[day];
		var date = dayData.substring(dayData.indexOf('dt="') + 4, dayData.indexOf('">'));
		var month = date.substring(0, 3);
		var date = date.substring(4);
		date = date +" " + lng_Month[month];

		if (nightFlag == 2) {dayData = dayData.split('<part p="n">'); dayData = dayData[1]; if (high == "N/A" || high == "" || high == "NaN") high = low;}

		var precip = dayData.substring(dayData.indexOf('<ppcp>') + 6, dayData.indexOf('</ppcp>'));

		var wind = dayData.substring(dayData.indexOf('<wind>') + 6, dayData.indexOf('</wind>'));
		var windSpeed = wind.substring(wind.indexOf('<s>') + 3, wind.indexOf('</s>'));
		if (windSpeed == 'calm' || windSpeed == 'N/A' || !windSpeed) windSpeed = 0;
		windSpeed = (windSpeed*1).toFixed(0);
		if (System.Gadget.Settings.read("sunits") == "ms") {windSpeed = (windSpeed*0.277777778).toFixed(0); var SpeedUnits = "m/s";}
		if (System.Gadget.Settings.read("sunits") == "km") {windSpeed = windSpeed; var SpeedUnits = "km/h";}
		if (System.Gadget.Settings.read("sunits") == "mp") {windSpeed = (windSpeed*0.621371192).toFixed(0); var SpeedUnits = "mph";}

		var windDirection_str = wind.substring(wind.indexOf("<t>") + 3, wind.indexOf("</t>"));
		windDirection_str = winddirection_Stats[windDirection_str];
		if (windDirection_str == undefined) var WindDirection = "";
		else var WindDirection = windDirection_str.substring(windDirection_str.indexOf(">") + 1, windDirection_str.lastIndexOf("<"));
				
		//var humidity = dayData.substring(dayData.indexOf('<hmid>') + 6, dayData.indexOf('</hmid>'));

		var condition = dayData.substring(dayData.indexOf('<t>') + 3, dayData.indexOf('</t>'));
		var conditionIMG = WGetCondImage(condition);
		if (nightFlag == 2 && (conditionIMG == 'clear.png' || conditionIMG == 'mostcloudy.png' || conditionIMG == 'partcloudy.png')) conditionIMG = conditionIMG.replace(".png", "_night.png");

		
		document.getElementById("dayName" + a).innerText = day; 
		document.getElementById("date" + a).innerText = date; 
		if (high != "N/A" && high != "" && high != "NaN") document.getElementById("dayHi" + a).innerText = high + "°";
		document.getElementById("separator"  + a).innerText = "/";
		if (low != "N/A" && low != "" && low != "NaN") document.getElementById("dayLow" + a).innerText = low + "°"; 
		if (condition != 'N/A') document.getElementById("dayImg" + a).src = "images/" + System.Gadget.Settings.read('Skin') + "/Forecast/" + conditionIMG;
		if (document.getElementById("dayImg" + a).src == '') document.getElementById("dayImg" + a).src = "images/" + System.Gadget.Settings.read('Skin') + "/Forecast/" + "undefined.png";
		if (lng_WeatherStatus[condition] != undefined) condition = lng_WeatherStatus[condition];
		if (System.Gadget.Settings.read('showFlyoutForecast') == "1" && condition != 'N/A') document.getElementById("dayImg" + a).alt = condition + "; " + lng_Stats['precipitation'] + " " + precip + "%, " + lng_Stats["wind"] + "[" + WindDirection + "]" + " " + windSpeed + lng_Units[SpeedUnits];
		a++;
		totalFCDays++;
	}

}



