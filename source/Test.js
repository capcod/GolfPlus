enyo.kind({
   name: "MyApps.Test",
   kind: enyo.VFlexBox,
   events: {
	  	onConfirm: "",
	  	onCancel: ""
	},
	components: [
  		{kind: "Button", content: "OK", onclick: "okClick"},
  		{kind: "Button", content: "Cancel", onclick: "cancelClick"},
  		{name: "mylat"},
  		{name: "mylon"},
  		{
  		 name: "GPSData", 
  		 kind: "PalmService", service: "palm://com.palm.location/",
  		 method: "getCurrentPosition", parameters: {},
  		 onSuccess: "gotGPSData",
  		 onFailure: "gotGPSDataFailure"
  		},
  		
	],
	create: function() {
		
	},
	okClick: function(inSender) {
	  this.doConfirm();
	},
	cancelClick: function(inSender) {
	  this.doCancel();
	},
	doConfirm: function(inSender) {
		console.log("confirm called");
		this.$.GPSData.call( { responseTime: 2, subscribe: false } );
	},
	gotGPSData: function(inSender, inResponse) {
		this.$.mylat.setContent(enyo.json.stringify(inResponse.latitude)); 
	}
	
});


