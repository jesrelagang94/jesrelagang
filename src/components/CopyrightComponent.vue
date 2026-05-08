<template>
  <div class="ja_section">
    <div class="ja_copyright">
      <div class="container">
        <div class="inner">
          <div class="left wow fadeInLeft" data-wow-duration="1s">
            <p>
              &copy; {{ new Date().getFullYear() }} Jesrel Agang. All rights reserved.
            </p>
          </div>
          <div class="right wow fadeInRight" data-wow-duration="1s">
            <ul>
              <li><a href="#">Terms &amp; Condition</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CopyrightComponent",
  components: {},
};
</script>
