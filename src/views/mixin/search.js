export default {
  methods: {

    search() {
      this.$emit('search', this.query)
    }
  }
}
