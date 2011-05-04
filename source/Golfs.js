enyo.kind({
	name: "MyApps.Golfs",
	kind: enyo.VFlexBox,
	events: {
		onSelect: ""
	},
	components: [
		{name: "pane", kind: "Pane", flex: 1, 
			components: [
				{name: "golfView", kind: "VFlexBox",
				  components: [
					{name: "getSampleData", kind: "WebService", 
						url: "http://golfplus.mobile2you.fr/golfs.json", 
						onSuccess: "gotSampleData",
						onFailure: "gotSampleDataFailure"},
					{kind: "PageHeader", components: [
						{kind: "Image", src: "images/GuidesIcon.png"},
						{name: "title", content: "Guide des Golfs", flex: 1, 
							style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap; text-transform: capitalize; padding-left: 20px"}
						]},
					{name: "golfFilter", kind: "RadioGroup", 
						components: [{"label":"Tous"}, {"label": "A PROXIMITE"}]},
					{name: "list", kind: "VirtualList", flex: 1, onSetupRow: "listSetupRow", 
					    components: [
							{kind: "Divider"},
							{kind: "Item", layoutKind: "HFlexLayout", components: [
								{name: "itemLabel", flex: 1},
								{name: "rowLabel"}
							],
							onclick: "listItemClick"
							}
						]
					}
				]},
				{name: "golfViewDetails", kind: "VFlexBox", onSelectedView: "viewSelected",
					components: [
					    {name: "getGolfData", kind: "WebService", onSuccess: "gotGolfData",
						onFailure: "gotGolfDataFailure"},
						{kind: "PageHeader", layoutKind: "HFlexLayout", pack: "center", align: "end",
									components: [ 
										{kind: "Image", src: "images/GuidesIcon.png"},
										{name: "titleViewDetails", content :"Golf", flex:1},
										{kind: "Button", content: "Back", onclick: "changePan"}
									]
						},
						{kind: "RowGroup", defaultKind:"HFlexBox", caption: "Adresse", 
							components: [
								{name: "adresse1"},
								{name: "adresse2"}
							]
						},
						{kind: "RowGroup", defaultKind:"HFlexBox", caption: "Contact", 
							components: [
								{name: "tel"},
								{name: "fax"},
								{name: "mail"},
								{name: "web"}
							]
						},
						{kind: "Button", content: "CARTE", className: "enyo-button-affirmative", onclick: "viewMap" },
						{
							kind: "WebView", 
							name: "myWebView",
							url: ""
						}
					]
				}
			]
		}
	],
	create: function() {
		this.inherited(arguments);
		this.data = [];
		this.golfData = [];
		this.$.getSampleData.call();
	},
	gotSampleData: function(inSender, inResponse) {
		this.data = inResponse;
		this.$.list.refresh();
	},
	gotSampleDataFailure: function(inSender, inResponse) {
		console.log("got failure from getSampleData");
	},
	getGroupName: function(inIndex) {
		// get previous record
		var r0 = this.data[inIndex -1];
		// get (and memoized) first letter of last name
		if (r0 && !r0.letter) {
			r0.letter = r0.golf.nom[0];
		}
		var a = r0 && r0.letter;
		// get record
		var r1 = this.data[inIndex];
		if (!r1.letter) {
			r1.letter = r1.golf.nom[0];
		}
		var b = r1.letter;
		// new group if first letter of last name has changed
		return a != b ? b : null;
	},
	setupDivider: function(inIndex) {
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getGroupName(inIndex);
		this.$.divider.setCaption(group);
		this.$.divider.canGenerate = Boolean(group);
		this.$.item.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
	},
	listSetupRow: function(inSender, inRow) {
		var f = this.data[inRow];
		if (f) {
			this.setupDivider(inRow);
			this.$.itemLabel.setContent(f.golf.nom);
			return true;
		}
	},
	listItemClick: function(inSender, inEvent) {
		var golf = this.data[inEvent.rowIndex];
		this.doSelect(golf);
	},
	doSelect: function(inGolf) {
		this.$.getGolfData.setUrl("http://golfplus.mobile2you.fr/golfs/" + inGolf.golf.id +".json");
		this.$.getGolfData.call();
		this.$.pane.selectViewByName("golfViewDetails");
	},
	backHandler: function(inSender, inEvent) {
		this.$.pane.back(inEvent);
	},
	changePan: function() {
		this.$.pane.selectViewByName("golfView");
	},
	gotGolfData: function(inSender, inResponse) {
		this.golfData = inResponse;
		this.$.titleViewDetails.setContent(this.golfData.golf.nom);
		this.$.adresse1.setContent(this.golfData.golf.adresse);
		this.$.adresse2.setContent(this.golfData.golf.cp + " " + this.golfData.golf.ville);
		this.$.tel.setContent("Tel: " + this.golfData.golf.tel);
		this.$.fax.setContent("Fax: " + this.golfData.golf.fax);
		this.$.mail.setContent(this.golfData.golf.mail);
		this.$.web.setContent(this.golfData.golf.web);		
	},
	gotGolfDataFailure: function(inSender, inResponse) {
		console.log("got failure from getGolfData");
	},
	viewMap: function() {
		this.$.myWebView.setUrl("http://maps.google.fr/maps?f=q&amp;hl=fr&amp;geocode=&amp;q=" + this.golfData.golf.latitude + "," +  this.golfData.golf.longitude + "&amp;aq=&amp;z=14");
	}
	
	
});



