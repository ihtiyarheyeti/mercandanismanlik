var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,s=(e,s)=>{for(var d in s||(s={}))a.call(s,d)&&l(e,d,s[d]);if(t)for(var d of t(s))r.call(s,d)&&l(e,d,s[d]);return e},d=(e,t,a)=>new Promise(((r,l)=>{var s=e=>{try{o(a.next(e))}catch(t){l(t)}},d=e=>{try{o(a.throw(e))}catch(t){l(t)}},o=e=>e.done?r(e.value):Promise.resolve(e.value).then(s,d);o((a=a.apply(e,t)).next())}));import{d as o,r as u,o as i,f as n,e as g,h as y,g as c,i as x,F as b,k as m,t as p,n as f,U as k,l as v,V as h,a4 as w}from"./vendor-D5JAeVAb.js";import{u as _}from"./index-B6VFsIyV.js";import"./utils-B_Ca612b.js";import"./animations-DE14wExU.js";import"./charts-DqdvykD8.js";const j={class:"bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8"},Y={class:"overflow-x-auto"},z={class:"w-full"},B={class:"px-4 py-3 text-sm text-gray-900 dark:text-white"},S={class:"px-4 py-3 text-sm text-gray-600 dark:text-gray-300"},O={class:"px-4 py-3 text-sm text-gray-600 dark:text-gray-300"},D={class:"px-4 py-3"},U={class:"px-4 py-3 text-sm text-gray-600 dark:text-gray-300"},V={class:"px-4 py-3 text-right space-x-2"},C=["onClick"],P=["onClick"],I={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"},T={class:"bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl"},q={class:"text-lg font-semibold text-gray-900 dark:text-white mb-4"},E={class:"grid grid-cols-2 gap-4"},K=["value"],M={class:"flex justify-end space-x-4 mt-6"},G={type:"submit",class:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"},L=o({__name:"BlogManagementView",setup(e){const t=_(),a=u([]),r=u([{id:1,name:"Dijital Pazarlama"},{id:2,name:"Web Tasarım"},{id:3,name:"SEO"},{id:4,name:"Sosyal Medya"},{id:5,name:"Yapay Zeka"}]),l=u(!1),o=u(!1),L=u({id:0,title:"",content:"",excerpt:"",featured_image:"",author_name:"",category_id:1,category_name:"",published_at:(new Date).toISOString(),tags:[],status:"draft"});i((()=>d(this,null,(function*(){try{yield t.fetchBlogs(),a.value=t.getBlogs}catch(e){}}))));const R=()=>{o.value=!1,L.value={id:Math.max(0,...a.value.map((e=>e.id)))+1,title:"",content:"",excerpt:"",featured_image:"",author_name:"Admin",category_id:1,category_name:"",published_at:(new Date).toISOString(),tags:[],status:"draft"},l.value=!0},A=e=>d(this,null,(function*(){if(confirm("Bu blog yazısını silmek istediğinizden emin misiniz?"))try{a.value=a.value.filter((t=>t.id!==e))}catch(t){}})),F=()=>d(this,null,(function*(){try{if(o.value){const e=a.value.findIndex((e=>e.id===L.value.id));-1!==e&&(a.value[e]=s({},L.value))}else a.value.push(s({},L.value));W()}catch(e){}})),W=()=>{l.value=!1,L.value={id:0,title:"",content:"",excerpt:"",featured_image:"",author_name:"",category_id:1,category_name:"",published_at:(new Date).toISOString(),tags:[],status:"draft"}};return(e,t)=>(g(),n("div",null,[t[20]||(t[20]=y("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-8"},"Blog Yönetimi",-1)),y("div",j,[y("div",{class:"flex justify-between items-center mb-6"},[t[8]||(t[8]=y("h3",{class:"text-lg font-semibold text-gray-900 dark:text-white"},"Blog Yazıları",-1)),y("button",{onClick:R,class:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"},t[7]||(t[7]=[y("i",{class:"fas fa-plus mr-2"},null,-1),x("Yeni Blog Yazısı ")]))]),y("div",Y,[y("table",z,[t[11]||(t[11]=y("thead",null,[y("tr",{class:"border-b border-gray-200 dark:border-gray-700"},[y("th",{class:"px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"},"Başlık"),y("th",{class:"px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"},"Kategori"),y("th",{class:"px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"},"Yazar"),y("th",{class:"px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"},"Durum"),y("th",{class:"px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"},"Yayın Tarihi"),y("th",{class:"px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400"},"İşlemler")])],-1)),y("tbody",null,[(g(!0),n(b,null,m(a.value,(e=>(g(),n("tr",{key:e.id,class:"border-b border-gray-200 dark:border-gray-700"},[y("td",B,p(e.title),1),y("td",S,p(e.category_name),1),y("td",O,p(e.author_name),1),y("td",D,[y("span",{class:f({"px-2 py-1 text-xs rounded-full":!0,"bg-green-100 text-green-800":"published"===e.status,"bg-yellow-100 text-yellow-800":"draft"===e.status})},p("published"===e.status?"Yayında":"Taslak"),3)]),y("td",U,p(new Date(e.published_at).toLocaleDateString("tr-TR")),1),y("td",V,[y("button",{onClick:t=>(e=>{o.value=!0,L.value=s({},e),l.value=!0})(e),class:"text-blue-500 hover:text-blue-600"},t[9]||(t[9]=[y("i",{class:"fas fa-edit"},null,-1)]),8,C),y("button",{onClick:t=>A(e.id),class:"text-red-500 hover:text-red-600"},t[10]||(t[10]=[y("i",{class:"fas fa-trash"},null,-1)]),8,P)])])))),128))])])])]),l.value?(g(),n("div",I,[y("div",T,[y("h3",q,p(o.value?"Blog Yazısı Düzenle":"Yeni Blog Yazısı"),1),y("form",{onSubmit:k(F,["prevent"]),class:"space-y-4"},[y("div",null,[t[12]||(t[12]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Başlık ",-1)),v(y("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>L.value.title=e),type:"text",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[h,L.value.title]])]),y("div",E,[y("div",null,[t[13]||(t[13]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Kategori ",-1)),v(y("select",{"onUpdate:modelValue":t[1]||(t[1]=e=>L.value.category_id=e),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},[(g(!0),n(b,null,m(r.value,(e=>(g(),n("option",{key:e.id,value:e.id},p(e.name),9,K)))),128))],512),[[w,L.value.category_id]])]),y("div",null,[t[15]||(t[15]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Durum ",-1)),v(y("select",{"onUpdate:modelValue":t[2]||(t[2]=e=>L.value.status=e),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},t[14]||(t[14]=[y("option",{value:"draft"},"Taslak",-1),y("option",{value:"published"},"Yayında",-1)]),512),[[w,L.value.status]])])]),y("div",null,[t[16]||(t[16]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Özet ",-1)),v(y("textarea",{"onUpdate:modelValue":t[3]||(t[3]=e=>L.value.excerpt=e),rows:"3",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[h,L.value.excerpt]])]),y("div",null,[t[17]||(t[17]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," İçerik ",-1)),v(y("textarea",{"onUpdate:modelValue":t[4]||(t[4]=e=>L.value.content=e),rows:"10",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",required:""},null,512),[[h,L.value.content]])]),y("div",null,[t[18]||(t[18]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Öne Çıkan Görsel URL ",-1)),v(y("input",{"onUpdate:modelValue":t[5]||(t[5]=e=>L.value.featured_image=e),type:"text",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},null,512),[[h,L.value.featured_image]])]),y("div",null,[t[19]||(t[19]=y("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Etiketler (virgülle ayırın) ",-1)),v(y("input",{"onUpdate:modelValue":t[6]||(t[6]=e=>L.value.tags=e),type:"text",class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",placeholder:"örnek, etiket, blog"},null,512),[[h,L.value.tags]])]),y("div",M,[y("button",{type:"button",onClick:W,class:"px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"}," İptal "),y("button",G,p(o.value?"Güncelle":"Kaydet"),1)])],32)])])):c("",!0)]))}});export{L as default};
