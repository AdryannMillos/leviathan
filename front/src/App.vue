<template>
  <div class="box">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>
<style>
body {
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
</style>
