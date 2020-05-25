!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s(s.s=6)}([function(e,t,s){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const i=new Set;const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[r.prefix,e,r.suffix].filter(e=>e&&e.length>0).join("-"),o=e=>e||c(r.precache),h=e=>e||c(r.runtime);const u=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),l=(e,t)=>e.filter(e=>t in e),p=async({request:e,mode:t,plugins:s=[]})=>{const n=l(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},d=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await p({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},f=async({cacheName:e,request:t,response:s,event:n,plugins:r=[],matchOptions:c})=>{const o=await p({plugins:r,request:t,mode:"write"});if(!s)throw new a("cache-put-with-no-response",{url:u(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:n,plugins:r,response:s,request:o});if(!h)return void 0;const f=await self.caches.open(e),g=l(r,"cacheDidUpdate"),m=g.length>0?await d({cacheName:e,matchOptions:c,request:o}):null;try{await f.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of i)await e()}(),e}for(const t of g)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:m,newResponse:h,request:o})},g=d;let m;function w(e){e.then(()=>{})}class _{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(u.push(i?e:e.value),a&&u.length>=a?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this._db.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this._db&&(this._db.close(),this._db=null)}}_.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(_.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const v=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=l(n,"fetchDidFail"),r=i.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,a=e.clone();e=await n.call(t,{request:a,event:s})}}catch(e){throw new a("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(a=await e.fetchDidSucceed.call(e,{event:s,request:c,response:a}));return a}catch(e){0;for(const t of i)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:r.clone(),request:c.clone()});throw e}};async function x(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===m){const e=new Response("");if("body"in e)try{new Response(e.body),m=!0}catch(e){m=!1}m=!1}return m}()?s.body:await s.blob();return new Response(i,a)}s(1);const q=[],R={get:()=>q,add(e){q.push(...e)}};function b(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),i=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:i.href}}class N{constructor(e){this._cacheName=o(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=b(s),i="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),i=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});await Promise.all(c);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:i,integrity:r}){const c=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});let o,h=await v({event:n,plugins:i,request:c});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:n,request:c,response:h}):h.status<400))throw new a("bad-precaching-response",{url:t,status:h.status});h.redirected&&(h=await x(h)),await f({event:n,plugins:i,response:h,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new a("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new a("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let U;const T=()=>(U||(U=new N),U);const E=(e,t)=>{const s=T().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let O=!1;function L(e){O||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=o();self.addEventListener("fetch",i=>{const r=E(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return void 0;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),O=!0)}const S=e=>{const t=T(),s=R.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},C=e=>{const t=T();e.waitUntil(t.activate())};s(2);const K=e=>e&&"object"==typeof e?e:{handle:e};class M{constructor(e,t,s="GET"){this.handler=K(t),this.match=e,this.method=s}}class k extends M{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class j{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let i=a&&a.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),!i)return void 0;let r;try{r=i.handle({url:s,request:e,event:t,params:n})}catch(e){r=Promise.reject(e)}return r instanceof Promise&&this._catchHandler&&(r=r.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),r}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const i=a.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=K(e)}setCatchHandler(e){this._catchHandler=K(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let A;const P=()=>(A||(A=new j,A.addFetchListener(),A.addCacheListener()),A);function W(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);0;n=new M(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new k(e,t,s);else if("function"==typeof e)n=new M(e,t,s);else{if(!(e instanceof M))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return P().registerRoute(n),n}s(3);class D{constructor(e={}){this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new a("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await v({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=f({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}const I={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class F{constructor(e={}){if(this._cacheName=h(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[I,...e.plugins]}else this._plugins=[I];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const s=[];"string"==typeof t&&(t=new Request(t));const n=[];let i;if(this._networkTimeoutSeconds){const{id:a,promise:r}=this._getTimeoutPromise({request:t,event:e,logs:s});i=a,n.push(r)}const r=this._getNetworkPromise({timeoutId:i,request:t,event:e,logs:s});n.push(r);let c=await Promise.race(n);if(c||(c=await r),!c)throw new a("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let a,i;try{i=await v({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){a=e}if(e&&clearTimeout(e),a||!i)i=await this._respondFromCache({request:t,event:n});else{const e=i.clone(),s=f({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){0}}return i}_respondFromCache({event:e,request:t}){return g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class H{constructor(e={}){if(this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[I,...e.plugins]}else this._plugins=[I];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,i=await g({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{i=await s}catch(e){n=e}}if(!i)throw new a("no-response",{url:t.url,error:n});return i}async _getFromNetwork({request:e,event:t}){const s=await v({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=f({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}s(5);class B{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}s(4);const Q=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class ${constructor(e){this._cacheName=e,this._db=new _("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=Q(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+Q(e)}}class G{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new $(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,w(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class J{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);w(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),i.add(t))}_getCacheExpiration(e){if(e===h())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new G(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var V;self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),function(e){T().addToCacheList(e),e.length>0&&(self.addEventListener("install",S),self.addEventListener("activate",C))}([{'revision':'24492a6b532ef92b1bbf6ada00b657f6','url':'/10ee9c1f4e785a1a68ac.js'},{'revision':'1944906705eb36f704c90331496a6c5b','url':'/10ee9c1f4e785a1a68ac.js.LICENSE.txt'},{'revision':'840d8eebb6b98186a6e27d022502f252','url':'/28c5590f0d110688bbee.js'},{'revision':'71cc31433634651ed8aedf9cb29b5906','url':'/28c5590f0d110688bbee.js.LICENSE.txt'},{'revision':'b3d4eaa1861abebfc3c50d3f877e0a8d','url':'/38acc4dc7a1e87712695.js'},{'revision':'fdf879301da2a742b68b39600ea2c41a','url':'/43d113661208b3492e51.js'},{'revision':'7bcad42a436fd31632e94db298301002','url':'/49090301ddd1d71f6fb1.js'},{'revision':'1944906705eb36f704c90331496a6c5b','url':'/49090301ddd1d71f6fb1.js.LICENSE.txt'},{'revision':'5e834f6338650a5579ab036bc01e2848','url':'/4a39904c524300200753.js'},{'revision':'6f7004726cffb8d0b364a927b1054bc7','url':'/4e8c096782c2f35c35bb.js'},{'revision':'7bfbe5082aab32c7507e9e1c64fe5dc3','url':'/4f5bb2e0bbab665a69cf.js'},{'revision':'479d094971c6675b5070bda2cb695f98','url':'/5b61e4a53ffd73e02842.js'},{'revision':'3c1528c0d23b605042188d33114859f0','url':'/70a593613231a65d9800.js'},{'revision':'df846244d5f81e5ad25549e24994909a','url':'/761fca0f2a1270b59eac.js'},{'revision':'b25c762f122048dce018d1cea5fc621b','url':'/7abff307166d98f41fa3.js'},{'revision':'e2db3e7ddac17e22abea209f86942408','url':'/93ad23ebdeff39208018.js'},{'revision':'ba877541cbb096f153fb962d9dff2935','url':'/9a82dfb0986f6d8fb91b.js'},{'revision':'5ba6fbc7516a5c3041f03e009339f3ba','url':'/9a82dfb0986f6d8fb91b.js.LICENSE.txt'},{'revision':'9e2dfc1951c218e3a16e7bb058e959ef','url':'/admin.c0acbc3785bdde997031.js'},{'revision':'5dae3c5565db289db1b2a92bb4754b2d','url':'/admin.c0acbc3785bdde997031.js.LICENSE.txt'},{'revision':'95d94e25219a92518a269063a496feb9','url':'/admin/config.json'},{'revision':'62de26a760dafeb83a5f85caa4666c75','url':'/assets/cms-preview.css'},{'revision':'5390f6ffc62949e5de34f36fb5447f3c','url':'/assets/cvv.png'},{'revision':'aa72bd2711758e763a0917204ea86db3','url':'/assets/img-placeholder.png'},{'revision':'cc50a22d772de45fa0b34931f3d7810f','url':'/assets/payments.png'},{'revision':'917cbf7a0f9d6d937dccc17fbd462429','url':'/assets/ssl-safe.png'},{'revision':'4794e345f27fd2e868787430ab4adcbd','url':'/b191226cd18b6c439f0a.js'},{'revision':'7f3a19ee5df4c2cbd9163f869898ae38','url':'/b191226cd18b6c439f0a.js.LICENSE.txt'},{'revision':'5740bd705964937b83fb94102d5de7c8','url':'/b1d26e3b64dd303cba7e.js'},{'revision':'46bad2933bb0ed8acec048b5c689eb56','url':'/bc0cd5d86b19706520bd.js'},{'revision':'9b75c949e357e5a9868d2573b2056e95','url':'/ce0637f5356cfdc231fe.js'},{'revision':'1f5fc7bc70f1dfec0492bbbe6334473a','url':'/ce0637f5356cfdc231fe.js.LICENSE.txt'},{'revision':'4c13f29643ea4ed7e434c1b690a6f2e3','url':'/checkout.f86846a2a1f97d3c8c60.js'},{'revision':'18cb23c4bb3bdaed2a4fc4e102df652e','url':'/checkout.f86846a2a1f97d3c8c60.js.LICENSE.txt'},{'revision':'c62aad01db7fdb1003e867937e5c7a24','url':'/dffb7b121f7d0cf0d519.js'},{'revision':'7fd23991b0b37b49066e7a34e0535285','url':'/dffb7b121f7d0cf0d519.js.LICENSE.txt'},{'revision':'2a6038f923ee0b562a26a4afd118d8c0','url':'/ec0fc4d1f35c6928cc25.js'},{'revision':'b7793b7db4efc20f9f6b1ab784af8ec4','url':'/ec0fc4d1f35c6928cc25.js.LICENSE.txt'},{'revision':'b8e0f6ffc47a4e55b7c0b8c4b8d0d067','url':'/icon_128x128.b8e0f6ffc47a4e55b7c0b8c4b8d0d067.png'},{'revision':'4ab4e5b98f1c0dc1ff59e65abfa86a62','url':'/icon_192x192.4ab4e5b98f1c0dc1ff59e65abfa86a62.png'},{'revision':'aaf468dc374647387926be10f2d01692','url':'/icon_384x384.aaf468dc374647387926be10f2d01692.png'},{'revision':'c7c3bc59d00114b8bbe542d6cb48158b','url':'/icon_512x512.c7c3bc59d00114b8bbe542d6cb48158b.png'},{'revision':'e944c6beb6fae6bb6ef1b1e00f77b8b5','url':'/icon_96x96.e944c6beb6fae6bb6ef1b1e00f77b8b5.png'},{'revision':'791be7ee6538f26bb57bc31243a6e17e','url':'/img/icon.png'},{'revision':'0b35db516cfa7475b1c2f8c081e8d54d','url':'/img/large-icon.png'},{'revision':'95375590ce67fa6e86a89c0f451e2854','url':'/img/uploads/11122071_769636899802096_584498107_n-2-.jpg'},{'revision':'24469c70afe554db030bd9dfc9273ae9','url':'/img/uploads/banner-2-home-1.png'},{'revision':'3ebe3090e6d0af20ffebe06ca8376452','url':'/img/uploads/banner-4-completo.png'},{'revision':'92886efa76861f785618bddc764c07a1','url':'/img/uploads/banner-de-inicio-3.png'},{'revision':'2b68e8d424822acb3af73bab4d46067e','url':'/img/uploads/banner-home-inicial-1.png'},{'revision':'0f9061ab25fb23247c8f4948f4089270','url':'/img/uploads/banner-home-inicial-2-mobile2.jpg'},{'revision':'9d72e6fef2214b64f68b4190604765a7','url':'/img/uploads/banner-home-inicial-3-mobile1.jpg'},{'revision':'43bb1475ff354c3ca3cd94ba52a1f8db','url':'/img/uploads/banner1.png'},{'revision':'034302884a84900e61a17ab9d426aa67','url':'/img/uploads/banner2.png'},{'revision':'85954a001ff5939ed9a2a78eaf569f0f','url':'/img/uploads/banner2.webp'},{'revision':'a8123b9c8dd410c8385ac1d75350d979','url':'/img/uploads/favicon.png'},{'revision':'7ac58566b0bf68622c88bd09e77032df','url':'/img/uploads/fitpop-sua-moda-fitness.html'},{'revision':'a28d44173cea0f675b91902faf97aa68','url':'/img/uploads/foto-certa.jpg'},{'revision':'5cf745c5bc5f9a3e55138c242ae83d56','url':'/img/uploads/headless.png'},{'revision':'791be7ee6538f26bb57bc31243a6e17e','url':'/img/uploads/icon.png'},{'revision':'0b35db516cfa7475b1c2f8c081e8d54d','url':'/img/uploads/large-icon.png'},{'revision':'54938192804c623da3b17cabeafcb5cf','url':'/img/uploads/logo.png'},{'revision':'bf1763c50245854ce5ad807b5c1ecea1','url':'/img/uploads/logo.webp'},{'revision':'cbd0492495c6793c1053fae6a76d1913','url':'/img/uploads/logo2.png'},{'revision':'da2603eb49507b42c634b4d26e446c4a','url':'/img/uploads/logo21.png'},{'revision':'53bf78c5d7b4c8db722ce659aeaa3e3a','url':'/img/uploads/minilogo.png'},{'revision':'6d8c51304794f03e3a2421edc43b3864','url':'/img/uploads/og-image.png'},{'revision':'95d61c4e4f0490391acb3d73e670be19','url':'/img/uploads/prancheta-1.2.jpg'},{'revision':'82293440e95d7efa961438e5ec8ea30b','url':'/img/uploads/prancheta-2.2.jpg'},{'revision':'ad6945b3646f5d72c087725cd2416c05','url':'/img/uploads/prancheta-2.jpg'},{'revision':'62f3e32d9c320ca0ccb8b1cad0dd1d65','url':'/img/uploads/prancheta-3.3.jpg'},{'revision':'62f3e32d9c320ca0ccb8b1cad0dd1d65','url':'/img/uploads/prancheta-3.jpg'},{'revision':'0d959d03dbcbe568bd0316d904801b3f','url':'/img/uploads/prancheta-4.4.jpg'},{'revision':'0d959d03dbcbe568bd0316d904801b3f','url':'/img/uploads/prancheta-4.jpg'},{'revision':'ae5e98e4ed3719eea34abbdb9d76a284','url':'/img/uploads/pwa-reliable.png'},{'revision':'bdb4a8ab0c408c42d042fb593b309dae','url':'/img/uploads/rect8589.png'},{'revision':'6a2afb2e2dcfa5bf24d34c81408b611e','url':'/img/uploads/rect859.png'},{'revision':'b59c373c1a75acf61c9bb8dd7e717d01','url':'/img/uploads/rect89.png'},{'revision':'5efa4bc08fef068757c2a28a1f1fec30','url':'/img/uploads/rect89.webp'},{'revision':'87b7411cf85bfb3d73c02a2bd1e86161','url':'/img/uploads/selo-de-qualidade-mobile.jpg'},{'revision':'2e5c2c1e91bad84c95eac9d4d289ada5','url':'/img/uploads/selo-de-qualidade.jpg'},{'revision':'6b981900e0afe954acedd25f461df3f1','url':'/img/uploads/site.jpg'},{'revision':'917cbf7a0f9d6d937dccc17fbd462429','url':'/img/uploads/ssl-safe.png'},{'revision':'2708c3a641efd403da33a88b041b08c3','url':'/manifest.json'},{'revision':'9deea4df51d89384b71463618d64b524','url':'/robots.txt'},{'revision':'ffa965733d77c2b76805a31c57890bcd','url':'/storefront.02079bb3e7764debc954.css'},{'revision':'c38a51299c4787fc44597eb797e0c3c8','url':'/storefront.71364d5ad8330a86d1e1.js'},{'revision':'0489ba3f3a2310200a5896f1b728317a','url':'/storefront.71364d5ad8330a86d1e1.js.LICENSE.txt'}]),L(V),W(/^https:\/\/fonts\.googleapis\.com/,new H({cacheName:"google-fonts-stylesheets"})),W(/^https:\/\/fonts\.gstatic\.com/,new D({cacheName:"google-fonts-webfonts",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new B(e)}}({statuses:[0,200]}),new J({maxAgeSeconds:31536e3,maxEntries:30})]})),W(/^https:\/\/code\.jquery\.com/,new H({cacheName:"cdn-jquery"})),W(/^https:\/\/cdn\.jsdelivr\.net/,new H({cacheName:"cdn-jsdelivr"})),W(/^https:\/\/io(storefront)?\.ecvol\.com/,new F({networkTimeoutSeconds:3,cacheName:"api-cache",plugins:[new J({maxEntries:20})]})),W(/^https:\/\/ioapi?\.ecvol\.com/,new F({networkTimeoutSeconds:3,cacheName:"store-api-cache",plugins:[new J({maxEntries:50,purgeOnQuotaError:!0})]})),W(/^https:\/\/(?:api|apx-search).e-com\.plus\/(api\/)?v[1-9]+\//,new F({cacheName:"live-api",plugins:[new J({maxEntries:50,maxAgeSeconds:300})]})),W(/^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([12345]?[0-9]{2}px|normal|small)\//,new D({cacheName:"pictures",plugins:[new J({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),W(/^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([678]?[0-9]{2}px|big)\//,new D({cacheName:"pictures-big",plugins:[new J({maxEntries:10,maxAgeSeconds:172800,purgeOnQuotaError:!0})]})),W(/\/assets\//,new H({cacheName:"assets"})),W(/\/((?:img|assets).*)?logo\.(?:png|gif|jpg|jpeg|webp|svg)$/,new H({cacheName:"logo"})),W(/\/img\/uploads\/.*\.(?:png|gif|jpg|jpeg|webp|svg)$/,new H({cacheName:"media",plugins:[new J({maxEntries:20,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),W("/",new F),W(/\/((?!(?:admin|assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/,new F({cacheName:"page",plugins:[new J({maxEntries:50,purgeOnQuotaError:!0})]}))}]);
//# sourceMappingURL=sw.js.map