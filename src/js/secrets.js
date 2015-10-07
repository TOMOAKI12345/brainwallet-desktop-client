    // secrets.js - by Alexander Stetsyuk - released under MIT License
(function(exports, global){
    function c(a){throw a;}var l=null,m="undefined"!==typeof module&&module.exports?module.exports:window.secrets={},n="undefined"!==typeof GLOBAL?GLOBAL:window;function q(a){a&&("number"!==typeof a||0!==a%1||a<r.g||a>r.e)&&c(Error("Number of bits must be an integer between "+r.g+" and "+r.e+", inclusive."));s.b=r.b;s.a=a||r.a;s.size=Math.pow(2,s.a);s.max=s.size-1;a=[];for(var b=[],d=1,e=r.l[s.a],f=0;f<s.size;f++)b[f]=d,a[d]=f,d<<=1,d>=s.size&&(d^=e,d&=s.max);s.c=a;s.d=b}
    function u(){return!s.a||!s.size||!s.max||!s.c||!s.d||s.c.length!==s.size||s.d.length!==s.size?!1:!0}
    function v(){function a(a,b,d,e){for(var j="",t=0,p=b.length-1;t<p||j.length<a;)j+=w(parseInt(b[t],d).toString(2),e),t++;j=j.substr(-a);return(j.match(/0/g)||[]).length===j.length?l:j}var b,d;if("function"===typeof require&&(d=require("crypto"))&&(b=d.randomBytes))return function(d){for(var e=Math.ceil(d/8),h=l;h===l;)h=a(d,b(e).toString("hex"),16,4);return h};if(n.crypto&&"function"===typeof n.crypto.getRandomValues&&"function"===typeof n.Uint32Array)return d=n.crypto,function(b){for(var e=l,h=new n.Uint32Array(Math.ceil(b/
    32));e===l;)d.getRandomValues(h),e=a(b,h,10,32);return e};s.i=!0;x();var e=Math.pow(2,32)-1;return function(b){for(var d=Math.ceil(b/32),h=[],k=l;k===l;){for(k=0;k<d;k++)h[k]=Math.floor(Math.random()*e+1);k=a(b,h,10,32)}return k}}function x(){n.console.warn(r.k);"function"===typeof n.alert&&s.alert&&n.alert(r.k)}
    function y(a){var b=parseInt(a[0],36);b&&("number"!==typeof b||0!==b%1||b<r.g||b>r.e)&&c(Error("Number of bits must be an integer between "+r.g+" and "+r.e+", inclusive."));var d=Math.pow(2,b)-1,e=d.toString(s.b).length,f=parseInt(a.substr(1,e),s.b);("number"!==typeof f||0!==f%1||1>f||f>d)&&c(Error("Share id must be an integer between 1 and "+s.max+", inclusive."));a=a.substr(e+1);a.length||c(Error("Invalid share: zero-length share."));return{bits:b,id:f,value:a}}
    function z(a,b){for(var d,e,f=[],g=[],h="",k,j=0,t=b.length;j<t;j++){e=y(b[j]);"undefined"===typeof d?d=e.bits:e.bits!==d&&c(Error("Mismatched shares: Different bit settings."));s.a!==d&&q(d);a:{k=0;for(var p=f.length;k<p;k++)if(f[k]===e.id){k=!0;break a}k=!1}if(!k){k=f.push(e.id)-1;e=A(B(e.value));for(var p=0,E=e.length;p<E;p++)g[p]=g[p]||[],g[p][k]=e[p]}}j=0;for(t=g.length;j<t;j++)h=w(C(a,f,g[j]).toString(2))+h;return 0===a?(k=h.indexOf("1"),D(h.slice(k+1))):D(h)}
    function C(a,b,d){var e=0,f,g,h;g=0;for(var k=b.length;g<k;g++)if(d[g]){f=s.c[d[g]];for(h=0;h<k;h++)if(g!==h){if(a===b[h]){f=-1;break}f=(f+s.c[a^b[h]]-s.c[b[g]^b[h]]+s.max)%s.max}e=-1===f?e:e^s.d[f]}return e}function A(a,b){b&&(a=w(a,b));for(var d=[],e=a.length;e>s.a;e-=s.a)d.push(parseInt(a.slice(e-s.a,e),2));d.push(parseInt(a.slice(0,e),2));return d}function w(a,b){b=b||s.a;var d=a.length%b;return(d?Array(b-d+1).join("0"):"")+a}
    function B(a){for(var b="",d,e=a.length-1;0<=e;e--)d=parseInt(a[e],16),isNaN(d)&&c(Error("Invalid hex character.")),b=w(d.toString(2),4)+b;return b}function D(a){var b="",d;a=w(a,4);for(var e=a.length;4<=e;e-=4)d=parseInt(a.slice(e-4,e),2),isNaN(d)&&c(Error("Invalid binary character.")),b=d.toString(16)+b;return b}
    var r={a:8,b:16,g:3,e:20,j:2,f:6,l:[l,l,1,3,3,5,3,3,29,17,9,5,83,27,43,3,45,9,39,39,9,5,3,33,27,9,71,39,9,5,83],k:"WARNING:\nA secure random number generator was not found.\nUsing Math.random(), which is NOT cryptographically strong!"},s={};m.getConfig=function(){return{bits:s.a,unsafePRNG:s.i}};m.init=q;
    m.setRNG=function(a,b){u()||this.init();s.i=!1;a=a||v();("function"!==typeof a||"string"!==typeof a(s.a)||!parseInt(a(s.a),2)||a(s.a).length>s.a||a(s.a).length<s.a)&&c(Error("Random number generator is invalid. Supply an RNG of the form function(bits){} that returns a string containing 'bits' number of random 1's and 0's."));s.h=a;s.alert=!!b;return!!s.m};
    m.random=function(a){"function"!==typeof s.h&&this.setRNG();("number"!==typeof a||0!==a%1||2>a)&&c(Error("Number of bits must be an integer greater than 1."));s.i&&x();return D(s.h(a))};
    m.share=function(a,b,d,e){u()||this.init();"function"!==typeof s.h&&this.setRNG();e=e||0;"string"!==typeof a&&c(Error("Secret must be a string."));("number"!==typeof b||0!==b%1||2>b)&&c(Error("Number of shares must be an integer between 2 and 2^bits-1 ("+s.max+"), inclusive."));if(b>s.max){var f=Math.ceil(Math.log(b+1)/Math.LN2);c(Error("Number of shares must be an integer between 2 and 2^bits-1 ("+s.max+"), inclusive. To create "+b+" shares, use at least "+f+" bits."))}("number"!==typeof d||0!==
    d%1||2>d)&&c(Error("Threshold number of shares must be an integer between 2 and 2^bits-1 ("+s.max+"), inclusive."));d>s.max&&(f=Math.ceil(Math.log(d+1)/Math.LN2),c(Error("Threshold number of shares must be an integer between 2 and 2^bits-1 ("+s.max+"), inclusive.  To use a threshold of "+d+", use at least "+f+" bits.")));("number"!==typeof e||0!==e%1)&&c(Error("Zero-pad length must be an integer greater than 1."));s.i&&x();a="1"+B(a);a=A(a,e);e=Array(b);for(var f=Array(b),g=0,h=a.length;g<h;g++)for(var k=
        this._getShares(a[g],b,d),j=0;j<b;j++)e[j]=e[j]||k[j].x.toString(s.b),f[j]=w(k[j].y.toString(2))+(f[j]?f[j]:"");a=s.max.toString(s.b).length;for(g=0;g<b;g++)e[g]=s.a.toString(36)+w(e[g],a)+D(f[g]);return e};m._getShares=function(a,b,d){var e=[];a=[a];for(var f=1;f<d;f++)a[f]=parseInt(s.h(s.a),2);f=1;for(b+=1;f<b;f++){d=s.c[f];for(var g=0,h=a.length-1;0<=h;h--)g=0===g?a[h]:s.d[(d+s.c[g])%s.max]^a[h];e[f-1]={x:f,y:g}}return e};secrets._processShare=y;m.combine=function(a){return z(0,a)};
    m.newShare=function(a,b){"string"===typeof a&&(a=parseInt(a,s.b));var d=y(b[0]),d=Math.pow(2,d.bits)-1;("number"!==typeof a||0!==a%1||1>a||a>d)&&c(Error("Share id must be an integer between 1 and "+s.max+", inclusive."));return s.a.toString(36)+w(a.toString(s.b),d.toString(s.b).length)+z(a,b)};m._lagrange=C;
    m.str2hex=function(a,b){"string"!==typeof a&&c(Error("Input must be a character string."));b=b||r.j;("number"!==typeof b||0!==b%1||1>b||b>r.f)&&c(Error("Bytes per character must be an integer between 1 and "+r.f+", inclusive."));for(var d=2*b,e=Math.pow(16,d)-1,f="",g,h=0,k=a.length;h<k;h++){g=a[h].charCodeAt();isNaN(g)&&c(Error("Invalid character: "+a[h]));if(g>e){var j=Math.ceil(Math.log(g+1)/Math.log(256));c(Error("Invalid character code ("+g+"). Maximum allowable is 256^bytes-1 ("+e+"). To convert this character, use at least "+
    j+" bytes."))}f=w(g.toString(16),d)+f}return f};m.hex2str=function(a,b){"string"!==typeof a&&c(Error("Input must be a hexadecimal string."));b=b||r.j;("number"!==typeof b||0!==b%1||1>b||b>r.f)&&c(Error("Bytes per character must be an integer between 1 and "+r.f+", inclusive."));var d=2*b,e="";a=w(a,d);for(var f=0,g=a.length;f<g;f+=d)e=String.fromCharCode(parseInt(a.slice(f,f+d),16))+e;return e};m.init();
})(typeof module !== 'undefined' && module['exports'] ? module['exports'] : (window['secrets'] = {}), typeof GLOBAL !== 'undefined' ? GLOBAL : window );
secrets.setRNG(null, false);

