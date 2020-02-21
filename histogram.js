
function Histogram(file){
    // set the dimensions and margins of the graph
    document.getElementById("graph").innerHTML = '';
    // append the svg object to the body of the page
    var svg = d3.select("#graph")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv(file).then(function(data) {

        // X axis: scale and draw:
        var x = d3.scaleLinear()
                    .domain([0, d3.max(data, function(d){return +d.value;})])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
                    .range([0, w]);
                    svg.append("g")
                    .attr("transform", "translate(0," + h + ")")
                    .call(d3.axisBottom(x));

        // Y axis: initialization
        var y = d3.scaleLinear()
                    .range([h, 0]);
        var yAxis = svg.append("g")

        // A function that builds the graph for a specific value of bin
        function update(nBin) {
            console.log(data[0]);
            // set the parameters for the histogram
            var histogram = d3.histogram()
                                .value(function(d) { return d.value; })   // I need to give the vector of value
                                .domain(x.domain())  // then the domain of the graphic
                                .thresholds(x.ticks(nBin)); // then the numbers of bins

            // And apply this function to data to get the bins
            var bins = histogram(data);
            console.log(bins[0].length)
            // Y axis: update now that we know the domain
            y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
            yAxis
                .transition()
                .duration(1000)
                .call(d3.axisLeft(y));

            // Join the rect with the bins data
            var u = svg.selectAll("rect")
                .data(bins)

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])

            svg.call(tip);
            // Manage the existing bars and eventually the new ones:
            u
                .enter()
                    .append("rect") // Add a new rect for each new elements
                    .merge(u) // get the already existing elements as well
                    .attr("x", 1)
                    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                    .attr("height", function(d) { return h - y(d.length); })
                    .style("fill", "#e8491d")

                    .on("mouseover", function(d,i) {
                        d3.select(this)
                        .style("fill","#000000");
                        tip.html( "<span style='color:black'>" + d.length + "</span>");
                        tip.show();
                    })

                    .on("mouseout", function(d,i) {
                        d3.select(this)
                        .style("fill","#e8491d");

                        tip.hide();
                    })
            // If less bar in the new histogram, I delete the ones not in use anymore
            u
                .exit()
                .remove()

            }


        // Initialize with 20 bins
        update(15)


        // Listen to the button -> update if user change it
        // d3.select("#myRange").on("input", function() {
        //     console.log(this.value);
        //     update(+this.value);
        // });
        var slider = document.getElementById("myRange");
        var noOfBins = slider.value;

        slider.oninput = function() {
            noOfBins = +this.value;
            update(noOfBins);
            console.log("No of bins:",noOfBins);
        }

    });
}
