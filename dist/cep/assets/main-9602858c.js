"use strict";var exports = typeof exports === "undefined" ? {} : exports;;const n=typeof cep_node !== 'undefined'?cep_node.require(cep_node.global["__dir"+"name"] + "/assets/client-97072a1f.js"):require("../assets/client-97072a1f.js");function Le(e,t,o){this.menuItemLabel=e,this.enabled=t,this.checked=o}function Te(e,t,o){this.menuItemID=e,this.enabled=t,this.checked=o}function p(){}p.THEME_COLOR_CHANGED_EVENT="com.adobe.csxs.events.ThemeColorChanged";p.prototype.hostEnvironment=window.__adobe_cep__?JSON.parse(window.__adobe_cep__.getHostEnvironment()):null;p.prototype.getHostEnvironment=function(){return this.hostEnvironment=JSON.parse(window.__adobe_cep__.getHostEnvironment()),this.hostEnvironment};p.prototype.loadBinAsync=function(e,t){try{var o=new XMLHttpRequest;o.responseType="arraybuffer",o.open("GET",e,!0),o.onerror=function(){return console.log("Unable to load snapshot from given URL"),!1},o.send(),o.onload=()=>{window.__adobe_cep__.loadSnapshot(o.response),typeof t=="function"?t():typeof t<"u"&&console.log("Provided callback is not a function")}}catch(c){return console.log(c),!1}return!0};p.prototype.loadBinSync=function(e){try{var t=this.getOSInformation();if(e.startsWith("file://"))return t.indexOf("Windows")>=0?e=e.replace("file:///",""):t.indexOf("Mac")>=0&&(e=e.replace("file://","")),window.__adobe_cep__.loadSnapshot(e),!0}catch(o){return console.log(o),!1}return!1};p.prototype.closeExtension=function(){window.__adobe_cep__.closeExtension()};p.prototype.getSystemPath=function(e){var t=decodeURI(window.__adobe_cep__.getSystemPath(e)),o=this.getOSInformation();return o.indexOf("Windows")>=0?t=t.replace("file:///",""):o.indexOf("Mac")>=0&&(t=t.replace("file://","")),t};p.prototype.evalScript=function(e,t){t==null&&(t=function(o){}),window.__adobe_cep__.evalScript(e,t)};p.prototype.getApplicationID=function(){var e=this.hostEnvironment.appId;return e};p.prototype.getHostCapabilities=function(){var e=JSON.parse(window.__adobe_cep__.getHostCapabilities());return e};p.prototype.dispatchEvent=function(e){typeof e.data=="object"&&(e.data=JSON.stringify(e.data)),window.__adobe_cep__.dispatchEvent(e)};p.prototype.addEventListener=function(e,t,o){window.__adobe_cep__.addEventListener(e,t,o)};p.prototype.removeEventListener=function(e,t,o){window.__adobe_cep__.removeEventListener(e,t,o)};p.prototype.requestOpenExtension=function(e,t){window.__adobe_cep__.requestOpenExtension(e,t)};p.prototype.getExtensions=function(e){var t=JSON.stringify(e),o=window.__adobe_cep__.getExtensions(t),c=JSON.parse(o);return c};p.prototype.getNetworkPreferences=function(){var e=window.__adobe_cep__.getNetworkPreferences(),t=JSON.parse(e);return t};p.prototype.initResourceBundle=function(){for(var e=JSON.parse(window.__adobe_cep__.initResourceBundle()),t=document.querySelectorAll("[data-locale]"),o=0;o<t.length;o++){var c=t[o],w=c.getAttribute("data-locale");if(w){for(var h in e)if(h.indexOf(w)===0){var _=e[h];if(h.length==w.length)c.innerHTML=_;else if(h.charAt(w.length)=="."){var O=h.substring(w.length+1);c[O]=_}}}}return e};p.prototype.dumpInstallationInfo=function(){return window.__adobe_cep__.dumpInstallationInfo()};p.prototype.getOSInformation=function(){var e=navigator.userAgent;if(navigator.platform=="Win32"||navigator.platform=="Windows"){var t="Windows",o="";return e.indexOf("Windows")>-1&&(e.indexOf("Windows NT 5.0")>-1?t="Windows 2000":e.indexOf("Windows NT 5.1")>-1?t="Windows XP":e.indexOf("Windows NT 5.2")>-1?t="Windows Server 2003":e.indexOf("Windows NT 6.0")>-1?t="Windows Vista":e.indexOf("Windows NT 6.1")>-1?t="Windows 7":e.indexOf("Windows NT 6.2")>-1?t="Windows 8":e.indexOf("Windows NT 6.3")>-1?t="Windows 8.1":e.indexOf("Windows NT 10")>-1&&(t="Windows 10"),e.indexOf("WOW64")>-1||e.indexOf("Win64")>-1?o=" 64-bit":o=" 32-bit"),t+o}else if(navigator.platform=="MacIntel"||navigator.platform=="Macintosh"){var c="Mac OS X";return e.indexOf("Mac OS X")>-1&&(c=e.substring(e.indexOf("Mac OS X"),e.indexOf(")")),c=c.replace(/_/g,".")),c}return"Unknown Operation System"};p.prototype.openURLInDefaultBrowser=function(e){return cep.util.openURLInDefaultBrowser(e)};p.prototype.getExtensionID=function(){return window.__adobe_cep__.getExtensionId()};p.prototype.getScaleFactor=function(){return window.__adobe_cep__.getScaleFactor()};navigator.appVersion.toLowerCase().indexOf("windows")>=0&&(p.prototype.getMonitorScaleFactor=function(){return window.__adobe_cep__.getMonitorScaleFactor()});p.prototype.setScaleFactorChangedHandler=function(e){window.__adobe_cep__.setScaleFactorChangedHandler(e)};p.prototype.getCurrentApiVersion=function(){var e=JSON.parse(window.__adobe_cep__.getCurrentApiVersion());return e};p.prototype.setPanelFlyoutMenu=function(e){typeof e=="string"&&window.__adobe_cep__.invokeSync("setPanelFlyoutMenu",e)};p.prototype.updatePanelMenuItem=function(e,t,o){var c=!1;if(this.getHostCapabilities().EXTENDED_PANEL_MENU){var w=new Le(e,t,o);c=window.__adobe_cep__.invokeSync("updatePanelMenuItem",JSON.stringify(w))}return c};p.prototype.setContextMenu=function(e,t){typeof e=="string"&&window.__adobe_cep__.invokeAsync("setContextMenu",e,t)};p.prototype.setContextMenuByJSON=function(e,t){typeof e=="string"&&window.__adobe_cep__.invokeAsync("setContextMenuByJSON",e,t)};p.prototype.updateContextMenuItem=function(e,t,o){var c=new Te(e,t,o);ret=window.__adobe_cep__.invokeSync("updateContextMenuItem",JSON.stringify(c))};p.prototype.isWindowVisible=function(){return window.__adobe_cep__.invokeSync("isWindowVisible","")};p.prototype.resizeContent=function(e,t){window.__adobe_cep__.resizeContent(e,t)};p.prototype.registerInvalidCertificateCallback=function(e){return window.__adobe_cep__.registerInvalidCertificateCallback(e)};p.prototype.registerKeyEventsInterest=function(e){return window.__adobe_cep__.registerKeyEventsInterest(e)};p.prototype.setWindowTitle=function(e){window.__adobe_cep__.invokeSync("setWindowTitle",e)};p.prototype.getWindowTitle=function(){return window.__adobe_cep__.invokeSync("getWindowTitle","")};String.format=function(e){if(arguments.length===0)return null;var t=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,function(o,c){return t[c]})};const Ae="0.0.1",Fe={version:Ae,id:"com.AudioImporterV2.cep",displayName:"Audio Importer V2",symlink:"local",port:3e3,servePort:5e3,startingDebugPort:8850,extensionManifestVersion:6,requiredRuntimeVersion:9,hosts:[{name:"PPRO",version:"[0.0,99.9]"}],type:"Panel",iconDarkNormal:"./src/assets/light-icon.png",iconNormal:"./src/assets/dark-icon.png",iconDarkNormalRollOver:"./src/assets/light-icon.png",iconNormalRollOver:"./src/assets/dark-icon.png",parameters:["--v=0","--enable-nodejs","--mixed-context"],width:500,height:550,panels:[{mainPath:"./main/index.html",name:"main",panelDisplayName:"Audio Importer V2",autoVisible:!0,width:710,height:500,minWidth:710,minHeight:350,maxWidth:710,maxHeight:850,type:"Modeless"},{mainPath:"./settings/index.html",name:"settings",autoVisible:!1,type:"Custom",startOnEvents:["com.adobe.csxs.events.ApplicationInitialized","applicationActive"],height:1}],build:{jsxBin:"off",sourceMap:!0},zxp:{country:"FR",province:"CA",org:"MyCompany",password:"test",tsa:"http://timestamp.digicert.com/",sourceMap:!1,jsxBin:"off"},installModules:[],copyAssets:["./target/release/audio_importer.exe","./target/release/audio_importer","./js","./jsx"],copyZipAssets:[]},ke=Fe.id;typeof window.cep<"u"&&require("crypto");typeof window.cep<"u"&&require("assert");typeof window.cep<"u"&&require("buffer");typeof window.cep<"u"&&require("child_process");typeof window.cep<"u"&&require("cluster");typeof window.cep<"u"&&require("dgram");typeof window.cep<"u"&&require("dns");typeof window.cep<"u"&&require("domain");typeof window.cep<"u"&&require("events");const ae=typeof window.cep<"u"?require("fs"):{};typeof window.cep<"u"&&require("http");typeof window.cep<"u"&&require("https");typeof window.cep<"u"&&require("net");typeof window.cep<"u"&&require("os");typeof window.cep<"u"&&require("path");typeof window.cep<"u"&&require("punycode");typeof window.cep<"u"&&require("querystring");typeof window.cep<"u"&&require("readline");typeof window.cep<"u"&&require("stream");typeof window.cep<"u"&&require("string_decoder");typeof window.cep<"u"&&require("timers");typeof window.cep<"u"&&require("tls");typeof window.cep<"u"&&require("tty");typeof window.cep<"u"&&require("url");typeof window.cep<"u"&&require("util");typeof window.cep<"u"&&require("v8");typeof window.cep<"u"&&require("vm");typeof window.cep<"u"&&require("zlib");const pe=new p,Me=(e,t=!1)=>new Promise(function(o,c){const h=(t?"":`var host = typeof $ !== 'undefined' ? $ : window; host["${ke}"].`)+e;pe.evalScript("try{"+h+"}catch(e){alert(e);}",_=>{o(_)})}),ce=e=>Me(`typeof $ !== 'undefined' ? $.evalFile("`+e+'") : fl.runScript(FLfile.platformPathToURI("'+e+'"));',!0),De=(e=!0)=>{if(window.cep){const t=pe.getSystemPath("extension"),o=`${t}/jsx/index.js`,c=`${t}/jsx/index.jsxbin`;ae.existsSync(o)?(e&&console.log(o),ce(o)):ae.existsSync(c)&&(e&&console.log(c),ce(c))}};var ge={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},le=n.React.createContext&&n.React.createContext(ge),qe=["attr","size","title"];function Ue(e,t){if(e==null)return{};var o=He(e,t),c,w;if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(e);for(w=0;w<h.length;w++)c=h[w],!(t.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(e,c)&&(o[c]=e[c])}return o}function He(e,t){if(e==null)return{};var o={};for(var c in e)if(Object.prototype.hasOwnProperty.call(e,c)){if(t.indexOf(c)>=0)continue;o[c]=e[c]}return o}function U(){return U=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&(e[c]=o[c])}return e},U.apply(this,arguments)}function de(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter(function(w){return Object.getOwnPropertyDescriptor(e,w).enumerable})),o.push.apply(o,c)}return o}function H(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?de(Object(o),!0).forEach(function(c){Be(e,c,o[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):de(Object(o)).forEach(function(c){Object.defineProperty(e,c,Object.getOwnPropertyDescriptor(o,c))})}return e}function Be(e,t,o){return t=Je(t),t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Je(e){var t=ze(e,"string");return typeof t=="symbol"?t:t+""}function ze(e,t){if(typeof e!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var c=o.call(e,t||"default");if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function me(e){return e&&e.map((t,o)=>n.React.createElement(t.tag,H({key:o},t.attr),me(t.child)))}function we(e){return t=>n.React.createElement(Ke,U({attr:H({},e.attr)},t),me(e.child))}function Ke(e){var t=o=>{var{attr:c,size:w,title:h}=e,_=Ue(e,qe),O=w||o.size||"1em",y;return o.className&&(y=o.className),e.className&&(y=(y?y+" ":"")+e.className),n.React.createElement("svg",U({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},o.attr,c,_,{className:y,style:H(H({color:e.color||o.color},o.style),e.style),height:O,width:O,xmlns:"http://www.w3.org/2000/svg"}),h&&n.React.createElement("title",null,h),e.children)};return le!==void 0?n.React.createElement(le.Consumer,null,o=>t(o)):t(ge)}function Ve(e){return we({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"},child:[]}]})(e)}function Ge(e){return we({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M476 480H324a36 36 0 0 1-36-36V96h-96v156a36 36 0 0 1-36 36H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h112V68a36 36 0 0 1 36-36h152a36 36 0 0 1 36 36v348h96V260a36 36 0 0 1 36-36h140a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H512v156a36 36 0 0 1-36 36z"},child:[]}]})(e)}var b=[];for(var Z=0;Z<256;++Z)b.push((Z+256).toString(16).slice(1));function Xe(e,t=0){return(b[e[t+0]]+b[e[t+1]]+b[e[t+2]]+b[e[t+3]]+"-"+b[e[t+4]]+b[e[t+5]]+"-"+b[e[t+6]]+b[e[t+7]]+"-"+b[e[t+8]]+b[e[t+9]]+"-"+b[e[t+10]]+b[e[t+11]]+b[e[t+12]]+b[e[t+13]]+b[e[t+14]]+b[e[t+15]]).toLowerCase()}var D,Ze=new Uint8Array(16);function Qe(){if(!D&&(D=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!D))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return D(Ze)}var Ye=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const ue={randomUUID:Ye};function fe(e,t,o){if(ue.randomUUID&&!t&&!e)return ue.randomUUID();e=e||{};var c=e.random||(e.rng||Qe)();if(c[6]=c[6]&15|64,c[8]=c[8]&63|128,t){o=o||0;for(var w=0;w<16;++w)t[o+w]=c[w];return t}return Xe(c)}const q=({isOpen:e,onClose:t,onSubmit:o,title:c,submitText:w,cancelText:h,inputPlaceholder:_="",showInput:O=!0})=>{const[y,I]=n.reactExports.useState("");if(!e)return null;const j=N=>{N.preventDefault(),(!O||y.trim())&&(o(y.trim()),I(""),t())};return n.jsx("div",{className:"modal-overlay",children:n.jsxs("div",{className:"modal-content",children:[n.jsx("h2",{children:c}),n.jsxs("form",{onSubmit:j,children:[O&&n.jsx("input",{type:"text",value:y,onChange:N=>I(N.target.value),placeholder:_,className:"modal-input"}),n.jsxs("div",{className:"modal-buttons",children:[n.jsx("button",{type:"submit",className:"modal-button submit",children:w}),n.jsx("button",{type:"button",onClick:t,className:"modal-button cancel",children:h})]})]})]})})};window.electron&&require("path");console.log("main.tsx is being executed");const et=()=>{console.log("Main component is rendering");const[e,t]=n.reactExports.useState([]),[o,c]=n.reactExports.useState([]),[w,h]=n.reactExports.useState(!1),[_,O]=n.reactExports.useState(!1),[y,I]=n.reactExports.useState(!1),[j,N]=n.reactExports.useState(null),[B,J]=n.reactExports.useState(null),[L,Q]=n.reactExports.useState(!1),[Y,ye]=n.reactExports.useState(!1);n.reactExports.useState(null);const[tt,ee]=n.reactExports.useState(!1);window.electron&&require("path"),require("os");const[he,te]=n.reactExports.useState(!1);n.reactExports.useState(!1);const[_e,z]=n.reactExports.useState(!1),[be,K]=n.reactExports.useState(!1),[ne,T]=n.reactExports.useState(!1);navigator.platform.toUpperCase().indexOf("MAC")>=0,navigator.platform.toUpperCase().indexOf("WIN")>=0;const[S,$]=n.reactExports.useState([]),[m,E]=n.reactExports.useState(null),v=n.reactExports.useRef(null),A=n.reactExports.useRef(_),re=n.reactExports.useRef(y),xe=n.reactExports.useRef(j),V=n.reactExports.useRef(B),F=n.reactExports.useRef(null),f=n.reactExports.useRef(null);n.reactExports.useEffect(()=>{A.current=_},[_]),n.reactExports.useEffect(()=>{re.current=y},[y]),n.reactExports.useEffect(()=>{xe.current=j},[j]),n.reactExports.useEffect(()=>{V.current=B},[B]),n.reactExports.useEffect(()=>{i(`Current profile changed to: ${m}`)},[m]);const i=r=>{console.log("Debug log:",r),c(s=>[...s,r])},k=r=>{const s={lalt:"alt",ralt:"alt",lcontrol:"ctrl",rcontrol:"ctrl",controlleft:"ctrl",controlright:"ctrl",shiftleft:"shift",shiftright:"shift",metaleft:navigator.platform.toUpperCase().indexOf("MAC")>=0?"cmd":"win",metaright:navigator.platform.toUpperCase().indexOf("MAC")>=0?"cmd":"win",numpad1:"1",numpad2:"2",numpad3:"3",numpad4:"4",numpad5:"5",numpad6:"6",numpad7:"7",numpad8:"8",numpad9:"9",numpad0:"0"},d=navigator.platform.toUpperCase().indexOf("MAC")>=0?["cmd","ctrl","alt","shift"]:["ctrl","alt","shift","win"];return r.toLowerCase().split("+").map(g=>s[g]||g).filter((g,x,P)=>P.indexOf(g)===x).sort((g,x)=>{const P=d.indexOf(g),X=d.indexOf(x);return P===-1&&X===-1?g.localeCompare(x):P===-1?1:X===-1?-1:P-X}).map(g=>g.charAt(0).toUpperCase()+g.slice(1)).join("+")},M=n.reactExports.useCallback(r=>{const s=r||m;if(!s){i("No profile specified or selected. Cannot load config.");return}i(`Attempting to load config for profile: ${s}`),f.current&&f.current.readyState===WebSocket.OPEN?(i(`WebSocket is open. Sending LOAD_CONFIG request for profile: ${s}`),ee(!0),f.current.send(`LOAD_CONFIG:${s}`)):i("Cannot load config: WebSocket is not open.")},[m]),ve=n.reactExports.useCallback(r=>{i(`Switching profile to: ${r}`),f.current&&f.current.readyState===WebSocket.OPEN?(te(!0),setTimeout(()=>{var s,l;E(r),v.current=r,t([]),(s=f.current)==null||s.send(`SAVE_LAST_SELECTED_PROFILE:${r}`),(l=f.current)==null||l.send(`SWITCH_PROFILE:${r}`),setTimeout(()=>{te(!1)},50)},300)):i("WebSocket is not initialized or ready.")},[i,E,t]),R=r=>{const s=m||v.current;if(!s){i("Cannot save config: No current profile selected.");return}if(!f.current||f.current.readyState!==WebSocket.OPEN){i("WebSocket is not initialized or not ready.");return}const l=r.reduce((d,u)=>(d[u.key]=u.binding,d),{});try{const d=JSON.stringify({profile:s,config:l});i(`Sending updated config to server: ${d}`),f.current.send(`SAVE_CONFIG:${d}`),i("Config sent successfully"),t(r)}catch(d){d instanceof Error?i(`Error saving config: ${d.message}`):i("Unexpected error saving config.")}},W=(r,s)=>{console.log("Updating binding with value:",s),t(l=>{const d=l.findIndex(a=>a.id===r);if(d===-1)return i(`Keybinding with id ${r} not found in config.`),l;const u=[...l];return u[d]={...u[d],binding:s},i(`Updating config for id: ${r} with value: ${JSON.stringify(s)}`),R(u),u})},C=()=>{i("Stopping key listener..."),O(!1),A.current=!1,i("isListeningForKey set to false"),h(!1),i("isAddingBinding set to false"),y&&(I(!1),N(null),J(null),i("Editing state reset"))},Ee=(r,s)=>{if(i(`Editing key binding with id ${r} to ${s}`),!(m||v.current)){i("Cannot edit binding: No current profile selected."),C();return}const d=k(s);t(u=>{if(u.some(x=>x.key===d&&x.id!==r))return i(`Key combination ${d} already exists in config.`),C(),u;const a=u.findIndex(x=>x.id===r);if(a===-1)return i(`Keybinding with id ${r} not found in config.`),C(),u;const g=[...u];return g[a]={...g[a],key:d},i(`Config after editing: ${JSON.stringify(g)}`),R(g),C(),I(!1),N(null),J(null),g})},Se=r=>{const s=k(r);e.some(l=>l.key===s)?i(`Processing combo: ${s}`):i(`Combo ${s} not found in config`)},Oe=n.reactExports.useCallback(r=>{i(`Attempting to add new key bind: ${r}`);const s=k(r);if(i(`Normalized key combination: ${s}`),i(`Current profiles: ${JSON.stringify(S)}`),i(`Current profile: ${m}`),i(`Last profile ref: ${v.current}`),!(m||v.current)){i("Cannot add new binding: No current profile selected.");return}t(d=>{if(d.some(g=>g.key===s))return i(`Key combination ${s} already exists in config.`),C(),d;const u={id:fe(),key:s,binding:{volume:0,pitch:0,track:"A1",path:""}},a=[...d,u];return i(`New config before saving: ${JSON.stringify(a)}`),R(a),i(`Key binding ${s} added to config.`),C(),a})},[i,R,C,m]);n.reactExports.useEffect(()=>(console.log("useEffect hook is running"),ie(),()=>{f.current&&f.current.close()}),[]),n.reactExports.useEffect(()=>{if(S.length>0&&!m){const r=S.find(s=>s==="123");r?(E(r),v.current=r,i(`Set current profile to saved profile: ${r}`)):(E(S[0]),v.current=S[0],i(`Set current profile to first available profile: ${S[0]}`))}},[S,m]);function ie(){if(f.current&&f.current.readyState===WebSocket.OPEN){i("WebSocket already connected");return}i("Establishing WebSocket connection..."),f.current=new WebSocket("ws://localhost:7878"),f.current.onopen=()=>{var r;i("Connected to server"),Q(!0),$e(),(r=f.current)==null||r.send("GET_LAST_SELECTED_PROFILE")},f.current.onerror=r=>{i(`WebSocket Error: ${r}`)},f.current.onclose=r=>{i(`Disconnected from server: ${r.reason}`),Q(!1),setTimeout(()=>{i("Attempting to reconnect..."),ie()},5e3)},f.current.onmessage=r=>{var l,d,u;const s=r.data;if(i(`Received message: ${s}`),s.startsWith("PROFILE_SWITCHED:")){const a=s.replace("PROFILE_SWITCHED:","");E(a),v.current=a,i(`Profile switched to: ${a}`)}if(s.startsWith("CONFIG:"))try{const a=JSON.parse(s.replace("CONFIG:",""));i(`Parsed config data: ${JSON.stringify(a)}`);const g=Object.entries(a).map(([x,P])=>({id:fe(),key:k(x),binding:P}));i(`Converted config array: ${JSON.stringify(g)}`),t(g),i("Config loaded and converted to array successfully")}catch(a){i(`Error parsing CONFIG message: ${a}`)}if(s.startsWith("PROFILES:")){const a=JSON.parse(s.replace("PROFILES:",""));$(a),ye(!0),i(`Profiles loaded: ${JSON.stringify(a)}`),a.length===1&&!m&&(E(a[0]),v.current=a[0],i(`Automatically set current profile to: ${a[0]}`))}if(s.startsWith("CURRENT_PROFILE:")){const a=s.replace("CURRENT_PROFILE:","").trim();a&&a!=="None"&&(E(a),v.current=a,i(`Current profile set to: ${a}`))}if(s.startsWith("LAST_SELECTED_PROFILE:")){const a=s.replace("LAST_SELECTED_PROFILE:","").trim();a&&a!=="None"?(E(a),v.current=a,i(`Restored last selected profile: ${a}`),(l=f.current)==null||l.send(`SWITCH_PROFILE:${a}`)):i("No last selected profile found")}if(s.startsWith("COMBO:")){const a=s.replace("COMBO:","");if(i(`Processed combo: ${a}`),!(m||v.current)){i("Cannot process combo: No current profile selected."),C();return}A.current?(re.current&&V.current?Ee(V.current,a):Oe(a),C()):Se(a)}if(s.startsWith("PROFILE_CREATED:")){const a=s.replace("PROFILE_CREATED:","");$(g=>[...g,a]),E(a),v.current=a,t([]),i(`Profile created and switched to: ${a}`),(d=f.current)==null||d.send(`SWITCH_PROFILE:${a}`),M(a)}if(s.startsWith("PROFILE_DELETED:")){const a=s.replace("PROFILE_DELETED:","");if($(g=>g.filter(x=>x!==a)),m===a){const g=S.find(x=>x!==a)||null;E(g),g?((u=f.current)==null||u.send(`SWITCH_PROFILE:${g}`),t([]),M(g)):t([])}i(`Profile deleted: ${a}`)}if(s.startsWith("ERROR:")){const a=s.replace("ERROR:","");i(`Error: ${a}`)}}}const oe=n.reactExports.useCallback(()=>{f.current&&f.current.readyState===WebSocket.OPEN?(i("WebSocket connection is open. Starting key listener..."),O(!0),A.current=!0,i("isListeningForKey set to true")):i("WebSocket connection is not open. Cannot start key listener.")},[i]),Ce=(r,s)=>{!_&&!y&&(I(!0),N(s),J(r),i(`Editing binding for key: ${s} with id: ${r}`),oe())},Ne=()=>{!_&&!y&&(h(!0),i("Add binding clicked. isListeningForKey set to true"),oe())},Pe=r=>{i(`Attempting to select audio file for id: ${r}`),F.current?(i("File input reference is available."),F.current.click(),F.current.onchange=s=>{var d;i("File input change event triggered.");const l=(d=s.target.files)==null?void 0:d[0];if(l){i(`File selected: ${l.name}`);const u=l.path;i(`File path resolved to: ${u}`);const a=e.find(g=>g.id===r);a&&(W(r,{...a.binding,path:u}),i(`Selected audio file for id ${r}: ${u}`))}else i("No file selected.")}):i("File input reference is not available.")},Ie=r=>{t(s=>{const l=s.findIndex(u=>u.id===r);if(l===-1)return i(`Keybinding with id ${r} not found in config.`),s;const d=[...s];return d.splice(l,1),i(`Deleting binding with id: ${r}`),R(d),i(`Binding deleted for id ${r}`),d})};n.reactExports.useEffect(()=>{m&&L&&(i(`Loading config for profile: ${m}`),(s=>{const l=s||m;if(!l){i("No profile specified or selected. Cannot load config.");return}i(`Attempting to load config for profile: ${l}`),f.current&&f.current.readyState===WebSocket.OPEN?(i(`WebSocket is open. Sending LOAD_CONFIG request for profile: ${l}`),ee(!0),f.current.send(`LOAD_CONFIG:${l}`)):i("Cannot load config: WebSocket is not open.")})(m))},[m,L]);const je=r=>{if(!r)return"";const s=r.split(/[/\\]/);return s[s.length-1]},se=n.reactExports.useCallback((r,s,l)=>{if(l===""||l==="-"||l==="-."||/^-?\d*\.?\d*$/.test(l)){const u=e.find(a=>a.id===r);u&&W(r,{...u.binding,[s]:l})}const d=parseFloat(l);if(!isNaN(d)){if(s==="pitch"&&(d<-12||d>12))return;const u=e.find(a=>a.id===r);u&&W(r,{...u.binding,[s]:d})}},[e,W]),$e=()=>{if(f.current&&f.current.readyState===WebSocket.OPEN)try{f.current.send("GET_PROFILES"),f.current.send("GET_CURRENT_PROFILE")}catch(r){i(`Error loading profiles: ${r}`)}else i("Cannot load profiles: WebSocket is not open.")},G=r=>{var s,l,d;if(r.trim())try{i(`Attempting to create profile: ${r}`),(s=f.current)==null||s.send(`CREATE_PROFILE:${r}`),$(a=>[...a,r]),E(r),v.current=r,t([]),i(`New profile created: ${r}`),(l=f.current)==null||l.send(`SWITCH_PROFILE:${r}`),i(`Switched to new profile: ${r}`);const u={};(d=f.current)==null||d.send(`SAVE_CONFIG:${JSON.stringify({profile:r,config:u})}`),i(`Saved empty config for new profile: ${r}`),M(r),i(`Triggered config reload for new profile: ${r}`)}catch(u){console.error("Error creating profile:",u),i(`Error creating profile: ${u}`)}else i("Attempted to create profile with empty name");T(!1)},Re=()=>{var r,s;if(m){(r=f.current)==null||r.send(`DELETE_PROFILE:${m}`),$(d=>d.filter(u=>u!==m));const l=S.find(d=>d!==m)||null;l?(E(l),t([]),(s=f.current)==null||s.send(`SWITCH_PROFILE:${l}`),M(l)):(E(null),t([])),i(`Profile '${m}' deleted successfully`)}K(!1)},We=()=>n.jsx("div",{className:"loading-screen",children:n.jsxs("div",{className:"loading-content",children:[n.jsx("div",{className:"spinner"}),n.jsx("p",{className:"loading-message",children:"Loading profiles, please wait..."})]})});return!L||!Y?n.jsx(We,{}):S.length===0?n.jsxs("div",{className:"main-container",children:[n.jsx("div",{className:"profile-section",children:n.jsxs("div",{children:[n.jsx("p",{children:"No profiles available. Please create a new profile."}),n.jsx("button",{className:"button",onClick:()=>T(!0),children:"Create Profile"})]})}),n.jsx(q,{isOpen:ne,onClose:()=>T(!1),onSubmit:G,title:"Create New Profile",submitText:"Create",cancelText:"Cancel",inputPlaceholder:"Enter profile name",showInput:!0})]}):n.jsxs("div",{className:"main-container",children:[!L||!Y?n.jsxs("div",{className:"spinner-container",children:[n.jsx("div",{className:"spinner-message",children:"Loading profiles, please wait..."}),n.jsx("div",{className:"spinner",children:"🔄"})]}):n.jsx(n.Fragment,{children:m?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"profile-section",children:n.jsxs("div",{className:"profile-select-wrapper",children:[n.jsxs("div",{children:[n.jsx("label",{htmlFor:"profile-select",style:{marginRight:"10px"},children:"Profile:"}),n.jsx("select",{id:"profile-select",value:m,onChange:r=>ve(r.target.value),className:"profile-select",children:S.map(r=>n.jsx("option",{value:r,children:r},r))})]}),n.jsxs("div",{className:"profile-buttons",children:[n.jsx("button",{className:"button",onClick:()=>z(!0),children:"New Profile"}),n.jsx("button",{className:"button delete-profile",onClick:()=>K(!0),children:"Delete Profile"})]})]})}),n.jsxs("div",{className:"add-binding-container",children:[n.jsx("input",{type:"text",readOnly:!0,value:_?y?`Editing ${j||""}: Press new key...`:"Press a key combination...":"Click Add Binding to start",className:"key-binding-input"}),n.jsx("button",{className:"button",onClick:Ne,disabled:_||y,children:_?"Listening...":"Add Binding"})]}),n.jsx("input",{type:"file",ref:F,className:"file-input",accept:"audio/*"}),n.jsx("div",{className:`binding-list-fade ${he?"fade-out":""}`,children:e.map(r=>n.jsxs("div",{className:"binding-card",children:[n.jsx("button",{className:"delete-button",onClick:()=>Ie(r.id),children:"✖"}),n.jsx("input",{type:"text",readOnly:!0,value:r.key,className:"key-binding-input"}),n.jsx("button",{className:"button",onClick:()=>Ce(r.id,r.key),disabled:_||y,children:"Edit"}),n.jsx("select",{value:r.binding.track,onChange:s=>W(r.id,{...r.binding,track:s.target.value}),className:"track-select",children:Array.from({length:15},(s,l)=>n.jsxs("option",{value:`A${l+1}`,children:["A",l+1]},l))}),n.jsx("input",{type:"text",readOnly:!0,value:je(r.binding.path),className:"key-binding-input"}),n.jsx("button",{className:"button",onClick:()=>Pe(r.id),children:"Audio..."}),n.jsxs("div",{className:"input-wrapper",children:[n.jsx("span",{className:"volume-icon",children:n.jsx(Ve,{})}),n.jsx("input",{type:"number",value:r.binding.volume,onChange:s=>se(r.id,"volume",s.target.value),className:"number-input"}),n.jsx("span",{className:"input-label",children:"dB"})]}),n.jsxs("div",{className:"input-wrapper",children:[n.jsx("span",{className:"wave-square-icon",children:n.jsx(Ge,{})}),n.jsx("input",{type:"number",value:r.binding.pitch,onChange:s=>se(r.id,"pitch",s.target.value),min:"-12",max:"12",step:"1",className:"number-input"}),n.jsx("span",{className:"input-label",children:"st"})]})]},r.id))})]}):n.jsx("div",{className:"profile-section",children:n.jsxs("div",{children:[n.jsx("p",{children:"No profiles available. Please create a new profile."}),n.jsx("button",{className:"button",onClick:()=>z(!0),children:"Create Profile"})]})})}),n.jsx(q,{isOpen:_e,onClose:()=>z(!1),onSubmit:G,title:"Create New Profile",submitText:"Create",cancelText:"Cancel",inputPlaceholder:"Enter profile name",showInput:!0}),n.jsx(q,{isOpen:be,onClose:()=>K(!1),onSubmit:Re,title:`Delete Profile "${m}"`,submitText:"Delete",cancelText:"Cancel",showInput:!1}),n.jsx(q,{isOpen:ne,onClose:()=>T(!1),onSubmit:G,title:"Create New Profile",submitText:"Create",cancelText:"Cancel",inputPlaceholder:"Enter profile name",showInput:!0})]})};De();n.client.createRoot(document.getElementById("root")).render(n.jsx(n.React.StrictMode,{children:n.jsx(et,{})}));
//# sourceMappingURL=main-9602858c.js.map
