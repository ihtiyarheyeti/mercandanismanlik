var e=Object.defineProperty,a=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r,d=(e,d)=>{for(var i in d||(d={}))t.call(d,i)&&l(e,i,d[i]);if(a)for(var i of a(d))r.call(d,i)&&l(e,i,d[i]);return e};import{d as i,r as o,c as s,f as u,e as n,h as g,g as m,l as y,a4 as c,C as p,V as x,F as b,k as v,t as k,n as h,U as f}from"./vendor-D5JAeVAb.js";const w={class:"bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8"},T={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},D={class:"flex space-x-2"},O={class:"bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"},A={class:"overflow-x-auto"},C={class:"w-full"},P={class:"divide-y divide-gray-200 dark:divide-gray-700"},V={class:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"},U={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},N={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},S={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},j={class:"px-6 py-4 whitespace-nowrap"},E={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},_={class:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"},L=["onClick"],F=["onClick"],K={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"},I={class:"bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl"},Y={class:"grid grid-cols-2 gap-4"},M=i({__name:"PaymentsView",setup(e){const a=o([{id:1,islemNo:"ODM001",musteriAdi:"Ahmet Yılmaz",tutar:4999.99,yontem:"kredi_karti",durum:"onaylandi",tarih:"2024-02-28T10:00:00",notlar:"Ödeme başarıyla tamamlandı"},{id:2,islemNo:"ODM002",musteriAdi:"Ayşe Demir",tutar:2499.99,yontem:"havale",durum:"beklemede",tarih:"2024-02-28T11:30:00"}]),t=o({durum:"",baslangicTarihi:"",bitisTarihi:"",yontem:"",arama:""}),r=o(!1),l=o({id:0,islemNo:"",musteriAdi:"",tutar:0,yontem:"kredi_karti",durum:"beklemede",tarih:(new Date).toISOString(),notlar:""}),i=s((()=>a.value.filter((e=>{const a=!t.value.durum||e.durum===t.value.durum,r=!t.value.yontem||e.yontem===t.value.yontem,l=new Date(e.tarih),d=t.value.baslangicTarihi?new Date(t.value.baslangicTarihi):null,i=t.value.bitisTarihi?new Date(t.value.bitisTarihi):null,o=(!d||l>=d)&&(!i||l<=i),s=!t.value.arama||e.islemNo.toLowerCase().includes(t.value.arama.toLowerCase())||e.musteriAdi.toLowerCase().includes(t.value.arama.toLowerCase());return a&&r&&o&&s})))),M=e=>{switch(e){case"kredi_karti":return"Kredi Kartı";case"havale":return"Havale/EFT";case"paypal":return"PayPal";default:return e}},z=e=>{switch(e){case"beklemede":return"bg-yellow-100 text-yellow-800";case"onaylandi":return"bg-green-100 text-green-800";case"iptal":return"bg-red-100 text-red-800";case"iade":return"bg-purple-100 text-purple-800";default:return"bg-gray-100 text-gray-800"}},B=()=>{return e=this,t=null,r=function*(){try{const e=a.value.findIndex((e=>e.id===l.value.id));-1!==e&&(a.value[e]=d({},l.value)),H()}catch(e){}},new Promise(((a,l)=>{var d=e=>{try{o(r.next(e))}catch(a){l(a)}},i=e=>{try{o(r.throw(e))}catch(a){l(a)}},o=e=>e.done?a(e.value):Promise.resolve(e.value).then(d,i);o((r=r.apply(e,t)).next())}));var e,t,r},H=()=>{r.value=!1,l.value={id:0,islemNo:"",musteriAdi:"",tutar:0,yontem:"kredi_karti",durum:"beklemede",tarih:(new Date).toISOString(),notlar:""}};return(e,a)=>(n(),u("div",null,[a[23]||(a[23]=g("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-8"},"Ödeme Yönetimi",-1)),g("div",w,[g("div",T,[g("div",null,[a[9]||(a[9]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Durum ",-1)),y(g("select",{"onUpdate:modelValue":a[0]||(a[0]=e=>t.value.durum=e),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},a[8]||(a[8]=[p('<option value="">Tümü</option><option value="beklemede">Beklemede</option><option value="onaylandi">Onaylandı</option><option value="iptal">İptal Edildi</option><option value="iade">İade Edildi</option>',5)]),512),[[c,t.value.durum]])]),g("div",null,[a[10]||(a[10]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Tarih Aralığı ",-1)),g("div",D,[y(g("input",{"onUpdate:modelValue":a[1]||(a[1]=e=>t.value.baslangicTarihi=e),type:"date",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[x,t.value.baslangicTarihi]]),y(g("input",{"onUpdate:modelValue":a[2]||(a[2]=e=>t.value.bitisTarihi=e),type:"date",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[x,t.value.bitisTarihi]])])]),g("div",null,[a[12]||(a[12]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Ödeme Yöntemi ",-1)),y(g("select",{"onUpdate:modelValue":a[3]||(a[3]=e=>t.value.yontem=e),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},a[11]||(a[11]=[g("option",{value:""},"Tümü",-1),g("option",{value:"kredi_karti"},"Kredi Kartı",-1),g("option",{value:"havale"},"Havale/EFT",-1),g("option",{value:"paypal"},"PayPal",-1)]),512),[[c,t.value.yontem]])]),g("div",null,[a[13]||(a[13]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Arama ",-1)),y(g("input",{"onUpdate:modelValue":a[4]||(a[4]=e=>t.value.arama=e),type:"text",placeholder:"İşlem no veya müşteri adı",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[x,t.value.arama]])])])]),g("div",O,[g("div",A,[g("table",C,[a[16]||(a[16]=g("thead",null,[g("tr",{class:"bg-gray-50 dark:bg-gray-700"},[g("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," İşlem No "),g("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Müşteri "),g("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Tutar "),g("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Yöntem "),g("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Durum "),g("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Tarih "),g("th",{class:"px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," İşlemler ")])],-1)),g("tbody",P,[(n(!0),u(b,null,v(i.value,(e=>{return n(),u("tr",{key:e.id,class:"hover:bg-gray-50 dark:hover:bg-gray-700"},[g("td",V," #"+k(e.islemNo),1),g("td",U,k(e.musteriAdi),1),g("td",N,k((t=e.tutar,t.toLocaleString("tr-TR",{minimumFractionDigits:2,maximumFractionDigits:2})))+" ₺ ",1),g("td",S,k(M(e.yontem)),1),g("td",j,[g("span",{class:h([z(e.durum),"px-2 py-1 text-xs rounded-full"])},k(e.durum),3)]),g("td",E,k(new Date(e.tarih).toLocaleDateString("tr-TR")),1),g("td",_,[g("button",{onClick:a=>(e=>{l.value=d({},e),r.value=!0})(e),class:"text-blue-500 hover:text-blue-600"},a[14]||(a[14]=[g("i",{class:"fas fa-edit"},null,-1)]),8,L),g("button",{onClick:a=>{e.id},class:"text-gray-500 hover:text-gray-600"},a[15]||(a[15]=[g("i",{class:"fas fa-eye"},null,-1)]),8,F)])]);var t})),128))])])])]),r.value?(n(),u("div",K,[g("div",I,[a[22]||(a[22]=g("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-4"}," Ödeme Düzenle ",-1)),g("form",{onSubmit:f(B,["prevent"]),class:"space-y-4"},[g("div",Y,[g("div",null,[a[18]||(a[18]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Ödeme Durumu ",-1)),y(g("select",{"onUpdate:modelValue":a[5]||(a[5]=e=>l.value.durum=e),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},a[17]||(a[17]=[g("option",{value:"beklemede"},"Beklemede",-1),g("option",{value:"onaylandi"},"Onaylandı",-1),g("option",{value:"iptal"},"İptal Edildi",-1),g("option",{value:"iade"},"İade Edildi",-1)]),512),[[c,l.value.durum]])]),g("div",null,[a[19]||(a[19]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," İşlem Tarihi ",-1)),y(g("input",{"onUpdate:modelValue":a[6]||(a[6]=e=>l.value.tarih=e),type:"datetime-local",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[x,l.value.tarih]])])]),g("div",null,[a[20]||(a[20]=g("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Notlar ",-1)),y(g("textarea",{"onUpdate:modelValue":a[7]||(a[7]=e=>l.value.notlar=e),rows:"4",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[x,l.value.notlar]])]),g("div",{class:"flex justify-end space-x-4 mt-6"},[g("button",{type:"button",onClick:H,class:"px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"}," İptal "),a[21]||(a[21]=g("button",{type:"submit",class:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"}," Kaydet ",-1))])],32)])])):m("",!0)]))}});export{M as default};
