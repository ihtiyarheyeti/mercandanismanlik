import{d as w,r as l,c as o,b as d,e as t,k as n,s as u,f as p,F as x,h as m,t as i,n as h,j as b}from"./index-Bj8UE4BS.js";const S={class:"bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8"},T={class:"grid grid-cols-1 md:grid-cols-4 gap-4"},_=["value"],D={class:"bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"},V={class:"overflow-x-auto"},A={class:"w-full"},B={class:"bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"},G={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"},U={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"},K={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"},L={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"},z={class:"px-6 py-4 whitespace-nowrap"},C={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"},j={class:"bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700"},E={class:"flex-1 flex justify-between items-center"},I={class:"text-sm text-gray-700 dark:text-gray-300"},N={class:"font-medium"},F={class:"relative z-0 inline-flex rounded-md shadow-sm -space-x-px"},H=["disabled"],O=["disabled"],P=w({__name:"LogsView",setup($){const r=l({tarihAraligi:"bugun",logTipi:"tumu",kullanici:"tumu",seviye:"tumu"}),k=l([{id:1,ad:"Admin"},{id:2,ad:"Editor"},{id:3,ad:"User"}]),v=l([{id:1,tarih:new Date().toISOString(),kullanici:"Admin",islem:"Giriş",ip:"192.168.1.1",seviye:"bilgi",detay:"Başarılı giriş"},{id:2,tarih:new Date().toISOString(),kullanici:"Editor",islem:"İçerik Düzenleme",ip:"192.168.1.2",seviye:"uyari",detay:"Blog yazısı güncellendi"}]),s=l(1),c=l(100),f=l(10),g=y=>{s.value=y};return(y,e)=>(d(),o("div",null,[e[17]||(e[17]=t("h2",{class:"text-2xl font-bold text-gray-900 dark:text-white mb-8"},"Güvenlik ve Log Yönetimi",-1)),t("div",S,[t("div",T,[t("div",null,[e[7]||(e[7]=t("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Tarih Aralığı ",-1)),n(t("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>r.value.tarihAraligi=a),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},e[6]||(e[6]=[t("option",{value:"bugun"},"Bugün",-1),t("option",{value:"dun"},"Dün",-1),t("option",{value:"hafta"},"Son 7 Gün",-1),t("option",{value:"ay"},"Son 30 Gün",-1)]),512),[[u,r.value.tarihAraligi]])]),t("div",null,[e[9]||(e[9]=t("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Log Tipi ",-1)),n(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>r.value.logTipi=a),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},e[8]||(e[8]=[p('<option value="tumu">Tümü</option><option value="giris">Giriş İşlemleri</option><option value="hata">Hatalar</option><option value="degisiklik">Değişiklikler</option><option value="guvenlik">Güvenlik</option>',5)]),512),[[u,r.value.logTipi]])]),t("div",null,[e[11]||(e[11]=t("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Kullanıcı ",-1)),n(t("select",{"onUpdate:modelValue":e[2]||(e[2]=a=>r.value.kullanici=a),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},[e[10]||(e[10]=t("option",{value:"tumu"},"Tüm Kullanıcılar",-1)),(d(!0),o(x,null,m(k.value,a=>(d(),o("option",{key:a.id,value:a.id},i(a.ad),9,_))),128))],512),[[u,r.value.kullanici]])]),t("div",null,[e[13]||(e[13]=t("label",{class:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"}," Seviye ",-1)),n(t("select",{"onUpdate:modelValue":e[3]||(e[3]=a=>r.value.seviye=a),class:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"},e[12]||(e[12]=[p('<option value="tumu">Tüm Seviyeler</option><option value="bilgi">Bilgi</option><option value="uyari">Uyarı</option><option value="hata">Hata</option><option value="kritik">Kritik</option>',5)]),512),[[u,r.value.seviye]])])])]),t("div",D,[t("div",V,[t("table",A,[e[14]||(e[14]=t("thead",null,[t("tr",{class:"bg-gray-50 dark:bg-gray-700"},[t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"}," Tarih/Saat "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"}," Kullanıcı "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"}," İşlem "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"}," IP Adresi "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"}," Seviye "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"}," Detay ")])],-1)),t("tbody",B,[(d(!0),o(x,null,m(v.value,a=>(d(),o("tr",{key:a.id},[t("td",G,i(new Date(a.tarih).toLocaleString("tr-TR")),1),t("td",U,i(a.kullanici),1),t("td",K,i(a.islem),1),t("td",L,i(a.ip),1),t("td",z,[t("span",{class:h({"px-2 py-1 text-xs rounded-full":!0,"bg-blue-100 text-blue-800":a.seviye==="bilgi","bg-yellow-100 text-yellow-800":a.seviye==="uyari","bg-red-100 text-red-800":a.seviye==="hata","bg-purple-100 text-purple-800":a.seviye==="kritik"})},i(a.seviye),3)]),t("td",C,i(a.detay),1)]))),128))])])]),t("div",j,[t("div",E,[t("div",null,[t("p",I,[e[15]||(e[15]=b(" Toplam ")),t("span",N,i(c.value),1),e[16]||(e[16]=b(" kayıt "))])]),t("div",null,[t("nav",F,[t("button",{class:"relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",disabled:s.value===1,onClick:e[4]||(e[4]=a=>g(s.value-1))}," Önceki ",8,H),t("button",{class:"relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",disabled:s.value===f.value,onClick:e[5]||(e[5]=a=>g(s.value+1))}," Sonraki ",8,O)])])])])])]))}});export{P as default};
