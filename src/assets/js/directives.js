/*
 *  Document   : directives.js
 *  Author     : pixelcave
 *  Description: Our custom directives
 *
 */

/*
 * Custom helper directives
 *
 */

// View loader functionality
// By adding the attribute 'data-js-view-loader'
App.directive('jsViewLoader', function () {
    return {
        link: function (scope, element) {
            var el = jQuery(element);

            // Hide the view loader, populate it with content and style it
            el
                .hide()
                .html('<i class="fa-fw fa fa-refresh fa-spin text-primary"></i>')
                .css({
                    'position': 'fixed',
                    'top': '20px',
                    'left': '50%',
                    'height': '20px',
                    'width': '20px',
                    'margin-left': '-10px',
                    'z-index': 99999
                 });

            // On state change start event, show the element
            scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                el.fadeIn(250);
            });

            // On state change success event, hide the element
            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                el.fadeOut(250);
            });
        }
    };
});

// Main navigation functionality
// By adding the attribute 'data-js-main-nav'
App.directive('jsMainNav', function () {
    return {
        link: function (scope, element) {
            // When a submenu link is clicked
            jQuery('[data-toggle="nav-submenu"]', element).on('click', function(e){
                // Get link
                var link = jQuery(this);

                // Get link's parent
                var parentLi = link.parent('li');

                if (parentLi.hasClass('open')) { // If submenu is open, close it..
                    parentLi.removeClass('open');
                } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
                    link
                        .closest('ul')
                        .find('> li')
                        .removeClass('open');

                    parentLi
                        .addClass('open');
                }

                return false;
            });

            // Remove focus when clicking on a link
            jQuery('a', element).on('click', function(){
                jQuery(this).blur();
            });

            // On state change success event, hide the sidebar in mobile devices
            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                scope.ui.settings.sidebarOpenXs = false;
            });
        }
    };
});


// Populate element's content with the correct copyright year
// By adding the attribute 'data-js-year-copy'
App.directive('jsYearCopy', function () {
    return {
        link: function (scope, element) {
            var gdate     = new Date();
            var copyright = '20';

            if (gdate.getFullYear() !== 2015) {
                copyright = copyright + gdate.getFullYear().toString().substr(2,2);
            }

            element.text(copyright);
        }
    };
});

// Animated scroll to an element
// By adding the attribute (with custom values) 'data-js-scroll-to="{target: '#target_element_id', speed: 'milliseconds'}"' to a button or a link
App.directive('jsScrollTo', function () {
    return {
        link: function (scope, element, attrs) {
            var options       = (typeof scope.$eval(attrs.jsScrollTo) !== 'undefined') ? scope.$eval(attrs.jsScrollTo) : new Object();
            var header        = jQuery('#header-navbar');
            var headerHeight  = (header.length && scope.ui.settings.headerFixed) ? header.outerHeight() : 0;

            jQuery(element).on('click', function () {
                jQuery('html, body').animate({
                    scrollTop: jQuery(options.target).offset().top - headerHeight
                }, options.speed ? options.speed : 1000);
            });
        }
    };
});

// Toggle a class to a target element
// By adding the attribute (with custom values) 'data-js-toggle-class="{target: '#target_element_id', class: 'class_name_to_toggle'}'
App.directive('jsToggleClass', function () {
    return {
        link: function (scope, element, attrs) {
            var options = (typeof scope.$eval(attrs.jsToggleClass) !== 'undefined') ? scope.$eval(attrs.jsToggleClass) : new Object();

            jQuery(element).on('click', function () {
                jQuery(options.target).toggleClass(options.class);
            });
        }
    };
});

// Removes focus from an element on click
// By adding the attribute 'data-js-blur'
App.directive('jsBlur', function () {
    return {
        link: function (scope, element) {
            element.bind('click', function (){
                element.blur();
            });
        }
    };
});

// jQuery Appear, for more examples you can check out https://github.com/bas2k/jquery.appear
// By adding the attribute (with custom values) 'data-js-appear="{speed: 1000, refreshInterval: 10, ...}'
App.directive('jsAppear', function () {
    return {
        link: function (scope, element, attrs) {
            var options = (typeof scope.$eval(attrs.jsAppear) !== 'undefined') ? scope.$eval(attrs.jsAppear) : new Object();
            var el       = jQuery(element);
            var windowW  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            el.appear(function() {
                setTimeout(function(){
                    el.removeClass('visibility-hidden')
                        .addClass(options.class ? options.class : 'animated fadeIn');
                }, (jQuery('html').hasClass('ie9') || windowW < 992) ? 0 : (options.timeout ? options.timeout : 0));
            },{accY: options.offset ? options.offset : 0});
        }
    };
});

