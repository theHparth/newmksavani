(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[20],{1259:function(e,t,c){"use strict";c.r(t);var n=c(17),a=c(698),o=c(706),s=c(705),r=c(88),i=c.n(r),j=c(248),l=c(156),b=c(21),d=c(635),O=c(655),u=c(656),h=c(657),x=c(349),p=c(702),g=c(658),f=c(899),v=c(125),k=c(0),m=c.n(k),S=c(70),P=c(201),C=c.n(P),I=c(250),y=c(1);t.default=function(){var e=Object(k.useState)(null),t=Object(n.a)(e,2),c=t[0],r=t[1],P=Object(k.useState)(!1),w=Object(n.a)(P,2),D=w[0],F=w[1],B=Object(k.useState)(!1),N=Object(n.a)(B,2),Y=N[0],U=N[1],A=Object(k.useState)(),E=Object(n.a)(A,2),M=E[0],R=E[1],T=function(){F(!1),U(!1),K(Object(S.a)({status:!1}))},H=m.a.useState(""),J=Object(n.a)(H,2),L=J[0],Q=J[1],_=Object(b.e)(),q=!1;"/allReceivedSrtock"===_.pathname&&(q=!0);var V=Object(v.c)((function(e){return e.stockInUserList})),$=V.stockInUserData,z=void 0===$?[]:$,G=V.isLoading,K=Object(v.b)();Object(k.useEffect)((function(){console.log(z.length,"stockInUserData.length"),console.log(z,"stockInUserData"),console.log("a------------")}),[]),Object(k.useEffect)((function(){var e={searchText:L,status:!1};q&&(e.status=!0),K(Object(S.a)(e)),ie(!1)}),[K,q,L]);var W=m.a.useState(10),X=Object(n.a)(W,2),Z=X[0],ee=X[1],te=m.a.useState(0),ce=Object(n.a)(te,2),ne=ce[0],ae=ce[1],oe=m.a.useState(!1),se=Object(n.a)(oe,2),re=se[0],ie=se[1];return Object(y.jsxs)(l.d,{children:[Object(y.jsx)("div",{className:"breadcrumb",children:Object(y.jsx)(l.a,{routeSegments:[{name:"Add Stock",path:"/addStock"},{name:"Table"}]})}),Object(y.jsx)(l.p,{onSearch:function(e){Q(e)},onSearchValueChange:L}),G&&Object(y.jsx)(l.k,{}),Object(y.jsx)(l.r,{children:Object(y.jsxs)(j.a,{width:"100%",children:[Object(y.jsxs)(s.a,{"aria-controls":"panel1bh-content",id:"panel1bh-header",children:[Object(y.jsx)(l.i,{children:"Invoice No"}),Object(y.jsx)(l.w,{children:"Date"})]}),z.slice(ne*Z,ne*Z+Z).map((function(e,t){return Object(y.jsxs)(a.a,{expanded:re==="panel".concat(t),onChange:(c="panel".concat(t),function(e,t){ie(!!t&&c)}),children:[Object(y.jsxs)(s.a,{expandIcon:Object(y.jsx)(i.a,{}),"aria-controls":"panel2bh-content",id:"panel2bh-header",children:[Object(y.jsx)(l.i,{children:e.invoiceNum}),Object(y.jsx)(l.q,{children:C()(e.createdAt).format("MMM Do, YYYY")}),q&&Object(y.jsx)(l.w,{children:Object(y.jsx)(d.a,{color:"primary",children:"Received"})})]}),Object(y.jsx)(o.a,{style:{backgroundColor:"#F5F5F5"},children:Object(y.jsxs)(l.u,{children:[Object(y.jsx)(O.a,{style:{backgroundColor:"#EBF5FB"},children:Object(y.jsxs)(u.a,{children:[Object(y.jsx)(h.a,{children:"Stock Name"}),Object(y.jsx)(h.a,{children:"Total Qty"}),Object(y.jsx)(h.a,{children:"Price"}),Object(y.jsxs)(h.a,{children:[!q&&Object(y.jsx)(x.a,{variant:"contained",color:"error",onClick:function(){return t=e._id,r(t),void U(!0);var t},children:"Pending"}),Object(y.jsx)(x.a,{variant:"outlined",color:"primary",onClick:function(){F(!0),R(e)},children:Object(y.jsx)(p.a,{color:"primary",children:"print"})})]})]})}),Object(y.jsxs)(g.a,{children:[e.stockOutDetail.map((function(e,t){return Object(y.jsxs)(u.a,{children:[Object(y.jsx)(h.a,{children:e.stock_name}),Object(y.jsx)(h.a,{children:e.totalBox*e.totalQtyInOneBox}),Object(y.jsxs)(h.a,{children:["$"," ",e.price?e.price:0]}),Object(y.jsx)(h.a,{align:"center"})]},t)})),e.messageForHospital&&Object(y.jsxs)(h.a,{children:["Note :"," ",e.messageForHospital]})]})]})})]},t);var c})),Y&&Object(y.jsx)(I.a,{open:Y,onConfirmDialogClose:T,onYesClick:function(){K(Object(S.o)(c)).then((function(){T(),ie(!1)}))},text:"Are you sure you received product?"}),D&&Object(y.jsx)(l.j,{handleClose:T,open:D,invoiceInfo:M}),Object(y.jsx)(f.a,{sx:{px:2},rowsPerPageOptions:[5,10,25],component:"div",count:z.length,rowsPerPage:Z,page:ne,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onPageChange:function(e,t){ae(t)},onRowsPerPageChange:function(e){ee(+e.target.value),ae(0)}})]})})]})}}}]);
//# sourceMappingURL=20.0beef29c.chunk.js.map