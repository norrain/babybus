var isAndroid = (/android/gi).test(navigator.appVersion);
var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);
var isWebOS = (/webOS/gi).test(navigator.appVersion);

var IsDeviceReady = false;


function initAPP() {
	if(!localStorage.getItem('firstCheck')||localStorage.getItem('firstCheck')!="true"){
		location.href="include/welcome/wel.html";   //�ǵ�һ�ε�¼  �ͻ�ӭ
	}
	
		 
}

// ����ȷ���˳��Ի��򷵻صĽ��
function onConfirmExit(button) {
	 if(button){
	 	 navigator.app.exitApp();
	 }
}

//BackButton��ť  
function onBackKeyDown(){  
	showAlert(location.href);
	//showAlert("index:"+$.mobile.activePage.is('index.html'));
	//showAlert("sbus"+$.mobile.activePage.is('#search_bus'));
	//showAlert("index1"+$.mobile.activePage.is('index1.html'));
	if($.mobile.activePage.is('index.html')){
		  showConfirm("��ȷ��������һ�������",onConfirmExit);
	}else{
		$.mobile.back();
	}
	//$.mobile.activePage.is('#page1')
}  

function onMenuKeyDown(){
	//window.location="#page4";
}
function onSearchKeyDown() { 
	//window.location="#page6";
}

try{
	document.addEventListener("deviceready", backKeyListener, false);
}catch(e){
	alert("deviceready:"+e);
}
function backKeyListener() {
	try{
    	document.addEventListener("backbutton", onBackKeyDown, false);
    }catch(e){
		alert("backKeyListener:"+e);
	}
} 


function onDeviceReady(id) {
	
	showAlert("ddd"+id);
	if(IsDeviceReady) 
		return;
	
	IsDeviceReady=true;
	
	//��Ӱ�ť�¼� 
	try {document.addEventListener("backbutton",onBackKeyDown,false); 	} catch (e) {alert();}
	//try {document.addEventListener("menubutton", onMenuKeyDown, false); } catch (e) {}
	//try {document.addEventListener("searchbutton", onSearchKeyDown, false); } catch (e) {}
 
	
}




//�����Ƿ����ȡ���������
var Request = new Array();
function loadQueryString(url) {
	
	var s = url.replace("#","&");
	var n = s.indexOf("?");
	if (n >= 0)
		s = s.substring(n + 1);
	var valuelist = s.split("&");
	for (var i = 0; i < valuelist.length; i++) {
		var pair = valuelist[i].split("=");
		if (pair.length > 1) {
			Request[pair[0].toLowerCase()] = pair[1];
		};
	};
};

if(window.location.href.indexOf("?")>0){
	loadQueryString(window.location.href);	
	notify=window.location.href;
	//alert(notify);
}


function roundNumber(num) {
	var dec = 3;
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

// ��ʾ���ƾ����
function showAlert(msg,title,btntext) {
	try{
		if(!title) title="��ܰ��ʾ";
		if(!btntext) btntext="��֪����";
		if(navigator.notification && navigator.notification.alert){
   		navigator.notification.alert(
			msg,  // ��ʾ��Ϣ
			alertDismissed, 
			title,            // ����
			btntext            // ��ť����
		);
		}else{
			alert(":"+msg);
		}
	}catch(e){
		alert("E:"+msg);
	}	
}



// ����ȷ�϶Ի��򷵻صĽ��
function onConfirm(button) {
	alert('You selected button ' + button);
	
	return button==1;
}
	
// ��ʾһ�����Ƶ�ȷ�϶Ի���
function showConfirm(msg,onConfirmFun,title,btn) {
	if(!onConfirmFun) onConfirmFun=onConfirm;
	if(!title) title='��ѡ��'
	if(!btn) btn='ȷ��,ȡ��';
		try{
			return navigator.notification.confirm(
				msg,  // ��ʾ��Ϣ
				onConfirmFun,    // ���°�ť�󴥷��Ļص����������ذ��°�ť������	
				title,          // ����
				btn          // ��ť��ǩ
				);
		}catch(e){
			return onConfirmFun(window.confirm(msg));
		}
}

function show_nav(id){
        $('#header_nav li').each(function(){
        	alert($(this).attr("id")+"=="+this.className);
            if ($(this).attr("id") != 'aNav') {
                this.className = $(this).attr("id") == id ? this.className+' ui-btn-active' : this.className;
            }
        });
 }
 
  