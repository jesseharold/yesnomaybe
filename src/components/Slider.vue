<template>
  <div :class="classObject" class="slider-container">
    <input type="range" min="-1" max="3" v-model="sliderValue" class="slider" 
     :name="'slider_' + name" />
    <div class="slider-label">{{ labelsObject[sliderValue] }}</div>
  </div>
</template>

<script>

export default {
  name: 'Slider',
  props: {
    name: String,
    value: String,
  },
  computed: {
    sliderValue() {
        return this.value || "0"
    },
    classObject() {
      return {
        ['slider_' + this.name]: true,
        'no': this.sliderValue == "-1",
        'unset': this.sliderValue == "0",
        'maybe': this.sliderValue == "1",
        'yes': this.sliderValue == "2",
        'high-yes': this.sliderValue == "3",
      }
    },
    labelsObject() {
      if (this.name.indexOf('_experience') > 0) {
        return {
          [-1]: "None",
          0: "-",
          1: "A little",
          2: "Yes",
          3: "A lot"
        }
      }
      return {
        [-1]: "No",
        0: "-",
        1: "Maybe",
        2: "Yes",
        3: "YES!!"
      }
    }
  }
}
</script>

<style scoped>
.slider {
  /* hide the slider, but keep them in the tab order */
  opacity: 0;
  position: absolute;
  z-index: -1;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  margin-top: 10px;
  background: #d3d3d3;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
} 

.slider-container:hover .slider {
  opacity: 1;
  position: relative;
  z-index: unset;
}
/* unhide the sliders when they are tabbed to */
.slider-container .slider:focus {
  opacity: 1;
  position: relative;
  z-index: unset;
}
.slider:focus + .slider-label {
  display: none;
}
.slider-container:hover .slider-label {
  display: none;
}

.slider-label {
  display: block;
  background-color: #ccc;
  color: #000;
  width: 100%;
  height: 30px;
  padding-top: 5px;
}

.no .slider {
  background-color: rgb(95, 38, 108);
}
.no .slider::-webkit-slider-thumb {
  background-color: rgb(95, 38, 108);
}
.no .slider-label {
  background-color: rgb(95, 38, 108);
  color: #fff;
}
@media print {
  .no .slider-label {
    color: #000;
  }
}

.maybe .slider {
  background-color: #fad334;
}
.maybe .slider::-webkit-slider-thumb {
  background-color: #fad334;
}
.maybe .slider-label {
  background-color: #fad334;
}

.yes .slider {
  background-color: rgb(92, 236, 180);
}
.yes .slider::-webkit-slider-thumb {
  background-color: rgb(92, 236, 180);
}
.yes .slider-label {
  background-color: rgb(92, 236, 180);
}

.high-yes .slider {
  background-color: rgb(13, 255, 0);
}
.high-yes .slider::-webkit-slider-thumb {
  background-color: rgb(13, 255, 0);
}
.high-yes .slider-label {
  background-color: rgb(13, 255, 0);
}
</style>
