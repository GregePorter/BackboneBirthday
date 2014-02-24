(function($){

//month model
    var Month = Backbone.Model.extend({
        defaults : function () {
	    return {
                name : "",
                number  : 0,	
                selected : false,
            }
        }
    });

//Month view 
    var MonthView = Backbone.View.extend({
        tagName : "div", 
        id  : "month",
        events : {
            "click" : "select"
        },	
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
	select : function(e) {
            if($(e.currentTarget.innerHTML).get("selector") == this.model.get('name')) {
                this.model.set({"selected" : true});
                $(e.currentTarget).css({background: "red"});
            } else {
                this.model.set({"selected" : false});
            }
            console.log($(e.currentTarget.innerHTML).get("selector"));
        },
        render: function () {
            if (this.model.get('selected') == true) {
                //this.set({color : "red"});
            } else {
                //this.set({color : "blue"});
            }
            this.$el.html(this.model.get('name'));
            return this;
        }
    });

    var Year = Backbone.Collection.extend({
        model : Month
    });

    var jan = new Month({
        name : "January",
        number : 1,
    });

    var feb = new Month({
        name : "February",
        number : 2
    });

    var mar = new Month({
        name : "March",
        number : 3
    });

    var apr = new Month({
        name : "April",
        number : 4
    });

    var may = new Month({
        name : "May",
        number : 5
    });

    var jun = new Month({
        name : "June",
        number : 6
    });

    var jul = new Month({
        name : "July",
        number : 7
    });

    var aug = new Month({
        name : "August",
        number : 8
    });

    var sep = new Month({
        name : "September",
        number : 9
    });

    var oct = new Month({
        name : "October",
        number : 10
    });

    var nov = new Month({
        name : "November",
        number : 11
    });

    var dec = new Month({
        name : "December",
        number : 12
    });

    var months = new Year;

    months.add(jan);
    months.add(feb);
    months.add(mar);
    months.add(apr);
    months.add(may);
    months.add(jun);
    months.add(jul);
    months.add(aug);
    months.add(sep);
    months.add(oct);
    months.add(nov);
    months.add(dec);

    window.AppView = Backbone.View.extend({
        el: $("body"),
	initialize: function() {
		var that = this;
		months.each(function (mon) {
			that.addMonth(mon);
		});
	},
        events : {
            "click #numButton" : "byNumber",
            "click #nameButton" : "byName",
        },
        byNumber : function () {
            console.log("Sort by number selected");
        },
        byName : function () {
            console.log("Sort by name");
        },
        addMonth : function (mon) {
            var view = new MonthView({model : mon});
            this.$el.append(view.render().el);
        }
    });
    var appView = new AppView;
})(jQuery);
