'use strict';

// Load the Visualization API and some packages.
google.load('visualization', '1.0', {'packages': ['corechart', 'AnnotationChart', 'Table', 'timeline', 'wordtree', 'calendar']});


/**
 * @param typeOfChart Supported : PieChart | AreaChart | AnnotationChart | BarChart | ColumnChart | ComboChart | ScatterChart | SteppedAreaChart | Table | Timeline | WordTree | LineChart | Calendar
 *                    Some charts may require a special construction of array (givenData)
 * @param htmlElemToPutChart The chart will be put inside this html element
 * @param options
 *  {
 *    title : Title of chart default ''
 *    width : default 'auto'
 *    height : default 'auto'
 *    displayAnnotations : Only for AnnotationChart default false
 *    is3D :  Some chart can be display in 3D. False to force
 *    crosshair : Display lines in coordinate to show which (x,y) your cursor point
 *  }
 * @param givenData
 *  First row : types of data for each column (number, date, string, ...)
 *  Second row : Title of each column
 *  Next row : Data
 */
function drawChart(typeOfChart, options, htmlElemToPutChart, givenData) {
    console.groupCollapsed();

    var chart;
    var opt;
    var data;


    data = new google.visualization.DataTable();

    //Iterating through headers
    //First line should be types
    //Second line should be row titles
    for (var i = 0; i < givenData[0].length; i++) {
        console.log("Adding head : " + givenData[0][i] + "  " + givenData[1][i]);
        data.addColumn(givenData[0][i], givenData[1][i]);
    }
    //Iterating through rows
    //Each row should correspond to types given in header
    for (i = 2; i < givenData.length; i++) {
        console.log("Adding row : " + givenData[i]);
        data.addRows([givenData[i]]);
    }

    // Set chart options
    opt = {
        title: options.title ? options.title : "",
        width: options.width ? options.width : "auto",
        height: options.height ? options.height : "auto",
        displayAnnotations: typeOfChart === 'AnnotationChart',
        is3D: options.is3D ? options.is3D : false,
        curveType: options.curveType ? options.curveType : false,
        crosshair: {trigger: 'both'}
    };

    switch (typeOfChart) {
        case 'PieChart':
        case 'AreaChart':
        case 'AnnotationChart':
        case 'BarChart':
        case 'ColumnChart':
        case 'ComboChart':
        case 'ScatterChart':
        case 'SteppedAreaChart':
        case 'Table':
        case 'Timeline':
        case 'WordTree':
        case 'LineChart':
        case 'Calendar':
            chart = new google.visualization[typeOfChart](htmlElemToPutChart);
            break;
        default:
            console.groupEnd();
            console.error("The given type of chart isn't correct : " + typeOfChart);
            return false;
            break;
    }
    chart.draw(data, opt);
    console.groupEnd();
    return chart;
}

