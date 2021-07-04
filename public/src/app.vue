<template>
  <div class="app-container">
    <p v-if="getUsername" class="username">Your username: {{ getUsername }}</p>
    <router-view/>
  </div>
</template>

<script src="./app.ts"></script>
<style src="./app.scss" lang="scss"></style>
