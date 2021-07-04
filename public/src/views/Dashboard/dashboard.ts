import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
  name: 'dashboard',
  data() {
    return {
      rooms: [
        {name: 'Room 1', id: 1},
        {name: 'Room 2', id: 2},
        {name: 'Room 3', id: 3}
      ],
      name: ''
    }
  },
  computed: {
    ...mapGetters(['getUsername'])
  },
  methods: {
    ...mapMutations(['setUsername']),
    setUser() {
      this.setUsername(this.name)
    },
    navigateToRoom(room: any) {
      this.$router.push(`/room/${room.id}`)
    }
  }
})