// ==UserScript==
// @name            Amazon.de to smile
// @description     Redirect to smile.amazon.de when on normal amazon
// @author          corne
// @oujs:author     corne
// @namespace       contact@ecornely.be
// @homepageURL     https://blog.ecornely.be
// @supportURL      https://github.com/ecornely/gmscripts
// @match         http://amazon.de/*
// @match         http://www.amazon.de/*
// @match         https://amazon.de/*
// @match         https://www.amazon.de/*
// @run-at          document-start
// @version         0.0.1
// ==/UserScript==

(function() {
  'use strict';

  if(window.top !== window.self){ // NOTE: Do not run on iframes
      return;
  }

  window.location='https://smile.amazon.de'+window.location.pathname+window.location.search
})();
