(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[21],{1257:function(e,t,n){"use strict";n.r(t);var a=n(17),c=n(349),i=n(655),r=n(656),s=n(657),o=n(658),l=n(899),j=n(0),b=n.n(j),d=n(248),u=n(125),h=n(156),x=n(145),O=n(1);t.default=function(){var e=b.a.useState({}),t=Object(a.a)(e,2),n=t[0],f=t[1],g=Object(u.c)((function(e){return e.filterList})).filteredData,p=void 0===g?[]:g,P=Object(u.b)(),v=b.a.useState(""),S=Object(a.a)(v,2),k=S[0],m=S[1];Object(j.useEffect)((function(){var e={searchText:k,searchDate:n};P(Object(x.e)(e))}),[P,n,k]);var w=b.a.useState(100),y=Object(a.a)(w,2),N=y[0],z=y[1],C=b.a.useState(0),I=Object(a.a)(C,2),B=I[0],D=I[1];return Object(O.jsxs)(h.d,{children:[Object(O.jsx)(c.a,{sx:{mb:2},variant:"contained",color:"primary",children:"Add New Stock"}),Object(O.jsx)(h.p,{onSearch:function(e){m(e)},onSearchValueChange:k}),Object(O.jsx)(h.e,{dateProjection:function(e){return f(e)}}),0===p.length||void 0===p?Object(O.jsx)("h1",{children:"No stock data found..!!"}):Object(O.jsx)(h.r,{title:"Stocks List",children:Object(O.jsxs)(d.a,{width:"100%",overflow:"auto",children:[p.map((function(e,t){return Object(O.jsx)("div",{children:Object(O.jsxs)(h.u,{children:[Object(O.jsx)(i.a,{children:Object(O.jsxs)(r.a,{children:[Object(O.jsx)(s.a,{align:"left",style:{fontSize:"25px"},children:e._id}),Object(O.jsx)(s.a,{align:"left",style:{fontSize:"15px"},children:"Stock Name"}),Object(O.jsx)(s.a,{align:"left",style:{fontSize:"15px"},children:"Total Qty."})]})}),Object(O.jsx)(o.a,{children:e.stockInfo.map((function(e,t){return Object(O.jsxs)(r.a,{children:[Object(O.jsx)(s.a,{align:"left",children:" "}),Object(O.jsx)(s.a,{align:"left",children:e.itemName}),Object(O.jsx)(s.a,{align:"left",children:e.totalQty})]},t)}))})]})},t)})),Object(O.jsx)(l.a,{sx:{px:2},rowsPerPageOptions:[50,100],component:"div",count:p.length,rowsPerPage:N,page:B,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onPageChange:function(e,t){D(t)},onRowsPerPageChange:function(e){z(+e.target.value),D(0)}})]})})]})}}}]);
//# sourceMappingURL=21.41181eaf.chunk.js.map