enyo.kind({
   name: "MyApps.Videos",
   kind: enyo.VFlexBox,
   components: [
	   {kind: "PageHeader", content: "Golf Plus TV"},
	   {kind: "VFlexBox", components: [
		    {kind: "Video", src: "http://www.w3schools.com/html5/movie.ogg"},
		    {kind: "Button", caption: "Play", onclick: "playMovie" }
	   ]}
   ],
   create: function() {
   		this.inherited(arguments);
//   		this.$.video.play()
   },
   playMovie: function() {
   
   		if (this.$.button.content == "Play") {
	      	this.$.video.play();
	      	this.$.button.setContent("Pause");
	    } else {
	     	this.$.video.pause();
	      	this.$.button.setContent("Play");
	    }
   },
   backHandler: function(inSender, inEvent) {
		this.$.pane.back(inEvent);
	}
});
