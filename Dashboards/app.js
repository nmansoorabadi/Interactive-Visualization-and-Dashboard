// Use d3.json() to read the json file and create the metaData

var jsonData;
function LoadJsonData() {
    d3.json("data/samples.json").then(data => {
        jsonData = data;
        // console.log(data);
        // Read the dropdown class
        var dropDown = data.names;
        d3.select("#selDataset").html("");
        dropDown.forEach(names => {
            d3.select("#selDataset").append('option').attr('value', names).text(names);
        });

        genPlot(940);

    });

    }



function genPlot(inputData) {
    const metadata = jsonData.metadata;
    const metaData = metadata.filter(item => item.id === inputData);
    console.log("metadata fom json", metaData);
    const panel = d3.select("#sample-metadata");
    panel.html("");
    metaData.forEach(metadataElement => {
        Object.entries(metadataElement).forEach(([key, value]) => {
            panel.append("h5").text(`${key} : ${value}`);
            console.log("sample-metadata to create the panel", panel);

        });

    });

 

    var dataSet = jsonData.samples.filter(item => item.id == inputData);
    dataSet= dataSet.sort((a,b) => b-a);

    dataSet.forEach(sample => sample.id === inputData );
    console.log(dataSet);

 
    // const filData = dataSet.sort((a, b) => b - a).slice(0, 10);
    // Create the horizontal bar chart
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    
    const sample_values= dataSet.map(data => data.sample_values)[0].slice(0, 10);
    console.log(sample_values);
    const otu_ids=dataSet.map(data => data.otu_ids)[0].slice(0, 10);
    console.log(otu_ids);
    const otu_labels = dataSet.map(data => data.otu_labels)[0].slice(0, 10);
    console.log(otu_labels);
    dataSet=dataSet.reverse();
    const barTrace = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: 'bar',
            orientation: 'h'
        };
        const barChartData=[barTrace];
        var layout = {
        title: "Belly Button Bacteria",
            xaxis: {
                title: "Sample Values"
            },
            yaxis: {
                title: "OTU ID"
            }
        };

    Plotly.newPlot("bar",barChartData, layout);

 

 

    // // bubble chart

    // // Use otu_ids for the x values.

    // Use sample_values for the y values.

    // Use sample_values for the marker size.

    // Use otu_ids for the marker colors.

    // Use otu_labels for the text values


  
    const bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size:sample_values,
                color:otu_ids,
            },
            text:otu_labels,
        };

        const bubbleData = [bubbleTrace];

        var layoutBubble = {
            margin: {
                t: 0     },
            title: "Belly Button Bacteria",
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Values"
            },   
       };

    Plotly.newPlot('bubble', bubbleData, layoutBubble);
   
}

LoadJsonData();


d3.select('#selDataset').on('change', () => {

    genPlot(parseInt(d3.event.target.value));
});