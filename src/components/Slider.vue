<template>
  <div :class="classObject" class="slider-container">
    <div class="slider-label">{{ labelsObject[value] }}</div>
    <input type="range" min="-1" max="3" v-model="value" class="slider" 
     :name="'slider_' + name" />
  </div>
</template>

<script>

export default {
  name: 'Slider',
  props: {
    name: String
  },
  data() {
    return {
      value: 0
    }
  },
  computed: {
    classObject() {
      return {
        ['slider_' + this.name]: true,
        'no': this.value == -1,
        'unset': this.value == 0,
        'maybe': this.value == 1,
        'yes': this.value == 2,
        'high-yes': this.value == 3,
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
  display: none;
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
  /* todo: use fun svgs for interest levels */
  /* background: url("data:image/svg+xml,<svg width='40' height='40' viewBox='0 0 63 63' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='5.05025' y='31.2134' width='37' height='37' rx='18.5' transform='rotate(-45 5.05025 31.2134)' fill='%23FF9675' stroke='white' stroke-width='7'/><path d='M31.3357 40.8633L31.3357 22.0019' stroke='%231D1D1D' stroke-width='2' stroke-miterlimit='10'/><path d='M38.67 26.334C32.3829 26.334 31.335 18.999 31.335 18.999C31.335 18.999 30.2871 26.334 24 26.334' stroke='%231D1D1D' stroke-width='2' stroke-miterlimit='10' stroke-linejoin='bevel'/><path d='M38.67 35.5283C32.3829 35.5283 31.335 42.8633 31.335 42.8633C31.335 42.8633 30.2871 35.5283 24 35.5283' stroke='%231D1D1D' stroke-width='2' stroke-miterlimit='10' stroke-linejoin='bevel'/></svg>"); */
  cursor: pointer;
} 

.slider-container:hover .slider {
  display: block;
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

.no .slider::-webkit-slider-thumb {
  background-color: rgb(115, 0, 48);
}
.no .slider-label {
  background-color: rgb(115, 0, 48);
  color: #fff;
}
@media print {
  .no .slider-label {
    color: #000;
  }
}

.maybe .slider::-webkit-slider-thumb {
  background-color: rgb(255, 255, 22);
}
.maybe .slider-label {
  background-color: rgb(255, 255, 22);
}

.yes .slider::-webkit-slider-thumb {
  background-color: rgb(129, 203, 157);
}
.yes .slider-label {
  background-color: rgb(129, 203, 157);
}

.high-yes .slider::-webkit-slider-thumb {
  background-color: rgb(0, 255, 98);
}
.high-yes .slider-label {
  background-color: rgb(0, 255, 98);
}
</style>
