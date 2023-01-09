<template>
  <footer id="sticky-footer" class="flex-shrink-0 py-4 text-white-50">
    <div class="container text-center text-white">
      <small>Copyright &copy; Adryann Millos</small>
      <a class="text-white" href="https://www.linkedin.com/in/adryann-millos/" target="_blank"
        ><i class="ms-2 fa fa-linkedin-square" style="font-size: 24px"></i
      ></a>
      <a class="text-white" href="https://github.com/AdryannMillos" target="_blank"
        ><i class="ms-2 fa fa-github" style="font-size: 24px"></i
      ></a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style>
footer.contact{
  text-decoration: none;
  color: white !important;
}
footer {
  background-color: purple;
  width: 100%;
}
@media (max-width: 425px) {
  footer {
    background-color: purple;
    width: 160%;
  }
}
</style>
