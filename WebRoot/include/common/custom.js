// JavaScript Document
var $page;
$(document).on("pagecreate", function(e) {
	$page = $(e.target);
	var pageId = $page.attr("id");
	//���صײ��˵�
	createFooter($page,pageId);
	pageRefresh();
});