// ==UserScript==
// @name            HPSM slash
// @description     HPSM slash redirect
// @author          corne
// @oujs:author     corne
// @namespace       contact@ecornely.be
// @homepageURL     https://blog.ecornely.be
// @supportURL      https://github.com/ecornely/gmscripts
// @match         http://hpsm.nrb.be/
// @match         http://hpsm.nrb.be
// @match         https://hpsm.nrb.be/
// @match         https://hpsm.nrb.be
// @match         http://itsm.nrb.be/
// @match         http://itsm.nrb.be
// @match         https://itsm.nrb.be/
// @match         https://itsm.nrb.be
// @match         http://nrbnrw0237.nrb.be:8080/
// @run-at          document-start
// @version         0.0.1
// ==/UserScript==
(function() {
  'use strict';

  if (window.top !== window.self){ // NOTE: Do not run on iframes
    return;
  }
  window.location='http://hpsm.nrb.be/webtier-9.62/index.do'
})();