// jQuery Appear + jQuery countTo, for more examples you can check out https://github.com/bas2k/jquery.appear and https://github.com/mhuggins/jquery-countTo
// By adding the attribute (with custom values) 'data-js-count-to="{speed: 1000, refreshInterval: 10, ...}'
App.directive('jsCountTo', function () {
    return {
        link: function (scope, element, attrs) {
            var options = (typeof scope.$eval(attrs.jsCountTo) !== 'undefined') ? scope.$eval(attrs.jsCountTo) : new Object();
            var el      = jQuery(element);

            el.appear(function() {
                el.countTo({
                    speed: options.speed ? options.speed : 1500,
                    refreshInterval: options.refreshInterval ? options.refreshInterval : 15,
                    onComplete: function() {
                        if(options.after) {
                            el.html(el.html() + options.after);
                        } else if (options.before) {
                            el.html(options.before + el.html());
                        }
                    }
                });
            });
        }
    };
});

// SlimScroll, for more examples you can check out http://rocha.la/jQuery-slimScroll
// By adding the attribute (with custom values) 'data-js-slimscroll="{height: '100px', size: '3px', ...}'
App.directive('jsSlimscroll', function () {
    return {
        link: function (scope, element, attrs) {
            var options = (typeof scope.$eval(attrs.jsSlimscroll) !== 'undefined') ? scope.$eval(attrs.jsSlimscroll) : new Object();

            jQuery(element).slimScroll({
                height: options.height ? options.height : '200px',
                size: options.size ? options.size : '5px',
                position: options.position ? options.position : 'right',
                color: options.color ? options.color : '#000',
                alwaysVisible: options.alwaysVisible ? true : false,
                railVisible: options.railVisible ? true : false,
                railColor: options.railColor ? options.railColor : '#999',
                railOpacity: options.railOpacity ? options.railOpacity : .3
            });
        }
    };
});

// Easy Pie Chart, for more examples you can check out http://rendro.github.io/easy-pie-chart/
// By adding the attribute (with custom values) 'data-js-pie-chart="{barColor: '#000', trackColor: '#eee', ... }'
App.directive('jsPieChart', function () {
    return {
        link: function (scope, element, attrs) {
            var options = (typeof scope.$eval(attrs.jsPieChart) !== 'undefined') ? scope.$eval(attrs.jsPieChart) : new Object();

            jQuery(element).easyPieChart({
                barColor: options.barColor ? options.barColor : '#777777',
                trackColor: options.trackColor ? options.trackColor : '#eeeeee',
                lineWidth: options.lineWidth ? options.lineWidth : 3,
                size: options.size ? options.size : '80',
                animate: options.animate ? options.animate : 750,
                scaleColor: options.scaleColor ? options.scaleColor : false
            });
        }
    };
});

App.directive('oneBarsChart', function ($parse) {
	//explicitly creating a directive definition variable
	//this may look verbose but is good for clarification purposes
	//in real life you'd want to simply return the object {...}
	return {
		//We restrict its use to an element
		//as usually  <bars-chart> is semantically
		//more understandable
		restrict: 'E',
		//this is important,
		//we don't want to overwrite our directive declaration
		//in the HTML mark-up
		replace: false,
		scope: {data: '=chartData'},
		link: function (scope, element, attrs) {
			//converting all data passed thru into an array
			var data = scope.data;
			//in D3, any selection[0] contains the group
			//selection[0][0] is the DOM node
			//but we won't need that this time
			var chart = d3.select(element[0]);
			//to our original directive markup bars-chart
			//we add a div with out chart stling and bind each
			//data entry to the chart
			chart.append("div").attr("class", "chart")
			.selectAll('div')
			.data(data).enter().append("div")
			.transition().ease(d3.easeElastic)
			.style("width", function(d) { return d + "%"; })
			.text(function(d) { return d + "%"; });
			//a little of magic: setting it's width based
			//on the data value (d)
			//and text all with a smooth transition
		}
	};
});

