"use strict";
// DOM Functions
var create = function (tag, html) {
    if (html === void 0) { html = ""; }
    var el = document.createElement(tag);
    if (el) {
        el.innerHTML = html;
        return el;
    }
    console.warn("[DOM Functions]: Tag is incorrect");
    return false;
};
// AJAX Functions
var sendPostRequest = function (url, data) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 301) {
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function () {
            reject(xhr.status);
        };
        xhr.send(JSON.stringify(data));
    });
};
var sendGetRequest = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 301)
                resolve(xhr.responseText);
        };
        xhr.onerror = function () {
            reject(xhr.status);
        };
        xhr.send();
    });
};
