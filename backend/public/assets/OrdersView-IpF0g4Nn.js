import{d as A,r as n,m as N,c as m,b as g,e,q as B,k as o,s as p,f as v,v as y,F as L,h as E,t as d,n as f,D as F}from"./index-Bj8UE4BS.js";const I={class:"bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8"},M={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},O={class:"flex space-x-2"},K={class:"bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"},P={class:"overflow-x-auto"},R={class:"w-full"},j={class:"divide-y divide-gray-200 dark:divide-gray-700"},H={class:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"},Y={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},$={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},q={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},G={class:"px-6 py-4 whitespace-nowrap"},J={class:"px-6 py-4 whitespace-nowrap"},Q={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"},W={class:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"},X=["onClick"],Z=["onClick"],_={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"},ee={class:"bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl"},te={class:"grid grid-cols-2 gap-4"},le=A({__name:"OrdersView",setup(re){const u=n([{id:1,siparisNo:"SIP001",musteriAdi:"Ahmet Yılmaz",urun:"E-ticaret Paketi",tutar:4999.99,durum:"hazirlaniyor",odemeDurumu:"odendi",tarih:"2024-02-28T10:00:00",notlar:"Müşteri özel renk şeması istedi."},{id:2,siparisNo:"SIP002",musteriAdi:"Ayşe Demir",urun:"Kurumsal Site Paketi",tutar:2499.99,durum:"beklemede",odemeDurumu:"bekliyor",tarih:"2024-02-28T11:30:00"}]),a=n({durum:"",baslangicTarihi:"",bitisTarihi:"",odemeDurumu:"",arama:""}),x=n(!1),i=n({id:0,siparisNo:"",musteriAdi:"",urun:"",tutar:0,durum:"beklemede",odemeDurumu:"bekliyor",tarih:new Date().toISOString(),notlar:""}),w=N(()=>u.value.filter(l=>{const t=!a.value.durum||l.durum===a.value.durum,r=!a.value.odemeDurumu||l.odemeDurumu===a.value.odemeDurumu,s=new Date(l.tarih),c=a.value.baslangicTarihi?new Date(a.value.baslangicTarihi):null,k=a.value.bitisTarihi?new Date(a.value.bitisTarihi):null,U=(!c||s>=c)&&(!k||s<=k),V=!a.value.arama||l.siparisNo.toLowerCase().includes(a.value.arama.toLowerCase())||l.musteriAdi.toLowerCase().includes(a.value.arama.toLowerCase());return t&&r&&U&&V})),h=l=>l.toLocaleString("tr-TR",{minimumFractionDigits:2,maximumFractionDigits:2}),D=l=>{switch(l){case"beklemede":return"bg-yellow-100 text-yellow-800";case"onaylandi":return"bg-blue-100 text-blue-800";case"hazirlaniyor":return"bg-purple-100 text-purple-800";case"tamamlandi":return"bg-green-100 text-green-800";case"iptal":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}},T=l=>{switch(l){case"bekliyor":return"bg-yellow-100 text-yellow-800";case"odendi":return"bg-green-100 text-green-800";case"iade":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}},S=l=>{i.value={...l},x.value=!0},z=async l=>{if(confirm("Bu siparişi silmek istediğinizden emin misiniz?"))try{u.value=u.value.filter(t=>t.id!==l)}catch(t){console.error("Sipariş silinirken hata:",t)}},C=async()=>{try{const l=u.value.findIndex(t=>t.id===i.value.id);l!==-1&&(u.value[l]={...i.value}),b()}catch(l){console.error("Sipariş kaydedilirken hata:",l)}},b=()=>{x.value=!1,i.value={id:0,siparisNo:"",musteriAdi:"",urun:"",tutar:0,durum:"beklemede",odemeDurumu:"bekliyor",tarih:new Date().toISOString(),notlar:""}};return(l,t)=>(g(),m("div",null,[t[24]||(t[24]=e("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-8"},"Sipariş Yönetimi",-1)),e("div",I,[e("div",M,[e("div",null,[t[9]||(t[9]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Durum ",-1)),o(e("select",{"onUpdate:modelValue":t[0]||(t[0]=r=>a.value.durum=r),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},t[8]||(t[8]=[v('<option value="">Tümü</option><option value="beklemede">Beklemede</option><option value="onaylandi">Onaylandı</option><option value="hazirlaniyor">Hazırlanıyor</option><option value="tamamlandi">Tamamlandı</option><option value="iptal">İptal Edildi</option>',6)]),512),[[p,a.value.durum]])]),e("div",null,[t[10]||(t[10]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Tarih Aralığı ",-1)),e("div",O,[o(e("input",{"onUpdate:modelValue":t[1]||(t[1]=r=>a.value.baslangicTarihi=r),type:"date",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[y,a.value.baslangicTarihi]]),o(e("input",{"onUpdate:modelValue":t[2]||(t[2]=r=>a.value.bitisTarihi=r),type:"date",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[y,a.value.bitisTarihi]])])]),e("div",null,[t[12]||(t[12]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Ödeme Durumu ",-1)),o(e("select",{"onUpdate:modelValue":t[3]||(t[3]=r=>a.value.odemeDurumu=r),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},t[11]||(t[11]=[e("option",{value:""},"Tümü",-1),e("option",{value:"bekliyor"},"Ödeme Bekliyor",-1),e("option",{value:"odendi"},"Ödendi",-1),e("option",{value:"iade"},"İade Edildi",-1)]),512),[[p,a.value.odemeDurumu]])]),e("div",null,[t[13]||(t[13]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Arama ",-1)),o(e("input",{"onUpdate:modelValue":t[4]||(t[4]=r=>a.value.arama=r),type:"text",placeholder:"Sipariş no veya müşteri adı",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[y,a.value.arama]])])])]),e("div",K,[e("div",P,[e("table",R,[t[16]||(t[16]=e("thead",null,[e("tr",{class:"bg-gray-50 dark:bg-gray-700"},[e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Sipariş No "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Müşteri "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Ürün "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Tutar "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Durum "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Ödeme "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," Tarih "),e("th",{class:"px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"}," İşlemler ")])],-1)),e("tbody",j,[(g(!0),m(L,null,E(w.value,r=>(g(),m("tr",{key:r.id,class:"hover:bg-gray-50 dark:hover:bg-gray-700"},[e("td",H," #"+d(r.siparisNo),1),e("td",Y,d(r.musteriAdi),1),e("td",$,d(r.urun),1),e("td",q,d(h(r.tutar))+" ₺ ",1),e("td",G,[e("span",{class:f([D(r.durum),"px-2 py-1 text-xs rounded-full"])},d(r.durum),3)]),e("td",J,[e("span",{class:f([T(r.odemeDurumu),"px-2 py-1 text-xs rounded-full"])},d(r.odemeDurumu),3)]),e("td",Q,d(new Date(r.tarih).toLocaleDateString("tr-TR")),1),e("td",W,[e("button",{onClick:s=>S(r),class:"text-blue-500 hover:text-blue-600"},t[14]||(t[14]=[e("i",{class:"fas fa-edit"},null,-1)]),8,X),e("button",{onClick:s=>z(r.id),class:"text-red-500 hover:text-red-600"},t[15]||(t[15]=[e("i",{class:"fas fa-trash"},null,-1)]),8,Z)])]))),128))])])])]),x.value?(g(),m("div",_,[e("div",ee,[t[23]||(t[23]=e("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white mb-4"}," Sipariş Düzenle ",-1)),e("form",{onSubmit:F(C,["prevent"]),class:"space-y-4"},[e("div",te,[e("div",null,[t[18]||(t[18]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Sipariş Durumu ",-1)),o(e("select",{"onUpdate:modelValue":t[5]||(t[5]=r=>i.value.durum=r),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},t[17]||(t[17]=[v('<option value="beklemede">Beklemede</option><option value="onaylandi">Onaylandı</option><option value="hazirlaniyor">Hazırlanıyor</option><option value="tamamlandi">Tamamlandı</option><option value="iptal">İptal Edildi</option>',5)]),512),[[p,i.value.durum]])]),e("div",null,[t[20]||(t[20]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Ödeme Durumu ",-1)),o(e("select",{"onUpdate:modelValue":t[6]||(t[6]=r=>i.value.odemeDurumu=r),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},t[19]||(t[19]=[e("option",{value:"bekliyor"},"Ödeme Bekliyor",-1),e("option",{value:"odendi"},"Ödendi",-1),e("option",{value:"iade"},"İade Edildi",-1)]),512),[[p,i.value.odemeDurumu]])])]),e("div",null,[t[21]||(t[21]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Notlar ",-1)),o(e("textarea",{"onUpdate:modelValue":t[7]||(t[7]=r=>i.value.notlar=r),rows:"4",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[y,i.value.notlar]])]),e("div",{class:"flex justify-end space-x-4 mt-6"},[e("button",{type:"button",onClick:b,class:"px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"}," İptal "),t[22]||(t[22]=e("button",{type:"submit",class:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"}," Kaydet ",-1))])],32)])])):B("",!0)]))}});export{le as default};
