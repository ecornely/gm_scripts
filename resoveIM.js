// ==UserScript==
// @name     resolveIM
// @version  1.0.0
// @grant    none
// @description     Add function to automatically resovle OXYGEN incidents
// @author          corne
// @namespace       contact@ecornely.be
// @homepageURL     https://blog.ecornely.be
// @include         http://itsm.nrb.be/webtier-9.35/*
// @run-at          document-end
// ==/UserScript==

if (window.top !== window.self) // NOTE: Do not run on iframes
    return;

closureCode=null;
solution=null;
evt = null;

function resolveIM(){
  closureCode=null;
  solution=null;
  while(closureCode==null){
    try{
      ccode = prompt("What was the resolution ?\n1. resolved without intervention \n2. resolved by workaround\n3. resolved successfully\n4. cancelled by user\n5. usage problem\n6. third party issue \n7. rejected");
      switch(parseInt(ccode)){
        case 1:
        closureCode="resolved without intervention ";
        break;
        case 2:
        closureCode="resolved by workaround";
        break;
        case 3:
        closureCode="resolved successfully";
        break;
        case 4:
        closureCode="cancelled by user";
        break;
        case 5:
        closureCode="usage problem";
        break;
        case 6:
        closureCode="third party issue ";
        break;
        case 7:
        closureCode="rejected";
        break;
      }
    }catch{

    }
  }
  while(solution==null || solution.length==0){
    solution = prompt("What was the solution ?");
  }
  document.querySelector("iframe").contentDocument.querySelector("input[name='instance/affected.item']").value="OXY";
  document.querySelector("iframe").contentDocument.querySelectorAll("input[name='instance/prob.mgmt.candidate']")[1].click();
  document.querySelector("iframe").contentDocument.querySelectorAll("input[name='instance/nrb.security.candidate']")[1].click();
  document.querySelector("iframe").contentDocument.querySelectorAll("input[name='instance/nrb.caused.bychange']")[1].click();
  evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, true);
  document.querySelector("iframe").contentDocument.querySelector("input[name='instance/affected.item']").parentNode.parentNode.parentNode.querySelector("img[title='Fill Field Business Service']").dispatchEvent(evt);
  setTimeout(checkOxygen, 1000);
}

function completeFormAndSave(){
  document.querySelector("iframe").contentDocument.querySelector("input[name='instance/fix.type']").click();
  document.querySelector("iframe").contentDocument.querySelector("input[name='instance/resolution.code']").value=closureCode;
  evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, true);
  document.querySelector("iframe").contentDocument.querySelector("input[name='instance/resolution.code']").dispatchEvent(evt);
  document.querySelector("iframe").contentDocument.querySelector("textarea[name='instance/explanation/explanation']").value=solution;
  Array.from(document.querySelectorAll("button.x-btn-text")).filter(function(b){ return b.innerText=="Save & Exit"})[0].click();
}

function checkClosureVisible(){
  if(document.querySelector("iframe").contentDocument.querySelector("input[name='instance/resolution.code']")!=null){
    console.log("completeFormAndSave()");
    setTimeout(completeFormAndSave, 2000);
  }else{
    console.log("closure code input was null... waith 1 sec.");
    setTimeout(checkClosureVisible, 1000);
  }
}

function clickResolve(){
  console.log("Clicking on :", Array.from(document.querySelectorAll("button.x-btn-text")).filter(function(b){ return b.innerText=="Resolve"})[0]);
  Array.from(document.querySelectorAll("button.x-btn-text")).filter(function(b){ return b.innerText=="Resolve"})[0].click();
  setTimeout(checkClosureVisible, 1000);
}

function checkOxygen(){
  try{
    var bs=document.querySelector("iframe").contentDocument.querySelector("input[name='instance/affected.item']").value;
    var resolveBtn = Array.from(document.querySelectorAll("button.x-btn-text")).filter(function(b){ return b.innerText=="Resolve"})[0]
    if(bs.indexOf("OXYGENE")>=0){
      setTimeout(clickResolve, 2000);
    }else{
      console.log("bs was "+bs+"... waith 1 sec.");
      setTimeout(checkOxygen, 1000);
    }
  }catch(e){
    console.log(e);
    setTimeout(checkOxygen, 1000);
  }
}

if(document.getElementById("resolveIMBtn")==null){
  btn = document.createElement("button");
  btn.textContent="resolveIM";
  btn.setAttribute("style", "position:absolute;top:5px;right:200px;z-index:999");
  btn.setAttribute("id", "resolveIMBtn");
  btn.onclick=resolveIM;
  document.body.appendChild(btn);
}
