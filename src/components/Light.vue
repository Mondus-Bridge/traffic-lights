<template>
  <div :class="[flashing ? 'endFlashing' : '', color]" class="color">
    <div class="timer">{{ count }}</div>
  </div>
</template>

<script>
export default {
  props: ["color", "duration"],
  data() {
    return {
      count: 4,
      timer: null,
      flashing: false,
    };
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.count--;
        this.setLocalStorage();
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    setLocalStorage() {
      if (this.$route.path !== "/" && this.count >= 0) {
        localStorage.setItem("time", this.count);
        localStorage.setItem("path", this.$route.path);
      }
      else{
        localStorage.clear()
      }
    },
  },
  watch: {
    count(time) {
      if (time === 0) {
        this.flashing = false;
        this.stopTimer();
        this.count = this.duration;
        this.startTimer();
      }
      if (time < 3 && time !== 0) {
        this.flashing = true;
      }
    },
  },
  mounted() {
    this.count = this.duration;
    this.startTimer();
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.color {
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  background-color: rgb(44, 230, 44);
}
.yellow {
  background-color: yellow;
  margin-top: 230px;
}
.red {
  background-color: red;
  margin-top: 460px;
}
.timer {
  position: absolute;
  text-align: center;
  font-size: 130px;
  opacity: 0.6;
}
@keyframes end-animation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.endFlashing {
  animation: end-animation 0.7s infinite;
}
</style>