function getPlots(id) {
    //Read samples.json
    d3.json("data/samples.json").then(sdata => {
        console.log(sdata)
        var ids = sdata.samples[0].otu_ids;
        console.log(ids)
        var values = sdata.samples[0].sample_values.slice(0, 10).reverse();
        console.log(values)
        var labels = sadata.samples[0].otu_labels.slice(0, 10);
        console.log(labels)

        // top 10. 
        var OTU_top = (sdata.samples[0].otu_ids.slice(0, 10)).reverse();

        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)

        var labels = sdata.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: values,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // create the bar plot
        Plotly.newPlot("bar", data, layout);
        // The bubble chart
        var trace1 = {
            x: sdata.samples[0].otu_ids,
            y: sdata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sdata.samples[0].sample_values,
                color: sdata.samples[0].otu_ids
            },
            text: sdata.samples[0].otu_labels

        };

        var layout_2 = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout_2);

    });
}

function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");


    d3.json("data/samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();