/*
 *  Document   : controllers.js
 *  Author     : pixelcave
 *  Description: Our example controllers for demo pages
 *
 */

// Dashboard Content Controller
App.controller('DashboardCtrl', ['$scope', '$localStorage', '$window',
    function ($scope, $localStorage, $window) {
        /*
         * Init Chart.js Chart, for more examples you can check out http://www.chartjs.org/docs
         */

        // Get Chart Container
        var dashChartLinesCon  = jQuery('.js-dash-chartjs-lines')[0].getContext('2d');

        // Set Chart and Chart Data variables
        var dashChartLines, dashChartLinesData;

        // Lines Chart Data
        var dashChartLinesData = {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'This Week',
                    fillColor: 'rgba(44, 52, 63, .07)',
                    strokeColor: 'rgba(44, 52, 63, .25)',
                    pointColor: 'rgba(44, 52, 63, .25)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(44, 52, 63, 1)',
                    data: [34, 42, 40, 65, 48, 56, 80]
                },
                {
                    label: 'Last Week',
                    fillColor: 'rgba(44, 52, 63, .1)',
                    strokeColor: 'rgba(44, 52, 63, .55)',
                    pointColor: 'rgba(44, 52, 63, .55)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(44, 52, 63, 1)',
                    data: [18, 19, 20, 35, 23, 28, 50]
                }
            ]
        };

        // Init Lines Chart
        dashChartLines = new Chart(dashChartLinesCon).Line(dashChartLinesData, {
            scaleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            scaleFontColor: '#999',
            scaleFontStyle: '600',
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            tooltipCornerRadius: 3,
            maintainAspectRatio: false,
            responsive: true
        });
    }
]);

// Dashboard Content Controller
App.controller('Dashboard2Ctrl', ['$scope', '$http',
    function ($scope, $http) {

        var clickTime = (+new Date);
        $scope.charts = {
            one: {
                title: 'Example 5',
                data: [40,90,80,15,25,60,10],
                refresh: function(){},
                onClick: function(id){
                    refresh(id, 'one');
                }
            },
            two: {
                title: 'Example 6',
                data: [
                    {title: "Greg", score:12},
                    {title: "Ari", score:43},
                    {title: "Loser", score: 87},
                    {title: "Alex", score:52},
                    {title: "Fred", score:71},
                    {title: "Pos", score: 19}
                ],
                refresh: function(){},
                onClick: function(id){
                    refresh(id, 'two');
                }
            },
            three: {
                title: 'Example 4',
                data: 'assets/data/flare.csv',
                refresh: function(){},
                onClick: function(id){
                    refresh(id, 'three');
                }
            },
            four: {
                title: 'Example 3',
                typeGraph: 'stacked'
            },
            five: {
                title: 'Example 1',
                data: 'assets/data/population.csv'
            },
            six: {
                title: 'Example 2',
                data: 'assets/data/flare.json',
                refresh: function(){},
                onClick: function(id){
                    refresh(id, 'six');
                }
            }
        };

        function refresh( id, key ){
            // block-opt-refresh
            var elem = $scope.helpers.uiBlocks(id, "refresh_toggle");
            $scope.charts[key].refresh = function(){
                setTimeout(function(){
                    elem.removeClass('block-opt-refresh');
                }, 1000);
            }

        }
    }
]);

