(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["nka"],{3641:function(e,t,c){"use strict";c("cd50")},"43c4":function(e,t,c){"use strict";c.r(t);var l=c("7a23"),n=c("01cc"),a=c("a8b0"),o=c("e8f4");const r=e=>(Object(l["pushScopeId"])("data-v-5cb1947c"),e=e(),Object(l["popScopeId"])(),e),b=r(()=>Object(l["createElementVNode"])("h3",null,"Состояние приема сигналов",-1)),O={key:0},j=r(()=>Object(l["createElementVNode"])("th",null,"НКА",-1)),u={key:1,class:"lds-ring"},d=r(()=>Object(l["createElementVNode"])("div",null,null,-1)),i=r(()=>Object(l["createElementVNode"])("div",null,null,-1)),s=r(()=>Object(l["createElementVNode"])("div",null,null,-1)),m=r(()=>Object(l["createElementVNode"])("div",null,null,-1)),p=[d,i,s,m],k={key:2};var E=Object(l["defineComponent"])({__name:"SignalReceiveStatus",setup(e){const t=Object(n["a"])({url:"/summary_signals_receive_status"});return(e,c)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],null,[b,Object(l["unref"])(t).available?(Object(l["openBlock"])(),Object(l["createElementBlock"])("table",O,[Object(l["createElementVNode"])("tr",null,[j,(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(a["e"]),e=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("th",{key:e},Object(l["toDisplayString"])(Object(l["unref"])(o["b"])[e]),1))),128))]),(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).data,(e,t)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:t},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(t),1),(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(a["e"]),t=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("td",{key:t,class:Object(l["normalizeClass"])({red:e[t]==Object(l["unref"])(a["f"]).UNAVAILABLE,green:e[t]==Object(l["unref"])(a["f"]).RECEIVE,yellow:e[t]==Object(l["unref"])(a["f"]).ERROR,white:e[t]==Object(l["unref"])(a["f"]).NOT_ON_AIR})},Object(l["toDisplayString"])(e[t]),3))),128))]))),128))])):(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",u,p)),Object(l["unref"])(t).available?(Object(l["openBlock"])(),Object(l["createElementBlock"])("p",k,"Последнее обновление "+Object(l["toDisplayString"])(Object(l["unref"])(t).lastUpdate),1)):Object(l["createCommentVNode"])("",!0)],64))}}),B=(c("4eef"),c("6b0d")),f=c.n(B);const v=f()(E,[["__scopeId","data-v-5cb1947c"]]);var N=v,V=c("f5ec");const g=e=>(Object(l["pushScopeId"])("data-v-5d5c4913"),e=e(),Object(l["popScopeId"])(),e),y=g(()=>Object(l["createElementVNode"])("h3",null,"Годность сигналов",-1)),_={key:0},h=g(()=>Object(l["createElementVNode"])("th",null,"НКА",-1)),S={key:1,class:"lds-ring"},C=g(()=>Object(l["createElementVNode"])("div",null,null,-1)),D=g(()=>Object(l["createElementVNode"])("div",null,null,-1)),I=g(()=>Object(l["createElementVNode"])("div",null,null,-1)),R=g(()=>Object(l["createElementVNode"])("div",null,null,-1)),w=[C,D,I,R],L={key:2};var F=Object(l["defineComponent"])({__name:"SignalStatus",setup(e){const t=Object(V["b"])({url:"/signal_status",updateRate:1e4});return(e,c)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],null,[y,Object(l["unref"])(t).available?(Object(l["openBlock"])(),Object(l["createElementBlock"])("table",_,[Object(l["createElementVNode"])("tr",null,[h,(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(a["e"]),e=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("th",{key:e},Object(l["toDisplayString"])(Object(l["unref"])(o["b"])[e]),1))),128))]),(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).data,(e,t)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:t},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(t),1),(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(a["e"]),t=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("td",{key:t,class:Object(l["normalizeClass"])({red:e[t]==Object(l["unref"])(a["f"]).UNAVAILABLE,green:e[t]==Object(l["unref"])(a["f"]).RECEIVE,yellow:e[t]==Object(l["unref"])(a["f"]).ERROR,white:e[t]==Object(l["unref"])(a["f"]).NOT_ON_AIR})},Object(l["toDisplayString"])(e[t]),3))),128))]))),128))])):(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",S,w)),Object(l["unref"])(t).available?(Object(l["openBlock"])(),Object(l["createElementBlock"])("p",L,"Последнее обновление "+Object(l["toDisplayString"])(Object(l["unref"])(t).lastGet),1)):Object(l["createCommentVNode"])("",!0)],64))}});c("3641");const A=f()(F,[["__scopeId","data-v-5d5c4913"]]);var x=A,U=Object(l["defineComponent"])({__name:"NkaCommon",setup(e){return(e,t)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",null,[Object(l["createVNode"])(N),Object(l["createVNode"])(x)]))}});const z=U;t["default"]=z},"480f":function(e,t,c){},"4eef":function(e,t,c){"use strict";c("480f")},"6cdd":function(e,t,c){"use strict";c.r(t);var l=c("7a23"),n=c("e8f4"),a=c("7323"),o=c("d56a");const r=Object(l["createElementVNode"])("h2",null,"График отклонения невязок от среднего",-1),b=Object(l["createElementVNode"])("label",{for:"depth-selector"},"Глубина наблюдений",-1),O={id:"depth-selector"},j=["value"];var u=Object(l["defineComponent"])({__name:"NkaResidualsCharPlot",props:{id:null},setup(e){const t=e,c=[{text:"1 мин",value:60},{text:"3 мин",value:180},{text:"5 мин",value:300},{text:"10 мин",value:600}],u=Object(l["ref"])(60);return(e,d)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],null,[r,b,Object(l["createElementVNode"])("div",O,[Object(l["withDirectives"])(Object(l["createElementVNode"])("select",{"onUpdate:modelValue":d[0]||(d[0]=e=>u.value=e)},[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(c),e=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("option",{value:e.value,key:e.value},Object(l["toDisplayString"])(e.text),9,j))),128))],512),[[l["vModelSelect"],u.value]])]),Object(l["createVNode"])(a["a"],{"group-by":"bis","naming-key":"nka",depth:u.value,"update-rate":1e3,id:t.id,colors:Object(l["unref"])(o["a"]),names:Object(l["unref"])(n["a"]),"y-values":"delta"},null,8,["depth","id","colors","names"])],64))}});const d=u;var i=d,s=c("f5ec");const m={key:0},p=Object(l["createElementVNode"])("tr",null,[Object(l["createElementVNode"])("th",null,"Станция"),Object(l["createElementVNode"])("th",null,"Угол места"),Object(l["createElementVNode"])("th",null,"Азимут")],-1),k={key:1,class:"lds-ring"},E=Object(l["createElementVNode"])("div",null,null,-1),B=Object(l["createElementVNode"])("div",null,null,-1),f=Object(l["createElementVNode"])("div",null,null,-1),v=Object(l["createElementVNode"])("div",null,null,-1),N=[E,B,f,v];var V=Object(l["defineComponent"])({__name:"NkaCurrentAnglesTable",props:{id:null},setup(e){const t=e,c=Object(s["b"])({url:"/current_angles",updateRate:1e3,startImmediately:!1});return c.getParams={nka:t.id},c.start(),Object(l["watch"])(()=>t.id,e=>{c.getParams={nka:e}}),(e,t)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",null,[Object(l["unref"])(c).available?(Object(l["openBlock"])(),Object(l["createElementBlock"])("table",m,[p,(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(c).data,(e,t)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:t},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(Object(l["unref"])(n["a"])[e.bisId]),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.elevation),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.azimuth),1)]))),128))])):(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",k,N))]))}});const g=V;var y=g,_=Object(l["defineComponent"])({__name:"Nka",props:{id:null},setup(e){const t=e;return(e,c)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",null,[Object(l["createElementVNode"])("h1",null," НКА "+Object(l["toDisplayString"])(Object(l["unref"])(n["e"])[t.id]),1),Object(l["createVNode"])(i,{id:t.id},null,8,["id"]),Object(l["createVNode"])(y,{id:t.id},null,8,["id"])]))}});const h=_;t["default"]=h},cd50:function(e,t,c){}}]);
//# sourceMappingURL=nka.c3928e8d.js.map