parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xJOT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.app=exports.h=exports.Lazy=void 0;var e=1,n=2,r=3,t={},o=[],i=o.map,l=Array.isArray,u="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout,f=function(e){var n="";if("string"==typeof e)return e;if(l(e)&&e.length>0)for(var r,t=0;t<e.length;t++)""!==(r=f(e[t]))&&(n+=(n&&" ")+r);else for(var t in e)e[t]&&(n+=(n&&" ")+t);return n},a=function(e,n){var r={};for(var t in e)r[t]=e[t];for(var t in n)r[t]=n[t];return r},s=function(e){return e.reduce(function(e,n){return e.concat(n&&!0!==n?"function"==typeof n[0]?[n]:s(n):0)},o)},c=function(e,n){return l(e)&&l(n)&&e[0]===n[0]&&"function"==typeof e[0]},d=function(e,n){if(e!==n)for(var r in a(e,n)){if(e[r]!==n[r]&&!c(e[r],n[r]))return!0;n[r]=e[r]}},p=function(e,n,r){for(var t,o,i=0,l=[];i<e.length||i<n.length;i++)t=e[i],o=n[i],l.push(o?!t||o[0]!==t[0]||d(o[1],t[1])?[o[0],o[1],o[0](r,o[1]),t&&t[2]()]:t:t&&t[2]());return l},v=function(e,n,r,t,o,i){if("key"===n);else if("style"===n)for(var l in a(r,t))r=null==t||null==t[l]?"":t[l],"-"===l[0]?e[n].setProperty(l,r):e[n][l]=r;else"o"===n[0]&&"n"===n[1]?((e.actions||(e.actions={}))[n=n.slice(2).toLowerCase()]=t)?r||e.addEventListener(n,o):e.removeEventListener(n,o):!i&&"list"!==n&&n in e?e[n]=null==t?"":t:null==t||!1===t||"class"===n&&!(t=f(t))?e.removeAttribute(n):e.setAttribute(n,t)},y=function(e,n,t){var o=e.props,i=e.type===r?document.createTextNode(e.name):(t=t||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name,{is:o.is}):document.createElement(e.name,{is:o.is});for(var l in o)v(i,l,null,o[l],n,t);for(var u=0,f=e.children.length;u<f;u++)i.appendChild(y(e.children[u]=z(e.children[u]),n,t));return e.node=i},h=function(e){return null==e?null:e.key},m=function(n,t,o,i,l,u){if(o===i);else if(null!=o&&o.type===r&&i.type===r)o.name!==i.name&&(t.nodeValue=i.name);else if(null==o||o.name!==i.name)t=n.insertBefore(y(i=z(i),l,u),t),null!=o&&n.removeChild(o.node);else{var f,s,c,d,p=o.props,g=i.props,w=o.children,x=i.children,C=0,k=0,A=w.length-1,L=x.length-1;for(var b in u=u||"svg"===i.name,a(p,g))("value"===b||"selected"===b||"checked"===b?t[b]:p[b])!==g[b]&&v(t,b,p[b],g[b],l,u);for(;k<=L&&C<=A&&null!=(c=h(w[C]))&&c===h(x[k]);)m(t,w[C].node,w[C],x[k]=z(x[k++],w[C++]),l,u);for(;k<=L&&C<=A&&null!=(c=h(w[A]))&&c===h(x[L]);)m(t,w[A].node,w[A],x[L]=z(x[L--],w[A--]),l,u);if(C>A)for(;k<=L;)t.insertBefore(y(x[k]=z(x[k++]),l,u),(s=w[C])&&s.node);else if(k>L)for(;C<=A;)t.removeChild(w[C++].node);else{b=C;for(var N={},E={};b<=A;b++)null!=(c=w[b].key)&&(N[c]=w[b]);for(;k<=L;)c=h(s=w[C]),d=h(x[k]=z(x[k],s)),E[c]||null!=d&&d===h(w[C+1])?(null==c&&t.removeChild(s.node),C++):null==d||o.type===e?(null==c&&(m(t,s&&s.node,s,x[k],l,u),k++),C++):(c===d?(m(t,s.node,s,x[k],l,u),E[d]=!0,C++):null!=(f=N[d])?(m(t,t.insertBefore(f.node,s&&s.node),f,x[k],l,u),E[d]=!0):m(t,s&&s.node,null,x[k],l,u),k++);for(;C<=A;)null==h(s=w[C++])&&t.removeChild(s.node);for(var b in N)null==E[b]&&t.removeChild(N[b].node)}}return i.node=t},g=function(e,n){for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0},w=function(e){return"object"==typeof e?e:C(e)},z=function(e,r){return e.type===n?((!r||r.type!==n||g(r.lazy,e.lazy))&&((r=w(e.lazy.view(e.lazy))).lazy=e.lazy),r):e},x=function(e,n,r,t,o,i){return{name:e,props:n,children:r,node:t,type:i,key:o}},C=function(e,n){return x(e,t,o,n,void 0,r)},k=function(n){return n.nodeType===r?C(n.nodeValue,n):x(n.nodeName.toLowerCase(),t,i.call(n.childNodes,k),n,void 0,e)},A=function(e){return{lazy:e,type:n}};exports.Lazy=A;var L=function(e,n){for(var r,o=[],i=[],u=arguments.length;u-- >2;)o.push(arguments[u]);for(;o.length>0;)if(l(r=o.pop()))for(u=r.length;u-- >0;)o.push(r[u]);else!1===r||!0===r||null==r||i.push(w(r));return n=n||t,"function"==typeof e?e(n,i):x(e,n,i,void 0,n.key)};exports.h=L;var b=function(e){var n={},r=!1,t=e.view,o=e.node,i=o&&k(o),f=e.subscriptions,a=[],c=function(e){v(this.actions[e.type],e)},d=function(e){return n!==e&&(n=e,f&&(a=p(a,s([f(n)]),v)),t&&!r&&u(y,r=!0)),n},v=(e.middleware||function(e){return e})(function(e,r){return"function"==typeof e?v(e(n,r)):l(e)?"function"==typeof e[0]||l(e[0])?v(e[0],"function"==typeof e[1]?e[1](r):e[1]):(s(e.slice(1)).map(function(e){e&&e[0](v,e[1])},d(e[0])),n):d(e)}),y=function(){r=!1,o=m(o.parentNode,o,i,i=w(t(n)),c)};v(e.init)};exports.app=b;
},{}],"vwqs":[function(require,module,exports) {
module.exports={1:{question:"The goliath birdeater spider is native to ... ",options:["Australia","Indonesia","South America","North Africa"],correct:2},2:{question:'Who said: "Whoever has will be given more. But whoever does not have, even what he has will be taken away from him"?',options:["Karl Marx","Jesus","Napoleon","Buddha"],correct:1},3:{question:"Persephone was the greek godess of ...",options:["Vegetation","Commerce","Cattle","Music"],correct:0},4:{question:"Quetzalcoatl was the god of wind, air and learning to the ...",options:["Mayans","Incas","Toltecs","Aztecs"],correct:3},5:{question:'Complete this quote by Benjamin Franklin: "An investment in ... always pays the best interest."',options:["Bonds","Love","Knowledge","Land"],correct:2},6:{question:"Who was the first man to reach the South Pole?",options:["Marco Polo","Jacque Cousteau","Roald Amundsen","Ernest Shackleton"],correct:2},7:{question:'A "flying buttress" is ... ',options:["An architectural element","A type of ladies' gown","A pastry","A flower"],correct:0},8:{question:'Complete this quote by Socrates: "... is not worth living."',options:["An ignorant life","An unexamined life","A decadent life","An impious life"],correct:1},9:{question:"Which of these men was not present at the Yalta conference of 1945?",options:["Franklin D Roosevelt","Charles De Gaulle","Joseph Stalin","Winston Churchill"],correct:1},10:{question:"Who you gonna call?",options:["My friends!","Yo momma!","The Cops!","Ghost Busters!"],correct:3},11:{question:'A "bowline" is ...',options:["a cut of beef","a method of navigation","a type of knot","a dance move"],correct:2},12:{question:"Which of these events is NOT part of a decathlon?",options:["Shot put","Javelin throw","1500 meters","Hammer throw"],correct:3},13:{question:"Which is the hottest planet in the solar system?",options:["Mercury","Venus","Jupiter","Saturn"],correct:1},14:{question:"What is the chemical symbol for potassium?",options:["P","F","K","T"],correct:2},15:{question:"What is the capital of New Zeeland?",options:["Wellington","Auckland","Christchurch","Hamilton"],correct:0},16:{question:"Which is the oldest, continously inhabited city in the world?",options:["Istanbul","Athens","Jerusalem","Damascus"],correct:3},17:{question:"Pope Gregory IX ordered the extermination of all ... across Europe.",options:["Witches","Prostitues","Templars","Cats"],correct:3},18:{question:"How old is Stonehenge (as far as we know today)?",options:["3000 years","5000 years","10,000 years","15,000 years"],correct:1},19:{question:"Neil Patrick Harris is an actor in the cast of the TV sitcom ...",options:["Friends","Parks & Recreation","How I met your mother","Community"],correct:2},20:{question:"This animal was sacred to the cult of Mithras",options:["Bull","Ram","Lion","Serpent"],correct:0}};
},{}],"f08c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"QUESTIONS",{enumerable:!0,get:function(){return e.default}}),exports.TIMER_EXTENSION=exports.TIMER_DURATION=exports.SERIES_LENGTH=exports.POOL_SIZE=void 0;var e=r(require("../questions.json"));function r(e){return e&&e.__esModule?e:{default:e}}var t=Object.keys(e.default).length;exports.POOL_SIZE=t;var o=10;exports.SERIES_LENGTH=o;var s=15e3;exports.TIMER_DURATION=s;var E=1e4;exports.TIMER_EXTENSION=E;
},{"../questions.json":"vwqs"}],"Sg98":[function(require,module,exports) {
"use strict";function r(r){return e(r)||n(r)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}function e(r){if(Array.isArray(r)){for(var t=0,n=new Array(r.length);t<r.length;t++)n[t]=r[t];return n}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=function(t,n){for(var e=r(Array(t).keys()).map(function(r){return""+(r+1)}),o=t-1;o>=0;o--){var a=Math.round(Math.random()*o),i=e[a];e[a]=e[o],e[o]=i}return e.slice(0,n)},a=function(r,t){var n=t.action,e=t.max,a=t.length;return r(n,o(e,a))},i=function(r,t,n){return[a,{max:r,length:t,action:n}]};exports.default=i;
},{}],"Rpos":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../const");function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function r(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach(function(t){n(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=function(t,n){var o=n.action,c=n.id;return setTimeout(function(n){t(o,r({id:c},e.QUESTIONS[c]))},400)},c=function(e,t){return[o,{action:t,id:e}]};exports.default=c;
},{"../const":"f08c"}],"Pokh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=function(e,t){var n=t.action,r=requestAnimationFrame(function t(i){r=requestAnimationFrame(t),e(n,i)});return function(){return cancelAnimationFrame(r)}},t=function(t){return[e,{action:t}]};exports.default=t;
},{}],"Pm9D":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isUsed=exports.isOn=exports.off=exports.on=exports.init=void 0;var e={on:!1,used:!1};exports.init=e;var r=function(e){return e.used?e:{on:!0,used:!0}};exports.on=r;var o=function(e){return{on:!1,used:e.used}};exports.off=o;var s=function(e){return e.on};exports.isOn=s;var t=function(e){return e.used};exports.isUsed=t;
},{}],"t1lk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.remaining=exports.isRunning=exports.extend=exports.update=exports.stop=exports.start=exports.init=void 0;var n=require("../const");function t(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})),r.push.apply(r,e)}return r}function r(n){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?t(Object(i),!0).forEach(function(t){e(n,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(i,t))})}return n}function e(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}var i={running:!1,now:null,until:null};exports.init=i;var o=function(n){return r({},i,{running:!0})};exports.start=o;var u=function(n){return r({},i)};exports.stop=u;var p=function(t,e){return t.until&&e>t.until?r({},i):r({},t,{until:!t.running||t.until?t.until:n.TIMER_DURATION+e,now:t.running?e:null})};exports.update=p;var s=function(t){return t.now<t.until?r({},t,{until:t.until+n.TIMER_EXTENSION}):t};exports.extend=s;var c=function(n){return n.running};exports.isRunning=c;var l=function(t){return c(t)?t.until?t.until-t.now:n.TIMER_DURATION:null};exports.remaining=l;
},{"../const":"f08c"}],"nEKu":[function(require,module,exports) {
"use strict";function r(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),t.push.apply(t,n)}return t}function e(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?r(Object(o),!0).forEach(function(r){t(e,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))})}return e}function t(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isUnanswered=exports.isIncorrect=exports.isCorrect=exports.options=exports.getAnswer=exports.unanswer=exports.answer=exports.question=void 0;var n=function(r){return r.question};exports.question=n;var o=function(r,t){var n=r.options.indexOf(t);return e({},r,{answer:n<0?null:n})};exports.answer=o;var s=function(r){return e({},r,{answer:null})};exports.unanswer=s;var c=function(r){return null==r.answer?null:r.options[r.answer]||null};exports.getAnswer=c;var i=function(r,e){return e?r.correct<2?r.options.slice(0,2):r.options.slice(2):r.options};exports.options=i;var u=function(r){return null!=r.answer&&r.correct===r.answer};exports.isCorrect=u;var p=function(r){return null!=r.answer&&r.correct!==r.answer};exports.isIncorrect=p;var a=function(r){return null==r.answer};exports.isUnanswered=a;
},{}],"yxkY":[function(require,module,exports) {
"use strict";function t(t,o){return n(t)||r(t,o)||e()}function e(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function r(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var s,u=t[Symbol.iterator]();!(n=(s=u.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(c){o=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}}function n(t){if(Array.isArray(t))return t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach(function(e){s(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function s(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.items=exports.isDone=exports.update=exports.set=exports.id=exports.item=exports.next=exports.init=void 0;var u=function(t){return{list:t,step:0,items:t.reduce(function(t,e){return t[e]=null,t},{})}};exports.init=u;var c=function(t){return i({},t,{step:t.step===t.length?t.step:t.step+1})};exports.next=c;var p=function(t){return b(t)?null:t.items[t.list[t.step]]};exports.item=p;var l=function(t){return b(t)?null:t.list[t.step]};exports.id=l;var a=function(t,e,r){return i({},t,{items:i({},t.items,s({},e,r))})};exports.set=a;var f=function(t,e){return b(t)?t:i({},t,{items:i({},t.items,s({},t.list[t.step],e))})};exports.update=f;var b=function(t){return t.step>=t.list.length};exports.isDone=b;var y=function(e){return Object.entries(e.items).map(function(e){var r=t(e,2);r[0];return r[1]})};exports.items=y;
},{}],"QSAe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.totalTimeTaken=exports.timeDuration=exports.isExtendUsed=exports.timeRemaining=exports.isBisectActive=exports.isBisectUsed=exports.getOptions=exports.countUnanswered=exports.countIncorrect=exports.countCorrect=exports.isEnded=exports.getAnswer=exports.getQuestion=exports.isStarted=exports.Extend=exports.Bisect=exports.Next=exports.Answer=exports.SetTime=exports.SetQuestion=exports.SetList=exports.Start=exports.Reset=exports.subscriptions=exports.init=void 0;var e=require("../const"),t=p(require("../fx/fetch-random-int-list")),r=p(require("../fx/fetch-question")),n=p(require("../fx/time")),i=a(require("./lifeline")),o=a(require("./timer")),s=a(require("./question")),u=a(require("./sequence"));function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var o=n?Object.getOwnPropertyDescriptor(e,i):null;o&&(o.get||o.set)?Object.defineProperty(r,i,o):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}function p(e){return e&&e.__esModule?e:{default:e}}function f(e){return m(e)||l(e)||x()}function x(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function m(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach(function(t){b(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var O={bisection:i.init,extension:i.init,timer:o.init,questions:null};exports.init=O;var q=function(e){return[o.isRunning(e.timer)&&(0,n.default)(S)]};exports.subscriptions=q;var g=function(e){return O};exports.Reset=g;var y=function(r){return[d({},r,{totalTime:0}),(0,t.default)(e.POOL_SIZE,e.SERIES_LENGTH,w)]};exports.Start=y;var w=function(e,t){return[d({},e,{questions:u.init(t)})].concat(f(t.map(function(e){return(0,r.default)(e,j)})))};exports.SetList=w;var j=function(e,t){return d({},e,{questions:u.set(e.questions,t.id,t),timer:t.id===u.id(e.questions)?o.start(e.timer):e.timer})};exports.SetQuestion=j;var S=function(e,t){var r=d({},e,{timer:o.update(e.timer,t)});return o.isRunning(r.timer)?r:P(r)};exports.SetTime=S;var E=function(e,t){return d({},e,{questions:u.update(e.questions,s.answer(u.item(e.questions),t))})};exports.Answer=E;var P=function(e){var t=u.next(e.questions);return d({},e,{questions:t,bisection:i.off(e.bisection),extension:i.off(e.extension),timer:u.item(t)?o.start(e.timer):o.stop(e.timer),totalTime:e.totalTime+(W(e)-Q(e))})};exports.Next=P;var T=function(e){return i.isUsed(e.bisection)?e:d({},e,{bisection:i.on(e.bisection),questions:u.update(e.questions,s.unanswer(u.item(e.questions)))})};exports.Bisect=T;var A=function(e){return i.isUsed(e.extension)?e:d({},e,{extension:i.on(e.extension),timer:o.extend(e.timer)})};exports.Extend=A;var h=function(e){return!!e.questions};exports.isStarted=h;var U=function(e){if(!e.questions)return null;var t=u.item(e.questions);return t?s.question(t):null};exports.getQuestion=U;var D=function(e){if(!e.questions)return null;var t=u.item(e.questions);return t?s.getAnswer(t):null};exports.getAnswer=D;var I=function(e){return e.questions&&u.isDone(e.questions)};exports.isEnded=I;var R=function(e,t){var r=e.questions;return r?u.items(r).filter(t).length:null},_=function(e){return R(e,s.isCorrect)};exports.countCorrect=_;var M=function(e){return R(e,s.isIncorrect)};exports.countIncorrect=M;var B=function(e){return R(e,s.isUnanswered)};exports.countUnanswered=B;var N=function(e){if(!e.questions)return null;var t=u.item(e.questions);return t?s.options(t,i.isOn(e.bisection)):null};exports.getOptions=N;var k=function(e){return h(e)&&i.isUsed(e.bisection)};exports.isBisectUsed=k;var L=function(e){return h(e)&&i.isOn(e.bisection)};exports.isBisectActive=L;var Q=function(e){return o.remaining(e.timer)};exports.timeRemaining=Q;var C=function(e){return i.isUsed(e.extension)};exports.isExtendUsed=C;var W=function(t){return e.TIMER_DURATION+(i.isOn(t.extension)?e.TIMER_EXTENSION:0)};exports.timeDuration=W;var G=function(e){return I(e)?e.totalTime:null};exports.totalTimeTaken=G;
},{"../const":"f08c","../fx/fetch-random-int-list":"Sg98","../fx/fetch-question":"Rpos","../fx/time":"Pokh","./lifeline":"Pm9D","./timer":"t1lk","./question":"nEKu","./sequence":"yxkY"}],"GGwz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),s=require("../model"),t=function(t){var o=t.options,r=t.answer;return(0,e.h)("ul",{class:"options"},o.map(function(t){return(0,e.h)("li",{onmousedown:[s.Answer,t],class:{option:!0,selected:r&&t===r,notselected:r&&t!==r,noanswer:!r}},(0,e.h)("div",{class:"bullet"}),(0,e.h)("span",{class:"text"},t))}))};exports.default=t;
},{"hyperapp":"xJOT","../model":"QSAe"}],"UJj5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),r=function(r,t){return(0,e.h)("p",{class:"question"},t)};exports.default=r;
},{"hyperapp":"xJOT"}],"kH12":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../model"),r=function(t,r){var a=t.percent;return(0,e.h)("div",{class:"gauge-container"},(0,e.h)("div",{class:"gauge-bar",style:{width:a+"%"}}),(0,e.h)("p",{class:"gauge-content"},r))},a=function(a){var n=a.remaining,s=a.duration,u=a.haveAnswer;return(0,e.h)("div",{class:"next"},(0,e.h)("div",{class:{nextbutton:!0,haveAnswer:u},onclick:t.Next},(0,e.h)("p",{class:"label"},"Next ","›"),(0,e.h)(r,{percent:Math.round(100*n/s)},Math.round(n/1e3),"s")))};exports.default=a;
},{"hyperapp":"xJOT","../model":"QSAe"}],"yPzz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),s=require("../model"),u=function(s,u){var t=s.used,r=s.onuse;return(0,e.h)("button",{disabled:t,class:{used:t},onclick:r},u)},t=function(t){var r=t.usedBisect,d=t.usedExtend;return(0,e.h)("div",{class:"lifelines"},(0,e.h)(u,{used:r,onuse:s.Bisect},"◑"),(0,e.h)(u,{used:d,onuse:s.Extend},"⌛"))};exports.default=t;
},{"hyperapp":"xJOT","../model":"QSAe"}],"XmTh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),r=require("../model"),t=function(t){var u=t.running;return(0,e.h)("header",null,"Quiz Time!",u&&(0,e.h)("button",{onclick:r.Reset},"Quit"))};exports.default=t;
},{"hyperapp":"xJOT","../model":"QSAe"}],"mCBm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=require("../model"),r=function(){return(0,e.h)("button",{onclick:t.Start},"Start!")};exports.default=r;
},{"hyperapp":"xJOT","../model":"QSAe"}],"hy45":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=require("hyperapp"),e=function(e){var t=e.correct,l=e.incorrect,s=e.unanswered;return(0,r.h)("table",{class:"results"},(0,r.h)("tr",{class:"correct"},(0,r.h)("th",null,"Correct: ",t),(0,r.h)("td",null,(0,r.h)("div",{class:"bar",style:{width:10*t+"%"}}))),(0,r.h)("tr",{class:"incorrect"},(0,r.h)("th",null,"Incorrect: ",l),(0,r.h)("td",null,(0,r.h)("div",{class:"bar",style:{width:10*l+"%"}}))),(0,r.h)("tr",{class:"unanswered"},(0,r.h)("th",null,"Unanswered: ",s),(0,r.h)("td",null,(0,r.h)("div",{class:"bar",style:{width:10*s+"%"}}))))};exports.default=e;
},{"hyperapp":"xJOT"}],"wxwQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("hyperapp"),t=d(require("../model/index")),r=l(require("./options")),n=l(require("./question")),i=l(require("./next")),u=l(require("./lifelines")),a=l(require("./header")),o=l(require("./start-button")),s=l(require("./results"));function l(e){return e&&e.__esModule?e:{default:e}}function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function d(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var u=n?Object.getOwnPropertyDescriptor(e,i):null;u&&(u.get||u.set)?Object.defineProperty(r,i,u):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}var f=function(l){return(0,e.h)("section",null,(0,e.h)(a.default,{running:t.isStarted(l)}),t.isStarted(l)?t.isEnded(l)?(0,e.h)("main",{class:"result-container"},(0,e.h)("p",null,"All Done! Here are your results:"),(0,e.h)(s.default,{correct:t.countCorrect(l),incorrect:t.countIncorrect(l),unanswered:t.countUnanswered(l)}),(0,e.h)("p",null,"Total time used:"," ",Math.round(t.totalTimeTaken(l)/1e3),"s")):t.getQuestion(l)?(0,e.h)("main",{class:"game-container"},(0,e.h)(n.default,null,t.getQuestion(l)),(0,e.h)(r.default,{options:t.getOptions(l),answer:t.getAnswer(l)}),(0,e.h)(i.default,{remaining:t.timeRemaining(l),duration:t.timeDuration(l),haveAnswer:!!t.getAnswer(l)}),(0,e.h)(u.default,{usedBisect:t.isBisectUsed(l),usedExtend:t.isExtendUsed(l)})):(0,e.h)("main",{class:"loading-container"},(0,e.h)("div",{class:"spinner"})):(0,e.h)("main",{class:"start-container"},(0,e.h)(o.default,null)))};exports.default=f;
},{"hyperapp":"xJOT","../model/index":"QSAe","./options":"GGwz","./question":"UJj5","./next":"kH12","./lifelines":"yPzz","./header":"XmTh","./start-button":"mCBm","./results":"hy45"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),i=require("./model"),r=t(require("./view"));function t(e){return e&&e.__esModule?e:{default:e}}(0,e.app)({node:document.getElementById("app"),init:i.init,view:r.default,subscriptions:i.subscriptions});
},{"hyperapp":"xJOT","./model":"QSAe","./view":"wxwQ"}]},{},["Focm"], null)
//# sourceMappingURL=/quiz/src.d87be2a1.js.map