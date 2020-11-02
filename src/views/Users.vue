<template>
  <div>
    <select v-model="pageSize" class="select">
      <option disabled>Select the amount of users:</option>
      <option :value="2">2</option>
      <option :value="4">4</option>
      <option :value="6">6</option>
      <option :value="8">8</option>
      <option :value="10">10</option>
    </select>
    <span>Amount of user on page: {{ pageSize }}</span>

    <pagination
      :current="currentPage"
      :total="totalUsers"
      :pageRange="pageSize"
      @page-changed="fetchUsers"
    ></pagination>

    <b-table striped hover :items="users">
      <template #cell(name)="data">
        <router-link :to="`/user/${data.value}`">
          <div @click="shareData(data.index)">{{ data.value }}</div>
        </router-link>
      </template>

      <template #cell(address)="data">
        <div><b>street:</b> {{ data.value.street }}</div>
        <div><b>suite:</b> {{ data.value.suite }}</div>
        <div><b>city:</b> {{ data.value.city }}</div>
        <div><b>zipcode:</b> {{ data.value.zipcode }}</div>
        <div><b>lat:</b> {{ data.value.geo.lat}}</div>
        <div><b>lng:</b> {{ data.value.geo.lng}}</div>
      </template>

      <template #cell(company)="data">
        <div><b>name:</b> {{ data.value.name }}</div>
        <div><b>catchPhrase:</b> {{ data.value.catchPhrase }}</div>
        <div><b>bs:</b> {{ data.value.bs }}</div>
      </template>
    </b-table>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'

export default {
  name: 'users',
  components: {
    Pagination
  },
  computed: {
    users () {
      return this.$store.getters.users
    },
    totalUsers () {
      return this.$store.getters.totalUsers
    }
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Full Name' },
        { key: 'address', label: 'Address' },
        { key: 'company', label: 'Company' }
      ],
      pageSize: 2,
      currentPage: 1
    }
  },
  watch: {
    pageSize: function (val) {
      this.fetchUsers()
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    fetchUsers (page = 1) {
      const pageSize = this.pageSize
      this.$store.dispatch('fetchUsers', { pageSize, page })
        .then(() => { this.currentPage = page })
        .catch(err => console.log(err))
    },
    shareData (index) {
      this.$router.push({ name: 'user', params: { data: this.users[index] } })
    }
  }
}
</script>

<style scoped lang="scss">

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 40px 0px;
}
.form-control {
  width: 500px;
  margin: auto;
}
.select {
  height: 30px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 30px;
}

</style>
