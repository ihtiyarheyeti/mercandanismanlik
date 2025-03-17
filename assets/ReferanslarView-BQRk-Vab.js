import{d as b,r as c,m as p,a as k,c as l,b as o,e,F as d,h as u,n as s,t as r,i as y,w as h,j as v}from"./index-Cnce9ua8.js";const _={class:"min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16"},w={class:"container mx-auto px-4"},z={class:"flex flex-wrap justify-center gap-4 mb-12"},j=["onClick"],S={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"},E={class:"h-32 flex items-center justify-center mb-6"},T={class:"text-2xl font-semibold text-white mb-2"},B={class:"text-gray-300 mb-4"},C={class:"inline-block px-4 py-1 bg-white/5 rounded-full text-sm text-gray-300"},D={class:"text-center mt-16"},M=b({__name:"ReferanslarView",setup(O){const n=c([{id:1,isim:"ABC Teknoloji",icon:"fas fa-desktop",aciklama:"E-ticaret sitesi tasarımı ve SEO optimizasyonu",kategori:"E-ticaret",color:"from-blue-400 to-purple-400"},{id:2,isim:"XYZ Medya",icon:"fas fa-bullhorn",aciklama:"Sosyal medya yönetimi ve içerik üretimi",kategori:"Sosyal Medya",color:"from-pink-400 to-red-400"},{id:3,isim:"Delta Group",icon:"fas fa-building",aciklama:"Kurumsal web sitesi ve dijital pazarlama",kategori:"Web Tasarım",color:"from-green-400 to-teal-400"},{id:4,isim:"Smart Solutions",icon:"fas fa-chart-line",aciklama:"Google Ads ve Facebook reklamları yönetimi",kategori:"Dijital Reklam",color:"from-yellow-400 to-orange-400"},{id:5,isim:"Green Energy",icon:"fas fa-leaf",aciklama:"SEO ve içerik stratejisi",kategori:"SEO",color:"from-emerald-400 to-green-400"},{id:6,isim:"Tech Start",icon:"fas fa-rocket",aciklama:"Mobil uygulama geliştirme",kategori:"Yazılım",color:"from-indigo-400 to-purple-400"}]),a=c("Tümü"),x=["Tümü","E-ticaret","Sosyal Medya","Web Tasarım","Dijital Reklam","SEO","Yazılım"],g=p(()=>a.value==="Tümü"?n.value:n.value.filter(m=>m.kategori===a.value));return(m,i)=>{const f=k("router-link");return o(),l("div",_,[e("div",w,[i[3]||(i[3]=e("div",{class:"text-center mb-16"},[e("h1",{class:"text-4xl md:text-5xl font-bold text-white mb-6"}," Referanslarımız "),e("p",{class:"text-xl text-gray-300 max-w-3xl mx-auto"}," Başarı hikayelerimizden bazıları. Her projede en iyi sonucu elde etmek için çalışıyoruz. ")],-1)),e("div",z,[(o(),l(d,null,u(x,t=>e("button",{key:t,class:s(["px-6 py-2 rounded-full transition-all duration-300",{"bg-blue-600 text-white":a.value===t,"bg-white/10 text-gray-300 hover:bg-white/20":a.value!==t}]),onClick:R=>a.value=t},r(t),11,j)),64))]),e("div",S,[(o(!0),l(d,null,u(g.value,t=>(o(),l("div",{key:t.id,class:"referans-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 animate-fadeIn"},[e("div",E,[e("div",{class:s(["w-24 h-24 bg-gradient-to-br rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-110",t.color])},[e("i",{class:s([t.icon,"text-4xl text-white"])},null,2)],2)]),e("h3",T,r(t.isim),1),e("p",B,r(t.aciklama),1),e("span",C,r(t.kategori),1)]))),128))]),e("div",D,[i[1]||(i[1]=e("h2",{class:"text-2xl md:text-3xl font-bold text-white mb-6"}," Siz de Başarı Hikayemizin Bir Parçası Olun ",-1)),i[2]||(i[2]=e("p",{class:"text-gray-300 mb-8 max-w-2xl mx-auto"}," Dijital dünyada işinizi büyütmek için yanınızdayız. Hemen iletişime geçin, projelerinizi konuşalım. ",-1)),y(f,{to:"/iletisim",class:"inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"},{default:h(()=>i[0]||(i[0]=[v(" İletişime Geçin ")])),_:1})])])])}}});export{M as default};
