// ==UserScript==
// @name        geochecker.com
// @namespace   be.ecornely
// @include     http://www.geochecker.com/index.php*
// @version     0.0.1-20150309
// @grant       unsafeWindow
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==
var i=$("<input type='text' style='text-align: center; margin: 0px auto; width: 100%; background-color: #eee; margin: 30px 0px 5px 0px;' placeholder='N DD.MMM E DD.MMM'/>");
i.on('input', function(evt){
        var coord=i.val();
        var match = coord.match(new RegExp("^\\s*([NS])\\s*(\\d+)\\s*\xB0?(?:(?:\\s+)|(?:\\s*-\\s*))(\\d+[.,]\\d+)(?:(?:\\s+)|(?:\\s*-\\s*))([EW])\\s*(\\d+)\\s*\xB0?(?:(?:\\s+)|(?:\\s*-\\s*))(\\d+[.,]\\d+)\\s*$"));
        if(match!=null){
            $("input[name='LatString']").val(match[1]+" "+match[2]+" "+match[3]);
            $("input[name='LonString']").val(match[4]+" "+match[5]+" "+match[6]);
        }
});
var td=$("body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > form:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)");
i.prependTo(td);
