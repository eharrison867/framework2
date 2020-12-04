var framework={dejq:function(e){console.log(e)},makeQString:function(e){var t="";let a="";for(var o in e)e.hasOwnProperty(o)&&(t+=a+encodeURI(o+"="+e[o]),a="&");return t},onloaded:function(e,t){e.status>=200&&e.status<400?t.hasOwnProperty("success")&&t.success(e.response):t.hasOwnProperty("fail")&&t.fail(e.response),t.hasOwnProperty("always")&&t.always(e.response)},onfailed:function(e,t){t.hasOwnProperty("fail")&&t.fail(e.response),t.hasOwnProperty("always")&&t.always(e.response)},ajax:function(e,t){let a=new XMLHttpRequest,o=t.hasOwnProperty("method")?t.method:"GET",n=t.hasOwnProperty("data")?framework.makeQString(t.data):"",r=t.hasOwnProperty("type")?t.type:""!==n?"application/x-www-form-urlencoded; charset=UTF-8":"text/plain; charset=UTF-8";a.open(o,e,!0),a.setRequestHeader("Content-Type",r),a.onload=function(){framework.onloaded(this,t)},a.onerror=function(){framework.onfailed(this,t)},a.send(n)},getJSON:function(e,t,a){var o=new XMLHttpRequest;o.open("GET",e,!0),o.setRequestHeader("Accept","application/json"),o.onload=function(){this.status>=200&&this.status<400?t(JSON.parse(this.response)):a(this)},o.onerror=function(){a(this)},o.send()},mktoggle:function(e,t){return'<i class="'+e+" fas fa-toggle-"+(t?"on":"off")+'"></i>'},tick:function(e){return framework.mktoggle("",e)},toggle:function(e){e.classList.toggle("fa-toggle-off"),e.classList.toggle("fa-toggle-on")},dotoggle:function(e,t,a,o){e.preventDefault(),e.stopPropagation();let n=t.classList;if(!n.contains("fadis"))if(n.contains("htick")){const e=t.nextElementSibling;e.value=1==e.value?0:1,framework.toggle(t)}else{let e=t.closest("[data-id]");e instanceof jQuery&&(e=e[0]),framework.ajax(base+"/ajax/toggle/"+a+"/"+e.getAttribute("data-id")+"/"+o,{method:putorpatch,success:function(){framework.toggle(t)},fail:function(e){bootbox.alert("<h3>Toggle failed</h3>"+e.responseText)}})}},deletebean:function(e,t,a,o,n,r=""){e.preventDefault(),e.stopPropagation(),""===r&&(r="this "+a),bootbox.confirm("Are you sure you you want to delete "+r+"?",(function(e){e&&framework.ajax(base+"/ajax/bean/"+a+"/"+o+"/",{method:"DELETE",success:n,fail:function(e){bootbox.alert("<h3>Delete failed</h3>"+e.responseText)}})}))},editcall:function(e){const t=base+"/ajax/"+e.op+"/"+e.bean+"/"+e.pk+"/"+e.name+"/";return framework.ajax(t,{method:putorpatch,data:{value:e.value}})},removeNode:function(e){var t=[e];if(e.hasAttribute("rowspan")){let a=parseInt(e.getAttribute("rowspan"))-1;for(;a>0;)t[a]=t[a-1].elementSibling}for(let e of t)e.parentNode.removeChild(e)},fadetodel:function(e,t=null){e.classList.add("fader"),e.style.opacity="0",setTimeout((function(){framework.removeNode(e),null!==t&&t()}),1500)},dodelbean:function(e,t,a,o="",n=null){let r=t.closest("[data-id]");r instanceof jQuery&&(r=r[0]),framework.deletebean(e,t,a,r.getAttribute("data-id"),(function(){framework.fadetodel(r,n)}),o)},tableClick:function(e){e.preventDefault();const t=e.target.classList;e.data.clicks.forEach((function(a){let[o,n,r]=a;t.contains(o)&&n(e,e.target,e.data.bean,r)}))},goedit:function(e,t,a){let o=t.closest("[data-id]");o instanceof jQuery&&(o=o[0]),window.location.href=base+"/admin/edit/"+a+"/"+o.getAttribute("data-id")+"/"},goview:function(e,t,a){window.location.href=base+"/admin/view/"+a+"/"+t.parent().parent().data("id")+"/"},beanCreate:function(e,t,a,o){framework.ajax(base+"/ajax/bean/"+e+"/",{method:"POST",data:t,success:a,fail:function(t){bootbox.alert("<h3>Failed to create new "+e+"</h3>"+t.responseText)},always:function(){document.getElementById(o).setAttribute("disabled",!1)}})},addMore:function(e){e.preventDefault(),e.stopPropagation();const t=document.getElementById("mrow"),a=t.previousSibling.cloneNode(!0);for(var o of a.getElementsByTagName("input"))"checkbox"==o.getAttribute("type")||"radio"==o.getAttribute("type")?o.setAttribute("checked",!1):o.setAttribute("value","");for(o of a.getElementsByTagName("textarea"))o.innerHTML="";for(o of a.getElementsByTagName("option"))o.setAttribute("selected",!1);t.insertBefore(a)},easeInOut:function(e,t,a,o,n){return Math.ceil(e+Math.pow(1/a*o,n)*(t-e))},doBGFade:function(e,t,a,o,n,r,s){e.bgFadeInt&&window.clearInterval(e.bgFadeInt);let i=0;e.bgFadeInt=window.setInterval((function(){e.css("backgroundcolor","rgb("+framework.easeInOut(t[0],a[0],n,i,s)+","+framework.easeInOut(t[1],a[1],n,i,s)+","+framework.easeInOut(t[2],a[2],n,i,s)+")"),i+=1,i>n&&(e.css("backgroundcolor",o),window.clearInterval(e.bgFadeInt))}),r)}};