function error(location, message, hide){
    $($(location).parent()).before('<div class="alert alert-error fade in popupError"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Error</h4>'+message+'</div>')
    if(hide){
        $(hide).hide();
    }
    $(location).removeClass('disabled');
}
$(document).on('click', '#splitButton', function(ev){
    var el = $(this)
    if(el.hasClass('disabled')){
        return;
    }else{
        el.addClass('disabled');
    }

    if(secrets.getConfig().bits !== 8){
        secrets.init(8);
    }
    $('#split-tab .popupError').remove();

    var string = $('#string').val();
    if(string === ''){
        return error(this, 'Input cannot be empty.', '#split-result')
    }
    var hash = CryptoJS.SHA3(string);
    var type = $('.inputType.active').attr('data-inputType');
    var numShares = $('#numShares').val() * 1;
    if(typeof numShares !== 'number' || isNaN(numShares) || numShares < 2 || numShares > 255){
        return error(this, 'Number of shares must be an integer between 2 and 255, inclusive.', '#split-result')
    }
    var threshold = $('#threshold').val() * 1;
    if(typeof threshold !== 'number' || isNaN(threshold) || threshold < 2 || threshold > 255){
        return error(this, 'Threshold must be an integer between 2 and 255, inclusive.', '#split-result')
    }

    if(type==='text'){
        string = secrets.str2hex(string);
    }
    if(!$('#shares').length){
        $(this).parent().after('<div id="split-result" style="display:none;" class="alert alert-block alert-success fade in"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Secret shares</h4>One share per line<pre id="shares"></pre></div>');
    }
    try{
        var shares = secrets.share(string, numShares, threshold);
        var textarea = $('#shares');
        shares = shares.join('<br>');
        textarea.html(shares);
        $('#split-hash').text(hash)
        $('#split-result').show();
        secrets.getConfig().unsafePRNG ? $('#PRNGwarning').show() : $('#PRNGwarning').hide();
        numShares<threshold ? $('#mismatchWarning').show() : $('#mismatchWarning').hide();
    }catch(e){
        return error(this, e, '#split-result')
    }
    el.removeClass('disabled');
});

