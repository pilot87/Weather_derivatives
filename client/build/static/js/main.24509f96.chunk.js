(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{51:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t),a.d(t,"history",(function(){return Be}));var c=a(2),s=a.n(c),r=a(5),n=a(41),i=a(42),l=a(45),o=a(44),d=a(1),u=a.n(d),j=a(21),b=a.n(j),h=a(10),m=(a(51),a(3)),p=a(6),x=a(14),O=a(0);console.log("NODE_ENV"),/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0];var g=function(){return Object(O.jsxs)("div",{className:"grey-text text-darken-3 signature",children:[Object(O.jsxs)("p",{className:"simple",children:["Code placed at ",Object(O.jsx)("a",{href:"https://github.com/pilot87/Weather_derivatives",children:"GitHub"})]}),Object(O.jsx)("p",{className:"simple",children:"Alexey Kostylev aka Kernel Explorer"}),Object(O.jsxs)("p",{className:"simple",children:["My Upwork profile: ",Object(O.jsx)("a",{href:"https://www.upwork.com/fl/kernelexplorer",children:"Kernel Explorer"})]})]})},v=a(17),f={name:"",email:"",token:""};try{f=JSON.parse(document.cookie)}catch(Re){document.cookie=JSON.stringify(f)}var N="";N=/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0];var w={name:f.name,email:f.email,balance:0,base:N,request_params:{baseURL:N+"/api",timeout:3e4,headers:{"Content-Type":"application/json",Authorization:f.token}}},y=Object(v.b)({name:"auth",initialState:w,reducers:{setSession:function(e,t){var a=t.payload,c=a.name,s=a.email,r={name:c,email:s,token:"Bearer "+a.token};document.cookie=JSON.stringify(r),e.name=c,e.email=s,e.request_params={baseURL:"/wf/api",timeout:3e4,headers:{"Content-Type":"application/json",Authorization:r.token}}},rename:function(e,t){var a=JSON.parse(document.cookie);a.name=t.payload,document.cookie=JSON.stringify(a),e.name=t.payload},updBalance:function(e,t){var a=t.payload.balance;e.balance=a}}}),_=y.actions,k=_.setSession,S=_.rename,P=_.updBalance,C=y.reducer,F=a(15),U=a.p+"static/media/HongKong.2db06be5.jpg",T=a.p+"static/media/San Francisco.56cbe460.jpg",E=[U,a.p+"static/media/NewYork.654f4089.jpg",T,a.p+"static/media/Paris.1275a43d.jpg"],q={city:{},page:new Array(E.length).fill({index:0,active:["green lighten-4","",""]})},M=Object(v.b)({name:"stats",initialState:q,reducers:{update_stat:function(e,t){for(var a=0,c=Object.entries(t.payload);a<c.length;a++){var s=Object(F.a)(c[a],2),r=s[0],n=s[1];e.city[r]=n}},page_city_push:function(e,t){e.page.push(t.payload)},page_city_change:function(e,t){e.page[t.payload.index]=t.payload.payload}}}),B=M.actions,R=B.update_stat,H=(B.page_city_push,B.page_city_change),L=M.reducer,W=a(31),A=a(25),D=Object(v.b)({name:"derivative",initialState:{daily:{},page:{city:"",temp:{temp:"0",image:"wb_sunny"},rich:!0,tempRate:"0 USD",quantity:"1",private_derivative:!0}},reducers:{init_page:function(e,t){e.page=t.payload},setCity:function(e,t){e.page.city=t.payload},setTemp:function(e,t){e.page.temp=t.payload},setRich:function(e,t){e.page.rich=t.payload},setTempRate:function(e,t){e.page.tempRate=t.payload},setQuantity:function(e,t){e.page.quantity=t.payload},setPrivate_derivative:function(e,t){e.page.private_derivative=t.payload},update_rate:function(e,t){t.payload.city in e.daily||(e.daily[t.payload.city]={temp:[],rate:[],rate2:[],expected_value:0,standard_deviation:0}),e.daily[t.payload.city]={temp:t.payload.temp,rate:t.payload.rate,rate2:t.payload.rate2,standard_deviation:t.payload.standard_deviation,expected_value:t.payload.expected_value}}}}),z=D.actions,I=z.update_rate,J=z.init_page,Q=z.setCity,V=z.setTemp,Z=z.setRich,K=z.setTempRate,$=z.setQuantity,G=z.setPrivate_derivative,Y=D.reducer,X=a(18).default,ee=function(e){return new Promise((function(t){return setTimeout(t,e)}))},te=function(e,t,a,c){var s;return 0===e?s=a<t?0:1:(s=Math.round(1e5*function(e){var t=1/(1+.2316419*Math.abs(e)),a=.3989423*Math.exp(-e*e/2)*t*(.3193815+t*(t*(1.781478+t*(1.330274*t-1.821256))-.3565638));return e>0&&(a=1-a),a}((a-t)/e))/1e5,c&&(s=1-s)),1.05*s},ae=function(e,t,a){console.log("upd"),X.create(t().auth.request_params).post("/derivative/daily_params").then((function(c){c.data.stats.forEach((function(t){var a,c,s=2;do{a=[],c=[];for(var r=0;r<5;r++)a.push(t.expected_value-(2-r)*s);var n,i=Object(W.a)(a);try{for(i.s();!(n=i.n()).done;){var l=n.value,o=te(t.standard_deviation,t.expected_value,l,!0);c.push(o)}}catch(h){i.e(h)}finally{i.f()}s/=2}while(Math.max.apply(Math,Object(A.a)(c))>1);var d,u=[],j=Object(W.a)(c);try{for(j.s();!(d=j.n()).done;){var b=d.value;u.push(1-b)}}catch(h){j.e(h)}finally{j.f()}e(I({city:t.name,rate:c,rate2:u,temp:a,expected_value:t.expected_value,standard_deviation:t.standard_deviation}))})),a&&(console.log(a),e(J({city:a,temp:{temp:"0",image:"wb_sunny"},quantity:"1",tempRate:Math.round(1e4*(te(t().derivative.daily[a].standard_deviation,t().derivative.daily[a].expected_value,0,!0)+Number.EPSILON))/100+" %",private_derivative:!0,rich:!0})))})).catch((function(e){return console.log(e)}))},ce=function(e,t){var a=t().derivative.page.city,c=te(t().derivative.daily[a].standard_deviation,t().derivative.daily[a].expected_value,t().derivative.page.temp.temp,t().derivative.page.rich);console.log(c),e(K(Math.round(1e4*(c+Number.EPSILON))/100+" %"))},se=a(18).default,re=function(e){return new Promise((function(t){return setTimeout(t,e)}))},ne=function(e,t){""!==t().auth.name&&se.create(t().auth.request_params).post("/profile/balance").then((function(t){e(P(t.data))}))},ie=function(){return function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return ne(t,a),e.abrupt("return",Promise.resolve());case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},le=a(9),oe=a(7),de=a(18).default,ue=a(18).default,je=a(18).default;console.log("NODE_ENV"),/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0];console.log("NODE_ENV"),/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0];var be=Object(v.b)({name:"weather",initialState:{weather:{},page:{temp:{temp:"0",image:"wb_sunny"},quantity:"1",rich:!0,city:"Moscow",rate:"0 %",amount:"0 USD",hidden:!0}},reducers:{update_weather:function(e,t){e.weather=t.payload}}}),he=be.actions.update_weather,me=be.reducer,pe=Object(v.a)({reducer:{auth:C,weather:me,derivative:Y,stats:L}}),xe=a(18).default,Oe=Object(x.b)((function(){return function(e){return{stats:e.stats,baseUrl:e.auth.base}}}),{page_city_change:H})((function(e){var t=e.stats,a=e.page_city_change,c=(e.baseUrl,Object.entries(t.city).map((function(e,c){var s=["No futures","Quantity of futures: "+e[1].length,""];0!==e[1].length&&(s[0]=e[1].map((function(e,t){return function(e,t){return Object(O.jsx)("table",{className:[0].map((function(e){return t%2===0?"striped collection-item yellow lighten-4 grey-text text-darken-3":"striped collection-item green lighten-4 grey-text text-darken-3"}))[0],children:Object(O.jsxs)("tbody",{children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Completed"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.completed.toString()})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Paid"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.paid+" USD"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Temperature"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.temp})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Quantity"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.quantity})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Rises above"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.temp_reach.toString()})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Privacy"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.hidden.toString()})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Duration"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.duration})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Duration left"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.duration_left})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Buyer"}),Object(O.jsx)("td",{className:"statistics_table_right",children:e.email})]})]})})}(e,t)}))),void 0===t.page[c]&&window.location.assign("about");var r=[];return r.push(Object(O.jsxs)("div",{className:"card",children:[Object(O.jsxs)("div",{className:"card-image",children:[Object(O.jsx)("img",{className:"statistics_img",src:E[c],alt:e[0]}),Object(O.jsx)("span",{className:"card-title",children:e[0]})]}),Object(O.jsx)("div",{className:"card-tabs",children:Object(O.jsxs)("ul",{className:"tabs tabs-fixed-width",children:[Object(O.jsx)("li",{className:"tab statistics_pointer",onClick:function(){a({index:c,payload:{index:0,active:["green lighten-4","",""]}})},children:Object(O.jsx)("p",{className:t.page[c].active[0],children:"Futures"})}),Object(O.jsx)("li",{className:"tab statistics_pointer",onClick:function(){a({index:c,payload:{index:1,active:["","green lighten-4",""]}})},children:Object(O.jsx)("p",{className:t.page[c].active[1],children:"Statistic"})})]})})]})),r.concat(s[t.page[c].index])}))),s=[],r=0;do{s.push(Object(O.jsx)("tr",{children:c.map((function(e){return e.length>r?Object(O.jsx)("td",{className:"",children:e[r]}):Object(O.jsx)("td",{})}))})),r++}while(Math.max.apply(Math,Object(A.a)(c.map((function(e){return e.length}))))>r);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/statistic",className:"breadcrumb",children:"Statistic"})]})})}),Object(O.jsx)("table",{children:Object(O.jsx)("tbody",{children:s})})]})})),ge=Object(x.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}))((function(e){var t=e.auth.name;return Object(O.jsx)("nav",{children:Object(O.jsxs)("div",{className:"nav-wrapper",children:[Object(O.jsx)(m.b,{to:"/",className:"brand-logo",children:"Forecast Trading"}),Object(O.jsxs)("ul",{id:"nav-mobile",className:"right hide-on-med-and-down",children:[Object(O.jsx)("li",{children:Object(O.jsx)(m.b,{to:"/weather",children:"Weather"})}),Object(O.jsx)("li",{children:Object(O.jsx)(m.b,{to:"/statistic",children:"Statistic"})}),Object(O.jsx)("li",{children:Object(O.jsx)(m.b,{to:"/futures",children:"Futures"})}),Object(O.jsx)("li",{children:Object(O.jsxs)(m.b,{to:"/about",children:["Hello, ",function(){return""===t?"Guest":t},"!"]})})]})]})})})),ve=Object(x.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}),{rename:S,setSession:k,updateBalance:ie})((function(e){var t=e.auth,a=e.rename,c=e.setSession,s=(e.baseUrl,e.updateBalance),r=Object(d.useState)({username:{msg:"",state:""},password:{msg:"",state:""}}),n=Object(F.a)(r,2),i=n[0],l=n[1],o=Object(d.useState)({message:"",color:"gray"}),u=Object(F.a)(o,2),j=u[0],b=u[1],h=Object(d.useState)({message:"",color:"gray"}),p=Object(F.a)(h,2),x=p[0],g=p[1],v=function(e){l(Object(oe.a)(Object(oe.a)({},i),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:" active"})))},f=function(e){l(Object(oe.a)(Object(oe.a)({},i),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:" active"})))},N=function(e){""===e.target.value&&l(Object(oe.a)(Object(oe.a)({},i),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:""})))},w=je.create(t.request_params);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/about",className:"breadcrumb",children:"About"})]})})}),Object(O.jsxs)("div",{className:"row about_container",children:[Object(O.jsx)("div",{className:"row",children:Object(O.jsxs)("div",{className:"collection about_internal_container",children:[Object(O.jsx)("p",{className:"collection-item black-text",children:"Email:    "+t.email}),Object(O.jsx)("p",{className:"collection-item black-text",children:"Username: "+t.name}),Object(O.jsx)("p",{className:"collection-item black-text",children:"Balance:    "+t.balance})]})}),Object(O.jsx)("div",{className:"card-action",children:Object(O.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){w.post("/profile/reset_balance",{username:i.username.msg}).then((function(e){s()})).catch((function(e){return b({message:e.response.data.message,color:"red"})}))},children:"Reset balance to 100 000 USD"})}),Object(O.jsx)("form",{className:"col s12",children:Object(O.jsx)("div",{className:"row",children:Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"border_color"}),Object(O.jsx)("input",{id:"username",name:"username",type:"text",value:i.username.msg,onChange:v,onFocus:f,onBlur:N}),Object(O.jsx)("label",{htmlFor:"username",className:"username"+i.username.state,children:"New username"})]})})}),Object(O.jsx)("div",{className:"card-action",children:Object(O.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){w.post("/profile/rename",{username:i.username.msg}).then((function(e){a(e.data.username),b({message:"Welcome, "+e.data.username+"!",color:"green"})})).catch((function(e){return b({message:e.response.data.message,color:"red"})}))},children:"Change username"})}),Object(O.jsx)("div",{className:"alert "+j.color+"-text text-lighten-1",children:j.message}),Object(O.jsx)("form",{className:"col s12",children:Object(O.jsx)("div",{className:"row",children:Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"more_horiz"}),Object(O.jsx)("input",{id:"password",name:"password",type:"password",value:i.password.msg,onChange:v,onFocus:f,onBlur:N}),Object(O.jsx)("label",{htmlFor:"password",className:"password"+i.password.state,children:"New password"})]})})}),Object(O.jsx)("div",{className:"card-action",children:Object(O.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){w.post("/profile/chpasswd",{password:i.password.msg}).then((function(e){g({message:"Password has changed",color:"green"})})).catch((function(e){return g({message:e.response.data.message,color:"red"})}))},children:"Change password"})}),Object(O.jsx)("div",{className:"alert "+x.color+"-text text-lighten-1",children:x.message}),Object(O.jsx)("div",{className:"card-action about_card_btn",children:Object(O.jsx)("button",{className:"btn about_btn green lighten-2 black-text",onClick:function(){c({email:"",name:"",token:""}),window.location.assign("login")},children:"Logout"})})]})]})})),fe=Object(x.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}))((function(e){var t=e.auth,a=(e.baseUrl,Object(d.useState)({email:{msg:"",state:"adduser_label"},password:{msg:"",state:"adduser_label"},username:{msg:"",state:"adduser_label"}})),c=Object(F.a)(a,2),n=c[0],i=c[1],l=Object(d.useState)({message:"",color:"gray",errors:{email:"",password:"",username:""}}),o=Object(F.a)(l,2),u=o[0],j=o[1],b=function(e){i(Object(oe.a)(Object(oe.a)({},n),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:"adduser_label active"})))},h=function(e){i(Object(oe.a)(Object(oe.a)({},n),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:"adduser_label active"})))},p=function(e){""===e.target.value&&i(Object(oe.a)(Object(oe.a)({},n),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:"adduser_label"})))},x=ue.create(t.request_params),g=function(){var e=Object(r.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=function(e){var t={email:"",password:"",username:""},a=e.find((function(e){return"email"===e.param}));a&&(t.email=a.msg);var c=e.find((function(e){return"username"===e.param}));c&&(t.username=c.msg);var s=e.find((function(e){return"password"===e.param}));return s&&(t.password=s.msg),t},x.post("/auth/register",{email:n.email.msg,username:n.username.msg,password:n.password.msg}).then((function(e){j({message:e.data.message,color:"green",errors:{email:"",password:"",username:""}}),window.location.assign("login")})).catch((function(e){return j({message:null!=e.response.data?e.response.data.message:e.data.message,color:"red",errors:e.response&&e.response.data.errors?t(e.response.data.errors):{email:"",password:"",username:""}})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/register",className:"breadcrumb",children:"Register"})]})})}),Object(O.jsxs)("form",{action:"../.html",className:"col autocomplete-content s12",children:[Object(O.jsxs)("div",{className:"row",children:[Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"email"}),Object(O.jsx)("input",{id:"email",name:"email",type:"text",value:n.email.msg,onChange:b,onFocus:h,onBlur:p}),Object(O.jsx)("label",{htmlFor:"email",className:n.email.state,children:"Email"})]}),Object(O.jsx)("div",{className:"row adduser_error",children:u.errors.email})]}),Object(O.jsxs)("div",{className:"row",children:[Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"border_color"}),Object(O.jsx)("input",{id:"username",name:"username",type:"text",value:n.username.msg,onChange:b,onFocus:h,onBlur:p}),Object(O.jsx)("label",{htmlFor:"username",className:n.username.state,children:"User name"})]}),Object(O.jsx)("div",{className:"row adduser_error",children:u.errors.username})]}),Object(O.jsxs)("div",{className:"row",children:[Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"more_horiz"}),Object(O.jsx)("input",{id:"password",name:"password",type:"password",value:n.password.msg,onChange:b,onFocus:h,onBlur:p}),Object(O.jsx)("label",{htmlFor:"password",className:n.password.state,children:"Password"})]}),Object(O.jsx)("div",{className:"row adduser_error",children:u.errors.password})]})]}),Object(O.jsx)("div",{className:"card-action",children:Object(O.jsx)("button",{className:"btn adduser_btn green lighten-2 black-text",onClick:g,children:"Register new User"})}),Object(O.jsx)("br",{}),Object(O.jsx)("div",{className:"alert adduser_alert "+u.color+"-text text-lighten-1",children:u.message})]})})),Ne=Object(x.b)((function(){return function(e){return{weather:e.weather,baseUrl:e.auth.base}}}))((function(e){var t=e.weather,a=(e.baseUrl,Object(p.g)().city),c=Object(O.jsx)("div",{className:"progress",children:Object(O.jsx)("div",{className:"indeterminate"})});return void 0!==t.weather[a]&&(c=t.weather[a].hourly_temp.map((function(e,c){return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:3*c}),Object(O.jsx)("td",{children:t.weather[a].hourly_temp[c]}),Object(O.jsx)("td",{children:t.weather[a].hourly_wind_speed[c]}),Object(O.jsx)("td",{children:t.weather[a].hourly_clouds[c]}),Object(O.jsx)("td",{children:t.weather[a].hourly_pressure[c]}),Object(O.jsx)("td",{children:t.weather[a].hourly_humidity[c]}),Object(O.jsx)("td",{children:t.weather[a].hourly_visibility[c]})]})}))),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/weather",className:"breadcrumb",children:"Weather"}),Object(O.jsx)(m.b,{to:"/weather/"+a,className:"breadcrumb",children:"Forecast for "+a})]})})}),Object(O.jsxs)("table",{children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:"Hours"}),Object(O.jsx)("th",{children:"Temperature"}),Object(O.jsx)("th",{children:"Wind speed"}),Object(O.jsx)("th",{children:"Cloudiness"}),Object(O.jsx)("th",{children:"Pressure"}),Object(O.jsx)("th",{children:"Humidity"}),Object(O.jsx)("th",{children:"Visibility"})]})}),Object(O.jsx)("tbody",{children:c})]})]})})),we=Object(x.b)((function(){return function(e){return{weather:e.weather,baseUrl:e.auth.base}}}))((function(e){var t=e.weather,a=(e.baseUrl,Object.entries(t.weather).map((function(e,t){return Object(O.jsx)("td",{children:Object(O.jsx)(m.b,{to:"/forecast/"+e[0],children:Object(O.jsxs)("div",{className:"card",children:[Object(O.jsxs)("div",{className:"card-image",children:[Object(O.jsx)("img",{src:E[t],alt:e[0],className:"weather_img"}),Object(O.jsx)("span",{className:"card-title",children:e[0]})]}),Object(O.jsx)("div",{className:"card-content black-text",children:Object(O.jsx)("table",{children:Object(O.jsxs)("tbody",{children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Temperature"}),Object(O.jsx)("td",{className:"weather_table_right",children:Math.round(100*(e[1].current_temp+Number.EPSILON))/100+" \xb0\u0421"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Wind speed"}),Object(O.jsx)("td",{className:"weather_table_right",children:e[1].current_wind_speed+" meter/sec"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Cloudiness"}),Object(O.jsx)("td",{className:"weather_table_right",children:e[1].current_clouds+" %"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Pressure"}),Object(O.jsx)("td",{className:"weather_table_right",children:e[1].current_pressure+" hPa"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Humidity"}),Object(O.jsx)("td",{className:"weather_table_right",children:e[1].current_humidity+" %"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Visibility"}),Object(O.jsx)("td",{className:"weather_table_right",children:e[1].current_visibility+" metres"})]})]})})})]})})})})));return a===[]&&(a=Object(O.jsx)("div",{className:"progress",children:Object(O.jsx)("div",{className:"indeterminate"})})),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/weather",className:"breadcrumb",children:"Weather"})]})})}),Object(O.jsx)("table",{children:Object(O.jsx)("tr",{children:a})})]})})),ye=Object(x.b)((function(){return function(e){return{auth:e.auth,baseUrl:e.auth.base}}}),{setSession:k})((function(e){var t=e.auth,a=e.setSession;e.baseUrl;console.log(t);var c=Object(d.useState)({email:{msg:"",state:""},password:{msg:"",state:""}}),s=Object(F.a)(c,2),r=s[0],n=s[1],i=Object(d.useState)({message:"",color:"gray"}),l=Object(F.a)(i,2),o=l[0],u=l[1],j=function(e){n(Object(oe.a)(Object(oe.a)({},r),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:" active"})))},b=function(e){n(Object(oe.a)(Object(oe.a)({},r),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:" active"})))},h=function(e){""===e.target.value&&n(Object(oe.a)(Object(oe.a)({},r),{},Object(le.a)({},e.target.name,{msg:e.target.value,state:""})))},p=de.create(t.request_params);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/login",className:"breadcrumb",children:"Login"})]})})}),Object(O.jsxs)("div",{className:"row login_cont",children:[Object(O.jsx)("form",{className:"col s12",children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"email"}),Object(O.jsx)("input",{id:"email",name:"email",type:"text",value:r.email.msg,onChange:j,onFocus:b,onBlur:h}),Object(O.jsx)("label",{htmlFor:"email",className:"email"+r.email.state,children:"Email"})]}),Object(O.jsxs)("div",{className:"input-field col s6",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"more_horiz"}),Object(O.jsx)("input",{id:"password",name:"password",type:"password",value:r.password.msg,onChange:j,onFocus:b,onBlur:h}),Object(O.jsx)("label",{htmlFor:"password",className:"password"+r.password.state,children:"Password"})]})]})}),Object(O.jsxs)("div",{className:"card-action",children:[Object(O.jsx)("button",{className:"btn login_btn green lighten-2 black-text",onClick:function(){p.post("/auth/login",{email:r.email.msg,password:r.password.msg}).then((function(e){a({email:e.data.email,name:e.data.username,token:e.data.token}),u({message:"Welcome, "+e.data.username+"!",color:"green"}),window.location.assign("about")})).catch((function(e){return u({message:e.response.data?e.response.data.message:e.data.message,color:"red"})}))},children:"Login"}),Object(O.jsx)(m.b,{className:"btn register_btn grey lighten-1 black-text",to:"/register",children:"Register new User"})]}),Object(O.jsx)("div",{className:"alert login_alert "+o.color+"-text text-lighten-1",children:o.message})]})]})})),_e=Object(x.b)((function(){return function(e){return{auth:e.auth,weather0:e.weather,derivative0:e.derivative,baseUrl:e.auth.base}}}),{changeCity:function(e){return function(){var t=Object(r.a)(s.a.mark((function t(a,c){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a(Q(e)),ce(a,c);case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},changeTemp:function(e){return function(){var t=Object(r.a)(s.a.mark((function t(a,c){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:/^(-?[0-9]*\.?[0-9]*)$/.test(e.target.value)&&("NaN"===Number.parseFloat(e.target.value).toString()?"-"===e.target.value?(a(V({temp:"-0",image:"ac_unit"})),ce(a,c)):"."===e.target.value?(a(V({temp:"0.",image:"wb_sunny"})),ce(a,c)):""===e.target.value?(a(V({temp:"0",image:"wb_sunny"})),ce(a,c)):(a(V({temp:e.target.value,image:"border_color"})),ce(a,c)):(console.log(e.target.value),Number.parseFloat(e.target.value)<0?(a(V({temp:e.target.value,image:"ac_unit"})),ce(a,c)):(a(V({temp:e.target.value,image:"wb_sunny"})),ce(a,c))));case 1:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},changeRich:function(){return function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(Z(!a().derivative.page.rich)),ce(t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},changeQuantity:function(e){return function(){var t=Object(r.a)(s.a.mark((function t(a,c){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:/^[1-9][0-9]*$/.test(e.target.value)&&a($(e.target.value)),ce(a,c);case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},changePrivate_derivative:function(){return function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(G(!a().derivative.page.private_derivative)),ce(t,a);case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()}})((function(e){var t=e.auth,a=e.weather0,c=e.derivative0,n=e.changeCity,i=e.changeTemp,l=e.changeRich,o=e.changeQuantity,d=e.changePrivate_derivative,u=(e.baseUrl,c.page.city),j=c.page.temp,b=c.page.rich,h=xe.create(t.request_params),p=c.daily[u],x=c.page.tempRate,g=c.page.private_derivative,v=c.page.quantity,f=Object(O.jsx)("div",{className:"progress",children:Object(O.jsx)("div",{className:"indeterminate"})});void 0!==a.weather&&(f=Object.entries(a.weather).map((function(e,t){return Object(O.jsx)("td",{onClick:function(){n(e[0])},children:Object(O.jsx)("div",{className:"card",children:Object(O.jsxs)("div",{className:"card-image",children:[Object(O.jsx)("img",{className:"futures_img",src:E[t],alt:e[0]}),Object(O.jsx)("span",{className:"card-title",children:e[0]})]})})})})));var N=Object(O.jsx)("div",{className:"progress",children:Object(O.jsx)("div",{className:"indeterminate"})});void 0!==p&&(N=p.temp.map((function(e,t){return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:Math.round(100*(e+Number.EPSILON))/100+" \xb0C"}),Object(O.jsx)("td",{className:"text_center",children:Math.round(1e3*(p.rate[t]+Number.EPSILON))/10+" %"}),Object(O.jsx)("td",{className:"text_right",children:Math.round(1e3*(p.rate2[t]+Number.EPSILON))/10+" %"})]})})));var w,y=t.balance,_=function(){h.post("/derivative/buy",{city:u,duration:1440,temp:Number.parseFloat(j.temp),rich:b,quantity:Number.parseFloat(v),hidden:g}).then((function(){pe.dispatch(ie())}))},k=Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h4",{className:"grey-text text-darken-3",children:u}),Object(O.jsx)("div",{className:"progress",children:Object(O.jsx)("div",{className:"indeterminate"})})]});return""!==u&&(k=Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h4",{className:"grey-text text-darken-3",children:u}),Object(O.jsxs)("div",{className:"row black-text",children:[Object(O.jsx)("div",{className:"col s3",children:Object(O.jsx)("table",{children:Object(O.jsxs)("tbody",{children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Temperature"}),Object(O.jsx)("td",{className:"text_right",children:Math.round(100*(a.weather[u].current_temp+Number.EPSILON))/100+" \xb0C"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Wind speed"}),Object(O.jsx)("td",{className:"text_right",children:a.weather[u].current_wind_speed+" meter/sec"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Cloudiness"}),Object(O.jsx)("td",{className:"text_right",children:a.weather[u].current_clouds+" %"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Pressure"}),Object(O.jsx)("td",{className:"text_right",children:a.weather[u].current_pressure+" hPa"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Humidity"}),Object(O.jsx)("td",{className:"text_right",children:a.weather[u].current_humidity+" %"})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Visibility"}),Object(O.jsx)("td",{className:"text_right",children:a.weather[u].current_visibility+" metres"})]})]})})}),Object(O.jsx)("div",{className:"col s3",children:Object(O.jsxs)("table",{children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:"Temperature"}),Object(O.jsx)("th",{className:"text_center",children:"Reach rate"}),Object(O.jsx)("th",{className:"text_right",children:"Not reach rate"})]})}),Object(O.jsx)("tbody",{children:N})]})}),Object(O.jsxs)("div",{className:"col s3",children:[Object(O.jsx)("div",{className:"row",children:Object(O.jsxs)("div",{className:"input-field col s12",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:j.image}),Object(O.jsx)("input",{id:"temp",name:"temp",type:"text",value:j.temp,onChange:function(){var e=Object(r.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onFocus:function(e){return e.target.select()}}),Object(O.jsx)("label",{htmlFor:"temp",className:"active label_temperature grey-text text-darken-3",children:"Temperature [\xb0C]"})]})}),Object(O.jsx)("div",{className:"row",children:Object(O.jsxs)("div",{className:"input-field col s12",children:[Object(O.jsx)("i",{className:"material-icons prefix",children:"border_color"}),Object(O.jsx)("input",{id:"quantity",name:"quantity",type:"text",value:v,onChange:function(e){o(e)},onFocus:function(e){return e.target.select()}}),Object(O.jsx)("label",{htmlFor:"quantity",className:"active label_quantity grey-text text-darken-3",children:"Quantity"}),Object(O.jsxs)("label",{className:"label_rich",children:[Object(O.jsx)("input",{type:"checkbox",className:"filled-in",checked:b,onChange:function(){l()}}),Object(O.jsx)("span",{className:"black-text",children:"Pay if temperature rises above"})]})]})}),Object(O.jsx)("div",{className:"collection label_rich",children:Object(O.jsxs)("p",{className:"collection-item grey lighten-3",children:[Object(O.jsx)("span",{className:"badge black-text",children:Math.round(100*(y+Number.EPSILON))/100+" USD"}),"Balance"]})})]}),Object(O.jsxs)("div",{className:"col s3",children:[Object(O.jsx)("div",{className:"collection",children:Object(O.jsxs)("p",{className:"collection-item grey lighten-3",children:[Object(O.jsx)("span",{className:"badge black-text",children:x}),"Rate"]})}),Object(O.jsx)("div",{className:"collection label_rich",children:Object(O.jsxs)("p",{className:"collection-item grey lighten-3",children:[Object(O.jsx)("span",{className:"badge black-text",children:60*Math.round(Number.parseFloat(x)*Number.parseFloat(v))*24/100+" USD"}),"Amount"]})}),Object(O.jsx)("div",{className:"cont_private_label",children:Object(O.jsxs)("label",{children:[Object(O.jsx)("input",{type:"checkbox",className:"filled-in",checked:g,onChange:function(){d()}}),Object(O.jsx)("span",{className:"black-text",children:"Private (only you will see one)"})]})}),(w=t.name,""===w?Object(O.jsx)(m.b,{className:"btn register_btn grey lighten-1 black-text",to:"/login",children:"Buy"}):Object(O.jsx)("div",{className:"buy_btn btn",onClick:_,children:"Buy"}))]})]})]})),Object(O.jsxs)("div",{className:"grey lighten-3",children:[Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsxs)("div",{className:"col s12",children:[Object(O.jsx)(m.b,{to:"/",className:"breadcrumb",children:"Home"}),Object(O.jsx)(m.b,{to:"/futures",className:"breadcrumb",children:"Futures"})]})})}),Object(O.jsx)("table",{children:Object(O.jsx)("tr",{children:f})}),k]})})),ke=Object(x.b)((function(){return function(e){return{auth:e.auth}}}))((function(e){return""===e.auth.name?window.location.assign("login"):window.location.assign("about"),Object(O.jsx)("nav",{children:Object(O.jsx)("div",{className:"nav-wrapper",children:Object(O.jsx)("div",{className:"col s12",children:Object(O.jsx)("p",{className:"breadcrumb",children:"Home"})})})})})),Se=function(){return Object(O.jsxs)(m.a,{basename:Object(x.c)((function(e){return e.auth.base})),children:[Object(O.jsx)(ge,{}),Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)(p.d,{children:[Object(O.jsx)(p.b,{exact:!0,path:"/",component:ke}),Object(O.jsx)(p.b,{exact:!0,path:"/login",component:ye}),Object(O.jsx)(p.b,{exact:!0,path:"/register",component:fe}),Object(O.jsx)(p.b,{exact:!0,path:"/about",component:ve}),Object(O.jsx)(p.b,{exact:!0,path:"/weather",component:we}),Object(O.jsx)(p.b,{path:"/forecast/:city",component:Ne}),Object(O.jsx)(p.b,{exact:!0,path:"/futures",component:_e}),Object(O.jsx)(p.b,{exact:!0,path:"/statistic",component:Oe}),Object(O.jsx)(p.a,{to:"/"})]})}),Object(O.jsx)(g,{})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Pe=a(18).default,Ce=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Fe=function(e,t){Pe.create(t().auth.request_params).post("/derivative/stats").then((function(t){e(R(t.data.stats))})).catch((function(e){return console.log(e)}))},Ue=a(18).default,Te=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Ee=function(e,t){Ue.create(t().auth.request_params).post("/weather/update").then((function(a){e(he(a.data)),""===t().derivative.page.city&&function(e,t){var a=Object.keys(t().weather.weather)[0];console.log("try "+a),ae(e,t,a)}(e,t)}))},qe=document.head,Me=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return b.a.createPortal(this.props.children,qe)}}]),a}(u.a.Component),Be=Object(h.a)({basename:"/wf"});(function(){var e=Object(r.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return pe.dispatch(function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("updateWeather 0"),Ee(t,a),console.log("updateWeather 1");case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),e.next=3,new Promise((function(e){return setTimeout(e,50)}));case 3:return pe.dispatch(function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Fe(t,a),e.abrupt("return",Promise.resolve());case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),e.next=6,new Promise((function(e){return setTimeout(e,50)}));case 6:return pe.dispatch(ie()),e.next=9,new Promise((function(e){return setTimeout(e,50)}));case 9:return pe.dispatch(function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,Te(1e4);case 3:Ee(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),e.next=12,new Promise((function(e){return setTimeout(e,50)}));case 12:return pe.dispatch(function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,ee(1e4);case 3:ae(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),e.next=15,new Promise((function(e){return setTimeout(e,50)}));case 15:return pe.dispatch(function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,re(1e4);case 3:ne(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),e.next=18,new Promise((function(e){return setTimeout(e,50)}));case 18:pe.dispatch(function(){var e=Object(r.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,Ce(1e4);case 3:Fe(t,a),e.next=0;break;case 6:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),t="",console.log("NODE_ENV"),t=/\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0],b.a.render(Object(O.jsxs)(u.a.StrictMode,{children:[Object(O.jsxs)(Me,{children:[Object(O.jsx)("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"}),Object(O.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),Object(O.jsx)("title",{children:"My Page"}),Object(O.jsx)("base",{href:t+"/"})]}),Object(O.jsx)(x.a,{store:pe,children:Object(O.jsx)(Se,{})})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}));case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}},[[76,1,2]]]);
//# sourceMappingURL=main.24509f96.chunk.js.map