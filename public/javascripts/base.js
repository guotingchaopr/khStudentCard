$(function(){
	$(".ui.radio.checkbox").checkbox();
	$('.selection.dropdown').dropdown();
	var videoObj = {video:true},
		current_stream,
		mediaStream= $("#mediaStream")[0];
	$("#photo").click(function(){
			takeMediaStream();
	});
	var  closeCamera = function(stream){
		if(current_stream!=null){
			stream.stop();
			current_stream = null;
		}
	},
	takeMediaStream = function(){
		$(mediaStream).show();
		$("#phto_Modal canvas").remove();
		navigator.webkitGetUserMedia({video:true},function (stream) {
				showModal();
			 	mediaStream.src = URL.createObjectURL(stream);
			 	current_stream=stream;
			},
			function (err) {
				console.log(err);
			}
		);
	},
	takePhoto = function(){
		if(current_stream==null)takeMediaStream();
		var canvas  = document.createElement("canvas"),
			ctx = canvas.getContext('2d'),
			cw =  mediaStream.clientWidth,
			ch =  mediaStream.clientHeight;
			canvas.width = cw;
			canvas.height= ch;
		canvas.className=mediaStream.className;
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,cw,ch);
		ctx.drawImage(mediaStream,0,0,cw,ch,0,0,cw,ch);
		ctx.closePath();
		closeCamera(current_stream);
		$(mediaStream).hide();
		$(mediaStream).parent().append(canvas);
	},
	showModal = function(){
		$("#phto_Modal").modal({
		    closable  : false,
		    onDeny    : function(){
		      takePhoto(current_stream);
		      return false;
		    },
		    onApprove : function() {
		      return false;
		    },
		    onHide : function(){
		      closeCamera(current_stream);
		    },
		    transition:"vertical flip",
		    duration:1000
	  	}).modal("show");
	}
})