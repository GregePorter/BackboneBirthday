(function($){

//month model
    var Month = Backbone.Model.extend({
        defaults : function () {
	    return {
                name : "",
                number  : 0,	
                selected : false,
            }
        },
    });

//Month view 
    var MonthView = Backbone.View.extend({
        tagName : "div", 
        id  : "month",
        events : {
            "click" : "select"
        },	
        initialize: function() {
            this.listenToOnce(this.model, 'change', this.render);
        },
	select : function(e) {
            this.model.set({"selected" : true});
        },
        render: function () {
	    console.log("Rendering " + this.model.get('name'));
            if (this.model.get("selected")) {
                this.$el.html(this.model.get('name')).css({color : "red"});
            } else {
                this.$el.html(this.model.get('name'));
            }
            return this;
        }
    });

    var Year = Backbone.Collection.extend({
        model : Month,
        comparator : function (model) {
            return model.get("number");
        }
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
        currentMonth : "",
        sort : "",
	initialize: function() {
		var that = this;
                currentMonth = "January";
                sort = "number";
		months.each(function (mon) {
			that.addMonth(mon);
		});
	},
        events : {
            "click #numButton" : "byNumber",
            "click #nameButton" : "byName",
            "click #month" : "changeMonth"
        },
        byNumber : function () {
            var that = this;
            sort = "number";
            console.log("Sort by number selected");
            months.sort();
            months.each(function (mon) {
                $("#month").remove();
                $("#month").unbind();
                that.addMonth(mon);
            });
        },
        changeMonth : function (e) {
            currentMonth = $(e.currentTarget)[0].innerHTML;
            console.log("Current month is now " + currentMonth);
            if (sort === "number") {
                this.byNumber(); 
            } else {
                this.byName();
            }
        },
        byName : function () {
            var that = this;
            sort = "name";
            console.log("Sort by name selected");
            var sortedList =  months.sortBy( function (mon) {
                return mon.get("name");
            });
            sortedList.forEach( function (mon) {
                $("#month").remove();
                $("#month").unbind();
                that.addMonth(mon);
            }); 
        },
        addMonth : function (mon) {
            var view = new MonthView({model : mon});
            if (mon.get('name') != currentMonth) {
                mon.set({"selected" : false});
            }
            var monthView = view.render().el;
            this.$el.append(monthView);
        }
    });
    var appView = new AppView;
})(jQuery);
