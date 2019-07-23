// ==UserScript==
// @name            HPSM slash
// @description     HPSM slash redirect
// @author          corne
// @oujs:author     corne
// @namespace       contact@ecornely.be
// @homepageURL     https://blog.ecornely.be
// @supportURL      https://github.com/ecornely/gmscripts
// @include         http://hpsm.nrb.be/
// @include         http://hpsm.nrb.be
// @include         https://hpsm.nrb.be/
// @include         https://hpsm.nrb.be
// @include         http://nrbnrw0237.nrb.be:8080/
// @run-at          document-start
// @version         0.0.1
// ==/UserScript==

if (window.top !== window.self) // NOTE: Do not run on iframes
    return;

window.location='http://hpsm.nrb.be/webtier-9.61/index.do'
