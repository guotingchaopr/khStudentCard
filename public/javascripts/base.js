$(function(){
	$(".ui.radio.checkbox").checkbox();
	$('.selection.dropdown').dropdown();
	var videoObj = {video:true},
		current_stream ;
	$("#photo").click(function(){
		$("#phto_Modal").modal({
		    closable  : false,
		    onDeny    : function(){
		      return false;
		    },
		    onApprove : function() {
		      current_stream.stop();
		    }
	  	}).modal("show");
			navigator.webkitGetUserMedia({video:true},function (stream) {
			 	$("#mediaStream")[0].src = URL.createObjectURL(stream);
			 	current_stream=stream;
			},
			function (err) {
				console.log(err);
			}
		);
	});
})