(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{50:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t),a.d(t,"history",(function(){return Me}));var c=a(41),r=a(42),s=a(45),n=a(44),i=a(1),l=a.n(i),d=a(21),o=a.n(d),j=a(9),u=(a(50),a(17)),h=a(4),b=a(14),m=a(0),p=a(16),x={name:"",email:"",token:""};try{x=JSON.parse(document.cookie)}catch(Te){document.cookie=JSON.stringify(x)}var O="";O=/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0];var g={name:x.name,email:x.email,balance:0,base:O,request_params:{baseURL:O+"/api",timeout:3e4,headers:{"Content-Type":"application/json",Authorization:x.token}}},v=Object(p.b)({name:"auth",initialState:g,reducers:{setSession:function(e,t){var a=t.payload,c=a.name,r=a.email,s={name:c,email:r,token:"Bearer "+a.token};document.cookie=JSON.stringify(s),e.name=c,e.email=r,e.request_params={baseURL:"/wf/api",timeout:3e4,headers:{"Content-Type":"application/json",Authorization:s.token}}},rename:function(e,t){var a=JSON.parse(document.cookie);a.name=t.payload,document.cookie=JSON.stringify(a),e.name=t.payload},updBalance:function(e,t){var a=t.payload.balance;e.balance=a}}}),f=v.actions,N=f.setSession,w=f.rename,y=f.updBalance,_=v.reducer,k=a(13),S=[a.p+"static/media/HongKong.2db06be5.jpg",a.p+"static/media/San Francisco.56cbe460.jpg",a.p+"static/media/NewYork.654f4089.jpg",a.p+"static/media/Paris.1275a43d.jpg"],F={city:{},page:new Array(S.length).fill({index:0,active:["green lighten-4","",""]})},C=Object(p.b)({name:"stats",initialState:F,reducers:{update_stat:function(e,t){for(var a=0,c=Object.entries(t.payload);a<c.length;a++){var r=Object(k.a)(c[a],2),s=r[0],n=r[1];e.city[s]=n}},page_city_push:function(e,t){e.page.push(t.payload)},page_city_change:function(e,t){e.page[t.payload.index]=t.payload.payload}}}),P=C.actions,U=P.update_stat,q=(P.page_city_push,P.page_city_change),M=C.reducer,T=a(2),R=a.n(T),B=a(6),E=a(31),H=a(25),L=Object(p.b)({name:"derivative",initialState:{daily:{},page:{city:"",temp:{temp:"0",image:"wb_sunny"},rich:!0,tempRate:"0 USD",quantity:"1",private_derivative:!0}},reducers:{init_page:function(e,t){e.page=t.payload},setCity:function(e,t){e.page.city=t.payload},setTemp:function(e,t){e.page.temp=t.payload},setRich:function(e,t){e.page.rich=t.payload},setTempRate:function(e,t){e.page.tempRate=t.payload},setQuantity:function(e,t){e.page.quantity=t.payload},setPrivate_derivative:function(e,t){e.page.private_derivative=t.payload},update_rate:function(e,t){t.payload.city in e.daily||(e.daily[t.payload.city]={temp:[],rate:[],rate2:[],expected_value:0,standard_deviation:0}),e.daily[t.payload.city]={temp:t.payload.temp,rate:t.payload.rate,rate2:t.payload.rate2,standard_deviation:t.payload.standard_deviation,expected_value:t.payload.expected_value}}}}),W=L.actions,D=W.update_rate,I=W.init_page,A=W.setCity,z=W.setTemp,J=W.setRich,Q=W.setTempRate,V=W.setQuantity,Z=W.setPrivate_derivative,$=L.reducer,G=a(18).default,K=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Y=function(e,t,a,c){var r;return 0===e?r=a<t?0:1:(r=Math.round(1e5*function(e){var t=1/(1+.2316419*Math.abs(e)),a=.3989423*Math.exp(-e*e/2)*t*(.3193815+t*(t*(1.781478+t*(1.330274*t-1.821256))-.3565638));return e>0&&(a=1-a),a}((a-t)/e))/1e5,c&&(r=1-r)),1.05*r},X=function(e,t,a){console.log("upd"),""!==t().auth.name&&G.create(t().auth.request_params).post("/derivative/daily_params").then((function(c){c.data.stats.forEach((function(t){var a,c,r=2;do{a=[],c=[];for(var s=0;s<5;s++)a.push(t.expected_value-(2-s)*r);var n,i=Object(E.a)(a);try{for(i.s();!(n=i.n()).done;){var l=n.value,d=Y(t.standard_deviation,t.expected_value,l,!0);c.push(d)}}catch(b){i.e(b)}finally{i.f()}r/=2}while(Math.max.apply(Math,Object(H.a)(c))>1);var o,j=[],u=Object(E.a)(c);try{for(u.s();!(o=u.n()).done;){var h=o.value;j.push(1-h)}}catch(b){u.e(b)}finally{u.f()}e(D({city:t.name,rate:c,rate2:j,temp:a,expected_value:t.expected_value,standard_deviation:t.standard_deviation}))})),a&&(console.log(a),e(I({city:a,temp:{temp:"0",image:"wb_sunny"},quantity:"1",tempRate:Math.round(1e4*(Y(t().derivative.daily[a].standard_deviation,t().derivative.daily[a].expected_value,0,!0)+Number.EPSILON))/100+" %",private_derivative:!0,rich:!0})))})).catch((function(e){return console.log(e)}))},ee=function(e,t){var a=t().derivative.page.city,c=Y(t().derivative.daily[a].standard_deviation,t().derivative.daily[a].expected_value,t().derivative.page.temp.temp,t().derivative.page.rich);console.log(c),e(Q(Math.round(1e4*(c+Number.EPSILON))/100+" %"))},te=a(8),ae=a(5),ce=a(18).default,re=a(18).default,se=a(18).default,ne="";console.log("NODE_ENV"),ne=/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0];var ie=Object(p.b)({name:"weather",initialState:{weather:{},page:{temp:{temp:"0",image:"wb_sunny"},quantity:"1",rich:!0,city:"Moscow",rate:"0 %",amount:"0 USD",hidden:!0}},reducers:{update_weather:function(e,t){e.weather=t.payload}}}),le=ie.actions.update_weather,de=ie.reducer,oe=Object(p.a)({reducer:{auth:_,weather:de,derivative:$,stats:M}}),je=a(18).default,ue=function(e){return new Promise((function(t){return setTimeout(t,e)}))},he=function(e,t){""!==t().auth.name&&je.create(t().auth.request_params).post("/profile/balance").then((function(t){e(y(t.data))}))},be=function(){return function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return he(t,a),e.abrupt("return",Promise.resolve());case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},me=a(18).default,pe=Object(b.b)((function(){return function(e){return{stats:e.stats,baseUrl:e.auth.base}}}),{page_city_change:q})((function(e){var t=e.stats,a=e.page_city_change,c=(e.baseUrl,Object.entries(t.city).map((function(e,c){var r=["No futures","Quantity of futures: "+e[1].length,""];0!==e[1].length&&(r[0]=e[1].map((function(e,t){return function(e,t){return Object(m.jsx)("table",{className:[0].map((function(e){return t%2===0?"striped collection-item yellow lighten-4 grey-text text-darken-3":"striped collection-item green lighten-4 grey-text text-darken-3"}))[0],children:Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Paid"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.paid+" USD"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Temperature"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.temp})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Quantity"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.quantity})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Rises above"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.temp_reach.toString()})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Privacy"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.hidden.toString()})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Duration"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.duration})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Duration left"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.duration_left})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Buyer's email"}),Object(m.jsx)("td",{className:"statistics_table_right",children:e.email})]})]})})}(e,t)}))),void 0===t.page[c]&&window.location.replace("about");var s=[];return s.push(Object(m.jsxs)("div",{className:"card",children:[Object(m.jsxs)("div",{className:"card-image",children:[Object(m.jsx)("img",{className:"statistics_img",src:S[c],alt:e[0]}),Object(m.jsx)("span",{className:"card-title",children:e[0]})]}),Object(m.jsx)("div",{className:"card-tabs",children:Object(m.jsxs)("ul",{className:"tabs tabs-fixed-width",children:[Object(m.jsx)("li",{className:"tab statistics_pointer",onClick:function(){a({index:c,payload:{index:0,active:["green lighten-4","",""]}})},children:Object(m.jsx)("p",{className:t.page[c].active[0],children:"Futures"})}),Object(m.jsx)("li",{className:"tab statistics_pointer",onClick:function(){a({index:c,payload:{index:1,active:["","green lighten-4",""]}})},children:Object(m.jsx)("p",{className:t.page[c].active[1],children:"Statistic"})})]})})]})),s.concat(r[t.page[c].index])}))),r=[],s=0;do{r.push(Object(m.jsx)("tr",{children:c.map((function(e){return e.length>s?Object(m.jsx)("td",{className:"",children:e[s]}):Object(m.jsx)("td",{})}))})),s++}while(Math.max.apply(Math,Object(H.a)(c.map((function(e){return e.length}))))>s);return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"statistic",className:"breadcrumb",children:"Statistic"})]})})}),Object(m.jsx)("table",{children:Object(m.jsx)("tbody",{children:r})})]})})),xe=Object(b.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}))((function(e){var t=e.auth.name;return""===t?Object(m.jsx)("nav",{children:Object(m.jsxs)("div",{className:"nav-wrapper",children:[Object(m.jsx)("a",{href:"",className:"brand-logo",children:"Forecast Trading"}),Object(m.jsx)("ul",{id:"nav-mobile",className:"right hide-on-med-and-down",children:Object(m.jsx)("li",{children:Object(m.jsx)(u.b,{to:"login",children:"Hello, Guest!"})})})]})}):Object(m.jsx)("nav",{children:Object(m.jsxs)("div",{className:"nav-wrapper",children:[Object(m.jsx)("a",{href:"",className:"brand-logo",children:"Forecast Trading"}),Object(m.jsxs)("ul",{id:"nav-mobile",className:"right hide-on-med-and-down",children:[Object(m.jsx)("li",{children:Object(m.jsx)(u.b,{to:"weather",children:"Weather"})}),Object(m.jsx)("li",{children:Object(m.jsx)(u.b,{to:"statistic",children:"Statistic"})}),Object(m.jsx)("li",{children:Object(m.jsx)(u.b,{to:"futures",children:"Futures"})}),Object(m.jsx)("li",{children:Object(m.jsxs)(u.b,{to:"about",children:["Hello, ",t,"!"]})})]})]})})})),Oe=Object(b.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}),{rename:w,setSession:N,updateBalance:be})((function(e){var t=e.auth,a=e.rename,c=e.setSession,r=(e.baseUrl,e.updateBalance),s=Object(i.useState)({username:{msg:"",state:""},password:{msg:"",state:""}}),n=Object(k.a)(s,2),l=n[0],d=n[1],o=Object(i.useState)({message:"",color:"gray"}),j=Object(k.a)(o,2),u=j[0],h=j[1],b=Object(i.useState)({message:"",color:"gray"}),p=Object(k.a)(b,2),x=p[0],O=p[1],g=function(e){d(Object(ae.a)(Object(ae.a)({},l),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:" active"})))},v=function(e){d(Object(ae.a)(Object(ae.a)({},l),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:" active"})))},f=function(e){""===e.target.value&&d(Object(ae.a)(Object(ae.a)({},l),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:""})))},N=se.create(t.request_params);return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"about",className:"breadcrumb",children:"About"})]})})}),Object(m.jsxs)("div",{className:"row about_container",children:[Object(m.jsx)("div",{className:"row",children:Object(m.jsxs)("div",{className:"collection about_internal_container",children:[Object(m.jsx)("p",{className:"collection-item black-text",children:"Email:    "+t.email}),Object(m.jsx)("p",{className:"collection-item black-text",children:"Username: "+t.name}),Object(m.jsx)("p",{className:"collection-item black-text",children:"Balance:    "+t.balance})]})}),Object(m.jsx)("div",{className:"card-action",children:Object(m.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){N.post("/profile/reset_balance",{username:l.username.msg}).then((function(e){r()})).catch((function(e){return h({message:e.response.data.message,color:"red"})}))},children:"Reset balance to 100 000 USD"})}),Object(m.jsx)("form",{className:"col s12",children:Object(m.jsx)("div",{className:"row",children:Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"border_color"}),Object(m.jsx)("input",{id:"username",name:"username",type:"text",value:l.username.msg,onChange:g,onFocus:v,onBlur:f}),Object(m.jsx)("label",{htmlFor:"username",className:"username"+l.username.state,children:"New username"})]})})}),Object(m.jsx)("div",{className:"card-action",children:Object(m.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){N.post("/profile/rename",{username:l.username.msg}).then((function(e){a(e.data.username),h({message:"Welcome, "+e.data.username+"!",color:"green"})})).catch((function(e){return h({message:e.response.data.message,color:"red"})}))},children:"Change username"})}),Object(m.jsx)("div",{className:"alert "+u.color+"-text text-lighten-1",children:u.message}),Object(m.jsx)("form",{className:"col s12",children:Object(m.jsx)("div",{className:"row",children:Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"more_horiz"}),Object(m.jsx)("input",{id:"password",name:"password",type:"password",value:l.password.msg,onChange:g,onFocus:v,onBlur:f}),Object(m.jsx)("label",{htmlFor:"password",className:"password"+l.password.state,children:"New password"})]})})}),Object(m.jsx)("div",{className:"card-action",children:Object(m.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){N.post("/profile/chpasswd",{password:l.password.msg}).then((function(e){O({message:"Password has changed",color:"green"})})).catch((function(e){return O({message:e.response.data.message,color:"red"})}))},children:"Change password"})}),Object(m.jsx)("div",{className:"alert "+x.color+"-text text-lighten-1",children:x.message}),Object(m.jsx)("div",{className:"card-action about_card_btn",children:Object(m.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){c({email:"",name:"",token:""}),window.location.replace("login")},children:"Logout"})})]})]})})),ge=Object(b.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}))((function(e){var t=e.auth,a=(e.baseUrl,Object(i.useState)({email:{msg:"",state:"adduser_label"},password:{msg:"",state:"adduser_label"},username:{msg:"",state:"adduser_label"}})),c=Object(k.a)(a,2),r=c[0],s=c[1],n=Object(i.useState)({message:"",color:"gray",errors:{email:"",password:"",username:""}}),l=Object(k.a)(n,2),d=l[0],o=l[1],j=function(e){s(Object(ae.a)(Object(ae.a)({},r),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:"adduser_label active"})))},u=function(e){s(Object(ae.a)(Object(ae.a)({},r),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:"adduser_label active"})))},h=function(e){""===e.target.value&&s(Object(ae.a)(Object(ae.a)({},r),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:"adduser_label"})))},b=re.create(t.request_params),p=function(){var e=Object(B.a)(R.a.mark((function e(){var t;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=function(e){var t={email:"",password:"",username:""},a=e.find((function(e){return"email"===e.param}));a&&(t.email=a.msg);var c=e.find((function(e){return"username"===e.param}));c&&(t.username=c.msg);var r=e.find((function(e){return"password"===e.param}));return r&&(t.password=r.msg),t},b.post("/auth/register",{email:r.email.msg,username:r.username.msg,password:r.password.msg}).then((function(e){o({message:e.data.message,color:"green",errors:{email:"",password:"",username:""}}),window.location.replace("login")})).catch((function(e){return o({message:null!=e.response.data?e.response.data.message:e.data.message,color:"red",errors:e.response&&e.response.data.errors?t(e.response.data.errors):{email:"",password:"",username:""}})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"register",className:"breadcrumb",children:"Register"})]})})}),Object(m.jsxs)("form",{action:"../.html",className:"col autocomplete-content s12",children:[Object(m.jsxs)("div",{className:"row",children:[Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"email"}),Object(m.jsx)("input",{id:"email",name:"email",type:"text",value:r.email.msg,onChange:j,onFocus:u,onBlur:h}),Object(m.jsx)("label",{htmlFor:"email",className:r.email.state,children:"Email"})]}),Object(m.jsx)("div",{className:"row adduser_error",children:d.errors.email})]}),Object(m.jsxs)("div",{className:"row",children:[Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"border_color"}),Object(m.jsx)("input",{id:"username",name:"username",type:"text",value:r.username.msg,onChange:j,onFocus:u,onBlur:h}),Object(m.jsx)("label",{htmlFor:"username",className:r.username.state,children:"User name"})]}),Object(m.jsx)("div",{className:"row adduser_error",children:d.errors.username})]}),Object(m.jsxs)("div",{className:"row",children:[Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"more_horiz"}),Object(m.jsx)("input",{id:"password",name:"password",type:"password",value:r.password.msg,onChange:j,onFocus:u,onBlur:h}),Object(m.jsx)("label",{htmlFor:"password",className:r.password.state,children:"Password"})]}),Object(m.jsx)("div",{className:"row adduser_error",children:d.errors.password})]})]}),Object(m.jsx)("div",{className:"card-action",children:Object(m.jsx)("button",{className:"btn adduser_btn green lighten-2 black-text",onClick:p,children:"Register new User"})}),Object(m.jsx)("br",{}),Object(m.jsx)("div",{className:"alert adduser_alert "+d.color+"-text text-lighten-1",children:d.message})]})})),ve=Object(b.b)((function(){return function(e){return{weather:e.weather,baseUrl:e.auth.base}}}))((function(e){var t=e.weather,a=(e.baseUrl,Object(h.g)().city),c=Object(m.jsx)("div",{className:"progress",children:Object(m.jsx)("div",{className:"indeterminate"})});return void 0!==t.weather[a]&&(c=t.weather[a].hourly_temp.map((function(e,c){return Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:3*c}),Object(m.jsx)("td",{children:t.weather[a].hourly_temp[c]}),Object(m.jsx)("td",{children:t.weather[a].hourly_wind_speed[c]}),Object(m.jsx)("td",{children:t.weather[a].hourly_clouds[c]}),Object(m.jsx)("td",{children:t.weather[a].hourly_pressure[c]}),Object(m.jsx)("td",{children:t.weather[a].hourly_humidity[c]}),Object(m.jsx)("td",{children:t.weather[a].hourly_visibility[c]})]})}))),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"weather",className:"breadcrumb",children:"Weather"}),Object(m.jsx)("a",{href:"weather/"+a,className:"breadcrumb",children:"Forecast for "+a})]})})}),Object(m.jsxs)("table",{children:[Object(m.jsx)("thead",{children:Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Hours"}),Object(m.jsx)("th",{children:"Temperature"}),Object(m.jsx)("th",{children:"Wind speed"}),Object(m.jsx)("th",{children:"Cloudiness"}),Object(m.jsx)("th",{children:"Pressure"}),Object(m.jsx)("th",{children:"Humidity"}),Object(m.jsx)("th",{children:"Visibility"})]})}),Object(m.jsx)("tbody",{children:c})]})]})})),fe=Object(b.b)((function(){return function(e){return{weather:e.weather,baseUrl:e.auth.base}}}))((function(e){var t=e.weather,a=(e.baseUrl,Object.entries(t.weather).map((function(e,t){return Object(m.jsx)("td",{onClick:function(){return window.location.replace(ne+"forecast/"+e[0])},children:Object(m.jsxs)("div",{className:"card",children:[Object(m.jsxs)("div",{className:"card-image",children:[Object(m.jsx)("img",{src:S[t],alt:e[0],className:"weather_img"}),Object(m.jsx)("span",{className:"card-title",children:e[0]})]}),Object(m.jsx)("div",{className:"card-content",children:Object(m.jsx)("table",{children:Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Temperature"}),Object(m.jsx)("td",{className:"weather_table_right",children:Math.round(100*(e[1].current_temp+Number.EPSILON))/100+" \xb0\u0421"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Wind speed"}),Object(m.jsx)("td",{className:"weather_table_right",children:e[1].current_wind_speed+" meter/sec"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Cloudiness"}),Object(m.jsx)("td",{className:"weather_table_right",children:e[1].current_clouds+" %"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Pressure"}),Object(m.jsx)("td",{className:"weather_table_right",children:e[1].current_pressure+" hPa"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Humidity"}),Object(m.jsx)("td",{className:"weather_table_right",children:e[1].current_humidity+" %"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Visibility"}),Object(m.jsx)("td",{className:"weather_table_right",children:e[1].current_visibility+" metres"})]})]})})})]})})})));return a===[]&&(a=Object(m.jsx)("div",{className:"progress",children:Object(m.jsx)("div",{className:"indeterminate"})})),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"weather",className:"breadcrumb",children:"Weather"})]})})}),Object(m.jsx)("table",{children:Object(m.jsx)("tr",{children:a})})]})})),Ne=Object(b.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}),{setSession:N})((function(e){var t=e.auth,a=e.setSession;e.baseUrl;console.log(t);var c=Object(i.useState)({email:{msg:"",state:""},password:{msg:"",state:""}}),r=Object(k.a)(c,2),s=r[0],n=r[1],l=Object(i.useState)({message:"",color:"gray"}),d=Object(k.a)(l,2),o=d[0],j=d[1],u=function(e){n(Object(ae.a)(Object(ae.a)({},s),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:" active"})))},h=function(e){n(Object(ae.a)(Object(ae.a)({},s),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:" active"})))},b=function(e){""===e.target.value&&n(Object(ae.a)(Object(ae.a)({},s),{},Object(te.a)({},e.target.name,{msg:e.target.value,state:""})))},p=ce.create(t.request_params);return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"login",className:"breadcrumb",children:"Login"})]})})}),Object(m.jsxs)("div",{className:"row login_cont",children:[Object(m.jsx)("form",{className:"col s12",children:Object(m.jsxs)("div",{className:"row",children:[Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"email"}),Object(m.jsx)("input",{id:"email",name:"email",type:"text",value:s.email.msg,onChange:u,onFocus:h,onBlur:b}),Object(m.jsx)("label",{htmlFor:"email",className:"email"+s.email.state,children:"Email"})]}),Object(m.jsxs)("div",{className:"input-field col s6",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"more_horiz"}),Object(m.jsx)("input",{id:"password",name:"password",type:"password",value:s.password.msg,onChange:u,onFocus:h,onBlur:b}),Object(m.jsx)("label",{htmlFor:"password",className:"password"+s.password.state,children:"Password"})]})]})}),Object(m.jsxs)("div",{className:"card-action",children:[Object(m.jsx)("button",{className:"btn login_btn green lighten-2 black-text",onClick:function(){p.post("/auth/login",{email:s.email.msg,password:s.password.msg}).then((function(e){a({email:e.data.email,name:e.data.username,token:e.data.token}),j({message:"Welcome, "+e.data.username+"!",color:"green"}),window.location.replace("about")})).catch((function(e){return j({message:e.response.data?e.response.data.message:e.data.message,color:"red"})}))},children:"Login"}),Object(m.jsx)("a",{className:"btn register_btn grey lighten-1 black-text",href:"register",children:"Register new User"})]}),Object(m.jsx)("div",{className:"alert login_alert "+o.color+"-text text-lighten-1",children:o.message})]})]})})),we=Object(b.b)((function(){return function(e){return{auth:e.auth,weather0:e.weather,derivative0:e.derivative,baseUrl:e.auth.base}}}),{changeCity:function(e){return function(){var t=Object(B.a)(R.a.mark((function t(a,c){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a(A(e)),ee(a,c);case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},changeTemp:function(e){return function(){var t=Object(B.a)(R.a.mark((function t(a,c){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:/^(-?[0-9]*\.?[0-9]*)$/.test(e.target.value)&&("NaN"===Number.parseFloat(e.target.value).toString()?"-"===e.target.value?(a(z({temp:"-0",image:"ac_unit"})),ee(a,c)):"."===e.target.value?(a(z({temp:"0.",image:"wb_sunny"})),ee(a,c)):""===e.target.value?(a(z({temp:"0",image:"wb_sunny"})),ee(a,c)):(a(z({temp:e.target.value,image:"border_color"})),ee(a,c)):(console.log(e.target.value),Number.parseFloat(e.target.value)<0?(a(z({temp:e.target.value,image:"ac_unit"})),ee(a,c)):(a(z({temp:e.target.value,image:"wb_sunny"})),ee(a,c))));case 1:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},changeRich:function(){return function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(J(!a().derivative.page.rich)),ee(t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},changeQuantity:function(e){return function(){var t=Object(B.a)(R.a.mark((function t(a,c){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:/^[1-9][0-9]*$/.test(e.target.value)&&a(V(e.target.value)),ee(a,c);case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},changePrivate_derivative:function(){return function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(Z(!a().derivative.page.private_derivative)),ee(t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()}})((function(e){var t=e.auth,a=e.weather0,c=e.derivative0,r=e.changeCity,s=e.changeTemp,n=e.changeRich,i=e.changeQuantity,l=e.changePrivate_derivative,d=(e.baseUrl,c.page.city),o=c.page.temp,j=c.page.rich,u=me.create(t.request_params),h=c.daily[d],b=c.page.tempRate,p=c.page.private_derivative,x=c.page.quantity,O=Object(m.jsx)("div",{className:"progress",children:Object(m.jsx)("div",{className:"indeterminate"})});void 0!==a.weather&&(O=Object.entries(a.weather).map((function(e,t){return Object(m.jsx)("td",{onClick:function(){r(e[0])},children:Object(m.jsx)("div",{className:"card",children:Object(m.jsxs)("div",{className:"card-image",children:[Object(m.jsx)("img",{className:"futures_img",src:S[t],alt:e[0]}),Object(m.jsx)("span",{className:"card-title",children:e[0]})]})})})})));var g=Object(m.jsx)("div",{className:"progress",children:Object(m.jsx)("div",{className:"indeterminate"})});void 0!==h&&(g=h.temp.map((function(e,t){return Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:Math.round(100*(e+Number.EPSILON))/100+" \xb0C"}),Object(m.jsx)("td",{className:"text_center",children:Math.round(1e3*(h.rate[t]+Number.EPSILON))/10+" %"}),Object(m.jsx)("td",{className:"text_right",children:Math.round(1e3*(h.rate2[t]+Number.EPSILON))/10+" %"})]})})));var v=t.balance,f=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h4",{className:"grey-text text-darken-3",children:d}),Object(m.jsx)("div",{className:"progress",children:Object(m.jsx)("div",{className:"indeterminate"})})]});return""!==d&&(f=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h4",{className:"grey-text text-darken-3",children:d}),Object(m.jsxs)("div",{className:"row",children:[Object(m.jsx)("div",{className:"col s3",children:Object(m.jsx)("table",{children:Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Temperature"}),Object(m.jsx)("td",{className:"text_right",children:Math.round(100*(a.weather[d].current_temp+Number.EPSILON))/100+" \xb0C"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Wind speed"}),Object(m.jsx)("td",{className:"text_right",children:a.weather[d].current_wind_speed+" meter/sec"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Cloudiness"}),Object(m.jsx)("td",{className:"text_right",children:a.weather[d].current_clouds+" %"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Pressure"}),Object(m.jsx)("td",{className:"text_right",children:a.weather[d].current_pressure+" hPa"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Humidity"}),Object(m.jsx)("td",{className:"text_right",children:a.weather[d].current_humidity+" %"})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"Visibility"}),Object(m.jsx)("td",{className:"text_right",children:a.weather[d].current_visibility+" metres"})]})]})})}),Object(m.jsx)("div",{className:"col s3",children:Object(m.jsxs)("table",{children:[Object(m.jsx)("thead",{children:Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Temperature"}),Object(m.jsx)("th",{className:"text_center",children:"Reach rate"}),Object(m.jsx)("th",{className:"text_right",children:"Not reach rate"})]})}),Object(m.jsx)("tbody",{children:g})]})}),Object(m.jsxs)("div",{className:"col s3",children:[Object(m.jsx)("div",{className:"row",children:Object(m.jsxs)("div",{className:"input-field col s12",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:o.image}),Object(m.jsx)("input",{id:"temp",name:"temp",type:"text",value:o.temp,onChange:function(){var e=Object(B.a)(R.a.mark((function e(t){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onFocus:function(e){return e.target.select()}}),Object(m.jsx)("label",{htmlFor:"temp",className:"active label_temperature grey-text text-darken-3",children:"Temperature [\xb0C]"})]})}),Object(m.jsx)("div",{className:"row",children:Object(m.jsxs)("div",{className:"input-field col s12",children:[Object(m.jsx)("i",{className:"material-icons prefix",children:"border_color"}),Object(m.jsx)("input",{id:"quantity",name:"quantity",type:"text",value:x,onChange:function(e){i(e)},onFocus:function(e){return e.target.select()}}),Object(m.jsx)("label",{htmlFor:"quantity",className:"active label_quantity grey-text text-darken-3",children:"Quantity"}),Object(m.jsxs)("label",{className:"label_rich",children:[Object(m.jsx)("input",{type:"checkbox",className:"filled-in",checked:j,onChange:function(){n()}}),Object(m.jsx)("span",{className:"grey-text text-darken-3",children:"Pay if temperature rises above"})]})]})}),Object(m.jsx)("div",{className:"collection label_rich",children:Object(m.jsxs)("p",{className:"collection-item grey lighten-3 grey-text text-darken-3",children:[Object(m.jsx)("span",{className:"badge",children:Math.round(100*(v+Number.EPSILON))/100+" USD"}),"Balance"]})})]}),Object(m.jsxs)("div",{className:"col s3",children:[Object(m.jsx)("div",{className:"collection",children:Object(m.jsxs)("p",{className:"collection-item grey lighten-3 grey-text text-darken-3",children:[Object(m.jsx)("span",{className:"badge",children:b}),"Rate"]})}),Object(m.jsx)("div",{className:"collection label_rich",children:Object(m.jsxs)("p",{className:"collection-item grey lighten-3 grey-text text-darken-3",children:[Object(m.jsx)("span",{className:"badge",children:60*Math.round(Number.parseFloat(b)*Number.parseFloat(x))*24/100+" USD"}),"Amount"]})}),Object(m.jsx)("div",{className:"cont_private_label",children:Object(m.jsxs)("label",{children:[Object(m.jsx)("input",{type:"checkbox",className:"filled-in",checked:p,onChange:function(){l()}}),Object(m.jsx)("span",{className:"grey-text text-darken-3",children:"Private (only you will see one)"})]})}),Object(m.jsx)("div",{className:"buy_btn btn",onClick:function(){u.post("/derivative/buy",{city:d,duration:1440,temp:Number.parseFloat(o.temp),rich:j,quantity:Number.parseFloat(x),hidden:p}).then((function(){oe.dispatch(be())}))},children:"Buy"})]})]})]})),Object(m.jsxs)("div",{className:"grey lighten-3",children:[Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsxs)("div",{className:"col s12",children:[Object(m.jsx)("a",{href:"",className:"breadcrumb",children:"Home"}),Object(m.jsx)("a",{href:"futures",className:"breadcrumb",children:"Futures"})]})})}),Object(m.jsx)("table",{children:Object(m.jsx)("tr",{children:O})}),f]})})),ye=function(){return Object(m.jsxs)(u.a,{basename:Object(b.c)((function(e){return e.auth.base})),children:[Object(m.jsx)(xe,{}),Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(h.d,{children:[Object(m.jsx)(h.b,{exact:!0,path:"/",render:function(){return Object(m.jsx)("nav",{children:Object(m.jsx)("div",{className:"nav-wrapper",children:Object(m.jsx)("div",{className:"col s12",children:Object(m.jsx)("p",{className:"breadcrumb",children:"Home"})})})})}}),Object(m.jsx)(h.b,{exact:!0,path:"/login",component:Ne}),Object(m.jsx)(h.b,{exact:!0,path:"/register",component:ge}),Object(m.jsx)(h.b,{exact:!0,path:"/about",component:Oe}),Object(m.jsx)(h.b,{exact:!0,path:"/weather",component:fe}),Object(m.jsx)(h.b,{path:"/forecast/:city",component:ve}),Object(m.jsx)(h.b,{exact:!0,path:"/futures",component:we}),Object(m.jsx)(h.b,{exact:!0,path:"/statistic",component:pe}),Object(m.jsx)(h.a,{to:"/"})]})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _e=a(18).default,ke=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Se=function(e,t){""!==t().auth.name&&_e.create(t().auth.request_params).post("/derivative/stats").then((function(t){e(U(t.data.stats))})).catch((function(e){return console.log(e)}))},Fe=a(18).default,Ce=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Pe=function(e,t){""!==t().auth.name&&Fe.create(t().auth.request_params).post("/weather/update").then((function(a){e(le(a.data)),""===t().derivative.page.city&&function(e,t){var a=Object.keys(t().weather.weather)[0];console.log("try "+a),X(e,t,a)}(e,t)}))},Ue=document.head,qe=function(e){Object(s.a)(a,e);var t=Object(n.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return o.a.createPortal(this.props.children,Ue)}}]),a}(l.a.Component),Me=Object(j.a)({basename:"/wf"});oe.dispatch(function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("updateWeather 0"),Pe(t,a),console.log("updateWeather 1");case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()).then((function(){return oe.dispatch(function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Se(t,a),e.abrupt("return",Promise.resolve());case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}())})).then((function(){return oe.dispatch(be())})).then((function(){oe.dispatch(function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,Ce(1e4);case 3:Pe(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),oe.dispatch(function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,K(1e4);case 3:X(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),oe.dispatch(function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,ue(1e4);case 3:he(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),oe.dispatch(function(){var e=Object(B.a)(R.a.mark((function e(t,a){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,ke(1e4);case 3:Se(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}());var e="";console.log("NODE_ENV"),e=/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0],o.a.render(Object(m.jsxs)(l.a.StrictMode,{children:[Object(m.jsxs)(qe,{children:[Object(m.jsx)("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"}),Object(m.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),Object(m.jsx)("title",{children:"My Page"}),Object(m.jsx)("base",{href:e+"/"})]}),Object(m.jsx)(b.a,{store:oe,children:Object(m.jsx)(ye,{})})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))})).catch((function(e){console.log(e)}))}},[[76,1,2]]]);
//# sourceMappingURL=main.ad7b1ccc.chunk.js.map