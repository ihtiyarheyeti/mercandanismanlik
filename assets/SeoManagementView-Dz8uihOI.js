var e=Object.defineProperty,a=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,r=(a,t,l)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l,s=(e,a,t)=>new Promise(((l,r)=>{var s=e=>{try{o(t.next(e))}catch(a){r(a)}},i=e=>{try{o(t.throw(e))}catch(a){r(a)}},o=e=>e.done?l(e.value):Promise.resolve(e.value).then(s,i);o((t=t.apply(e,a)).next())}));import{d as i,r as o,o as u,f as n,e as m,h as d,U as c,l as b,V as p,v as y,t as x,a4 as v}from"./vendor-D5JAeVAb.js";import{b as h,a as g}from"./index-CcK-W4Pk.js";import"./utils-CUb6YWP4.js";import"./animations-DgDmzaB4.js";import"./charts-DqdvykD8.js";const f={class:"p-6"},S={class:"bg-white rounded-lg shadow p-6"},k={class:"mb-6"},w={class:"mb-4"},U={class:"mb-4"},O={class:"mb-4"},j={class:"mb-6"},E={class:"mb-4"},T={class:"mb-6"},V={class:"flex items-center mb-4"},G={class:"flex items-center mb-4"},M={class:"flex items-center mb-4"},K={class:"flex gap-4"},A=["disabled"],I=["disabled"],R={class:"mb-6"},z={class:"mb-4"},D={class:"flex justify-end"},P=["disabled"],L=i({__name:"SeoManagementView",setup(e){const i=h(),L=g(),B=o({metaTitle:"",metaDescription:"",metaKeywords:"",robotsTxt:"",urlStructure:"plain",autoGenerateSitemap:!0,includeImagesSitemap:!0,submitToSearchEngines:!0}),C=o(!1),H=o(!1),Y=o(!1);u((()=>s(this,null,(function*(){try{yield L.fetchSettings(),B.value=((e,s)=>{for(var i in s||(s={}))t.call(s,i)&&r(e,i,s[i]);if(a)for(var i of a(s))l.call(s,i)&&r(e,i,s[i]);return e})({},L.seoSettings)}catch(e){i.error("SEO ayarları yüklenirken bir hata oluştu")}}))));const _=()=>s(this,null,(function*(){C.value=!0;try{yield L.updateSeoSettings(B.value),i.success("SEO ayarları başarıyla kaydedildi")}catch(e){i.error("SEO ayarları kaydedilirken bir hata oluştu")}finally{C.value=!1}})),F=()=>s(this,null,(function*(){H.value=!0;try{yield L.generateSitemap(),i.success("Site haritası başarıyla oluşturuldu")}catch(e){i.error("Site haritası oluşturulurken bir hata oluştu")}finally{H.value=!1}})),q=()=>s(this,null,(function*(){Y.value=!0;try{yield L.submitSitemap(),i.success("Site haritası arama motorlarına gönderildi")}catch(e){i.error("Site haritası gönderilirken bir hata oluştu")}finally{Y.value=!1}}));return(e,a)=>(m(),n("div",f,[a[24]||(a[24]=d("h2",{class:"text-2xl font-semibold mb-6"},"SEO Yönetimi",-1)),d("div",S,[d("form",{onSubmit:c(_,["prevent"])},[d("div",k,[a[14]||(a[14]=d("h3",{class:"text-xl font-semibold mb-4"},"Meta Etiketleri",-1)),d("div",w,[a[8]||(a[8]=d("label",{class:"block text-sm font-medium text-gray-700 mb-2"}," Meta Başlık ",-1)),b(d("input",{"onUpdate:modelValue":a[0]||(a[0]=e=>B.value.metaTitle=e),type:"text",class:"w-full px-3 py-2 border border-gray-300 rounded-md",placeholder:"Site Meta Başlığı"},null,512),[[p,B.value.metaTitle]]),a[9]||(a[9]=d("p",{class:"mt-1 text-sm text-gray-500"},"Önerilen uzunluk: 50-60 karakter",-1))]),d("div",U,[a[10]||(a[10]=d("label",{class:"block text-sm font-medium text-gray-700 mb-2"}," Meta Açıklama ",-1)),b(d("textarea",{"onUpdate:modelValue":a[1]||(a[1]=e=>B.value.metaDescription=e),class:"w-full px-3 py-2 border border-gray-300 rounded-md",rows:"3",placeholder:"Site Meta Açıklaması"},null,512),[[p,B.value.metaDescription]]),a[11]||(a[11]=d("p",{class:"mt-1 text-sm text-gray-500"},"Önerilen uzunluk: 150-160 karakter",-1))]),d("div",O,[a[12]||(a[12]=d("label",{class:"block text-sm font-medium text-gray-700 mb-2"}," Meta Anahtar Kelimeler ",-1)),b(d("input",{"onUpdate:modelValue":a[2]||(a[2]=e=>B.value.metaKeywords=e),type:"text",class:"w-full px-3 py-2 border border-gray-300 rounded-md",placeholder:"Örnek: seo, web tasarım, dijital pazarlama (virgülle ayırın)"},null,512),[[p,B.value.metaKeywords]]),a[13]||(a[13]=d("p",{class:"mt-1 text-sm text-gray-500"},"Anahtar kelimeleri virgülle ayırarak yazın",-1))])]),d("div",j,[a[16]||(a[16]=d("h3",{class:"text-xl font-semibold mb-4"},"Robots.txt",-1)),d("div",E,[a[15]||(a[15]=d("label",{class:"block text-sm font-medium text-gray-700 mb-2"}," Robots.txt İçeriği ",-1)),b(d("textarea",{"onUpdate:modelValue":a[3]||(a[3]=e=>B.value.robotsTxt=e),class:"w-full px-3 py-2 border border-gray-300 rounded-md font-mono",rows:"6",placeholder:"User-agent: *\nAllow: /\nDisallow: /admin/"},null,512),[[p,B.value.robotsTxt]])])]),d("div",T,[a[20]||(a[20]=d("h3",{class:"text-xl font-semibold mb-4"},"Site Haritası",-1)),d("div",V,[b(d("input",{"onUpdate:modelValue":a[4]||(a[4]=e=>B.value.autoGenerateSitemap=e),type:"checkbox",class:"h-4 w-4 text-blue-600",id:"autoGenerate"},null,512),[[y,B.value.autoGenerateSitemap]]),a[17]||(a[17]=d("label",{for:"autoGenerate",class:"ml-2 text-sm text-gray-700"}," Site haritasını otomatik oluştur ",-1))]),d("div",G,[b(d("input",{"onUpdate:modelValue":a[5]||(a[5]=e=>B.value.includeImagesSitemap=e),type:"checkbox",class:"h-4 w-4 text-blue-600",id:"includeImages"},null,512),[[y,B.value.includeImagesSitemap]]),a[18]||(a[18]=d("label",{for:"includeImages",class:"ml-2 text-sm text-gray-700"}," Görselleri site haritasına dahil et ",-1))]),d("div",M,[b(d("input",{"onUpdate:modelValue":a[6]||(a[6]=e=>B.value.submitToSearchEngines=e),type:"checkbox",class:"h-4 w-4 text-blue-600",id:"submitToSearchEngines"},null,512),[[y,B.value.submitToSearchEngines]]),a[19]||(a[19]=d("label",{for:"submitToSearchEngines",class:"ml-2 text-sm text-gray-700"}," Site haritasını arama motorlarına otomatik gönder ",-1))]),d("div",K,[d("button",{type:"button",onClick:F,class:"px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",disabled:H.value},x(H.value?"Oluşturuluyor...":"Site Haritası Oluştur"),9,A),d("button",{type:"button",onClick:q,class:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",disabled:Y.value},x(Y.value?"Gönderiliyor...":"Arama Motorlarına Gönder"),9,I)])]),d("div",R,[a[23]||(a[23]=d("h3",{class:"text-xl font-semibold mb-4"},"URL Yapısı",-1)),d("div",z,[a[22]||(a[22]=d("label",{class:"block text-sm font-medium text-gray-700 mb-2"}," URL Formatı ",-1)),b(d("select",{"onUpdate:modelValue":a[7]||(a[7]=e=>B.value.urlStructure=e),class:"w-full px-3 py-2 border border-gray-300 rounded-md"},a[21]||(a[21]=[d("option",{value:"plain"},"Düz URL (/sayfa-basligi)",-1),d("option",{value:"category"},"Kategorili URL (/kategori/sayfa-basligi)",-1)]),512),[[v,B.value.urlStructure]])])]),d("div",D,[d("button",{type:"submit",class:"px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700",disabled:C.value},x(C.value?"Kaydediliyor...":"Kaydet"),9,P)])],32)])]))}});export{L as default};
