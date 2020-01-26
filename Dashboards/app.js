    
  
    // Create the metaData
    function metaData (sample){
        d3.json("data/samples.json").then((data) => {
            console.log(data);
            const mData=data.metadata;
            d3.select("#sample-metadata").html("");
            Array.from(mData).forEach(item => {
                const id=mData.id;
                const ethnicity=mData.ethnicity;
                const gender=metaData.gender;
                const location=mData.location;
                const bbtype=mData.bbtype;
                const wfreq=mData.wfreq;
// //             Object.entries(mData).forEach(([key, value]) =>{
// //             const row=panel.append("option")
// //             row.text(`${key}:${value}`);
          
//             Array.from(mData).forEach(data => {
//             d3.select("#sample-metadata").append('option').attr('value',data).text(data);
            });
            
        });
    }

metaData();
       
    function genPlot(selSample){

        d3.json("data/samples.json").then(data => {
            
             // Read the dropdown class
            const dataSet=data.names;
            
            d3.select("#selDataset").html("");
            Array.from(dataSet).forEach(names => {
                d3.select("#selDataset").append('option').attr('value', names).text(names);
            });
                
               
            const chartSample= data.samples;
            inputData=chartSample.filter(item => item.id === selSample);
            const filData=inputData.slice(0,10);
            // Create the horizontal bar chart
            // Use sample_values as the values for the bar chart.
            // Use otu_ids as the labels for the bar chart.
            // Use otu_labels as the hovertext for the chart.

            const barTrace={
                x:filData.map(item => item.sample_values),
                y:filData.map(item => item.otu_ids),
                text:filData.map(item => item.otu_labels),
                type:'bar',
                orientation: 'h'
            },
            layout={
                title: "Belly Button Bacteria",
                xaxis: {title: "Sample Values"},
                yaxis: {title: "OTU ID"}
            };

            Plotly.newPlot('bar',[barTrace], layout);

    
            // bubble chart
            // Use otu_ids for the x values.
            // Use sample_values for the y values.
            // Use sample_values for the marker size.
            // Use otu_ids for the marker colors.
            // Use otu_labels for the text values 
    
            const bubbleTrace={
                x:inputData.map(item => item.otu_ids),
                y:inputData.map(item => item.sample_values),
                mode:'markers',
                marker:{
                    size:inputData.map(item => item.sample_values),
                    color: inputData.map(item => item.otu_ids),
                },
                text:inputData.map(item => item.otu_labels),   
            },
            

            layoutBubble={
                title: "Belly Button Bacteria",
                xaxis: {title: "OTU ID"},
                yaxis: {title: "Sample Values"}
            };
            Plotly.newPlot('bubble',[bubbleTrace],layout);

        });

    } 
           
    genPlot('940');   




d3.select('#selDataset').on('change', () => {
    genPlot(d3.event.target.value);

});


