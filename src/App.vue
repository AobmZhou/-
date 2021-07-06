<template>
  <div id="app">
  <div class="Test">
      <input type="text" placeholder="test_text">
  </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
