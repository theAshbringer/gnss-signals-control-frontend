(function(t){function e(e){for(var n,a,r=e[0],l=e[1],u=e[2],c=0,d=[];c<r.length;c++)a=r[c],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);b&&b(e);while(d.length)d.shift()();return i.push.apply(i,u||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],n=!0,a=1;a<s.length;a++){var r=s[a];0!==o[r]&&(n=!1)}n&&(i.splice(e--,1),t=l(l.s=s[0]))}return t}var n={},a={app:0},o={app:0},i=[];function r(t){return l.p+"js/"+({"bis~nka~tools":"bis~nka~tools","bis~nka":"bis~nka",bis:"bis",nka:"nka",tools:"tools",settings:"settings"}[t]||t)+"."+{"bis~nka~tools":"3287b067","bis~nka":"57ed4f7a",bis:"4ddd944f",nka:"c3928e8d",tools:"d60a51fd",settings:"a98681bd"}[t]+".js"}function l(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,l),s.l=!0,s.exports}l.e=function(t){var e=[],s={bis:1,nka:1,tools:1,settings:1};a[t]?e.push(a[t]):0!==a[t]&&s[t]&&e.push(a[t]=new Promise((function(e,s){for(var n="css/"+({"bis~nka~tools":"bis~nka~tools","bis~nka":"bis~nka",bis:"bis",nka:"nka",tools:"tools",settings:"settings"}[t]||t)+"."+{"bis~nka~tools":"31d6cfe0","bis~nka":"31d6cfe0",bis:"f5fe3585",nka:"1285ed6d",tools:"f1ff8c61",settings:"5c7a1548"}[t]+".css",o=l.p+n,i=document.getElementsByTagName("link"),r=0;r<i.length;r++){var u=i[r],c=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(c===n||c===o))return e()}var d=document.getElementsByTagName("style");for(r=0;r<d.length;r++){u=d[r],c=u.getAttribute("data-href");if(c===n||c===o)return e()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=e,b.onerror=function(e){var n=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete a[t],b.parentNode.removeChild(b),s(i)},b.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(b)})).then((function(){a[t]=0})));var n=o[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,s){n=o[t]=[e,s]}));e.push(n[2]=i);var u,c=document.createElement("script");c.charset="utf-8",c.timeout=120,l.nc&&c.setAttribute("nonce",l.nc),c.src=r(t);var d=new Error;u=function(e){c.onerror=c.onload=null,clearTimeout(b);var s=o[t];if(0!==s){if(s){var n=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,s[1](d)}o[t]=void 0}};var b=setTimeout((function(){u({type:"timeout",target:c})}),12e4);c.onerror=c.onload=u,document.head.appendChild(c)}return Promise.all(e)},l.m=t,l.c=n,l.d=function(t,e,s){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(l.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(s,n,function(e){return t[e]}.bind(null,n));return s},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var b=c;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("cd49")},"2d60":function(t,e,s){},"6b57":function(t,e,s){"use strict";s("9356")},9028:function(t,e,s){"use strict";s("2d60")},9356:function(t,e,s){},a8b0:function(t,e,s){"use strict";s.d(e,"g",(function(){return o})),s.d(e,"f",(function(){return i})),s.d(e,"d",(function(){return l})),s.d(e,"c",(function(){return n})),s.d(e,"e",(function(){return r})),s.d(e,"a",(function(){return a})),s.d(e,"b",(function(){return u}));const n=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],a=[1,17,33,49,50,51,52,53,54,65];var o,i;(function(t){t[t["GUARANTEED"]=2]="GUARANTEED",t[t["MAYBE"]=1]="MAYBE",t[t["OUT_OF_SIGHT"]=0]="OUT_OF_SIGHT"})(o||(o={})),function(t){t[t["RECEIVE"]=4]="RECEIVE",t[t["ERROR"]=3]="ERROR",t[t["UNAVAILABLE"]=2]="UNAVAILABLE",t[t["UNDEFINED"]=1]="UNDEFINED",t[t["OUT_OF_SIGHT"]=0]="OUT_OF_SIGHT",t[t["NOT_ON_AIR"]=-1]="NOT_ON_AIR"}(i||(i={}));const r=[1,33,9,41,22,86,6,70,38,102,14,78,46,110];var l,u,c;(function(t){t[t["L1OF"]=1]="L1OF",t[t["L1SF"]=33]="L1SF",t[t["L2OF"]=9]="L2OF",t[t["L2SF"]=41]="L2SF",t[t["L3OCd"]=22]="L3OCd",t[t["L3OCp"]=86]="L3OCp",t[t["L1OCd"]=6]="L1OCd",t[t["L1OCp"]=70]="L1OCp",t[t["L1SCd"]=38]="L1SCd",t[t["L1SCp"]=102]="L1SCp",t[t["L2_CSI"]=14]="L2_CSI",t[t["L2OCp"]=78]="L2OCp",t[t["L2SCd"]=46]="L2SCd",t[t["L2SCp"]=110]="L2SCp"})(l||(l={})),function(t){t[t["OK"]=0]="OK",t[t["DECODE_ERROR"]=-1]="DECODE_ERROR",t[t["DATA_FORMAT_ERROR"]=-2]="DATA_FORMAT_ERROR",t[t["EXCESSIVE_DATA"]=-3]="EXCESSIVE_DATA",t[t["BAD_DATA"]=-4]="BAD_DATA"}(u||(u={})),function(t){t[t["OK"]=2]="OK",t[t["NO_DATA"]=1]="NO_DATA",t[t["INCONSIST"]=0]="INCONSIST"}(c||(c={}))},afbc:function(t,e,s){"use strict";var n=s("6605"),a=s("7a23");const o={class:"home"};function i(t,e,s,n,i,r){const l=Object(a["resolveComponent"])("Hello");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",o,[Object(a["createVNode"])(l,{msg:"Контроль навигационного поля ГЛОНАСС"})])}const r=t=>(Object(a["pushScopeId"])("data-v-40af5d96"),t=t(),Object(a["popScopeId"])(),t),l={class:"hello"},u=r(()=>Object(a["createElementVNode"])("p",null,"WEB-интерфейс с графиками и кнопочками",-1));function c(t,e,s,n,o,i){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",l,[Object(a["createElementVNode"])("h1",null,Object(a["toDisplayString"])(t.msg),1),u])}var d=Object(a["defineComponent"])({name:"Hello",props:{msg:String}}),b=(s("9028"),s("6b0d")),p=s.n(b);const h=p()(d,[["render",c],["__scopeId","data-v-40af5d96"]]);var f=h,m=Object(a["defineComponent"])({name:"Home",components:{Hello:f}});const O=p()(m,[["render",i]]);var v=O;function g(t){return{id:Number(t.params.id)}}const L=[{path:"/",name:"Home",component:v},{path:"/bis",name:"Bis",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("bis~nka"),s.e("bis")]).then(s.bind(null,"6153"))},{path:"/bis/:id",name:"TheBis",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("bis~nka"),s.e("bis")]).then(s.bind(null,"883f")),props:g},{path:"/nka",name:"Nka",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("bis~nka"),s.e("nka")]).then(s.bind(null,"43c4"))},{path:"/nka/:id",name:"TheNka",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("bis~nka"),s.e("nka")]).then(s.bind(null,"6cdd")),props:g},{path:"/settings",name:"Settings",component:()=>s.e("settings").then(s.bind(null,"011e"))},{path:"/tools",name:"Tools",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"d5d4"))},{path:"/tools/dil1of",name:"DIL1OF",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"622d"))},{path:"/tools/tk_not_sequential",name:"NonSequentialFrames",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"28f3"))},{path:"/tools/l1of_frames_display",name:"L1OFFramesDisplay",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"0583"))},{path:"/tools/l2of_frames_display",name:"L2OFFramesDisplay",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"a322"))},{path:"/tools/l1sf_frames_display",name:"L1SFFramesDisplay",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"9d9f"))},{path:"/tools/archive_data",name:"ArchiveData",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"5c0d"))},{path:"/compare_DI-and-SI/signalType=:signalType&id=:id",name:"CompareDIandSI",component:()=>Promise.all([s.e("bis~nka~tools"),s.e("tools")]).then(s.bind(null,"7758")),props:t=>({id:Number(t.params.id),signalType:t.params.signalType})}],y=Object(n["a"])({history:Object(n["b"])("/"),routes:L});e["a"]=y},cd49:function(t,e,s){"use strict";s.r(e);var n=s("7a23"),a=s("9319"),o=s("2ab6"),i=s("e8f4"),r=s("f5ec");const l={class:"maindiv"};var u=Object(n["defineComponent"])({__name:"App",setup(t){let e=[{href:"/nka",title:"Общее"}];for(const[n,r]of Object.entries(i["e"]))e=e.concat({href:"/nka/"+n,title:r});const s=Object(n["ref"])([{href:"/bis",title:"Общее"}]),a=Object(r["b"])({url:"/bis",updateRate:1e4}),o=Object(n["ref"])([{header:"КНП"},{href:"/",title:"Дашборд"},{href:"/bis",title:"Комплект",child:s.value},{href:"/nka",title:"НКА",child:e},{href:"/settings",title:"Настройки",child:[{href:"/settings",title:"Конфигурация Комплект"}]},{href:"/tools",title:"Инструменты",child:[{href:"/tools/dil1of",title:"ЦИ L1OF"},{href:"/tools/tk_not_sequential",title:"Таблица кадров L1OF, пришедших не по порядку"},{href:"/tools/l1of_frames_display",title:"Кадры L1OF"},{href:"/tools/l2of_frames_display",title:"Кадры L2OF"},{href:"/tools/l1sf_frames_display",title:"Кадры L1SF"},{href:"/tools/archive_data",title:"Архивные данные"}]}]);return Object(n["watch"])(()=>a.loading,t=>{!t&&a.data&&(s.value=[{href:"/bis",title:"Общее"}],a.data.forEach((t,e)=>{s.value.push({href:"/bis/"+(e+1),title:`Комплект ${t.stationId}/${t.bisNumber}`})})),o.value.splice(2,1,{href:"/bis",title:"Комплект",child:s.value})}),(t,e)=>{const s=Object(n["resolveComponent"])("sidebar-menu"),a=Object(n["resolveComponent"])("router-view");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(s,{menu:o.value,hideToggle:!0,width:"200px",showOneChild:!0},null,8,["menu"]),Object(n["createElementVNode"])("div",l,[Object(n["createVNode"])(a)])],64)}}});s("6b57");const c=u;var d=c,b=s("afbc"),p=s("5502"),h=Object(p["a"])({state:{},mutations:{},actions:{},modules:{}});s("b15b");Object(n["createApp"])(d).use(h).use(b["a"]).use(o["a"]).use(a["a"],{ripple:!0}).mount("#app")},e8f4:function(t,e,s){"use strict";s.d(e,"g",(function(){return a})),s.d(e,"b",(function(){return i})),s.d(e,"e",(function(){return r})),s.d(e,"a",(function(){return l})),s.d(e,"d",(function(){return u})),s.d(e,"f",(function(){return d})),s.d(e,"c",(function(){return c}));var n=s("a8b0");const a={1:"Контроль соединения",17:"1c измерения",33:"Цифровая информация",49:"Оперативное сообщение",50:"Результаты контроля",51:"Результаты решения НЗ",52:"Значения невязок",53:"Смещение ШВ Комплект-Н",54:"Срыв слежения ПД",65:"Метеопараметры"},o={[n["g"].GUARANTEED]:"Гарантирован",[n["g"].MAYBE]:"Возможен",[n["g"].OUT_OF_SIGHT]:"Вне зоны радиовидимости"},i=(n["f"].RECEIVE,n["f"].ERROR,n["f"].OUT_OF_SIGHT,o[n["g"].OUT_OF_SIGHT],n["f"].UNAVAILABLE,n["f"].UNDEFINED,n["f"].NOT_ON_AIR,{[n["d"].L1OCd]:"L1OCd",[n["d"].L1OCp]:"L1OCp",[n["d"].L1OF]:"L1OF",[n["d"].L1SCd]:"L1SCd",[n["d"].L1SCp]:"L1SCp",[n["d"].L1SF]:"L1SF",[n["d"].L2OCp]:"L2OCp",[n["d"].L2OF]:"L2OF",[n["d"].L2SCd]:"L2SCd",[n["d"].L2SCp]:"L2SCp",[n["d"].L2SF]:"L2SF",[n["d"].L2_CSI]:"L2 КСИ",[n["d"].L3OCd]:"L3OCd",[n["d"].L3OCp]:"L3OCp"}),r={1:"1 (730)",2:"2 (747)",3:"3 (744)",4:"4 (759)",5:"5 (756)",6:"6 (733)",7:"7 (745)",8:"8 (743)",9:"9 (702)",10:"10 (723)",11:"11 (705)",12:"12 (728)",13:"13 (721)",14:"14 (752)",15:"15 (757)",16:"16 (736)",17:"17 (751)",18:"18 (754)",19:"19 (720)",20:"20 (719)",21:"21 (755)",22:"22 (735)",23:"23 (732)",24:"24 (760)"},l={1:"СФУ №1"},u={false:"По всем НКА",true:"Лучшее решение"},c={e:"E",n:"N",u:"U",dt:"dt"},d={m:"m",p1:"P1",tk:"t<sub>k</sub>",x:"x<sub>n</sub>(t<sub>b</sub>)",vx:"x<sub>n</sub>'(t<sub>b</sub>)",ax:'x<sub>n</sub>"(t<sub>b</sub>)',reserve1:"резерв 1",reserve2:"резерв 2",b:"B<sub>n</sub>",tb:"t<sub>b</sub>",y:"y<sub>n</sub>(t<sub>b</sub>)",vy:"y<sub>n</sub>'(t<sub>b</sub>)",ay:'y<sub>n</sub>"(t<sub>b</sub>)',p2:"P2",p3:"P3",gamma:"&gamma;<sub>n</sub>(t<sub>b</sub>)",p:"p",l:"l<sub>n</sub>",z:"z<sub>n</sub>(t<sub>b</sub>)",vz:"z<sub>n</sub>'(t<sub>b</sub>)",az:'z<sub>n</sub>"(t<sub>b</sub>)',tau:"&tau;<sub>n</sub>(t<sub>b</sub>)",deltaTau:"&Delta;&tau;<sub>n</sub>",e:"E<sub>n</sub>",p4:"P3",ft:"F<sub>T</sub>",nt:"N<sub>T</sub>",n:"n",nA:"n<sup>A</sup>",mCap:"M",mA:"M<sub>n</sub><sup>a</sup>",nCap:"N<sup>A</sup>",tauS:"&tau;<sub>c</sub>",n4:"N<sub>4</sub>",tauGps:"&tau;<sub>GPS</sub>",c:"C<sub>n</sub>",tauA:"&tau;<sup>A</sup><sub>n</sub>",lambda:"&lambda;<sup>A</sup><sub>n</sub>",deltaI:"&Delta;i<sup>A</sup><sub>n</sub>",epsilon:"&epsilon;<sup>A</sup><sub>n</sub>",omega:"&omega;<sup>A</sup><sub>n</sub>",tLambda:"t<sup>A</sup><sub>&lambda;<sup>n</sup></sub>",deltaT:"&Delta;T<sup>A</sup><sub>n</sub>",dDeltaT:"&Delta;T'<sup>A</sup><sub>n</sub>",h:"H<sup>A</sup><sub>n</sub>",b1:"B<sub>1</sub>",b2:"B<sub>2</sub>",kP:"KP"}},f5ec:function(t,e,s){"use strict";s.d(e,"a",(function(){return f})),s.d(e,"b",(function(){return m}));var n=s("ade3"),a=s("7a23"),o=s("bc3a"),i=s.n(o),r=s("6ca1");const l=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;function u(t){return t&&"string"===typeof t&&l.test(t)}function c(t){return null===t||void 0===t?t:Array.isArray(t)?t.map(t=>c(t)):("object"===typeof t&&Object.keys(t).forEach(e=>{const s=t[e];u(s)&&(t[e]=new Date(s)),("object"===typeof s||Array.isArray(s))&&c(s)}),t)}const d="/api/v1/",b=i.a.create({baseURL:d,headers:{"content-type":"application/json"}});b.interceptors.response.use(t=>(t.data&&"application/json"===t.headers["content-type"]&&(t.data=Object(r["camelizeKeys"])(t.data)),t=c(t),t)),b.interceptors.request.use(t=>(t.params&&(t.params=Object(r["decamelizeKeys"])(t.params)),t.data&&(t.data=Object(r["decamelizeKeys"])(t.data)),t));var p=b,h=s("a8b0");class f{constructor({url:t,updateRate:e,startImmediately:s}){Object(n["a"])(this,"data",void 0),Object(n["a"])(this,"updateRate",void 0),Object(n["a"])(this,"url",""),Object(n["a"])(this,"intervalID",void 0),Object(n["a"])(this,"available",void 0),Object(n["a"])(this,"loading",void 0),Object(n["a"])(this,"lastGet",void 0),Object(n["a"])(this,"lastGetFail",void 0),Object(n["a"])(this,"loadingFailed",void 0),Object(n["a"])(this,"posting",void 0),Object(n["a"])(this,"lastPost",void 0),Object(n["a"])(this,"lastPostFail",void 0),Object(n["a"])(this,"postingFailed",void 0),Object(n["a"])(this,"postStatus",void 0),Object(n["a"])(this,"getParams",void 0),Object(n["a"])(this,"startImmediately",void 0),Object(n["a"])(this,"_isDataNotEmpty",void 0),this.updateRate=void 0===e?0:e,this.startImmediately=void 0===s||s,this.url=t,this.data=void 0,this.available=!1,this.loading=!1,this.loadingFailed=!1,this.posting=!1,this.postingFailed=!1,this.intervalID=void 0,this.getParams={},this._isDataNotEmpty=!1}init(){this.startImmediately&&(this.get(),this.start())}start(){this.updateRate&&void 0===this.intervalID&&(this.intervalID=setInterval(()=>{this.get()},this.updateRate))}get(){if(!this.loading){this.loading=!0;const t=this.currentGetParams();p.get(this.url,{params:t}).then(t=>{this.processRecievedData(t.data),this.loading=!1,this.available=!0,this.lastGet=new Date,this.loadingFailed=!1}).catch(t=>{console.log(t),this.loading=!1,this.loadingFailed=!0,this.lastGetFail=new Date})}}post(t){this.posting||(this.posting=!0,p.post(this.url,t).then(t=>{this.posting=!1,this.postStatus=t.data.status,this.postStatus!==h["b"].OK?(this.postingFailed=!0,this.lastPostFail=new Date):(this.postingFailed=!1,this.lastPost=new Date)}).catch(t=>{console.log(t),this.posting=!1,this.postingFailed=!0,this.lastPostFail=new Date}))}stop(){this.intervalID&&(clearInterval(this.intervalID),this.intervalID=void 0)}currentGetParams(){return Object.assign(this.getParams,this.determineGetParams())}determineGetParams(){return this.getParams}processRecievedData(t){this.data=t}get isDataNotEmpty(){return!!this.available&&(!!this.data&&(Array.isArray(this.data)?this.data.length>0:"[object Object]"!==Object.prototype.toString.call(this.data)||0!==Object.keys(this.data).length))}}function m({url:t,updateRate:e,startImmediately:s}){const n=Object(a["reactive"])(new f({url:t,updateRate:e,startImmediately:s}));return n.init(),Object(a["onBeforeUnmount"])(()=>{n.stop()}),n}}});
//# sourceMappingURL=app.608a96d3.js.map