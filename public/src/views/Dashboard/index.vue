<template>
  <div class="dashboard">
    <div v-if="!getUsername" class="set-name">
      <label>Enter a username...</label>
      <input type="text" v-model="name" @keydown.enter.prevent="setUser">
      <button @click="setUser">Submit</button>
    </div>

    <div :class="{'disabled': !getUsername}" class="rooms">
      <div v-for="room in rooms" :key="room.id" class="room-card" @click="navigateToRoom(room)">
        <h1>{{room.name}}</h1>
      </div>
    </div>
  </div>
</template>

<script src="./dashboard.ts"></script>
<style src="./dashboard.scss" lang="scss"></style>
