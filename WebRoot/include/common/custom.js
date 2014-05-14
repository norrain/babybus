// JavaScript Document
var $page;

//���صײ��˵�
function createFooter(page,id){
	var footerUrl = page.attr("data-footer");
	if (footerUrl) {
		var footerHtml = '';
		if (!footerHtml) {
			footerHtml = urlLoadContent(footerUrl);
			ss.setItem(footerUrl, footerHtml);
		}

		page.append(footerHtml);
		//alert($("#"+id+"Nav"));
		//$("#"+id+"Nav").attr("class","ui-btn-active ui-state-persist");
		var btnState =page.find('a[nid="'+id+'Nav"]');
		btnState.attr("class","ui-btn-active ui-state-persist");
		
		var nid = id+'Nav';
		page.find('a').fastClick(function(){
			if($(this).attr("nid")!=nid){
			   var nurl = $(this).attr("nhref");
			   //alert(nurl);
			   showLoading();
			   goTo(nurl);
			}
	    });
	}
}

$(document).on("pagecreate", function(e) {
	$page = $(e.target);
	var pageId = $page.attr("id");
	if($page.attr("data-footer")){
		//���صײ��˵�
		createFooter($page,pageId);
		$.mobile.pageContainer.trigger("create");
	}
});
 
 
 