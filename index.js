var currAttr = [];

function Categorical(text1,file) {
    //text1 = 'A1 (Categorical)';
    document.getElementById("variable").innerHTML = text1;
    if(!d3.select(".slidercontainer").empty())
    {
        d3.select(".slidercontainer").remove();
    }
    Barchart(file);
}

function Continuous(text1,file) {
    //text1 = 'A2 (Continuous)';
    document.getElementById("variable").innerHTML = text1;
    // currentattr = attr1;
    if(d3.select(".slidercontainer").empty())
    {
        d3.select("#svgElement").append("div")
                                    .attr("class","slidercontainer")
                                    .append("input")
                                        .attr("type","range")
                                        .attr("min",1)
                                        .attr("max",200)
                                        .attr("value",15)
                                        .attr("class","slider")
                                        .attr("id","myRange");
    }

    Histogram(file);
    // refillDataHistogram(attr1);
}



var margin = {top: 10, right: 30, bottom: 30, left: 180};
var w = 1000; // width of SVG
var h = 400; // height of SVG
var barPadding = 10; // padding between bins

w = w - margin.left - margin.right;
h = h - margin.top - margin.bottom;
