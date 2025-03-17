import{d as g,z as _,r as h,o as v,m as y,a as f,c as a,b as l,e,f as w,F as c,h as u,n as k,t as o,u as p,i as B,w as j,_ as z}from"./index-Cnce9ua8.js";const D={class:"min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16"},S={class:"container mx-auto px-4"},C={class:"flex flex-wrap justify-center gap-4 mb-12"},T=["onClick"],V={key:0,class:"text-center py-12"},E={key:1,class:"text-center py-12"},O={class:"text-red-400"},N={key:2,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"},F={class:"aspect-w-16 aspect-h-9 relative"},L=["src","alt"],M={class:"p-6"},Y={class:"flex items-center gap-2 mb-4"},A={class:"px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"},G={class:"text-gray-400 text-sm"},H={class:"text-xl font-bold text-white mb-3 line-clamp-2"},I={class:"text-gray-300 mb-4 line-clamp-3"},K={class:"flex items-center justify-between"},P={class:"flex gap-2"},R=g({__name:"BlogView",setup(W){const r=_(),n=h("Tümü"),b=["Tümü","Dijital Pazarlama","Web Tasarım","SEO","Sosyal Medya","Yapay Zeka"];v(async()=>{await r.fetchBlogs()});const m=y(()=>{const d=r.getBlogs;return n.value==="Tümü"?d:d.filter(s=>s.category_name===n.value)});return(d,s)=>{const x=f("router-link");return l(),a("div",D,[e("div",S,[s[4]||(s[4]=e("div",{class:"text-center mb-16"},[e("h1",{class:"text-4xl md:text-5xl font-bold text-white mb-6"}," Blog "),e("p",{class:"text-xl text-gray-300 max-w-3xl mx-auto"}," Dijital pazarlama, web tasarım ve teknoloji dünyasından en güncel içerikler. ")],-1)),e("div",C,[(l(),a(c,null,u(b,t=>e("button",{key:t,class:k(["px-6 py-2 rounded-full transition-all duration-300",{"bg-blue-600 text-white":n.value===t,"bg-white/10 text-gray-300 hover:bg-white/20":n.value!==t}]),onClick:i=>n.value=t},o(t),11,T)),64))]),p(r).loading?(l(),a("div",V,s[1]||(s[1]=[e("div",{class:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"},null,-1),e("p",{class:"mt-4 text-gray-300"},"Blog yazıları yükleniyor...",-1)]))):p(r).error?(l(),a("div",E,[e("p",O,o(p(r).error),1)])):(l(),a("div",N,[(l(!0),a(c,null,u(m.value,t=>(l(),a("div",{key:t.id,class:"blog-card bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"},[B(x,{to:"/blog/"+t.id},{default:j(()=>[e("div",F,[e("img",{src:t.featured_image,alt:t.title,loading:"lazy",decoding:"async",class:"w-full h-full object-cover",onError:s[0]||(s[0]=i=>i.target.src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")},null,40,L),s[2]||(s[2]=e("div",{class:"absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"},null,-1))]),e("div",M,[e("div",Y,[e("span",A,o(t.category_name),1),e("span",G,o(new Date(t.published_at).toLocaleDateString("tr-TR")),1)]),e("h3",H,o(t.title),1),e("p",I,o(t.excerpt),1),e("div",K,[s[3]||(s[3]=e("span",{class:"text-blue-400 font-medium"},"Devamını Oku",-1)),e("div",P,[(l(!0),a(c,null,u((t.tags||[]).slice(0,2),i=>(l(),a("span",{key:i,class:"text-sm text-gray-400"}," #"+o(i),1))),128))])])])]),_:2},1032,["to"])]))),128))])),s[5]||(s[5]=w('<div class="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center" data-v-ebdab89c><h2 class="text-2xl font-bold text-white mb-4" data-v-ebdab89c> Yeni İçeriklerden Haberdar Olun </h2><p class="text-gray-300 mb-6" data-v-ebdab89c> Dijital pazarlama ve teknoloji dünyasındaki son gelişmeleri kaçırmayın. </p><form class="max-w-md mx-auto flex gap-4" data-v-ebdab89c><input type="email" placeholder="E-posta adresiniz" class="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500" data-v-ebdab89c><button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-ebdab89c> Abone Ol </button></form></div>',1))])])}}}),$=z(R,[["__scopeId","data-v-ebdab89c"]]);export{$ as default};
