<template>
  <div class="room">
    <div class="room-title">
      <p>{{peopleCount}} chatters</p>
      <h1>Room {{roomId}}</h1>
    </div>

    <div class="room-actions">
      <i class="fas fa-chevron-circle-left" @click="leaveRoom"></i>
      <input type="text" v-model="chat" @keydown.enter.prevent="SendMessage">
      <button type="submit" id="chat-send-btn" @click="SendMessage">Send</button>
    </div>

    <div class="chats">
      <div v-for="message in messages"
      :key="message"
      class="chat"
      :class="{
          'my-chat': message.name == getUsername,
          'special-chat': message.type == 'joining' || message.type == 'leaving'
        }"
      >
        <div v-if="message.timeStamp" class="chat-timestamp">
          <p>{{new Date(message.timeStamp).toLocaleTimeString()}}</p>
        </div>
        <div class="chat-text">
          <p>{{message.name}}</p>
          <h6>{{message.value}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./room.ts" lang="ts"></script>
<style src="./room.scss" lang="scss"></style>
