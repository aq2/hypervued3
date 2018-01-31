<template lang="pug">
  
#page
  p pick a fraction

  #slider-container
  #range-label 0-10


</template>



<script>
import * as d3 from 'd3'

export default {

computed: {
  
},

methods: {
  createD3RangeSlider (rangeMin, rangeMax, containerSelector) {
    var minWidth = 10
    var sliderRange = {begin: rangeMin, end: rangeMin}
    var changeListeners = []
    var container = d3.select(containerSelector)
    var containerHeight = container.node().offsetHeight

    var sliderBox = container.append("div")
                             .style("position", "relative")
                             .style("height", containerHeight + "px")
                             .style("min-width", (minWidth*2) + "px")
                             .classed("slider-container", true)

    // Create elements in container
    var slider = sliderBox.append("div").attr("class", "slider")
    var handleW = slider.append("div").attr("class", "handle WW")
    var handleE = slider.append("div").attr("class", "handle EE")

    // Update the `left` and `width` attributes of `slider` based on `sliderRange`
    function updateUIFromRange () {
        var conW = sliderBox.node().clientWidth
        var rangeW = sliderRange.end - sliderRange.begin
        var slope = (conW - minWidth) / (rangeMax - rangeMin)
        var uirangeW = minWidth + rangeW * slope
        var ratio = sliderRange.begin / (rangeMax - rangeMin - rangeW)
        if (isNaN(ratio)) {
            ratio = 0
        }
        var uirangeL = ratio * (conW - uirangeW)

        slider
            .style("left", uirangeL + "px")
            .style("width", uirangeW + "px")
    }

    /** Update the `sliderRange` based on the `left` and `width` attributes of `slider` */
    function updateRangeFromUI () {
        var uirangeL = parseFloat(slider.style("left"))
        var uirangeW = parseFloat(slider.style("width"))
        var conW = sliderBox.node().clientWidth //parseFloat(container.style("width"))
        var slope = (conW - minWidth) / (rangeMax - rangeMin)
        var rangeW = (uirangeW - minWidth) / slope
        if (conW == uirangeW) {
            var uislope = 0
        } else {
            var uislope = (rangeMax - rangeMin - rangeW) / (conW - uirangeW)
        }
        var rangeL = rangeMin + uislope * uirangeL
        sliderRange.begin = Math.round(rangeL)
        sliderRange.end = Math.round(rangeL + rangeW)

        //Fire change listeners
        changeListeners.forEach(function (callback) {
            callback({begin: sliderRange.begin, end: sliderRange.end})
        })
    }

    // configure drag behavior for handles and slider
    var dragResizeE = d3.drag()
        .on("start", function () {
            d3.event.sourceEvent.stopPropagation()
        })
        .on("drag", function () {
            var dx = d3.event.dx
            if (dx == 0) return
            var conWidth = sliderBox.node().clientWidth //parseFloat(container.style("width"))
            var newLeft = parseInt(slider.style("left"))
            var newWidth = parseFloat(slider.style("width")) + dx
            newWidth = Math.max(newWidth, minWidth)
            newWidth = Math.min(newWidth, conWidth - newLeft)
            slider.style("width", newWidth + "px")
            updateRangeFromUI()
        })

    var dragResizeW = d3.drag()
        .on("start", function () {
            this.startX = d3.mouse(this)[0]
            d3.event.sourceEvent.stopPropagation()
        })
        .on("drag", function () {
            var dx = d3.mouse(this)[0] - this.startX
            if (dx==0) return
            var newLeft = parseFloat(slider.style("left")) + dx
            var newWidth = parseFloat(slider.style("width")) - dx

            if (newLeft < 0) {
                newWidth += newLeft
                newLeft = 0
            }
            if (newWidth < minWidth) {
                newLeft -= minWidth - newWidth
                newWidth = minWidth
            }

            slider.style("left", newLeft + "px")
            slider.style("width", newWidth + "px")

            updateRangeFromUI()
        })

    var dragMove = d3.drag()
        .on("start", function () {
            d3.event.sourceEvent.stopPropagation()
        })
        .on("drag", function () {
            var dx = d3.event.dx
            var conWidth = sliderBox.node().clientWidth //parseInt(container.style("width"))
            var newLeft = parseInt(slider.style("left")) + dx
            var newWidth = parseInt(slider.style("width"))

            newLeft = Math.max(newLeft, 0)
            newLeft = Math.min(newLeft, conWidth - newWidth)
            slider.style("left", newLeft + "px")

            updateRangeFromUI()
        })

    handleE.call(dragResizeE)
    handleW.call(dragResizeW)
    slider.call(dragMove)

    // Click on bar
    sliderBox.on("mousedown", function (ev) {
        var x = d3.mouse(sliderBox.node())[0]
        var props = {}
        var sliderWidth = parseFloat(slider.style("width"))
        var conWidth = sliderBox.node().clientWidth //parseFloat(container.style("width"))
        props.left = Math.min(conWidth - sliderWidth, Math.max(x - sliderWidth / 2, 0))
        props.left = Math.round(props.left)
        props.width = Math.round(props.width)
        slider.style("left", props.left + "px")
            .style("width", props.width + "px")
        updateRangeFromUI()
    })

    // Reposition slider on window resize
    window.addEventListener("resize", function () {
        updateUIFromRange()
    })

    function onChange(callback){
        changeListeners.push(callback)
        return this
    }

    function setRange (b, e) {
        sliderRange.begin = b
        sliderRange.end = e

        updateUIFromRange()

        // Fire change listeners
        changeListeners.forEach((callback) => {
            callback({begin: sliderRange.begin, end: sliderRange.end})
        })
    }


    /**
     * Returns or sets the range depending on arguments.
     * If `b` and `e` are both numbers then the range is set to span from `b` to `e`.
     * If `b` is a number and `e` is undefined the beginning of the slider is moved to `b`.
     * If both `b` and `e` are undefined the currently set range is returned as an object with `begin` and `end`
     * attributes.
     * If any arguments cause the range to be outside of the `rangeMin` and `rangeMax` specified on slider creation
     * then a warning is printed and the range correspondingly clamped.
     * @param b beginning of range
     * @param e end of range
     * @returns {{begin: number, end: number}}
     */
    function range(b, e) {
        var rLower
        var rUpper

        if (typeof b === "number" && typeof e === "number") {

            rLower = Math.min(b, e)
            rUpper = Math.max(b, e)

            //Check that lower and upper range are within their bounds
            if (rLower < rangeMin || rUpper > rangeMax) {
                console.log("Warning: trying to set range (" + rLower + "," + rUpper + ") which is outside of bounds (" + rangeMin + "," + rangeMax + "). ")
                rLower = Math.max(rLower, rangeMin)
                rUpper = Math.min(rUpper, rangeMax)
            }

            setRange(rLower, rUpper)
        } else if (typeof b === "number") {

            rLower = b
            var dif = sliderRange.end - sliderRange.begin
            rUpper = rLower + dif

            if (rLower < rangeMin) {
                console.log("Warning: trying to set range (" + rLower + "," + rUpper + ") which is outside of bounds (" + rangeMin + "," + rangeMax + "). ")
                rLower = rangeMin
            }
            if(rUpper > rangeMax){
                console.log("Warning: trying to set range (" + rLower + "," + rUpper + ") which is outside of bounds (" + rangeMin + "," + rangeMax + "). ")
                rLower = rangeMax - dif
                rUpper = rangeMax
            }

            setRange(rLower, rUpper)
        }

        return {begin: sliderRange.begin, end: sliderRange.end}
    }

    setRange(sliderRange.begin, sliderRange.end)

    return {
        range: range,
        onChange: onChange
    }

    
},

main() {
  var slider = this.createD3RangeSlider(0, 100, "#slider-container")
  
  slider.onChange((newRange) => {
        d3.select("#range-label").text(newRange.begin + " - " + newRange.end)
  })

  slider.range(0,10) 
}

},


mounted() {
  this.main()
}


}
</script>






<style lang="stylus">

#slider-container
  position: relative
  height:30px
  background-color: green
  max-width 800px


.slider {
    position: absolute
    border: 1px solid #AAB
    background: #BCE
    height: 100%
    width: 58px
    top: 0px
    cursor: move
    /*margin:-0.5px*/
}

.slider .handle {
    position: absolute
    height: 30px
    width: 30px
    border: 2px solid blue
    background: #f21
    
}

.slider .EE {
    right: -4px
    cursor: e-resize
    // background black
}

.slider .WW {
    cursor: w-resize
    left: -4px
}

.slider .EE, .slider .WW {
    // top: 50%
    // margin-top: -4px
}


</style>
