"use strict";var precacheConfig=[["/index.html","2be871b01779bd875fc207bb684a92af"],["/static/css/main.ce86dcee.css","3faaca3e15cf35a51e4a39530f675156"],["/static/js/main.5b48202f.js","de71af96bfb2a115575aa55a4866a579"],["/static/media/CM_Basic_Black_Rgb.e30329e2.svg","e30329e20a0f4a78cbdacc98a340fab8"],["/static/media/CM_Basic_Gold_Rgb.fa0ae8c2.svg","fa0ae8c263326bd1aa6810ab3d2d5f01"],["/static/media/CM_ID_Black_Rgb.c8383da3.svg","c8383da3d2683c99e26825e7ca06c8e7"],["/static/media/doc_banner.09ecec1a.png","09ecec1aa18fc9d55c61a1ec56e62135"],["/static/media/jaakko.69096481.jpg","69096481812524bbd31736cf8d5881c8"],["/static/media/jennina.79a3d049.jpg","79a3d049b39062d230d1cd218d412377"],["/static/media/jukka.f256e1b9.jpg","f256e1b9330d36d0dfc6d7f039d5184e"],["/static/media/kimmo.348c0040.jpg","348c004082f183eb693cf087615261ec"],["/static/media/mainImage.6f1fe2d7.jpg","6f1fe2d73bfa216169abb86621bab10b"],["/static/media/mika.be63c4f2.jpg","be63c4f22898ab466278ce406cfdfe1e"],["/static/media/team_01.7e940602.jpg","7e940602e6191865c0cb4bc8ddbfb171"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});