$(document).on('click', '#reconButton', function(ev){
    $('#recon-tab .popupError').remove();
    $('#hashMismatchError').hide();
    var inputHash = $('#inputhash').val();
    var shares = [];
    $('.shareInput').each(function(){
        var share = $.trim($(this).val());
        if(share){
            shares.push(share);
        }else if($('.shareInput').length >= 3){
            $(this).remove();
        }
    })
    if(shares.length<2){
        return error(this, 'Enter at least 2 shares.', '#recon-result')
    }
    var type = $('.reconType.active').attr('data-inputType');

    if(!$('#reconstruction').length){
        $(this).parent().after('<div id="recon-result" style="display:none;" class="alert alert-block alert-success fade in"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Reconstructed secret</h4><pre id="reconstruction"></pre></div>');
    }
    try{
        var recon = secrets.combine(shares);
        if(type === 'text'){
            recon = secrets.hex2str(recon);
        }
        $('#reconstruction').text(recon);

        try{
            var hash = CryptoJS.SHA3(recon).toString();
            $('#recon-hash').text(hash);
            if(inputHash && $.trim(inputHash) !== hash){
                $('#hashMismatchError').show();
            }
        }catch(e){
            if($('#recon-advanced').hasClass('active')){
                error(this,'SHA3-512 Hash ' + e, '#recon-result');
            }
        }
        $('#recon-result').show();
    }catch(e){
        return error(this, 'Reconstruction ' + e, '#recon-result')
    }

})

