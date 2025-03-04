"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[857],{96799:function(yn,A,t){t.r(A),t.d(A,{default:function(){return sn}});var x=t(9783),I=t.n(x),z=t(15009),Z=t.n(z),H=t(19632),B=t.n(H),N=t(99289),V=t.n(N),G=t(5574),C=t.n(G),K=t(97857),f=t.n(K),J=t(90930),Q=t(79585),X=t(47581),P=t(75605),Y=t(32273),$=t(67586),b=t(74330),k=t(25278),h=t(90926),w=t(78957),q=t(95658),i=t(67294),_=t(59651),nn=t(43628),tn=t(98502),U="https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd",en={waveColor:"#4F4A85",progressColor:"#383351",minPxPerSec:50},an={height:20,timeInterval:.1,primaryLabelInterval:1,style:{fontSize:"10px",color:"#6A3274"}},rn={lineColor:"#ff0000",lineWidth:2,labelBackground:"#555",labelColor:"#fff",labelSize:"11px"};function W(m){var s,a=new Date(m*1e3),T=a.getUTCHours(),y=a.getUTCMinutes(),g=a.getUTCSeconds(),d=((s=String(m).split(".")[1])===null||s===void 0?void 0:s.padEnd(3,"0").slice(0,3))||"000";return"".concat(T.toString().padStart(2,"0"),":").concat(y.toString().padStart(2,"0"),":").concat(g.toString().padStart(2,"0"),".").concat(d)}var o=t(85893);function ln(){var m=(0,i.useRef)(null),s=(0,i.useMemo)(function(){return nn.Z.create()},[]),a=(0,i.useMemo)(function(){return tn.Z.create(an)},[]),T=(0,i.useMemo)(function(){return _.Z.create(rn)},[]),y=(0,$.o)(f()(f()({container:m},en),{},{plugins:(0,i.useMemo)(function(){return[a,T,s]},[])}));return f()(f()({},y),{},{regions:s,containerRef:m})}var on=function(){var s=ln(),a=s.wavesurfer,T=s.isPlaying,y=s.containerRef,g=s.regions,d=(0,i.useRef)({}),un=(0,i.useState)(null),F=C()(un,2),j=F[0],dn=F[1],vn=(0,i.useState)(null),M=C()(vn,2),fn=M[0],cn=M[1];(0,i.useEffect)(function(){a&&(a.on("ready",function(){var c=a.getDuration();dn(g.addRegion({start:0,end:Math.min(10,Math.floor(c/4)),content:"Cut Region",drag:!0,resize:!0}))}),a.on("interaction",function(){a.play()}))},[a,g]);function mn(c){var v,e=c.target.files[0];if(e){g.clearRegions();var u=URL.createObjectURL(e);cn(u),a==null||(v=a.load)===null||v===void 0||v.call(a,u)}}var gn=(0,i.useState)([]),O=C()(gn,2),pn=O[0],L=O[1],D=(0,Y.useRequest)(V()(Z()().mark(function c(){var v,e,u,l,r,p,R;return Z()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(j){n.next=2;break}return n.abrupt("return");case 2:if(v=j.start,e=j.end,u=W(v),l=W(e),!(!u||!l)){n.next=7;break}return n.abrupt("return");case 7:return console.log(1),r=new X.C,r.on("log",function(S){var E=S.message;return console.log(E)}),r.on("progress",function(S){var E=S.progress,Tn=S.time;return console.info("".concat(E*100," %, time: ").concat(Tn/1e6," s"))}),n.t0=r,n.next=14,(0,P.Wn)("".concat(U,"/ffmpeg-core.js"),"text/javascript");case 14:return n.t1=n.sent,n.next=17,(0,P.Wn)("".concat(U,"/ffmpeg-core.wasm"),"application/wasm");case 17:return n.t2=n.sent,n.t3={coreURL:n.t1,wasmURL:n.t2},n.next=21,n.t0.load.call(n.t0,n.t3);case 21:return n.t4=r,n.next=24,(0,P.dc)(fn);case 24:return n.t5=n.sent,n.next=27,n.t4.writeFile.call(n.t4,"input.mp3",n.t5);case 27:return console.time("exec"),n.next=30,r.exec(["-i","input.mp3","-ss",u,"-to",l,"-acodec","copy","output.mp3"]);case 30:return console.timeEnd("exec"),n.next=33,r.readFile("output.mp3");case 33:p=n.sent,R=URL.createObjectURL(new Blob([p.buffer],{type:"audio/mpeg"})),console.log("\u{1F680} ~ url:",R),L(function(S){return[].concat(B()(S),[{url:R,start:v,end:e,startTime:u,endTime:l}])});case 37:case"end":return n.stop()}},c)})),{manual:!0}),Sn=D.loading,hn=D.run;return(0,o.jsx)(J._z,{ghost:!0,children:(0,o.jsxs)(b.Z,{spinning:Sn,children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{ref:y}),(0,o.jsx)(k.Z,{style:{marginTop:24},type:"file",id:"uploader",accept:"audio/mpeg",onChange:mn})]}),(0,o.jsxs)(q.Z,{style:{marginTop:24,marginBottom:24},children:[(0,o.jsx)(h.ZP,{onClick:function(){return a==null?void 0:a.playPause()},children:T?"Pause":"Play"}),(0,o.jsx)(h.ZP,{onClick:hn,children:"Cut"})]}),(0,o.jsx)(Q.Z,{rowKey:"url",search:!1,toolBarRender:!1,dataSource:pn,columns:[{title:"Start Time",dataIndex:"startTime"},{title:"End Time",dataIndex:"endTime"},{title:"Audio",dataIndex:"url",render:function(v,e){return(0,o.jsx)("audio",{src:e.url,controls:!0})}},{title:"Action",dataIndex:"action",render:function(v,e){return(0,o.jsxs)(w.Z,{children:[(0,o.jsx)(h.ZP,{onClick:function(){var l=document.createElement("a");l.href=e.url,l.download="cut_audio_".concat((e.startTime,e.endTime),".mp3"),document.body.appendChild(l),l.click(),document.body.removeChild(l)},children:"Download"}),(0,o.jsx)(h.ZP,{onClick:function(){var l;if((l=d.current)!==null&&l!==void 0&&l[e==null?void 0:e.url]){var r,p;(r=d.current)===null||r===void 0||(r=r[e==null?void 0:e.url])===null||r===void 0||(p=r.remove)===null||p===void 0||p.call(r),d.current=d.current=f()(f()({},d.current),{},I()({},e==null?void 0:e.url,void 0))}else{var R=g.addRegion({start:e.start,end:e.end,drag:!1,resize:!1,color:"rgba(9,105,218,0.2)"});d.current=f()(f()({},d.current),{},I()({},e==null?void 0:e.url,R))}},children:"Watch"}),(0,o.jsx)(h.ZP,{onClick:function(){L(function(l){return l.filter(function(r){return r.url!==e.url})})},children:"Delete"})]})}}]})]})})},sn=on}}]);
