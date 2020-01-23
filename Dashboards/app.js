// d3.json("data/samples.json").then(function(data){
//     console.log(data);
// });

// Use d3.json() to read the json file and create the metaData
function metaData (selSamples){
    d3.json("data/samples.json").then(data => {
        // Demographic info
        var panel=d3.select("panel").select("#sample-metadata").html("");
        // Top 10 OTUs
        var dataSet=data.sort((a,b) => b-a).slice(0,10);
        Object.entries(dataSet).forEach(([key,value]) => {
            panel.append("h5").text(`${key} : ${value}`);
        });
    });
}


// Create the horizontal bar chart
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
function genPlot(selSamples){
    d3.json("data/samples.json").then(data => {
        // Top 10 OTUs
        var dataSet=data.sort((a,b) => b-a).slice(0,10);

        var trace=[{
            x:[dataSet.map(item => item.sample_values).slice(0,10)],
            y:[dataSet.map(item => item.otu_ids)],
            type:'bar',
            orientation: 'h'
        }];
        Plotly.newPlot('bar',trace); 
    });          
}    

// Create bubble chart
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values 






// // Call updatePlotly() when a change takes place

// d3.select("#sample-metadata").on('change',updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//     const dropdown= d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataSet = dropdown.property("value");

// }