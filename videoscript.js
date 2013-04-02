//creates video playlist at http://www.mediaintellects.com/demo/playlist/index.html 

function parseVideoXML(xml) {
	var videoContainer = "";
	//retrieve attributes from video.xml file
	$(xml).find("video").each(function() {
		var videoThumb = $(this).attr('thumb');
		var videoCaption = $(this).attr('videocaption');
		var videoWidth = $(this).attr('videowidth');
		var videoHeight = $(this).attr('videoheight');
		var videoFile = $(this).attr('videofile');
		//create video box link and add all attributes to the link
		videoContainer += "<a class='videoLink' videowidth='"+videoWidth+"' videoheight='"+videoHeight+"' videofile='"+videoFile+"' videocaption='"+videoCaption+"' thumb='"+videoThumb+"'></a>";
	});

	//prepend the generated code to the video gallery container
	$('.video_gallery_container').prepend(videoContainer);
	//add background image, play to the video box
	$('a.videoLink').each(function() {
		var thumbnailFilePath = $(this).attr('thumb');
		var videoCaption = $(this).attr('videocaption');
		$(this).css("background-image","url(http://mediaintellects.com/demo/video/thumbs/" + thumbnailFilePath + ".jpg)");
		$(this).html("<div class='caption'>" + videoCaption + "</div><img src='images/play.png' class='play' />");
	});	
	loadVideo();
}

function loadVideo() {
	//build the video on the fly
	$('.videoLink').click(function() {
		var videoFile = $(this).attr('videofile');
		var videoPoster = $(this).attr('videofile');
		var videoWidth = Number($(this).attr('videowidth'));
		var videoHeight = Number($(this).attr('videoheight'));			
		var videoCode = '<video width="'+videoWidth+'" height="'+videoHeight+'" controls="controls" autoplay="autoplay"><source src="http://mediaintellects.com/demo/video/'+ videoFile+'.ogv" type="video/ogg" /><source src="http://mediaintellects.com/demo/video/'+videoFile+'.mp4" type="video/mp4" />	<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="'+videoWidth+'" height="'+videoHeight+'" id="lemarvideos"> <param name="movie"  value="http://mediaintellects.com/demo/video/'+videoFile+'.flv" /><param name="allowScriptAccess"  value="sameDomain" /><param name="allowFullScreen" value="true" />	<param name="scale"  value="noscale" />	<param name="wmode"  value="transparent" />	<param name="quality" value="high" /> <embed src="video/'+videoFile+'.flv" quality="high" width="'+videoWidth+'" height="'+videoHeight+'" name="lemarvideos" align="" type="application/x-shockwave-flash" allowScriptAccess="sameDomain" allowFullScreen="true" scale="noscale" wmode="transparent" qulaity="high" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed> </object></video>';
		$('<div>',{id:'videoContainer'}).css('display','none').appendTo('body');
		$('<div>',{id:'videoPlayer'}).appendTo('div#videoContainer');
		$('#videoPlayer').html(videoCode);
		
		//use fancybox js framework to display video
		$.fancybox({
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'overlayColor' : '#000',
			'overlayOpacity' : '.6',
			'href' : '#videoPlayer'		
		});
	});
}

$(document).ready(function() {		
	$.ajax({
		type: "GET",
		url: "video.xml",
		dataType: "xml",
		success: parseVideoXML
	});
});
