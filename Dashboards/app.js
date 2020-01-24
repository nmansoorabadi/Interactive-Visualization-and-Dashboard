// d3.json("data/samples.json").then(function(data){
//     console.log(data);
// });

// Use d3.json() to read the json file and create the metaData
function metaData (selSamples){
    d3.json("data/samples.json").then(data => {
        // Demographic info
        var panel=d3.select("panel").select("#sample-metadata").html("");
        console.log(data);
        // Top 10 OTUs
        // var dataSet=data.sort((a,b) => b-a).slice(0,10);
        Object.entries(data).forEach(([key,value]) => {
            panel.append("h5").text(`${key} : ${value}`);
        });
    });
}

metaData();



// Create charts

function genPlot(selSamples){
    d3.json("data/samples.json").then(data => {
        // Top 10 OTUs
        // var dataSet=data.sort((a,b) => b-a).slice(0,10);

        // Create the horizontal bar chart
        // Use sample_values as the values for the bar chart.
        // Use otu_ids as the labels for the bar chart.
        // Use otu_labels as the hovertext for the chart.

        const barTrace=[{
            x:[data.map(item => item.sample_values).slice(0,10)],
            y:[data.map(item => item.otu_ids).slice(0,1)],
            type:'bar',
            orientation: 'h'
        }]

        const layout={
            title: "Belly Button Bacteria",
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU ID"}
        }
        Plotly.newPlot('bar',[barTrace], layout); 

        // bubble chart
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values 
        const bubbleTrace=[{
            x:[data.map(item => item.otu_ids).slice(0,1)],
            y:[data.map(item => item.sample_values).slice(0,10)],
            mode:'markers',
            marker:{
                size:[data.map(item => item.sample_values).slice(0,10)],
                color: [data.map(item => item.otu_ids).slice(0,1)],
            },
            text:[data.map(item => item.otu_labels).slice(0,1)],
            type:'scatter'
        }]
        const layoutBubble={
            title: "Belly Button Bacteria",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        }
        Plotly.newPlot('bubble',[bubbleTrace],layoutBubble);


    });          
}    



// Initializes the page with a default plot
function init(){
   
    // Call updatePlotly() when a change takes place 
    d3.select("#selDataset").on('change',updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly(){
        // Use d3 to select the dropdown menue
        const selData = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        d3.json("data/samples.json").then(data =>{



        });


    }



// Initialize x and y arrays


}

























// d3.select("#sample-metadata").on('change',updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//     const dropdown= d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataSet = dropdown.property("value");

// }