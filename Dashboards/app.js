    
 function init(selData){   
    // Create the metaData
    function metaData (sample){
        d3.json("data/samples.json").then(data => {
            console.log(data);
           var  metaData=[data.metadata.data];

            const panel= d3.select("#sample-metadata");
            // panel.html("");
//             Object.entries(metaData).forEach(([key, value]) =>{
//             const row=panel.append("option")
//             row.text(`${key}:${value}`);
          
            Array.from(metaData).forEach(data => {
            d3.select("#sample-metadata").append('option').attr('value',data).text(data);
            });
            
        });
    }

metaData('940');





// Use d3.json() to read the json file and create the metaData

    d3.json("data/samples.json").then(data => {
        console.log(data);
        // Read the dropdown class
        const dataSet=data.names;
        d3.select("#selDataset");
        Array.from(dataSet).forEach(names => {
        d3.select("#selDataset").append('option').attr('value', names).text(names);
        });
    });
  
        
            
        
    function genPlot(){
            d3.json("data/samples.json").then(data => {
            d3.select("#selDataset").node().value =selData;
            const selSample=data.samples;
            const filData=selSample.filter(item => item.samples === selData);
            const sample_values=filData.map(item => item.sample_values).slice(0,10);
            const otu_ids= filData.map(item => item.otu_ids).slice(0,10);
            const otu_labels=filData.map(item => item.otu_labels).slice(0,10);
            // Create the horizontal bar chart
            // Use sample_values as the values for the bar chart.
            // Use otu_ids as the labels for the bar chart.
            // Use otu_labels as the hovertext for the chart.

            const barTrace=[
            {
            x:sample_values,
            y:otu_ids,
            // hovertext:otu_labels.slice(0,10),
            type:'bar',
            orientation: 'h'
            }];

            const barlayout={
            title: "Belly Button Bacteria",
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU ID"}
            };


            Plotly.newPlot('bar',barTrace, barlayout);


            // bubble chart
            // Use otu_ids for the x values.
            // Use sample_values for the y values.
            // Use sample_values for the marker size.
            // Use otu_ids for the marker colors.
            // Use otu_labels for the text values 
            const sampleVal=filData.map(item => item.sample_values);
            const otdID= filData.map(item => item.otu_ids);
            const otdLable=filData.map(item => item.otu_labels);


            const bubbleTrace=[
                {
                x:otdID,
                y:sampleVal,
                mode:'markers',
                marker:{
                    size:sampleVal,
                    color: otdID,
                },
                text:otu_labels,
                // type:'scatter',
                
            }];
            const layoutBubble={
                title: "Belly Button Bacteria",
                xaxis: {title: "OTU ID"},
                yaxis: {title: "Sample Values"}
            };
            Plotly.newPlot('bubble',bubbleTrace,layoutBubble);

        }); 

    } 
           
    genPlot();   
}

init('940');

d3.select('#selDataset').on('change', () =>{
    init(d3.event.target.value);

});


