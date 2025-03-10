import{d as e,r as l,c as a,f as t,e as u,h as o,Q as n,g as s,n as i,t as r,l as d,V as c,a4 as v,F as b,k as p,i as m,v as f}from"./vendor-D5JAeVAb.js";import{h as g,_ as h}from"./index-CcK-W4Pk.js";import"./utils-CUb6YWP4.js";import"./animations-DgDmzaB4.js";import"./charts-DqdvykD8.js";const x={class:"min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16"},w={class:"container mx-auto px-4"},y={class:"max-w-6xl mx-auto"},k={class:"grid grid-cols-1 lg:grid-cols-2 gap-8"},V={class:"bg-white/5 backdrop-blur-lg rounded-xl p-8"},U={class:"flex items-center justify-center min-h-[400px] bg-gray-800/50 rounded-lg"},$={class:"bg-white/5 backdrop-blur-lg rounded-xl p-8"},j={class:"space-y-6"},z=["value"],B={class:"block text-white mb-2"},P=["value"],D=["value"],I={key:0},L={class:"grid grid-cols-2 gap-4"},R={class:"flex items-center text-white mb-2"},A={key:0,class:"grid grid-cols-2 gap-4 mt-2"},G={class:"block text-white mb-2"},S={class:"block text-white mb-2"},_=h(e({__name:"LogoOlusturucuView",setup(e){const h=l(""),_=l(48),C=l("Inter"),F=l(700),M=l("#ffffff"),E=l("#3b82f6"),K=l(40),O=l(16),N=l(0),Y=l(""),H=l(48),Q=l("left"),T=l("#ffffff"),W=l("rgba(0,0,0,0.25)"),q=l(10),J=l(0),X=l(4),Z=l("#3b82f6"),ee=l("#1d4ed8"),le=l(!1),ae=l("rectangle"),te=["Inter","Arial","Helvetica","Times New Roman","Georgia","Verdana","Roboto","Montserrat"],ue=[{name:"Yok",value:""},{name:"Dünya",value:"fas fa-globe"},{name:"Yıldız",value:"fas fa-star"},{name:"Kalp",value:"fas fa-heart"},{name:"Elmas",value:"fas fa-gem"},{name:"Ağaç",value:"fas fa-tree"},{name:"Güneş",value:"fas fa-sun"},{name:"Ay",value:"fas fa-moon"},{name:"Bulut",value:"fas fa-cloud"},{name:"Şimşek",value:"fas fa-bolt"},{name:"Dağ",value:"fas fa-mountain"},{name:"Bina",value:"fas fa-building"}],oe=[{name:"Dikdörtgen",value:"rectangle"},{name:"Daire",value:"circle"},{name:"Kalkan",value:"shield"},{name:"Altıgen",value:"hexagon"}],ne=a((()=>{const e={fontSize:`${_.value}px`,fontFamily:C.value,fontWeight:F.value,color:M.value,padding:`${K.value}px`,transform:`rotate(${N.value}deg)`,display:"flex",alignItems:"center",justifyContent:"center",gap:"20px",position:"relative",boxShadow:`${J.value}px ${X.value}px ${q.value}px ${W.value}`};switch(le.value?e.background=`linear-gradient(135deg, ${Z.value}, ${ee.value})`:e.backgroundColor=E.value,ae.value){case"circle":e.borderRadius="50%",e.width="300px",e.height="300px";break;case"shield":e.clipPath="polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";break;case"hexagon":e.clipPath="polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";break;default:e.borderRadius=`${O.value}px`}return e})),se=a((()=>({fontSize:`${H.value}px`,color:T.value,display:"flex",alignItems:"center",justifyContent:"center"}))),ie=()=>{return e=this,l=null,a=function*(){const e=document.getElementById("logo");if(e){const l=yield g(e),a=document.createElement("a");a.download="logo.png",a.href=l.toDataURL(),a.click()}},new Promise(((t,u)=>{var o=e=>{try{s(a.next(e))}catch(l){u(l)}},n=e=>{try{s(a.throw(e))}catch(l){u(l)}},s=e=>e.done?t(e.value):Promise.resolve(e.value).then(o,n);s((a=a.apply(e,l)).next())}));var e,l,a};return(e,l)=>(u(),t("div",x,[o("div",w,[o("div",y,[l[26]||(l[26]=o("h2",{class:"text-3xl font-bold text-white mb-8"},"Logo Oluşturucu",-1)),o("div",k,[o("div",V,[l[13]||(l[13]=o("h3",{class:"text-xl font-semibold text-white mb-6"},"Önizleme",-1)),o("div",U,[o("div",{id:"logo",style:n(ne.value)},[Y.value&&"right"!==Q.value?(u(),t("i",{key:0,class:i([Y.value,"icon"]),style:n(se.value)},null,6)):s("",!0),o("span",null,r(h.value||"Logo Metni"),1),Y.value&&"right"===Q.value?(u(),t("i",{key:1,class:i([Y.value,"icon"]),style:n(se.value)},null,6)):s("",!0)],4)]),o("div",{class:"mt-6 flex justify-center"},[o("button",{onClick:ie,class:"px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"}," PNG Olarak İndir ")])]),o("div",$,[l[25]||(l[25]=o("h3",{class:"text-xl font-semibold text-white mb-6"},"Özelleştir",-1)),o("div",j,[o("div",null,[l[14]||(l[14]=o("label",{class:"block text-white mb-2"},"Logo Metni",-1)),d(o("input",{"onUpdate:modelValue":l[0]||(l[0]=e=>h.value=e),type:"text",class:"w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500",placeholder:"Logo metninizi girin"},null,512),[[c,h.value]])]),o("div",null,[l[15]||(l[15]=o("label",{class:"block text-white mb-2"},"Font",-1)),d(o("select",{"onUpdate:modelValue":l[1]||(l[1]=e=>C.value=e),class:"w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"},[(u(),t(b,null,p(te,(e=>o("option",{key:e,value:e},r(e),9,z))),64))],512),[[v,C.value]])]),o("div",null,[o("label",B,"Font Boyutu: "+r(_.value)+"px",1),d(o("input",{"onUpdate:modelValue":l[2]||(l[2]=e=>_.value=e),type:"range",min:"12",max:"120",class:"w-full"},null,512),[[c,_.value]])]),o("div",null,[l[16]||(l[16]=o("label",{class:"block text-white mb-2"},"Şekil",-1)),d(o("select",{"onUpdate:modelValue":l[3]||(l[3]=e=>ae.value=e),class:"w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"},[(u(),t(b,null,p(oe,(e=>o("option",{key:e.value,value:e.value},r(e.name),9,P))),64))],512),[[v,ae.value]])]),o("div",null,[l[17]||(l[17]=o("label",{class:"block text-white mb-2"},"İkon",-1)),d(o("select",{"onUpdate:modelValue":l[4]||(l[4]=e=>Y.value=e),class:"w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"},[(u(),t(b,null,p(ue,(e=>o("option",{key:e.value,value:e.value},r(e.name),9,D))),64))],512),[[v,Y.value]])]),Y.value?(u(),t("div",I,[l[19]||(l[19]=o("label",{class:"block text-white mb-2"},"İkon Pozisyonu",-1)),d(o("select",{"onUpdate:modelValue":l[5]||(l[5]=e=>Q.value=e),class:"w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"},l[18]||(l[18]=[o("option",{value:"left"},"Sol",-1),o("option",{value:"right"},"Sağ",-1)]),512),[[v,Q.value]])])):s("",!0),o("div",L,[o("div",null,[l[20]||(l[20]=o("label",{class:"block text-white mb-2"},"Metin Rengi",-1)),d(o("input",{"onUpdate:modelValue":l[6]||(l[6]=e=>M.value=e),type:"color",class:"w-full h-10 rounded-lg cursor-pointer"},null,512),[[c,M.value]])]),o("div",null,[l[21]||(l[21]=o("label",{class:"block text-white mb-2"},"Arka Plan",-1)),d(o("input",{"onUpdate:modelValue":l[7]||(l[7]=e=>E.value=e),type:"color",class:"w-full h-10 rounded-lg cursor-pointer"},null,512),[[c,E.value]])])]),o("div",null,[o("label",R,[d(o("input",{"onUpdate:modelValue":l[8]||(l[8]=e=>le.value=e),type:"checkbox",class:"mr-2"},null,512),[[f,le.value]]),l[22]||(l[22]=m(" Gradient Kullan "))]),le.value?(u(),t("div",A,[o("div",null,[l[23]||(l[23]=o("label",{class:"block text-white mb-2"},"Başlangıç",-1)),d(o("input",{"onUpdate:modelValue":l[9]||(l[9]=e=>Z.value=e),type:"color",class:"w-full h-10 rounded-lg cursor-pointer"},null,512),[[c,Z.value]])]),o("div",null,[l[24]||(l[24]=o("label",{class:"block text-white mb-2"},"Bitiş",-1)),d(o("input",{"onUpdate:modelValue":l[10]||(l[10]=e=>ee.value=e),type:"color",class:"w-full h-10 rounded-lg cursor-pointer"},null,512),[[c,ee.value]])])])):s("",!0)]),o("div",null,[o("label",G,"Gölge Bulanıklığı: "+r(q.value)+"px",1),d(o("input",{"onUpdate:modelValue":l[11]||(l[11]=e=>q.value=e),type:"range",min:"0",max:"50",class:"w-full"},null,512),[[c,q.value]])]),o("div",null,[o("label",S,"Döndürme: "+r(N.value)+"°",1),d(o("input",{"onUpdate:modelValue":l[12]||(l[12]=e=>N.value=e),type:"range",min:"-180",max:"180",class:"w-full"},null,512),[[c,N.value]])])])])])])])]))}}),[["__scopeId","data-v-2e1a2aaa"]]);export{_ as default};
