d3.json("data/samples.json").then(function(data){
    console.log(data);
});

//Create Bar chart
// Use d3.json() to get data from json file

function genPlot(selSamples){
    d3.json("data/samples.json").then(data => {
        const sampleData= new set (data.map(item => item.samples));
        const sortedTop10= sampleData.sort((a,b) => b-a).slice(0,10);
        console.log(samples);
        d3.select("#sample-metadata").html("");
        Array.from(sortedTop10).forEach(item =>{
            d3.select("#sample-metadata").append('option').attr('value',item).text(item);
        });
        
        d3.select("#sample-metadata").node().value=selSamples;
        const filtData=sortedTop10.filter(item => item.sampleData === selSamples);
        const xAxis = filtData.map(item => item.sample_values);
        const yAxis=filtData.map(item => item.otu_ids);

        const trace = {
            x: xAxis,
            y: ("OTU",yAxis ),
            type: 'bar',
            orientation: 'h',
            hovertext : filtData.map(item => item.otu_labels ).slice(0,10),
            hoverinfo:"hovertext"   
        },

        layout={
            title: 'top 10 OTUs',
            xaxis: {title:'sample_value'},
            yaxis: {title:("UTO",yaxis)}
        };

        Plotly.newPlot('bar',[trace],layout);

    }
    );

}
    
d3.select("#sample-metadata").on('change',()=> {
    genPlot(d3.event.target.value);
});