$(document).on('click', '.generate', function(ev){
    ev.preventDefault();
    var rnd = secrets.random($(this).attr('data-bits') * 1);
    $('#string').replaceWith('<input class="input-block-level" id="string" type="text" placeholder="分割された鍵" value="'+rnd+'">')
    $('.inputType[data-inputType=text]').removeClass('active')
    $('.inputType[data-inputType=hex]').addClass('active')
})

$(document).on('click', '#addShareButton', function(ev){
    $('#inputShares').append('<input type="text" class="input-block-level shareInput" placeholder="1つの分割された鍵を入力">')
})

$(document).on('click','#clearButton', function(ev){
    $('#string').val('');
})

$(document).on('click','#clearAllButton', function(ev){
    $('.shareInput').each(function(){
        $(this).val('');
    })
})

$(document).on('click','.inputType[data-inputType=hex]', function(ev){
    var string = $('#string');
    var val = string.val().replace(/\n/g,' ');
    if(string.is('textarea')){
        string.replaceWith('<input class="input-block-level" id="string" type="text" placeholder="分割された鍵" value="'+val+'">')
    }
})
$(document).on('click','.inputType[data-inputType=text]', function(ev){
    var string = $('#string');
    var val = string.val();
    if(!string.is('textarea')){
        string.replaceWith('<textarea class="input-block-level" id="string" type="text" rows="3" placeholder="分割するされた鍵">'+val+'</textarea>')
    }
})

$(document).on('click','#resetSplitForm', function(ev){
    $('#split-tab .popupError').remove();
    var string = $('#string').val('');
    if(!string.is('textarea')){
        string.replaceWith('<textarea class="input-block-level" id="string" type="text" rows="3" placeholder="分割された鍵"></textarea>')
    }
    $('#numShares').val(2);
    $('#threshold').val(2);
    $('.inputType.active').removeClass('active');
    $('.inputType[data-inputType=text]').addClass('active');
    $('#split-result').hide();
    $('#shares').empty();
    $('#split-hash').empty();
})

$(document).on('click','#resetReconForm', function(ev){
    $('#recon-tab .popupError').remove();
    $('.shareInput').each(function(){
        if($('.shareInput').length >=3 ){
            $(this).remove()
        }else{
            $(this).val('');
        }
    })
    $('#string').val('');Secretを
    $('#numShares').val(2);
    $('#threshold').val(2);
    $('.reconType.active').removeClass('active');
    $('.reconType[data-inputType=text]').addClass('active');
    $('#inputhash').val('');
    $('#recon-result').hide();
    $('#reconstruction').empty();
    $('hashMismatchError').empty();
    $('#recon-hash').empty();
})

$(document).on('click', '#split-simple', function(ev){
    $('#split .advancedElement').hide();
    $('.reconType.active').removeClass('active');
    $('.reconType[data-inputType=text]').addClass('active');
});

$(document).on('click', '#split-advanced', function(ev){
    $('#split .advancedElement').show();
})
$(document).on('click', '#recon-advanced', function(ev){
    $('#reconstruct .advancedElement').show();
})

$(document).on('click', '#recon-simple', function(ev){
    $('#reconstruct .advancedElement').hide();
    $('.reconType.active').removeClass('active');
    $('.reconType[data-inputType=text]').addClass('active');
});