// Components Charts Controller
App.controller('CompChartsCtrl', ['$scope', '$localStorage', '$window',
    function ($scope, $localStorage, $window) {
        // Chart.js Charts, for more examples you can check out http://www.chartjs.org/docs
        var initChartsChartJS = function () {
            // Get Chart Containers
            var chartLinesCon  = jQuery('.js-chartjs-lines')[0].getContext('2d');
            var chartBarsCon   = jQuery('.js-chartjs-bars')[0].getContext('2d');
            var chartRadarCon  = jQuery('.js-chartjs-radar')[0].getContext('2d');

            // Set Chart and Chart Data variables
            var chartLines, chartBars, chartRadar;
            var chartLinesBarsRadarData;

            // Set global chart options
            var globalOptions = {
                scaleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                scaleFontColor: '#999',
                scaleFontStyle: '600',
                tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                tooltipCornerRadius: 3,
                maintainAspectRatio: false,
                responsive: true
            };

            // Lines/Bar/Radar Chart Data
            var chartLinesBarsRadarData = {
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [
                    {
                        label: 'Last Week',
                        fillColor: 'rgba(220,220,220,.3)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: [30, 32, 40, 45, 43, 38, 55]
                    },
                    {
                        label: 'This Week',
                        fillColor: 'rgba(171, 227, 125, .3)',
                        strokeColor: 'rgba(171, 227, 125, 1)',
                        pointColor: 'rgba(171, 227, 125, 1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(171, 227, 125, 1)',
                        data: [15, 16, 20, 25, 23, 25, 32]
                    }
                ]
            };

            // Init Charts
            chartLines = new Chart(chartLinesCon).Line(chartLinesBarsRadarData, globalOptions);
            chartBars  = new Chart(chartBarsCon).Bar(chartLinesBarsRadarData, globalOptions);
            chartRadar = new Chart(chartRadarCon).Radar(chartLinesBarsRadarData, globalOptions);
        };

        // jQuery Sparkline Charts, for more examples you can check out http://omnipotent.net/jquery.sparkline/#s-docs
        var initChartsSparkline = function(){
            // Bar Charts
            var barOptions = {
                type: 'bar',
                barWidth: 8,
                barSpacing: 6,
                height: '70px',
                barColor: '#fadb7d',
                tooltipPrefix: '',
                tooltipSuffix: ' Tickets',
                tooltipFormat: '{{prefix}}{{value}}{{suffix}}'
            };
            jQuery('.js-slc-bar1').sparkline('html', barOptions);

            barOptions['barColor']         = '#abe37d';
            barOptions['tooltipPrefix']    = '$ ';
            barOptions['tooltipSuffix']    = '';
            jQuery('.js-slc-bar2').sparkline('html', barOptions);

            barOptions['barColor']         = '#faad7d';
            barOptions['tooltipPrefix']    = '';
            barOptions['tooltipSuffix']    = ' Sales';
            jQuery('.js-slc-bar3').sparkline('html', barOptions);

            // Line Charts
            var lineOptions = {
                type: 'line',
                width: '120px',
                height: '70px',
                tooltipOffsetX: -25,
                tooltipOffsetY: 20,
                lineColor: '#fadb7d',
                fillColor: '#fadb7d',
                spotColor: '#777777',
                minSpotColor: '#777777',
                maxSpotColor: '#777777',
                highlightSpotColor: '#777777',
                highlightLineColor: '#777777',
                spotRadius: 2,
                tooltipPrefix: '',
                tooltipSuffix: ' Tickets',
                tooltipFormat: '{{prefix}}{{y}}{{suffix}}'
            };
            jQuery('.js-slc-line1').sparkline('html', lineOptions);

            lineOptions['lineColor']       = '#abe37d';
            lineOptions['fillColor']       = '#abe37d';
            lineOptions['tooltipPrefix']   = '$ ';
            lineOptions['tooltipSuffix']   = '';
            jQuery('.js-slc-line2').sparkline('html', lineOptions);

            lineOptions['lineColor']       = '#faad7d';
            lineOptions['fillColor']       = '#faad7d';
            lineOptions['tooltipPrefix']   = '';
            lineOptions['tooltipSuffix']   = ' Sales';
            jQuery('.js-slc-line3').sparkline('html', lineOptions);

            // Pie Charts
            var pieCharts = {
                type: 'pie',
                width: '50px',
                height: '50px',
                sliceColors: ['#fadb7d','#faad7d', '#75b0eb','#abe37d'],
                tooltipPrefix: '',
                tooltipSuffix: ' Tickets',
                tooltipFormat: '{{prefix}}{{value}}{{suffix}}'
            };
            jQuery('.js-slc-pie1').sparkline('html', pieCharts);

            pieCharts['tooltipPrefix'] = '$ ';
            pieCharts['tooltipSuffix'] = '';
            jQuery('.js-slc-pie2').sparkline('html', pieCharts);

            pieCharts['tooltipPrefix'] = '';
            pieCharts['tooltipSuffix'] = ' Sales';
            jQuery('.js-slc-pie3').sparkline('html', pieCharts);

            // Tristate Charts
            var tristateOptions = {
                type: 'tristate',
                barWidth: 8,
                barSpacing: 6,
                height: '80px',
                posBarColor: '#abe37d',
                negBarColor: '#faad7d'
            };
            jQuery('.js-slc-tristate1').sparkline('html', tristateOptions);
            jQuery('.js-slc-tristate2').sparkline('html', tristateOptions);
            jQuery('.js-slc-tristate3').sparkline('html', tristateOptions);
        };

        // Randomize Easy Pie Chart values
        var initRandomEasyPieChart = function(){
            jQuery('.js-pie-randomize').on('click', function(){
                jQuery(this)
                    .parents('.block')
                    .find('.pie-chart')
                    .each(function() {
                        var random = Math.floor((Math.random() * 100) + 1);

                        jQuery(this)
                            .data('easyPieChart')
                            .update(random);
                    });
            });
        };

        // Flot charts, for more examples you can check out http://www.flotcharts.org/flot/examples/
        var initChartsFlot = function(){
            // Get the elements where we will attach the charts
            var flotLines      = jQuery('.js-flot-lines');
            var flotStacked    = jQuery('.js-flot-stacked');
            var flotLive       = jQuery('.js-flot-live');
            var flotPie        = jQuery('.js-flot-pie');
            var flotBars       = jQuery('.js-flot-bars');

            // Demo Data
            var dataEarnings    = [[1, 2500], [2, 2300], [3, 3200], [4, 2500], [5, 4500], [6, 2800], [7, 3900], [8, 3100], [9, 4600], [10, 3200], [11, 4200], [12, 5700]];
            var dataSales       = [[1, 1100], [2, 700], [3, 1300], [4, 900], [5, 1900], [6, 950], [7, 1700], [8, 1250], [9, 1800], [10, 1300], [11, 1750], [12, 2900]];

            var dataSalesBefore = [[1, 500], [4, 390], [7, 1000], [10, 600], [13, 800], [16, 1050], [19, 1200], [22, 750], [25, 980], [28, 900], [31, 1350], [34, 1200]];
            var dataSalesAfter  = [[2, 650], [5, 600], [8, 1400], [11, 900], [14, 1300], [17, 1200], [20, 1420], [23, 1650], [26, 1300], [29, 1120], [32, 1550], [35, 1650]];

            var dataMonths      = [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];
            var dataMonthsBars  = [[2, 'Jan'], [5, 'Feb'], [8, 'Mar'], [11, 'Apr'], [14, 'May'], [17, 'Jun'], [20, 'Jul'], [23, 'Aug'], [26, 'Sep'], [29, 'Oct'], [32, 'Nov'], [35, 'Dec']];

            // Init lines chart
            jQuery.plot(flotLines,
                [
                    {
                        label: 'Earnings',
                        data: dataEarnings,
                        lines: {
                            show: true,
                            fill: true,
                            fillColor: {
                                colors: [{opacity: .7}, {opacity: .7}]
                            }
                        },
                        points: {
                            show: true,
                            radius: 6
                        }
                    },
                    {
                        label: 'Sales',
                        data: dataSales,
                        lines: {
                            show: true,
                            fill: true,
                            fillColor: {
                                colors: [{opacity: .5}, {opacity: .5}]
                            }
                        },
                        points: {
                            show: true,
                            radius: 6
                        }
                    }
                ],
                {
                    colors: ['#abe37d', '#333333'],
                    legend: {
                        show: true,
                        position: 'nw',
                        backgroundOpacity: 0
                    },
                    grid: {
                        borderWidth: 0,
                        hoverable: true,
                        clickable: true
                    },
                    yaxis: {
                        tickColor: '#ffffff',
                        ticks: 3
                    },
                    xaxis: {
                        ticks: dataMonths,
                        tickColor: '#f5f5f5'
                    }
                }
            );

            // Creating and attaching a tooltip to the classic chart
            var previousPoint = null, ttlabel = null;
            flotLines.bind('plothover', function(event, pos, item) {
                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        jQuery('.js-flot-tooltip').remove();
                        var x = item.datapoint[0], y = item.datapoint[1];

                        if (item.seriesIndex === 0) {
                            ttlabel = '$ <strong>' + y + '</strong>';
                        } else if (item.seriesIndex === 1) {
                            ttlabel = '<strong>' + y + '</strong> sales';
                        } else {
                            ttlabel = '<strong>' + y + '</strong> tickets';
                        }

                        jQuery('<div class="js-flot-tooltip flot-tooltip">' + ttlabel + '</div>')
                            .css({top: item.pageY - 45, left: item.pageX + 5}).appendTo("body").show();
                    }
                }
                else {
                    jQuery('.js-flot-tooltip').remove();
                    previousPoint = null;
                }
            });

            // Stacked Chart
            jQuery.plot(flotStacked,
                [
                    {
                        label: 'Sales',
                        data: dataSales
                    },
                    {
                        label: 'Earnings',
                        data: dataEarnings
                    }
                ],
                {
                    colors: ['#faad7d', '#fadb7d'],
                    series: {
                        stack: true,
                        lines: {
                            show: true,
                            fill: true
                        }
                    },
                    lines: {show: true,
                        lineWidth: 0,
                        fill: true,
                        fillColor: {
                            colors: [{opacity: 1}, {opacity: 1}]
                        }
                    },
                    legend: {
                        show: true,
                        position: 'nw',
                        sorted: true,
                        backgroundOpacity: 0
                    },
                    grid: {
                        borderWidth: 0
                    },
                    yaxis: {
                        tickColor: '#ffffff',
                        ticks: 3
                    },
                    xaxis: {
                        ticks: dataMonths,
                        tickColor: '#f5f5f5'
                    }
                }
            );

            // Live Chart
            var dataLive = [];

            function getRandomData() { // Random data generator

                if (dataLive.length > 0)
                    dataLive = dataLive.slice(1);

                while (dataLive.length < 300) {
                    var prev = dataLive.length > 0 ? dataLive[dataLive.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0)
                        y = 0;
                    if (y > 100)
                        y = 100;
                    dataLive.push(y);
                }

                var res = [];
                for (var i = 0; i < dataLive.length; ++i)
                    res.push([i, dataLive[i]]);

                // Show live chart info
                jQuery('.js-flot-live-info').html(y.toFixed(0) + '%');

                return res;
            }

            function updateChartLive() { // Update live chart
                chartLive.setData([getRandomData()]);
                chartLive.draw();
                setTimeout(updateChartLive, 70);
            }

            var chartLive = jQuery.plot(flotLive, // Init live chart
                [{ data: getRandomData() }],
                {
                    series: {
                        shadowSize: 0
                    },
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: {
                            colors: [{opacity: .2}, {opacity: .2}]
                        }
                    },
                    colors: ['#75b0eb'],
                    grid: {
                        borderWidth: 0,
                        color: '#aaaaaa'
                    },
                    yaxis: {
                        show: true,
                        min: 0,
                        max: 110
                    },
                    xaxis: {
                        show: false
                    }
                }
            );

            updateChartLive(); // Start getting new data

            // Bars Chart
            jQuery.plot(flotBars,
                [
                    {
                        label: 'Sales Before',
                        data: dataSalesBefore,
                        bars: {
                            show: true,
                            lineWidth: 0,
                            fillColor: {
                                colors: [{opacity: 1}, {opacity: 1}]
                            }
                        }
                    },
                    {
                        label: 'Sales After',
                        data: dataSalesAfter,
                        bars: {
                            show: true,
                            lineWidth: 0,
                            fillColor: {
                                colors: [{opacity: 1}, {opacity: 1}]
                            }
                        }
                    }
                ],
                {
                    colors: ['#faad7d', '#fadb7d'],
                    legend: {
                        show: true,
                        position: 'nw',
                        backgroundOpacity: 0
                    },
                    grid: {
                        borderWidth: 0
                    },
                    yaxis: {
                        ticks: 3,
                        tickColor: '#f5f5f5'
                    },
                    xaxis: {
                        ticks: dataMonthsBars,
                        tickColor: '#f5f5f5'
                    }
                }
            );

            // Pie Chart
            jQuery.plot(flotPie,
                [
                    {
                        label: 'Sales',
                        data: 22
                    },
                    {
                        label: 'Tickets',
                        data: 22
                    },
                    {
                        label: 'Earnings',
                        data: 56
                    }
                ],
                {
                    colors: ['#fadb7d', '#75b0eb', '#abe37d'],
                    legend: {show: false},
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 2/3,
                                formatter: function(label, pieSeries) {
                                    return '<div class="flot-pie-label">' + label + '<br>' + Math.round(pieSeries.percent) + '%</div>';
                                },
                                background: {
                                    opacity: .75,
                                    color: '#000000'
                                }
                            }
                        }
                    }
                }
            );
        };

        // Init all charts
        initChartsChartJS();
        initChartsSparkline();
        initChartsFlot();

        // Randomize Easy Pie values functionality
        initRandomEasyPieChart();
    }
]);