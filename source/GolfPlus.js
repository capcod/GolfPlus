enyo.kind({
	name: "MyApps.GolfPlus",
	kind: enyo.VFlexBox,
	components: [
		{name: "pane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.LeftRightFlyin",
			components: [
				{name: "menu", kind: "VFlexBox", className: "bg-gp",
				components: [
					{kind: "PageHeader", content: "GOLF PLUS"},
					{kind: "Button", className: "enyo-button-affirmative", 
						caption: "News", onclick: "showNews" },
					{kind: "Button", className: "enyo-button-affirmative", 
						caption: "Guide des Golfs", onclick: "showGolfs" },
					{kind: "Button", className: "enyo-button-affirmative", 
						caption: "Golf Plus TV", onclick: "showVideos" },
					{kind: "Button", className: "enyo-button-affirmative", 
						caption: "Boutique", onclick: "showTest" },
				]},
				{name: "news", className: "enyo-bg", kind: "MyApps.News",
					onSelect: "feedSelected", onLinkClick: "linkClicked", lazy: true},
				{name: "golfs", className: "enyo-bg", kind: "MyApps.Golfs", lazy: true},
				{name: "golfdetails", className: "enyo-bg", kind: "MyApps.GolfDetails", lazy: true},
				{name: "videos", className: "enyo-bg", kind: "MyApps.Videos", lazy: true},
				{name: "test", className: "enyo-bg", kind: "MyApps.Test", lazy: true}
			]}
	],
	showNews: function() {
		this.$.pane.selectViewByName("news");
	},
	showGolfs: function() {
		this.$.pane.selectViewByName("golfs");
	},
	showVideos: function() {
		this.$.pane.selectViewByName("videos");
	},
	showTest: function() {
		this.$.pane.selectViewByName("test");
	},
	feedSelected: function(inSender, inFeed) {
		this.$.pane.selectViewByName("detail");
		this.$.detail.setUrl(inFeed.link);
	},
	linkClicked: function(inSender, inUrl) {
		this.$.detail.setUrl(inUrl);
		this.$.pane.selectViewByName("detail");
	},
	backHandler: function(inSender, inEvent) {
		this.$.pane.back(inEvent);
	}
	
});

