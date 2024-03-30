async function fetch(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
async function post_(url,payload){
    try {
        const response = await axios.post(url,payload);
        return response;
    } catch (error) {
        console.error(error);
    }
}

function parseInputValue(htmlString, inputId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html"); // Parse as HTML

  const inputElement = doc.getElementById(inputId);

  if (inputElement) {
    return inputElement.value;
  } else {
    console.error('nothing matched')
    return null; // Or throw an error if not found
  }
}
async function encpwwosession(){
    const scripts = document.head.getElementsByTagName('script');
    const dyjsurl=scripts[scripts.length - 1].src.split(':/')[2];
    const dyjsres=await fetch(prox+'https://nid.naver.com/'+dyjsurl);
    const resultstr=dyjsres.split(';').slice(0,5).map((x)=> x.replace(/\n|\t/g, ""));
    // console.log(resultstr.map((x)=>x.match(/(?:'[^']*'|^[^']*$)/)[0].replace("'","")));
    const [sessionkey,keyname,e_val,n_val,encm]=resultstr.map((x)=>x.split("=")[1].trim().replace(/'/g, ""));
    if(!sessionkey||!keyname||!e_val||!n_val){
      console.error('one of value missing');
    }
    else{
      var rsa = new RSAKey();
          rsa.setPublic(e_val, n_val);
          $('encpw').value = rsa.encrypt(getLenChar(sessionkey) + sessionkey
                  + getLenChar($('id').value) + $('id').value
                  + getLenChar($('pw').value) + $('pw').value);
          try{
              if ($("bvsd") != null) {
                  $("bvsd").value = bvsd.f();
              }
          }catch(e){
              if ($("bvsd") != null) {
                  $("bvsd").value = e.message;
              }
          }
          $('pw').value = "";
          $('id').value = "";
    }
    console.log($("bvsd").value+','+$('encpw').value);
}

var porperties = {
    keyboard: [{
        id: "id"
    }, {
        id: "pw",
        secureMode: true
    }],
    modeProperties: {
        mode: 4
    }
};

function addurl(url,obj){
    if (isObjExist(obj)){
        if (url==""){
            return url+obj+"="+encodeURIComponent($(obj).value);
        }
        else{
            return url+"&"+obj+"="+encodeURIComponent($(obj).value);
        }
        
    }
    else{
        return url
    }
    
}
function getloginp()
{
	var urlWithParam="";
    urlWithParam=addurl(urlWithParam,"localechange");
    urlWithParam=addurl(urlWithParam,"dynamicKey");
	urlWithParam=addurl(urlWithParam,"encpw");
    urlWithParam=addurl(urlWithParam,"enctp");
    urlWithParam=addurl(urlWithParam,"svctype");
    urlWithParam=addurl(urlWithParam,"smart_LEVEL");
    urlWithParam=addurl(urlWithParam,"bvsd");
    urlWithParam=addurl(urlWithParam,"encnm");
	urlWithParam=addurl(urlWithParam,"locale");
    urlWithParam=addurl(urlWithParam,"url");
    urlWithParam=addurl(urlWithParam,"id");
    urlWithParam=addurl(urlWithParam,"pw");
	
	return urlWithParam;
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; domain=.github.io;";
  }
  function setSmartLevel_custom(level) {
	try {
	$('smart_LEVEL').value = level;
	} catch(e) {}
	try {
	$('smart_LEVEL').value = level;
	} catch(e) {}
	var today = new Date();
	var expire = new Date(today.getTime() + 60 * 60 * 24 * 365 * 1000);
	var curCookie = "nid_slevel=" + escape(level) + "; expires="
			+ expire.toGMTString() + "; path=/; domain=.naver.com;";
	document.cookie = curCookie;
}
