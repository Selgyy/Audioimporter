"use strict";var exports = typeof exports === "undefined" ? {} : exports;;const s=typeof cep_node !== 'undefined'?cep_node.require(cep_node.global["__dir"+"name"] + "/assets/client-b54d271c.js"):require("../assets/client-b54d271c.js");function ce(e,t,n){this.menuItemLabel=e,this.enabled=t,this.checked=n}function le(e,t,n){this.menuItemID=e,this.enabled=t,this.checked=n}function c(){}c.THEME_COLOR_CHANGED_EVENT="com.adobe.csxs.events.ThemeColorChanged";c.prototype.hostEnvironment=window.__adobe_cep__?JSON.parse(window.__adobe_cep__.getHostEnvironment()):null;c.prototype.getHostEnvironment=function(){return this.hostEnvironment=JSON.parse(window.__adobe_cep__.getHostEnvironment()),this.hostEnvironment};c.prototype.loadBinAsync=function(e,t){try{var n=new XMLHttpRequest;n.responseType="arraybuffer",n.open("GET",e,!0),n.onerror=function(){return console.log("Unable to load snapshot from given URL"),!1},n.send(),n.onload=()=>{window.__adobe_cep__.loadSnapshot(n.response),typeof t=="function"?t():typeof t<"u"&&console.log("Provided callback is not a function")}}catch(i){return console.log(i),!1}return!0};c.prototype.loadBinSync=function(e){try{var t=this.getOSInformation();if(e.startsWith("file://"))return t.indexOf("Windows")>=0?e=e.replace("file:///",""):t.indexOf("Mac")>=0&&(e=e.replace("file://","")),window.__adobe_cep__.loadSnapshot(e),!0}catch(n){return console.log(n),!1}return!1};c.prototype.closeExtension=function(){window.__adobe_cep__.closeExtension()};c.prototype.getSystemPath=function(e){var t=decodeURI(window.__adobe_cep__.getSystemPath(e)),n=this.getOSInformation();return n.indexOf("Windows")>=0?t=t.replace("file:///",""):n.indexOf("Mac")>=0&&(t=t.replace("file://","")),t};c.prototype.evalScript=function(e,t){t==null&&(t=function(n){}),window.__adobe_cep__.evalScript(e,t)};c.prototype.getApplicationID=function(){var e=this.hostEnvironment.appId;return e};c.prototype.getHostCapabilities=function(){var e=JSON.parse(window.__adobe_cep__.getHostCapabilities());return e};c.prototype.dispatchEvent=function(e){typeof e.data=="object"&&(e.data=JSON.stringify(e.data)),window.__adobe_cep__.dispatchEvent(e)};c.prototype.addEventListener=function(e,t,n){window.__adobe_cep__.addEventListener(e,t,n)};c.prototype.removeEventListener=function(e,t,n){window.__adobe_cep__.removeEventListener(e,t,n)};c.prototype.requestOpenExtension=function(e,t){window.__adobe_cep__.requestOpenExtension(e,t)};c.prototype.getExtensions=function(e){var t=JSON.stringify(e),n=window.__adobe_cep__.getExtensions(t),i=JSON.parse(n);return i};c.prototype.getNetworkPreferences=function(){var e=window.__adobe_cep__.getNetworkPreferences(),t=JSON.parse(e);return t};c.prototype.initResourceBundle=function(){for(var e=JSON.parse(window.__adobe_cep__.initResourceBundle()),t=document.querySelectorAll("[data-locale]"),n=0;n<t.length;n++){var i=t[n],f=i.getAttribute("data-locale");if(f){for(var m in e)if(m.indexOf(f)===0){var g=e[m];if(m.length==f.length)i.innerHTML=g;else if(m.charAt(f.length)=="."){var _=m.substring(f.length+1);i[_]=g}}}}return e};c.prototype.dumpInstallationInfo=function(){return window.__adobe_cep__.dumpInstallationInfo()};c.prototype.getOSInformation=function(){var e=navigator.userAgent;if(navigator.platform=="Win32"||navigator.platform=="Windows"){var t="Windows",n="";return e.indexOf("Windows")>-1&&(e.indexOf("Windows NT 5.0")>-1?t="Windows 2000":e.indexOf("Windows NT 5.1")>-1?t="Windows XP":e.indexOf("Windows NT 5.2")>-1?t="Windows Server 2003":e.indexOf("Windows NT 6.0")>-1?t="Windows Vista":e.indexOf("Windows NT 6.1")>-1?t="Windows 7":e.indexOf("Windows NT 6.2")>-1?t="Windows 8":e.indexOf("Windows NT 6.3")>-1?t="Windows 8.1":e.indexOf("Windows NT 10")>-1&&(t="Windows 10"),e.indexOf("WOW64")>-1||e.indexOf("Win64")>-1?n=" 64-bit":n=" 32-bit"),t+n}else if(navigator.platform=="MacIntel"||navigator.platform=="Macintosh"){var i="Mac OS X";return e.indexOf("Mac OS X")>-1&&(i=e.substring(e.indexOf("Mac OS X"),e.indexOf(")")),i=i.replace(/_/g,".")),i}return"Unknown Operation System"};c.prototype.openURLInDefaultBrowser=function(e){return cep.util.openURLInDefaultBrowser(e)};c.prototype.getExtensionID=function(){return window.__adobe_cep__.getExtensionId()};c.prototype.getScaleFactor=function(){return window.__adobe_cep__.getScaleFactor()};navigator.appVersion.toLowerCase().indexOf("windows")>=0&&(c.prototype.getMonitorScaleFactor=function(){return window.__adobe_cep__.getMonitorScaleFactor()});c.prototype.setScaleFactorChangedHandler=function(e){window.__adobe_cep__.setScaleFactorChangedHandler(e)};c.prototype.getCurrentApiVersion=function(){var e=JSON.parse(window.__adobe_cep__.getCurrentApiVersion());return e};c.prototype.setPanelFlyoutMenu=function(e){typeof e=="string"&&window.__adobe_cep__.invokeSync("setPanelFlyoutMenu",e)};c.prototype.updatePanelMenuItem=function(e,t,n){var i=!1;if(this.getHostCapabilities().EXTENDED_PANEL_MENU){var f=new ce(e,t,n);i=window.__adobe_cep__.invokeSync("updatePanelMenuItem",JSON.stringify(f))}return i};c.prototype.setContextMenu=function(e,t){typeof e=="string"&&window.__adobe_cep__.invokeAsync("setContextMenu",e,t)};c.prototype.setContextMenuByJSON=function(e,t){typeof e=="string"&&window.__adobe_cep__.invokeAsync("setContextMenuByJSON",e,t)};c.prototype.updateContextMenuItem=function(e,t,n){var i=new le(e,t,n);ret=window.__adobe_cep__.invokeSync("updateContextMenuItem",JSON.stringify(i))};c.prototype.isWindowVisible=function(){return window.__adobe_cep__.invokeSync("isWindowVisible","")};c.prototype.resizeContent=function(e,t){window.__adobe_cep__.resizeContent(e,t)};c.prototype.registerInvalidCertificateCallback=function(e){return window.__adobe_cep__.registerInvalidCertificateCallback(e)};c.prototype.registerKeyEventsInterest=function(e){return window.__adobe_cep__.registerKeyEventsInterest(e)};c.prototype.setWindowTitle=function(e){window.__adobe_cep__.invokeSync("setWindowTitle",e)};c.prototype.getWindowTitle=function(){return window.__adobe_cep__.invokeSync("getWindowTitle","")};String.format=function(e){if(arguments.length===0)return null;var t=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,function(n,i){return t[i]})};const pe="0.0.1",ue={version:pe,id:"com.AudioImporterV2.cep",displayName:"Audio Importer V2",symlink:"local",port:3e3,servePort:5e3,startingDebugPort:8850,extensionManifestVersion:6,requiredRuntimeVersion:9,hosts:[{name:"PPRO",version:"[0.0,99.9]"}],type:"Panel",iconDarkNormal:"./src/assets/light-icon.png",iconNormal:"./src/assets/dark-icon.png",iconDarkNormalRollOver:"./src/assets/light-icon.png",iconNormalRollOver:"./src/assets/dark-icon.png",parameters:["--v=0","--enable-nodejs","--mixed-context"],width:500,height:550,panels:[{mainPath:"./main/index.html",name:"main",panelDisplayName:"Audio Importer V2",autoVisible:!0,width:710,height:500,minWidth:710,minHeight:350,maxWidth:710,maxHeight:850,type:"ModalDialog"},{mainPath:"./settings/index.html",name:"settings",autoVisible:!1,type:"Custom",startOnEvents:["com.adobe.csxs.events.ApplicationInitialized","applicationActive"],height:1}],build:{jsxBin:"off",sourceMap:!0},zxp:{country:"US",province:"CA",org:"MyCompany",password:"mypassword",tsa:"http://timestamp.digicert.com/",sourceMap:!1,jsxBin:"off"},installModules:[],copyAssets:["./target/release/audio_importer.exe","./js","./jsx"],copyZipAssets:[]},fe=ue.id;typeof window.cep<"u"&&require("crypto");typeof window.cep<"u"&&require("assert");typeof window.cep<"u"&&require("buffer");typeof window.cep<"u"&&require("child_process");typeof window.cep<"u"&&require("cluster");typeof window.cep<"u"&&require("dgram");typeof window.cep<"u"&&require("dns");typeof window.cep<"u"&&require("domain");typeof window.cep<"u"&&require("events");const T=typeof window.cep<"u"?require("fs"):{};typeof window.cep<"u"&&require("http");typeof window.cep<"u"&&require("https");typeof window.cep<"u"&&require("net");typeof window.cep<"u"&&require("os");typeof window.cep<"u"&&require("path");typeof window.cep<"u"&&require("punycode");typeof window.cep<"u"&&require("querystring");typeof window.cep<"u"&&require("readline");typeof window.cep<"u"&&require("stream");typeof window.cep<"u"&&require("string_decoder");typeof window.cep<"u"&&require("timers");typeof window.cep<"u"&&require("tls");typeof window.cep<"u"&&require("tty");typeof window.cep<"u"&&require("url");typeof window.cep<"u"&&require("util");typeof window.cep<"u"&&require("v8");typeof window.cep<"u"&&require("vm");typeof window.cep<"u"&&require("zlib");const G=new c,ge=(e,t=!1)=>new Promise(function(n,i){const m=(t?"":`var host = typeof $ !== 'undefined' ? $ : window; host["${fe}"].`)+e;G.evalScript("try{"+m+"}catch(e){alert(e);}",g=>{n(g)})}),z=e=>ge(`typeof $ !== 'undefined' ? $.evalFile("`+e+'") : fl.runScript(FLfile.platformPathToURI("'+e+'"));',!0),ye=(e=!0)=>{if(window.cep){const t=G.getSystemPath("extension"),n=`${t}/jsx/index.js`,i=`${t}/jsx/index.jsxbin`;T.existsSync(n)?(e&&console.log(n),z(n)):T.existsSync(i)&&(e&&console.log(i),z(i))}};var X={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},K=s.React.createContext&&s.React.createContext(X),we=["attr","size","title"];function me(e,t){if(e==null)return{};var n=xe(e,t),i,f;if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(e);for(f=0;f<m.length;f++)i=m[f],!(t.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}function xe(e,t){if(e==null)return{};var n={};for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){if(t.indexOf(i)>=0)continue;n[i]=e[i]}return n}function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},j.apply(this,arguments)}function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(f){return Object.getOwnPropertyDescriptor(e,f).enumerable})),n.push.apply(n,i)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?H(Object(n),!0).forEach(function(i){be(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function be(e,t,n){return t=_e(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _e(e){var t=he(e,"string");return typeof t=="symbol"?t:t+""}function he(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Y(e){return e&&e.map((t,n)=>s.React.createElement(t.tag,I({key:n},t.attr),Y(t.child)))}function Z(e){return t=>s.React.createElement(ve,j({attr:I({},e.attr)},t),Y(e.child))}function ve(e){var t=n=>{var{attr:i,size:f,title:m}=e,g=me(e,we),_=f||n.size||"1em",y;return n.className&&(y=n.className),e.className&&(y=(y?y+" ":"")+e.className),s.React.createElement("svg",j({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,i,g,{className:y,style:I(I({color:e.color||n.color},n.style),e.style),height:_,width:_,xmlns:"http://www.w3.org/2000/svg"}),m&&s.React.createElement("title",null,m),e.children)};return K!==void 0?s.React.createElement(K.Consumer,null,n=>t(n)):t(X)}function Se(e){return Z({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"},child:[]}]})(e)}function Oe(e){return Z({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M476 480H324a36 36 0 0 1-36-36V96h-96v156a36 36 0 0 1-36 36H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h112V68a36 36 0 0 1 36-36h152a36 36 0 0 1 36 36v348h96V260a36 36 0 0 1 36-36h140a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H512v156a36 36 0 0 1-36 36z"},child:[]}]})(e)}var w=[];for(var L=0;L<256;++L)w.push((L+256).toString(16).slice(1));function Ee(e,t=0){return(w[e[t+0]]+w[e[t+1]]+w[e[t+2]]+w[e[t+3]]+"-"+w[e[t+4]]+w[e[t+5]]+"-"+w[e[t+6]]+w[e[t+7]]+"-"+w[e[t+8]]+w[e[t+9]]+"-"+w[e[t+10]]+w[e[t+11]]+w[e[t+12]]+w[e[t+13]]+w[e[t+14]]+w[e[t+15]]).toLowerCase()}var N,Ce=new Uint8Array(16);function Re(){if(!N&&(N=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!N))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return N(Ce)}var Ne=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const J={randomUUID:Ne};function V(e,t,n){if(J.randomUUID&&!t&&!e)return J.randomUUID();e=e||{};var i=e.random||(e.rng||Re)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){n=n||0;for(var f=0;f<16;++f)t[n+f]=i[f];return t}return Ee(i)}console.log("main.tsx is being executed");const je=()=>{console.log("Main component is rendering");const[e,t]=s.reactExports.useState([]),[n,i]=s.reactExports.useState([]),[f,m]=s.reactExports.useState(!1),[g,_]=s.reactExports.useState(!1),[y,k]=s.reactExports.useState(!1),[O,W]=s.reactExports.useState(null),[A,P]=s.reactExports.useState(null),E=s.reactExports.useRef(g),F=s.reactExports.useRef(y),Q=s.reactExports.useRef(O),$=s.reactExports.useRef(A),C=s.reactExports.useRef(null),x=s.reactExports.useRef(null);s.reactExports.useEffect(()=>{E.current=g},[g]),s.reactExports.useEffect(()=>{F.current=y},[y]),s.reactExports.useEffect(()=>{Q.current=O},[O]),s.reactExports.useEffect(()=>{$.current=A},[A]);const a=o=>{console.log("Debug log:",o),i(r=>[...r,o])},R=o=>{const r={LAlt:"Alt",RAlt:"Alt",LControl:"Ctrl",RControl:"Ctrl",ControlLeft:"Ctrl",ControlRight:"Ctrl",Numpad1:"1",Numpad2:"2",Numpad3:"3",Numpad4:"4",Numpad5:"5",Numpad6:"6",Numpad7:"7",Numpad8:"8",Numpad9:"9",Numpad0:"0"},d=["Ctrl","Shift","Alt"];return o.split("+").map(u=>r[u]||u).sort((u,b)=>{const M=d.indexOf(u),q=d.indexOf(b);return M===-1&&q===-1?u.localeCompare(b):M===-1?1:q===-1?-1:M-q}).join("+")},ee=()=>{var o;console.log("Loading config");try{(o=x.current)==null||o.send("LOAD_CONFIG")}catch(r){r instanceof Error?a(`Error loading config: ${r.message}`):a("Unexpected error loading config."),console.error("Error loading config:",r)}},v=o=>{var d;const r=o.reduce((l,p)=>(l[p.key]=p.binding,l),{});try{a(`Sending config to server: ${JSON.stringify(r)}`),(d=x.current)==null||d.send(`SAVE_CONFIG:${JSON.stringify(r)}`),a("Config sent successfully"),t(o)}catch(l){l instanceof Error?a(`Error saving config: ${l.message}`):a("Unexpected error saving config.")}},S=(o,r)=>{console.log("Updating binding with value:",r),t(d=>{const l=d.findIndex(u=>u.id===o);if(l===-1)return a(`Keybinding with id ${o} not found in config.`),d;const p=[...d];return p[l]={...p[l],binding:r},a(`Updating config for id: ${o} with value: ${JSON.stringify(r)}`),v(p),p})},h=()=>{a("Stopping key listener..."),_(!1),E.current=!1,a("isListeningForKey set to false"),m(!1),a("isAddingBinding set to false"),y&&(k(!1),W(null),P(null),a("Editing state reset"))},te=(o,r)=>{a(`Editing key binding with id ${o} to ${r}`);const d=R(r);t(l=>{if(l.some(b=>b.key===d))return a(`Key combination ${d} already exists in config.`),h(),l;const p=l.findIndex(b=>b.id===o);if(p===-1)return a(`Keybinding with id ${o} not found in config.`),h(),l;const u=[...l];return u[p]={...u[p],key:d},a(`Config after editing: ${JSON.stringify(u)}`),v(u),h(),k(!1),W(null),P(null),u})},ne=o=>{const r=R(o);e.some(d=>d.key===r)?a(`Processing combo: ${r}`):a(`Combo ${r} not found in config`)},oe=s.reactExports.useCallback(o=>{a(`Detected key combination: ${o}`);const r=R(o);a(`Normalized key combination: ${r}`),t(d=>{if(d.some(u=>u.key===r))return a(`Key combination ${r} already exists in config.`),h(),d;const l={id:V(),key:r,binding:{volume:0,pitch:0,track:"A1",path:""}},p=[...d,l];return a(`New config before saving: ${JSON.stringify(p)}`),v(p),a(`Key binding ${r} added to config.`),h(),p})},[a,v,h]);function D(){if(x.current&&x.current.readyState===WebSocket.OPEN){a("WebSocket already connected");return}a("Establishing WebSocket connection..."),x.current=new WebSocket("ws://localhost:7878"),x.current.onopen=()=>{a("Connected to Rust server"),ee()},x.current.onerror=o=>{a(`WebSocket Error: ${o instanceof ErrorEvent?o.message:"Unknown error"}`)},x.current.onclose=o=>{a(`Disconnected from Rust server: ${o.reason}`),setTimeout(()=>{a("Attempting to reconnect..."),D()},5e3)},x.current.onmessage=o=>{console.log("Received message from server:",o.data);const r=o.data;if(a(`Received message: ${r}`),typeof r=="string"){if(r.startsWith("CONFIG:")){const d=JSON.parse(r.replace("CONFIG:","")),l=Object.entries(d).map(([p,u])=>({id:V(),key:R(p),binding:u}));t(l),a("Config loaded and converted to array successfully")}else if(r.startsWith("COMBO:")){const d=r.replace("COMBO:","");a(`Processed combo: ${d}`),E.current?F.current&&$.current?te($.current,d):oe(d):ne(d)}}}}const B=s.reactExports.useCallback(()=>{x.current&&x.current.readyState===WebSocket.OPEN?(a("WebSocket connection is open. Starting key listener..."),_(!0),E.current=!0,a("isListeningForKey set to true")):a("WebSocket connection is not open. Cannot start key listener.")},[a]),ie=(o,r)=>{!g&&!y&&(k(!0),W(r),P(o),a(`Editing binding for key: ${r} with id: ${o}`),B())},re=()=>{!g&&!y&&(m(!0),a("Add binding clicked. isListeningForKey set to true"),B())},se=o=>{a(`Attempting to select audio file for id: ${o}`),C.current?(a("File input reference is available."),C.current.click(),C.current.onchange=r=>{var l;a("File input change event triggered.");const d=(l=r.target.files)==null?void 0:l[0];if(d){a(`File selected: ${d.name}`);const p=d.path||d.name;a(`File path resolved to: ${p}`);const u=e.find(b=>b.id===o);u&&(S(o,{...u.binding,path:p}),a(`Selected audio file for id ${o}: ${p}`))}else a("No file selected.")}):a("File input reference is not available.")},ae=o=>{t(r=>{const d=r.findIndex(p=>p.id===o);if(d===-1)return a(`Keybinding with id ${o} not found in config.`),r;const l=[...r];return l.splice(d,1),a(`Deleting binding with id: ${o}`),v(l),a(`Binding deleted for id ${o}`),l})},de=o=>{var r;return((r=o==null?void 0:o.split("\\").pop())==null?void 0:r.split("/").pop())||""},U=s.reactExports.useCallback((o,r,d)=>{if(d===""||d==="-"||d==="-."||/^-?\d*\.?\d*$/.test(d)){const p=e.find(u=>u.id===o);p&&S(o,{...p.binding,[r]:d})}const l=parseFloat(d);if(!isNaN(l)){if(r==="pitch"&&(l<-12||l>12))return;const p=e.find(u=>u.id===o);p&&S(o,{...p.binding,[r]:l})}},[e,S]);return s.reactExports.useEffect(()=>(console.log("useEffect hook is running"),D(),x.current&&console.log(`WebSocket ready state: ${x.current.readyState}`),()=>{x.current&&x.current.close()}),[]),s.jsxs("div",{style:{fontFamily:"Roboto, sans-serif",backgroundColor:"#1e2057",color:"#ffffff",padding:"10px"},children:[s.jsx("div",{style:{marginBottom:"15px",padding:"10px",backgroundColor:"#2e2f77",borderRadius:"5px"},children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("input",{type:"text",readOnly:!0,value:g?y?`Editing ${O||""}: Press new key...`:"Press a key combination...":"Click Add Binding to start",style:{width:"250px",padding:"6px",backgroundColor:"#3e41a8",color:"#ffffff",border:"none",borderRadius:"2px"}}),s.jsx("button",{onClick:re,disabled:g||y,style:{width:"150px",padding:"6px",backgroundColor:g||y?"#2e3177":"#4e52ff",color:"#ffffff",borderRadius:"2px",border:"none",cursor:g||y?"not-allowed":"pointer"},children:g?"Listening...":"Add Binding"})]})}),s.jsx("input",{type:"file",ref:C,style:{display:"none"},accept:"audio/*"}),s.jsx("div",{children:e.map(o=>s.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:"10px",backgroundColor:"#2e2f77",padding:"10px",borderRadius:"5px"},children:[s.jsx("button",{onClick:()=>ae(o.id),style:{width:"30px",height:"30px",padding:"6px",backgroundColor:"transparent",color:"#ff5b3b",borderRadius:"50%",border:"none",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"10px"},children:"✖"}),s.jsx("input",{type:"text",readOnly:!0,value:o.key,style:{width:"70px",padding:"6px",backgroundColor:"#3e41a8",color:"#ffffff",border:"none",borderRadius:"2px",marginRight:"10px",textAlign:"center"}}),s.jsx("button",{onClick:()=>ie(o.id,o.key),disabled:g||y,style:{width:"50px",padding:"6px",backgroundColor:g||y?"#2e3177":"#4e52ff",color:"#ffffff",borderRadius:"2px",border:"none",marginRight:"10px",cursor:g||y?"not-allowed":"pointer"},children:"Edit"}),s.jsx("select",{value:o.binding.track,onChange:r=>S(o.id,{...o.binding,track:r.target.value}),style:{width:"70px",padding:"6px",backgroundColor:"#3e41a8",color:"#ffffff",border:"none",borderRadius:"2px",marginRight:"10px"},children:Array.from({length:15},(r,d)=>s.jsxs("option",{value:`A${d+1}`,children:["A",d+1]},d))}),s.jsx("input",{type:"text",readOnly:!0,value:de(o.binding.path),style:{width:"120px",padding:"7px",backgroundColor:"#3e41a8",color:"#ffffff",border:"none",borderRadius:"2px",marginRight:"10px"}}),s.jsx("button",{onClick:()=>se(o.id),style:{width:"120px",padding:"6px",backgroundColor:"#4e52ff",color:"#ffffff",borderRadius:"2px",border:"none",marginRight:"10px"},children:"Audio..."}),s.jsxs("div",{style:{display:"flex",alignItems:"center",marginRight:"15px",position:"relative"},children:[s.jsx(Se,{style:{color:"#ffffff",marginRight:"10px"}}),s.jsxs("div",{style:{position:"relative"},children:[s.jsx("input",{type:"number",value:o.binding.volume,onChange:r=>U(o.id,"volume",r.target.value),style:{width:"40px",padding:"6px",backgroundColor:"#3e41a8",color:"#ffffff",border:"none",borderRadius:"2px",textAlign:"center"}}),s.jsx("span",{style:{position:"absolute",right:"6px",top:"50%",transform:"translateY(-50%)",color:"#ffffff",fontSize:"12px",pointerEvents:"none"},children:"dB"})]})]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",marginRight:"15px",position:"relative"},children:[s.jsx(Oe,{style:{marginRight:"0px",marginLeft:"-15px",width:"40px",padding:"0px"}}),s.jsxs("div",{style:{position:"relative"},children:[s.jsx("input",{type:"number",value:o.binding.pitch,onChange:r=>U(o.id,"pitch",r.target.value),min:"-12",max:"12",step:"1",style:{width:"40px",padding:"6px",backgroundColor:"#3e41a8",color:"#ffffff",border:"none",borderRadius:"2px",textAlign:"center"}}),s.jsx("span",{style:{position:"absolute",right:"6px",top:"50%",transform:"translateY(-50%)",color:"#ffffff",fontSize:"12px",pointerEvents:"none"},children:"st"})]})]})]},o.id))})]})};console.log("Exporting Main component");ye();s.client.createRoot(document.getElementById("root")).render(s.jsx(s.React.StrictMode,{children:s.jsx(je,{})}));
//# sourceMappingURL=main-d4ec5057.js.map
