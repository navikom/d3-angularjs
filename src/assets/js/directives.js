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
		scope: {
			data: '=chartData',
			refresh: '='
		},
		link: function (scope, element, attrs) {
			//converting all data passed thru into an array
			var data = scope.data;
			var chart = d3.select(element[0]);

			scope.render = function(data, callback){

				chart.selectAll("*").remove();

				chart.append("div").attr("class", "chart")
				.selectAll('div')
				.data(data).enter().append("div")
				.transition().ease(d3.easeElastic)
				.style("width", function(d) { return d + "%"; })
				.text(function(d) { return d + "%"; });

				callback && callback();

			};

			scope.render(data);
			scope.$watch('refresh', function (newVal, oldVal) {
				scope.render(data, newVal);
			});

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
			onClick: "&",
			refresh: '='
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

			scope.$watch('refresh', function (newVal, oldVal) {
				scope.render(scope.data, newVal);
			}, true);

			// define render function
			scope.render = function(data, callback){

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

				var color = d3.scaleLinear()
				.domain([0, data.length - 1])
				.range(["#aad", "#556"]);


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
				.attr("class", "layer")
				.style("fill", function(d, i) { return color(i); })
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

				callback && callback();

			};

		}
	};
});

App.directive('threeBarsChart', function ($parse) {

	return {
		restrict: 'E',
		scope: {
			data: "=chartData",
			onClick: "&",
			refresh: '='
		},
		link: function (scope, element, attrs) {
			var svg = d3.select(element[0])
				.append("svg")
				.attr("width", "100%");

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

			scope.$watch('refresh', function (newVal, oldVal) {
				scope.render(scope.data, newVal);
			}, true);

			scope.render = function(data, callback){

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
				callback && callback();
			};

			var tooltip = document.getElementsByClassName('graph-tooltip')[0];

			function show(d){
				if(d.id)
					tooltip.innerHTML = d.id + '<br/>' + d.value;

				tooltip.style.left = (d.x + d.r) + 'px';

				tooltip.style.top = (d.y - d.r/2) + 'px';

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

App.directive('fourBarsChart', function ($parse) {

	return {
		restrict: 'E',
		scope: {
			type: '='
		},
		link: function (scope, element, attrs) {
			var svg = d3.select(element[0])
			.append("svg")
			.attr("width", "100%");

			scope.$watch(function(){
					return angular.element(window)[0].innerWidth;
				}, function(){
					return scope.render(scope.data);
				}
			);

			scope.render = function(data){

				svg.selectAll("*").remove();

				var n = 4, // number of layers
					m = 64, // number of samples per layer
					stack = d3.layout.stack(),
					layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
					yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
					yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

				var margin = {top: 40, right: 10, bottom: 20, left: 10},
					width = element[0].offsetWidth - margin.left - margin.right,
					height = 500 - margin.top - margin.bottom;

				svg.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				var x = d3.scaleBand()
					.domain(d3.range(m))
					.rangeRound([0, width])
					.padding(.08);


				var y = d3.scaleLinear()
					.domain([0, yStackMax])
					.range([height, 0]);



				var color = d3.scaleLinear()
					.domain([0, n - 1])
					.range(["#aad", "#556"]);

				var xAxis = d3.axisBottom(x);

				var layer = svg.selectAll(".layer")
				.data(layers)
				.enter().append("g")
				.attr("class", "layer")
				.style("fill", function(d, i) { return color(i); });

				var rect = layer.selectAll("rect")
				.data(function(d) { return d; })
				.enter().append("rect")
				.attr("x", function(d) { return x(d.x); })
				.attr("y", height)
				.attr("width", x.bandwidth())
				.attr("height", 0);

				rect.transition()
				.delay(function(d, i) { return i * 10; })
				.attr("y", function(d) { return y(d.y0 + d.y); })
				.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

				svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

				function transitionGrouped() {
					rect.transition()
					.duration(500)
					.delay(function(d, i) { return i * 10; })
					.attr("x", function(d, i, j) {
						return x(d.x) + x.bandwidth() / n + x.bandwidth() / n / 2;
					})
					.attr("width", x.bandwidth() / n)
					.transition()
					.attr("y", function(d) { return y(d.y); })
					.attr("height", function(d) { return height - y(d.y); });
				}

				function transitionStacked() {
					rect.transition()
					.duration(500)
					.delay(function(d, i) { return i * 10; })
					.attr("y", function(d) { return y(d.y0 + d.y); })
					.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
					.transition()
					.attr("x", function(d) { return x(d.x); })
					.attr("width", x.bandwidth());
				}

				// setup a watch on 'grouped' to switch between views
				scope.$watch('type', function (newVal, oldVal) {
					if (newVal === 'grouped') {
						transitionGrouped();
					} else {
						transitionStacked();
					}
				});

			};

			// Inspired by Lee Byron's test data generator.
			function bumpLayer(n, o) {

				function bump(a) {
					var x = 1 / (.1 + Math.random()),
						y = 2 * Math.random() - .5,
						z = 10 / (.1 + Math.random());
					for (var i = 0; i < n; i++) {
						var w = (i / n - y) * z;
						a[i] += x * Math.exp(-w * w);
					}
				}

				var a = [], i;
				for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
				for (i = 0; i < 5; ++i) bump(a);
				return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
			}
		}
	};
});

App.directive('fiveBarsChart', function ($parse) {

	return {
		restrict: 'E',
		scope: {
			data: "=chartData",
			type: '='
		},
		link: function (scope, element, attrs) {
			var svg = d3.select(element[0])
			.append("svg")
			.attr("width", "100%");

			scope.$watch(function(){
					return angular.element(window)[0].innerWidth;
				}, function(){
					return scope.render(scope.data);
				}
			);

			scope.render = function(data){

				svg.selectAll("*").remove();

				var width = element[0].offsetWidth;
				svg.attr('height', width);
				svg.attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

				var radius = width / 2;
				var shift = 20, delay1 = 400, delay2 = 50;


				var color = d3.scaleOrdinal()
				.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

				var arc = d3.arc()
				.outerRadius(radius - 40)
				.innerRadius(radius - 100);

				var pie = d3.pie()
				.sort(null)
				.value(function(d) { return d.population; });

				d3.csv(scope.data, type, function(error, data) {
					if (error) throw error;

					var g = svg.selectAll(".arc")
					.data(pie(data))
					.enter().append("g")
					.attr("class", "arc");

					g.append("path")
					.attr("d", arc)
					.style("fill", function(d) { return color(d.data.age); });

					g.append("text")
					.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
					.attr("dy", ".5em")
					.attr("text-anchor", "middle")
					.attr("font", function(d,i){return "7px sans-serif";})
					.text(function(d) { return d.data.age; });

					g.on('mouseenter', function(d) {
						d3.select(this)
						.transition()
						.duration(delay1)
						.attr('transform', function(d) {

							var a = (d.endAngle + d.startAngle) / 2,
								dx =  shift * Math.sin( a ),
								dy = -shift * Math.cos( a );
							return 'translate(' + dx + ',' + dy+ ')';
						})
						;
					})
					.on('mouseleave', function(d) {
						d3.select(this)
						.transition()
						.duration(delay2)
						.attr('transform', function(d) {
							return 'translate(0,0)';
						})
						;
					})
					;
				});

				function type(d) {
					d.population = +d.population;
					return d;
				}

			};
		}
	};
});

App.directive('sixBarsChart', function ($parse) {

	return {
		restrict: 'E',
		scope: {
			data: "=chartData",
			refresh: '='
		},
		link: function (scope, element, attrs) {

			scope.$watch(function(){
					return angular.element(window)[0].innerWidth;
				}, function(){
					//return scope.render(scope.data);
				}
			);

			scope.$watch('refresh', function (newVal, oldVal) {
				scope.render(scope.data, newVal);
			}, true);


			scope.render = function(data, callback){

				function count_function(d){
					return d[1][0];
				}

				function label_function(d){
					return d[2]+": "+d[4][0]+" characters, "+d[4][1]+" lines of code.";
				}

				function legend_function(d){
					return "<h2>"+d[2]+"&nbsp;</h2><p>"+d[4][0]+" characters, "+d[4][1]+" lines of code.</p>"
				}

				var color = d3.schemeCategory20c;

				function color_function(d){
					return color[d[3]];
				}


				var width = element[0].offsetWidth;

				d3.select(self.frameElement).style("height", width);
				console.log(scope.data)
				d3.json(scope.data, function(error, r) {

					if (error) throw error;
					init_code_hierarchy_plot("code_hierarchy", r, count_function, color_function, label_function, legend_function);
				});

				function init_code_hierarchy_plot(element_id, data, count_function, color_function, title_function, legend_function){
					var plot = document.getElementById(element_id);

					while (plot.hasChildNodes()){
						plot.removeChild(plot.firstChild);
					}

					var width = plot.offsetWidth;
					var height = width;


					var data_slices = [];
					var max_level = 4;

					var svg = d3.select("#"+element_id).append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

					if(callback){
						svg.
							attr('opacity', 0)
							.transition().duration(4000).attr("opacity", 1);
						callback();
					}

					function process_data(data, level, start_deg, stop_deg){
						var name = data[0];
						var total = count_function(data);
						var children = data[2];
						var current_deg = start_deg;
						if (level > max_level){
							return;
						}
						if (start_deg == stop_deg){
							return;
						}
						data_slices.push([start_deg, stop_deg, name,level, data[1]]);
						for (var key in children){
							var child = children[key];
							var inc_deg = (stop_deg - start_deg) / total*count_function(child);
							var child_start_deg = current_deg;
							current_deg += inc_deg;
							var child_stop_deg = current_deg;
							var span_deg = child_stop_deg-child_start_deg;
							process_data(child, level + 1, child_start_deg, child_stop_deg);
						}
					}

					process_data(data, 0, 0, 360./180.0 * Math.PI);

					var ref = data_slices[0];
					var next_ref = ref;
					var last_refs = [];

					var thickness = width/2.0/(max_level+2)*1.1;

					var arc = d3.arc()
					.startAngle(function(d) { if(d[3] == 0){ return d[0]; }return d[0] + 0.01; })
					.endAngle(function(d) { if(d[3] == 0){ return d[1]; } return d[1] - 0.01; })
					.innerRadius(function(d) { return 1.1*d[3]*thickness; })
					.outerRadius(function(d) { return (1.1*d[3]+1)*thickness; });

					var slices = svg.selectAll(".form")
					.data(function(d) { return data_slices; })
					.enter()
					.append("g");
					slices.append("path")
					.attr("d", arc)
					.attr("id",function(d,i){return element_id+i;})
					.style("fill", function(d) { return color_function(d);})
					.attr("class","form");
					slices.on("click",animate);

					if (title_function != undefined){
						slices.append("svg:title")
						.text(title_function);
					}
					if (legend_function != undefined){
						slices.on("mouseover", update_legend)
						.on("mouseout", remove_legend);
						var legend = d3.select("#"+element_id+"_legend");

						function update_legend(d){
							legend.html(legend_function(d));
							legend.transition().duration(200).style("opacity","1");
						}

						function remove_legend(d){
							legend.transition().duration(1000).style("opacity","0");
						}
					}
					function get_start_angle(d, ref){
						if (ref){
							var ref_span = ref[1] - ref[0];
							return (d[0] - ref[0]) / ref_span*Math.PI * 2.0
						} else{
							return d[0];
						}
					}

					function get_stop_angle(d,ref){
						if (ref){
							var ref_span = ref[1]-ref[0];
							return (d[1]-ref[0])/ref_span*Math.PI*2.0
						} else {
							return d[0];
						}
					}

					function get_level(d,ref){
						if (ref){
							return d[3]-ref[3];
						} else {
							return d[3];
						}
					}

					function rebaseTween(new_ref){
						return function(d){
							var level = d3.interpolate(get_level(d,ref),get_level(d,new_ref));
							var start_deg = d3.interpolate(get_start_angle(d,ref),get_start_angle(d,new_ref));
							var stop_deg = d3.interpolate(get_stop_angle(d,ref),get_stop_angle(d,new_ref));
							var opacity = d3.interpolate(100,0);
							return function(t){
								return arc([start_deg(t),stop_deg(t),d[2],level(t)]);
							}
						}
					}

					var animating = false;

					function animate(d) {
						if (animating){
							return;
						}
						animating = true;
						var revert = false;
						var new_ref;
						if (d == ref && last_refs.length > 0){
							revert = true;
							var last_ref = last_refs.pop();
						}
						if (revert){
							d = last_ref;
							new_ref = ref;
							svg.selectAll(".form")
							.filter(
								function (b)
								{
									if (b[0] >= last_ref[0] && b[1] <= last_ref[1]  && b[3] >= last_ref[3])
									{
										return true;
									}
									return false;
								}
							)
							.transition().duration(1000).style("opacity","1").attr("pointer-events","all");
						}  else {
							new_ref = d;
							svg.selectAll(".form")
							.filter(
								function (b)
								{
									if (b[0] < d[0] || b[1] > d[1] || b[3] < d[3])
									{
										return true;
									}
									return false;
								}
							)
							.transition().duration(1000).style("opacity","0").attr("pointer-events","none");
						}
						svg.selectAll(".form")
						.filter(
							function (b)
							{
								if (b[0] >= new_ref[0] && b[1] <= new_ref[1] && b[3] >= new_ref[3])
								{
									return true;
								}
								return false;
							}
						)
						.transition().duration(1000).attrTween("d",rebaseTween(d));
						setTimeout(function(){
							animating = false;
							if (! revert)
							{
								last_refs.push(ref);
								ref = d;
							}
							else
							{
								ref = d;
							}
						},1000);
					};

				}

			};
		}
	};
});