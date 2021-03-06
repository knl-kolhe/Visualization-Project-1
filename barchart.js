function Barchart(file)
{
    document.getElementById("graph").innerHTML = '';
    var svg = d3.select("#graph")
                .append("svg")
                .attr("width", w + margin.left + margin.right)
                .attr("height", h + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(file).then(function(data){
        var x = d3.scaleBand()
                    .range([ 0, w ])
                    .domain(data.map(function(d) { return d.Category; }))
                    .padding(0.2);
        console.log(data[0])
        svg.append("g")
            .attr("transform", "translate(0," + h + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(5,0)")
            .style("text-anchor", "end");

        var y = d3.scaleLinear()
                    .domain([0, 259])
                    .range([ h, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])

        svg.call(tip);

        svg.selectAll("mybar")
            .data(data)
            .enter()
                .append("rect")
                .attr("x", function(d) { return x(d.Category); })
                .attr("y", function(d) { return y(+d.Count); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return h - y(+d.Count); })
                .attr("fill", "#e8491d")
                .on("mouseover", function(d,i) {
                    d3.select(this)
                    .style("fill","#000000");

                    tip.html( "<span style='color:black'>" + d.Count + "</span>");
                    tip.show();
                })

                .on("mouseout", function(d,i) {
                    d3.select(this)
                    .style("fill","#e8491d");
                    tip.hide();
                })
    })
}
