<template>
  <div id="wrapper">
    <div id="container">
      <div class="green-deactivated light-deactivated"></div>
      <div class="yellow-deactivated light-deactivated"></div>
      <div class="red-deactivated light-deactivated"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import light from "./components/Light.vue";
export default {
  name: "app",
  data() {
    return {
      isPrevGreen: true,
      oldTime: null,
      oldPath: null,
    };
  },
  methods: {
    init() {
      let routeProps = this.$route.matched[0].props.default;
      if (this.$route.path === "/green") {
        this.setLight({ path: "/yellow" }, true, routeProps);
      }
      if (this.$route.path === "/yellow") {
        if (this.isPrevGreen) {
          this.setLight({ path: "/red" }, true, routeProps);
        } else {
          this.setLight({ path: "/green" }, true, routeProps);
        }
      }
      if (this.$route.path === "/red") {
        this.setLight({ path: "/yellow" }, false, routeProps);
      }
    },
    setInitRouterProps() {
      if (localStorage.getItem("time") && localStorage.getItem("path")) {
        try {
          this.$router.push({ path: localStorage.getItem("path") })
          this.oldTime = this.$route.matched[0].props.default.duration;
          this.oldPath = this.$route.path;
          this.$route.matched[0].props.default.duration = localStorage.getItem("time");
        } catch (e) {
          console.log("err local");
        }
      }
    },
    resetTime() {
      if (this.oldTime && this.$route.path === this.oldPath) {
        this.$route.matched[0].props.default.duration = this.oldTime;
      }
    },
    setLight(path, prevGreen, routeProps) {
      setTimeout(() => {
        this.isPrevGreen = prevGreen;
        this.resetTime();
        this.$router.push(path);
        this.init();
      }, routeProps.duration * 1000);
    },
  },
  created() {
    if (this.$route.path === '/' && !localStorage.getItem("time") && !localStorage.getItem("path")){
      this.$router.push({ path: "/green" });
    }
    this.setInitRouterProps();
    this.init();
  },
  components: {
    light,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(113, 229, 233);
}
#container {
font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  width: 180px;
  height: 700px;
  border: 2px solid black;
  padding: 20px 50px 10px 50px;
  background-color: rgb(36, 36, 36);
  border-radius: 50px;
}
.light-deactivated {
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
}
.green-deactivated {
  background-color: green;
}
.yellow-deactivated {
  background-color: yellow;
  margin-top: 230px;
}
.red-deactivated {
  background-color: red;
  margin-top: 460px;
}
</style>