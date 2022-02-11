<template>
  <input type="range" min="0" max="3" v-model="value" class="slider" 
  :class="classObject" :name="'slider_' + name" />
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
        'no-interest': this.value == 0,
        'low-interest': this.value == 1,
        'some-interest': this.value == 2,
        'high-interest': this.value == 3,
      }
    }
  }
}
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  background: #d3d3d3;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 50%;
  background-color: #ccc;
  /* todo: use fun svgs for interest levels */
  /* background: url("data:image/svg+xml,<svg width='40' height='40' viewBox='0 0 63 63' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='5.05025' y='31.2134' width='37' height='37' rx='18.5' transform='rotate(-45 5.05025 31.2134)' fill='%23FF9675' stroke='white' stroke-width='7'/><path d='M31.3357 40.8633L31.3357 22.0019' stroke='%231D1D1D' stroke-width='2' stroke-miterlimit='10'/><path d='M38.67 26.334C32.3829 26.334 31.335 18.999 31.335 18.999C31.335 18.999 30.2871 26.334 24 26.334' stroke='%231D1D1D' stroke-width='2' stroke-miterlimit='10' stroke-linejoin='bevel'/><path d='M38.67 35.5283C32.3829 35.5283 31.335 42.8633 31.335 42.8633C31.335 42.8633 30.2871 35.5283 24 35.5283' stroke='%231D1D1D' stroke-width='2' stroke-miterlimit='10' stroke-linejoin='bevel'/></svg>"); */
  cursor: pointer;
}

.slider.low-interest::-webkit-slider-thumb {
  background-color: rgb(205, 162, 205);
}

.slider.some-interest::-webkit-slider-thumb {
  background-color: rgb(232, 115, 232);
}

.slider.high-interest::-webkit-slider-thumb {
  background-color: rgb(244, 0, 244);
}
</style>
