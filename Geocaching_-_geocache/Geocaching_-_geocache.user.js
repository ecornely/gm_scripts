// ==UserScript==
// @name        Geocaching - geocache
// @namespace   be.ecornely
// @include     https://www.geocaching.com/geocache/*
// @include     http://www.geocaching.com/geocache/*
// @version     1.0.1-201408230836
// @grant       none
// ==/UserScript==


function ready(){
  console.log("Ready to use jQuery", jQuery);
  coords=jQuery("<span id='coordsDegree'>"+mapLatLng.lat+", "+mapLatLng.lng+"</span><br/>");
  coords.insertBefore(jQuery("span#ctl00_ContentBody_LocationSubPanel"));
  //googleDirections="https://www.google.be/maps/dir//"+mapLatLng.lat+","+mapLatLng.lng+"/?hl=fr"
}

function waitJQuery(){
  console.log("Checking jQuery : ", jQuery);
  if(jQuery==null){
    if(unsafeWindow.jQuery){
      console.log("Taking unsafeWindow jQuery : ", unsafeWindow.jQuery);
      jQuery=unsafeWindow.jQuery;
      ready();
    }else{
      console.log("jQuery is still null waiting...", jQuery);
      setTimeout("waitJQuery", 1000)
    }
  }else{
    ready();
  }
}

waitJQuery();