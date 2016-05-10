		window.console = window.console || function(t) {};
		var b = document.documentElement;
		b.setAttribute('data-useragent', navigator.userAgent);
		b.setAttribute('data-platform', navigator.platform);
		groupChatJid = window.location.hash;
		groupChatJid = groupChatJid.substring(1);
		//$.getJSON( "testdata.json", function( data ) {
		$.getJSON("/rest/sounds/"+groupChatJid, function( data ) {
			for (var i = 0, l = data.length; i < l; i++) {
				var it=data[i];
				//console.log(it.name);
				$("#plList").append(
					'<li><div class="plItem">'+
					'<div class="plNum">'+(i+1)+'.</div>'+
					'<div class="plTitle">'+it.name+'</div>'+
					'<div class="plLength">'+(it.lengthString === undefined?"": it.lengthString)+'</div>'+
					'</div></li>');
			}
			
			jQuery(function($) {
				var supportsAudio = !!document.createElement('audio').canPlayType;
				if (supportsAudio) {
					var index = 0, playing = false;
							tracks = data,
							trackCount = tracks.length,
							audio = $('#audio1').bind('play', function() {
								playing = true;
							}).bind('pause', function() {
								playing = false;
							}).bind('ended', function() {
								if (index + 1 < trackCount) {
									index++;
									loadTrack(index);
									audio.play();
								} else {
									audio.pause();
									index = 0;
									loadTrack(index);
								}
							}).get(0),
							btnPrev = $('#btnPrev').click(function() {
								if (index - 1 > -1) {
									index--;
									loadTrack(index);
									if (playing) {
										audio.play();
									}
								} else {
									audio.pause();
									index = 0;
									loadTrack(index);
								}
							}),
							btnNext = $('#btnNext').click(function() {
								if (index + 1 < trackCount) {
									index++;
									loadTrack(index);
									if (playing) {
										audio.play();
									}
								} else {
									audio.pause();
									index = 0;
									loadTrack(index);
								}
							}),
							li = $('#plList li').click(function() {
								var id = parseInt($(this).index());
								if (id !== index) {
									playTrack(id);
								}
							}),
							loadTrack = function(id) {
								$('.plSel').removeClass('plSel');
								$('#plList li:eq(' + id + ')').addClass('plSel');
								index = id;
								audio.src = tracks[id].url;
							}, playTrack = function(id) {
								loadTrack(id);
								audio.play();
							};
					loadTrack(index);
				}
			});
		});

		if (document.location.search.match(/type=embed/gi)) {
			window.parent.postMessage("resize", "*");
		}
		