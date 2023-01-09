<template>
  <div>
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
};
</script>
<style>
html,
body {
  height: 100%;
}

#page-content {
  flex: 1 0 auto;
}

</style>
