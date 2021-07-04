import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'room',
  data() {
    return {
      ws: null as any,
      messages: [] as any,
      roomId: '' as any,
      peopleCount: 0,
      chat: ''
    }
  },
  computed: {
    ...mapGetters(['getUsername'])
  },
  created() {
    if (!this.getUsername) this.$router.push('/')
    this.roomId = this.$route.params.id
    this.ws = new WebSocket(`ws://localhost:3000/${this.roomId}`)
    this.ws.onopen = () => {
      console.log('Connection is established')
      this.ws.send(JSON.stringify({type: 'get_room_data', name: this.getUsername, timeStamp: new Date(Date.now())}))
    }
    this.ws.onmessage =  (evt: any) => {
      const message = JSON.parse(evt.data)
      if (message.type == 'chat' || message.type == 'joining' || message.type == 'leaving') {
        this.messages.push(message)
      }
      if (message.type == 'room_data') {
        this.messages = message.value.messages
        this.peopleCount = message.value.connections.length
      }
    }
    this.ws.onclose = () => { 
      console.log("Connection is closed...")
    }
  },
  methods: {
    SendMessage() {
      this.ws.send(JSON.stringify({value: this.chat, type: 'chat', name: this.getUsername, timeStamp: new Date(Date.now())}))
      this.chat = ''
    },
    leaveRoom() {
      this.$router.push('/')
    }
  },
  beforeUnmount() {
    this.ws.send(JSON.stringify({value: 'leaving', type: 'room_update', name: this.getUsername, timeStamp: new Date(Date.now())}))
    this.ws.close()
  }
})