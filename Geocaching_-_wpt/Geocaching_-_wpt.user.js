// ==UserScript==
// @name        Geocaching - wpt
// @namespace   be.ecornely
// @description Add a textbox to split automatically N50 42.758 E004 31.295
// @include     https://www.geocaching.com/wpt/*
// @include     http://www.geocaching.com/wpt/*
// @version     1.0.1-20150309
// @grant       none
// ==/UserScript==

function ready(){
    var formatSelect=jQuery("select").eq(0);
    /*Check we are in mode Deg Min.Dec*/
    if( "1" == formatSelect.val()){
        var td = formatSelect.parent("td");
        td.attr("colspan", "3");
        var cell=jQuery("<td></td>");
        var textInput = jQuery("<input type=\"text\" size=\"26\" AutoComplete=\"off\" title=\"Paste here in format N50 30.000 E005 30.000\" placeholder=\"N DD MM.MMM E DDD MM.MMM\" style=\"color:lightgrey;background-color:rgba(227,221,194, 0.3);border:1px solid rgba(227,221,194,0.5);\"/>");
        textInput.appendTo(cell);
        cell.insertAfter(td);
        textInput.keyup(function(evt){
            var textInput = jQuery(evt.currentTarget);
            var match = textInput.val().match(new RegExp("^\\s*([NS])\\s*(\\d+)\\s*\xB0?(?:(?:\\s+)|(?:\\s*-\\s*))(\\d+[.,]\\d+)(?:(?:\\s+)|(?:\\s*-\\s*))([EW])\\s*(\\d+)\\s*\xB0?(?:(?:\\s+)|(?:\\s*-\\s*))(\\d+[.,]\\d+)\\s*$"));
                if(match!=null){
                    console.log(match[1]);
                    if("N"==match[1]){
                        jQuery("select[id*='NorthSouth']").val("1");
                    }else if("S"==match[1]){
                        jQuery("select[id*='NorthSouth']").val("-1");
                    }
                    jQuery("input[id*='LatDegs']").val(match[2]);
                    jQuery("input[id*='LatMins']").val(match[3]);
                    if("E"==match[4]){
                        jQuery("select[id*='EastWest']").val("1");
                    }else if("W"==match[4]){
                        jQuery("select[id*='EastWest']").val("-1");
                    }
                    jQuery("input[id*='LongDegs']").val(match[5]);
                    jQuery("input[id*='LongMins']").val(match[6]);
                }
        });
    }else if( "0" == formatSelect.val()){
        var td = formatSelect.parent("td");
        td.attr("colspan", "3");
        var cell=jQuery("<td></td>");
        var textInput = jQuery("<input type=\"text\" size=\"26\" AutoComplete=\"off\" title=\"Paste here in format 50.000000,5.000000\" placeholder=\"50.00000,5.00000\" style=\"color:lightgrey;background-color:rgba(227,221,194, 0.3);border:1px solid rgba(227,221,194,0.5);\"/>");
        textInput.appendTo(cell);
        cell.insertAfter(td);
        textInput.on('input', function(evt){
                var textInput = jQuery(evt.currentTarget);
                var match = textInput.val().match(new RegExp("^\\s*([+\\-]?\\d+\\.\\d+)\\s*[, ]\\s*([+\\-]?\\d+\\.\\d+)\\s*$"));
                console.log("match="+match);
                if(match!=null){
                    if(parseFloat(match[1])>0){
                            jQuery("select[id*='NorthSouth']").val("1");
                    }else{
                        jQuery("select[id*='NorthSouth']").val("-1");
                    }
                    jQuery("input[id*='LatDegs']").val(Math.abs(parseFloat(match[1])));
                    if(parseFloat(match[2])>0){
                            jQuery("select[id*='EastWest']").val("1");
                    }else{
                        jQuery("select[id*='EastWest']").val("-1");
                    }
                    jQuery("input[id*='LongDegs']").val(Math.abs(parseFloat(match[2])));
                }
        });
    }else if( "2" == formatSelect.val()){
        var td = formatSelect.parent("td");
        td.attr("colspan", "3");
        var cell=jQuery("<td></td>");
        var textInput = jQuery("<input type=\"text\" size=\"26\" AutoComplete=\"off\" title=\"Paste here in format N50°00'00.00&quot; E5°00'00.00&quot;\" placeholder=\"N50°00'00.00&quot; E5°00'00.00&quot;\" style=\"color:lightgrey;background-color:rgba(227,221,194, 0.3);border:1px solid rgba(227,221,194,0.5);\"/>");
        textInput.appendTo(cell);
        cell.insertAfter(td);
        textInput.on('input', function(evt){
                var textInput = jQuery(evt.currentTarget);
                var match = textInput.val().match(new RegExp("^\\s*([SN]?)\\s*(\\d+)[° ](\\d+)[' ](\\d+\\.\\d+)\"?\\s*([SN]?)\\s*([WE]?)\\s*(\\d+)[° ](\\d+)[' ](\\d+\\.\\d+)\"?\\s*([WE]?)\\s*$"));
                console.log("match ", match);
                if(match!=null){
                    if("N"==match[1] || "N"==match[5]){
                            jQuery("select[id*='NorthSouth']").val("1");
                    }else if("S"==match[1] || "S"==match[5]){
                        jQuery("select[id*='NorthSouth']").val("-1");
                    }
                    jQuery("input[id*='LatDegs']").val(Math.abs(parseInt(match[2])));
                    jQuery("input[id*='LatMins']").val(Math.abs(parseInt(match[3])));
                    jQuery("input[id*='LatSecs']").val(Math.abs(parseFloat(match[4])));
                    
                    if("E"==match[6] || "E"==match[10]){
                            jQuery("select[id*='EastWest']").val("1");
                    }else if("W"==match[6] || "W"==match[10]){
                        jQuery("select[id*='EastWest']").val("-1");
                    }
                    jQuery("input[id*='LongDegs']").val(Math.abs(parseInt(match[7])));
                    jQuery("input[id*='LongMins']").val(Math.abs(parseInt(match[8])));
                    jQuery("input[id*='LongSecs']").val(Math.abs(parseFloat(match[9])));
                }
        });
    }
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