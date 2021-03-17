export default {
  data() {
    return {
      total: 0,
      tableData: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    search(query) {
      this.query = { ...this.query, ...query }
      console.log('query: ', this.query)
      this.getTableData()
    },
    handleSizeChange() {},
    handleCurrentChange(v) {
      this.query.pageNo = v
      this.getTableData()
    }
  }
}
