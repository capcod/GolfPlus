enyo.kind({
	name: "MyApps.News",
	kind: enyo.VFlexBox,
	events: {
		onLinkClick: "",
		onSelect: ""
	},
	components: [
		{name: "getFeed", kind: "WebService",
		onSuccess: "gotFeed",
		onFailure: "gotFeedFailure"},

		{kind: "PageHeader", components: [
			{kind: "Image", src: "images/NewsIcon.png"},
			{content: "NEWS", flex: 1, style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap; text-transform: capitalize; padding-left: 20px"}
		]},
		{kind: "Scroller", flex: 1, components: [
			{name: "list", kind: "VirtualRepeater", onGetItem: "getListItem",
				components: [
					{kind: "Item", layoutKind: "VFlexLayout", 
						components: [
							{name: "title", kind: "Divider"},
							{name: "description", kind: "HtmlContent",
								onLinkClick: "doLinkClick"}
						],
						onclick: "listItemClick"
						}
				]
			}
		]},
		{kind: "Image", src: "images/GolfZoneBanner.png", style: "padding-left: 0%"},
	],
	loadFeed: function() {
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20"
		+ "title%2C%20description%2C%20link%20from%20rss%20where%20url%3D%22"
		+ "http://www.golf-zone.com/ninjarsssyndicator" + "%22&format=json&callback=";
		this.$.getFeed.setUrl(url);
		this.$.getFeed.call();
	},
	gotFeed: function(inSender, inResponse) {
		this.results = inResponse.query.results.item;
		this.$.list.render();
	},
	gotFeedFailure: function(inSender, inResponse) {
		console.log("got failure from getFeed");
	},
	create: function() {
		this.inherited(arguments);
		this.results = [];
		this.loadFeed();
	},
	getListItem: function(inSender, inIndex) {
		var r = this.results[inIndex];
		if (r) {
			this.$.title.setCaption(r.title);
			this.$.description.setContent(r.description);
			return true;
		}
	},
	listItemClick: function(inSender, inEvent) {
		var feed = this.results[inEvent.rowIndex];
		this.doSelect(feed);
	}
});

