import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'app',
  computed: {
    ...mapGetters(['getUsername'])
  }
})