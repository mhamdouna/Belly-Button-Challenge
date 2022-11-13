// Indentify url for data retrieval
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Read in url to get data
let data = d3.json(url);

console.log("Data Promise: ", data);

// Function for the demographics box
function demographicsBox (sample) {
    d3.json(data).then((dataResult) => {
        // Get all meta data
        let metaData = dataResult.metaData;
        console.log("metaData :", metaData);

        // Filter based on the value of the sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        console.log("Reults: ", result);

        let resultData = result[0];
        console.log("result Data: ", resultData);

        // Clear medadata
        d3.select("#sample-metadata").html("");

        // Input information in the demographics box
        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function to create the bar chart
function buildBarChart (sample) {
    d3.json(data).then((dataResult) => {
        // Get all samples
        let sampleData = dataResult.samples;

        let result = sampleData.filter(sampleResult.id == sample);

        // Access index 0
        let resultData = result[0];

        // Retreive otu_ids, labels, and sample_values

        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // Display top 10 items
        let yTicks = otu_ids.slice(0, 10).map(id => `OTU: ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);

        // Set up bar chart
        let barChart = {
            y: yTicks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        };

        // Set up layout
        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        // Call Plotly to plot above chart
        Plotly.newPlot("bar", [barChart], layout);


    });
};

// Function to create the bubble chart
function buildBubbleChart (sample) {
    d3.json(data).then((dataResult) => {
        // Get all samples
        let sampleData = dataResult.samples;

        let result = sampleData.filter(sampleResult.id == sample);

        // Access index 0
        let resultData = result[0];

        // Retreive otu_ids, labels, and sample_values

        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;


        // Set up bubble chart
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values, 
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up layout
        let layout = {
            title: "Bacteria per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Amount Present in Culture"}
        };

        // Call Plotly to plot bubble chart
        Plotly.newPlot("bubble", [bubbleChart], layout);


    });
};

// function that builds the gauge chart
function buildGaugeChart(sample)
{
    // use d3.json in order to get all of the data
    d3.json(data).then((dataResult) => {
        
        // get all of the metadata
        let metaData = dataResult.metadata;

        // filter based on the value of the sample 
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from the array
        let resultData = result[0];

        // use Object.entries to get the key/value pairs and put into the demographics box on the page
        let washFrequency = Object.values(resultData)[6];

        // set up the gauge chart
        let gaugeChart = {
            domain: {x: [0,1], y: [0,1]},
            value: washFrequency,
            title: {
                text: "<b>Belly Button Cleaning Frequency</b><br>(number of times per week)",
                font: {color: "black", size: 16}
            },      
            type: "indicator",
            mode: "gauge+number",            
            gauge: {
                axis: {range: [0, 10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "steelblue"},
                steps: [
                    {range: [0, 1], color: "white"},
                    {range: [1, 2], color: "whitesmoke"},
                    {range: [2, 3], color: "white"},
                    {range: [3, 4], color: "whitesmoke"},
                    {range: [4, 5], color: "white"},
                    {range: [5, 6], color: "whitesmoke"},
                    {range: [6, 7], color: "white"},
                    {range: [7, 8], color: "whitesmoke"},
                    {range: [8, 9], color: "white"},
                    {range: [9, 10], color: "whitesmoke"},
                ]
            }
        };

        // set up the layout
        let layout = {
            width: 400,
            height: 400, 
            margin: {t: 0, b:0}
        };

        // call Plotly to plot the gauge chart on the page
        Plotly.newPlot("gauge", [gaugeChart], layout);
    });
};


// function that initializes the dashboard at start up
function initialize()
{
    // access the dropdown selector from the index.html file
    let select = d3.select("#selDataset");

    // use d3.json in order to get the sample names and populate the drop-down selector
    d3.json(data).then((dataResult) => {
        let sampleNames = dataResult.names;
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        // when initialized, pass in the information for the first sample
        let sample1 = sampleNames[0];

        // call the function to build the initial demographics box
        demographicsBox(sample1);

        // call the function to build the initial bar chart
        buildBarChart(sample1);

        // call the function to build the initial bubble chart
        buildBubbleChart(sample1);

        // call the function to build the initial gauge chart
        buildGaugeChart(sample1);
    });    
};


// function that updates the dashboard
function optionChanged(item)
{
     // call the function to build the demographics box
     demographicsBox(item);

    // call the function to build the bar chart
    buildBarChart(item);

    // call the function to build the bubble chart
    buildBubbleChart(item);

    // call the function to build the gauge chart
    buildGaugeChart(item);
};

// call the initialize function
initialize();