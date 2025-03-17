import{d as h,r as b,c as m,b as y,e,l as w,j as T,F as D,h as j,n as K,t as s,D as B,k as o,v as d,s as V}from"./index-Cnce9ua8.js";const C={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},z={class:"relative"},S=["src","alt"],U={class:"p-6"},q={class:"text-lg font-semibold text-gray-900 dark:text-white mb-2"},E={class:"text-gray-600 dark:text-gray-300 mb-4"},L={class:"space-y-2"},M={class:"flex justify-between text-sm"},F={class:"text-gray-900 dark:text-white"},_={class:"flex justify-between text-sm"},A={class:"text-gray-900 dark:text-white"},P={class:"flex justify-between text-sm"},R={class:"text-gray-900 dark:text-white"},Y={class:"mt-6 flex justify-end space-x-2"},N=["onClick"],G=["onClick"],I={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"},$={class:"bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl"},H={class:"text-lg font-semibold text-gray-900 dark:text-white mb-4"},O={class:"grid grid-cols-2 gap-4"},J={class:"flex justify-end space-x-4 mt-6"},Q={type:"submit",class:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"},Z=h({__name:"CampaignsView",setup(W){const i=b([{id:1,baslik:"Yaz Sezonu İndirimi",aciklama:"Tüm web tasarım paketlerinde %20 indirim fırsatı!",gorsel:"https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",baslangicTarihi:"2024-06-01",bitisTarihi:"2024-08-31",butce:5e3,durum:"aktif"},{id:2,baslik:"Dijital Pazarlama Paketi",aciklama:"SEO ve sosyal medya yönetimi bir arada!",gorsel:"https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",baslangicTarihi:"2024-03-01",bitisTarihi:"2024-05-31",butce:7500,durum:"aktif"}]),u=b(!1),n=b(!1),l=b({id:0,baslik:"",aciklama:"",gorsel:"",baslangicTarihi:"",bitisTarihi:"",butce:0,durum:"aktif"}),p=r=>r.toLocaleString("tr-TR",{minimumFractionDigits:2,maximumFractionDigits:2}),k=()=>{n.value=!1,l.value={id:Math.max(0,...i.value.map(r=>r.id))+1,baslik:"",aciklama:"",gorsel:"",baslangicTarihi:"",bitisTarihi:"",butce:0,durum:"aktif"},u.value=!0},c=r=>{n.value=!0,l.value={...r},u.value=!0},f=async r=>{if(confirm("Bu kampanyayı silmek istediğinizden emin misiniz?"))try{i.value=i.value.filter(t=>t.id!==r)}catch(t){console.error("Kampanya silinirken hata:",t)}},v=async()=>{try{if(n.value){const r=i.value.findIndex(t=>t.id===l.value.id);r!==-1&&(i.value[r]={...l.value})}else i.value.push({...l.value});x()}catch(r){console.error("Kampanya kaydedilirken hata:",r)}},x=()=>{u.value=!1,l.value={id:0,baslik:"",aciklama:"",gorsel:"",baslangicTarihi:"",bitisTarihi:"",butce:0,durum:"aktif"}};return(r,t)=>(y(),m("div",null,[t[22]||(t[22]=e("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-8"},"Kampanya Yönetimi",-1)),e("div",{class:"mb-6"},[e("button",{onClick:k,class:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"},t[8]||(t[8]=[e("i",{class:"fas fa-plus mr-2"},null,-1),T("Yeni Kampanya ")]))]),e("div",C,[(y(!0),m(D,null,j(i.value,a=>(y(),m("div",{key:a.id,class:"bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"},[e("div",z,[e("img",{src:a.gorsel,alt:a.baslik,class:"w-full h-48 object-cover",onError:t[0]||(t[0]=g=>{g.target instanceof r.HTMLImageElement&&(g.target.src="/images/default-campaign.jpg")})},null,40,S),e("span",{class:K(["absolute top-4 right-4 px-2 py-1 text-xs rounded-full",a.durum==="aktif"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"])},s(a.durum==="aktif"?"Aktif":"Pasif"),3)]),e("div",U,[e("h3",q,s(a.baslik),1),e("p",E,s(a.aciklama),1),e("div",L,[e("div",M,[t[9]||(t[9]=e("span",{class:"text-gray-500 dark:text-gray-400"},"Başlangıç:",-1)),e("span",F,s(new Date(a.baslangicTarihi).toLocaleDateString("tr-TR")),1)]),e("div",_,[t[10]||(t[10]=e("span",{class:"text-gray-500 dark:text-gray-400"},"Bitiş:",-1)),e("span",A,s(new Date(a.bitisTarihi).toLocaleDateString("tr-TR")),1)]),e("div",P,[t[11]||(t[11]=e("span",{class:"text-gray-500 dark:text-gray-400"},"Bütçe:",-1)),e("span",R,s(p(a.butce))+" ₺ ",1)])]),e("div",Y,[e("button",{onClick:g=>c(a),class:"text-blue-500 hover:text-blue-600"},t[12]||(t[12]=[e("i",{class:"fas fa-edit"},null,-1)]),8,N),e("button",{onClick:g=>f(a.id),class:"text-red-500 hover:text-red-600"},t[13]||(t[13]=[e("i",{class:"fas fa-trash"},null,-1)]),8,G)])])]))),128))]),u.value?(y(),m("div",I,[e("div",$,[e("h3",H,s(n.value?"Kampanya Düzenle":"Yeni Kampanya Ekle"),1),e("form",{onSubmit:B(v,["prevent"]),class:"space-y-4"},[e("div",null,[t[14]||(t[14]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Kampanya Başlığı ",-1)),o(e("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>l.value.baslik=a),type:"text",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[d,l.value.baslik]])]),e("div",null,[t[15]||(t[15]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Açıklama ",-1)),o(e("textarea",{"onUpdate:modelValue":t[2]||(t[2]=a=>l.value.aciklama=a),rows:"3",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[d,l.value.aciklama]])]),e("div",null,[t[16]||(t[16]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Görsel URL ",-1)),o(e("input",{"onUpdate:modelValue":t[3]||(t[3]=a=>l.value.gorsel=a),type:"url",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[d,l.value.gorsel]])]),e("div",O,[e("div",null,[t[17]||(t[17]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Başlangıç Tarihi ",-1)),o(e("input",{"onUpdate:modelValue":t[4]||(t[4]=a=>l.value.baslangicTarihi=a),type:"date",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[d,l.value.baslangicTarihi]])]),e("div",null,[t[18]||(t[18]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Bitiş Tarihi ",-1)),o(e("input",{"onUpdate:modelValue":t[5]||(t[5]=a=>l.value.bitisTarihi=a),type:"date",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[d,l.value.bitisTarihi]])])]),e("div",null,[t[19]||(t[19]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Bütçe (₺) ",-1)),o(e("input",{"onUpdate:modelValue":t[6]||(t[6]=a=>l.value.butce=a),type:"number",min:"0",step:"0.01",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[d,l.value.butce]])]),e("div",null,[t[21]||(t[21]=e("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Durum ",-1)),o(e("select",{"onUpdate:modelValue":t[7]||(t[7]=a=>l.value.durum=a),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},t[20]||(t[20]=[e("option",{value:"aktif"},"Aktif",-1),e("option",{value:"pasif"},"Pasif",-1)]),512),[[V,l.value.durum]])]),e("div",J,[e("button",{type:"button",onClick:x,class:"px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"}," İptal "),e("button",Q,s(n.value?"Güncelle":"Kaydet"),1)])],32)])])):w("",!0)]))}});export{Z as default};