App.directive('twoBarsChart', function($parse) {
	var hStandart = 27;
	return {
		restrict: 'E',
		replace: false,
		scope: {
			data: "=chartData",
			label: "@",
			onClick: "&"
		},
		link: function(scope, element, iAttrs) {
			var svg = d3.select(element[0])
			.append("svg")
			.attr("width", "100%");

			// on window resize, re-render d3 canvas
			window.onresize = function() {
				return scope.$apply();
			};
			scope.$watch(function(){
					return angular.element(window)[0].innerWidth;
				}, function(){
					return scope.render(scope.data);
				}
			);

			// watch for data changes and re-render
			scope.$watch('data', function(newVals, oldVals) {

				return scope.render(newVals);
			}, true);

			// define render function
			scope.render = function(data){

				// remove all previous items before render
				svg.selectAll("*").remove();
				// setup variables
				var width, height, max;
				width = element[0].offsetWidth - 20;
				// 20 is for margins and can be changed
				height = scope.data.length * hStandart;

				// 35 = 30(bar height) + 5(margin between bars)
				max = 98;
				// this can also be found dynamically when the data is not static
				// max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

				// set the height based on the calculations above
				svg.attr('height', height);

				// filters go in defs element
				var defs = svg.append("defs");
				// create filter with id #drop-shadow
				// height=130% so that the shadow is not clipped
				var filter = defs.append("filter")
				.attr("id", "drop-shadow")
				.attr("height", "130%");

				// SourceAlpha refers to opacity of graphic that this filter will be applied to
				// convolve that with a Gaussian with standard deviation 3 and store result
				// in blur
				filter.append("feGaussianBlur")
				.attr("in", "SourceAlpha")
				.attr("stdDeviation", 3)
				.attr("result", "blur");

				// translate output of Gaussian blur to the right and downwards with 2px
				// store result in offsetBlur
				filter.append("feOffset")
				.attr("in", "blur")
				.attr("dx", 3)
				.attr("dy", 3)
				.attr("result", "offsetBlur");

				// overlay original SourceGraphic over translated blurred opacity by using
				// feMerge filter. Order of specifying inputs is important!
				var feMerge = filter.append("feMerge");

				feMerge.append("feMergeNode")
				.attr("in", "offsetBlur");
				feMerge.append("feMergeNode")
				.attr("in", "SourceGraphic");

				//create the rectangles for the bar chart
				svg.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.on("click", function(d, i){
					alert('Name: ' + d.title + '\nScore: ' + d.score);
					return scope.render(data);
				})
				.attr("fill", function(){
					return getRandomColor();
				})
				.attr("height", 20) // height of each bar
				.attr("width", 0) // initial width of 0 for transition
				.attr("x", 10) // half of the 20 side margin specified above
				.attr("y", function(d, i){
					return i * hStandart;
				}) // height + margin between bars
				.style("filter", "url(#drop-shadow)")
				.transition()
				.ease(d3.easeBackInOut)
				.duration(1000) // time of duration
				.attr("width", function(d){
					return d.score/(max/width);
				}); // width based on scale

				svg.selectAll("text")
				.data(data)
				.enter()
				.append("text")
				.attr("fill", "#fff")
				.attr("y", function(d, i){return i * hStandart + 15;})
				.attr("x", 15)
				.text(function(d){return d[scope.label];});

			};

			function getRandomColor() {
				var letters = '0123456789'.split('');
				var color = '#';
				for (var i = 0; i < 6; i++) {
					color += letters[getRandomInt(0, 9)];
				}
				return color;
			}

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			}
		}
	};
});

App.directive('threeBarsChart', function ($parse) {

	return {
		restrict: 'E',
		scope: {
			data: "=chartData",
			onClick: "&"
		},
		link: function (scope, element, attrs) {
			var svg = d3.select(element[0])
				.append("svg")
				.attr("width", "100%");

			window.onresize = function() {
				return scope.$apply();
			};

			scope.$watch(function(){
					return angular.element(window)[0].innerWidth;
				}, function(){
					return scope.render(scope.data);
				}
			);

			// watch for data changes and re-render
			scope.$watch('data', function(newVals, oldVals) {

				return scope.render(newVals);
			}, true);

			scope.render = function(data){

				svg.selectAll("*").remove();

				var width = element[0].offsetWidth;
				svg.attr('height', width);
				var format = d3.format(",d");

				var color = d3.scaleOrdinal(d3.schemeCategory20c);

				var pack = d3.pack()
				.size([width, width])
				.padding(1.5);

				d3.csv(scope.data, function(d) {
					d.value = +d.value;
					if (d.value) return d;
				}, function(error, classes) {
					if (error) throw error;

					var root = d3.hierarchy({children: classes})
					.sum(function(d) { return d.value; })
					.each(function(d) {
						if (id = d.data.id) {
							var id, i = id.lastIndexOf(".");
							d.id = id;
							d.package = id.slice(0, i);
							d.class = id.slice(i + 1);
						}
					});


					var node = svg.selectAll(".node")
					.data(pack(root).leaves())
					.enter().append("g")
					.attr("class", "node")
					.attr("transform", function(d) {
						return "translate(" + d.x + "," + d.y + ")";
					});

					node.append("circle")
					.on("click", function(d, i){
						return scope.render(data);
					})
					.on('mouseover', show)
					.on('mouseout', hide)
					.attr("id", function(d) { return d.id; })
					.attr("r", 0)
					.style("fill", function(d) { return color(d.package); })
					.transition()
					.ease(d3.easeBackInOut)
					.duration(1000) // time of duration
					.attr("r", function(d){
						return d.r;
					});

					node.append("clipPath")
					.attr("id", function(d) { return "clip-" + d.id; })
					.append("use")
					.attr("xlink:href", function(d) { return "#" + d.id; });

					node.append("text")
					.attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
					.selectAll("tspan")
					.data(function(d) {
						if(d.r < 30) return [];
						return d.class.split(/(?=[A-Z][^A-Z])/g); })
					.enter().append("tspan")
					.attr("x", 0)
					.attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 12; })
					.attr("text-anchor", "middle")
					.attr("font", function(d,i){return "7px sans-serif";})
					.on('mouseover', show)
					.text(function(d) { return d; });

				});
			};

			var tooltip = document.getElementsByClassName('graph-tooltip')[0];

			function show(d){
				if(d.id)
					tooltip.innerHTML = d.id + '<br/>' + d.value;

				tooltip.style.left = (d.x + d.r) + 'px';

				tooltip.style.top = (d.y - d.r) + 'px';

				tooltip.style.opacity = 1;
				tooltip.style.animationName = "show";
			}

			function hide(){
				tooltip.style.animationName = "hide";
				tooltip.style.opacity = 0;
			}
		}
	};
});