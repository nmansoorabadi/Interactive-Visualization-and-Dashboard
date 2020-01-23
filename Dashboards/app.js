// d3.json("data/samples.json").then(function(data){
//     console.log(data);
// });
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.


//Create Bar chart
// Use d3.json() to read the json file

function genPlot(selSamples){
 

    d3.json("data/samples.json").then(data => {
        var panel=d3.select("#sample-metadata");
        panel.html("");
        Object.entries(data).forEach(([key,value]) => {
            panel.append("h5").text(`${key} : ${value}`);
            console.log(panel);
        });

    });

    const sortedTop10=data.sort((a,b) => b-a).slice(0,10);


    // d3.select("#sample-metadata").node().value=selSamples;

    const filtData=sortedTop10.filter(item => item.sampleData === selSamples);
    const xAxis = filtData.map(item => item.sample_values);
    const yAxis=filtData.map(item => item.otu_ids);

    const trace = [{
            x: [xAxis],
            y: [yAxis ],
            type: 'bar',
            orientation: 'h',
            hovertext : filtData.map(item => item.otu_labels ).slice(0,10),
            hoverinfo:"hovertext"   
        }],

        layout={
            title: 'top 10 OTUs',
            xaxis: {title:'sample_value'},
            yaxis: {title:("OTU",yaxis)}
        };

        Plotly.newPlot('bar',trace,layout);

    }
    
    
d3.select("#sample-metadata").on('change',()=> {
    genPlot(d3.event.target.value);
});