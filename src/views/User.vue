<template>
  <div>
    <h1>{{ $route.params.name }}</h1>
    <b-table stacked striped hover :items="user" :primary-key="user.id">
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
    <router-link :to="'/'">
      Back to users
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    return {
      user: {},
      fields: [
        { key: 'address', label: 'Address' },
        { key: 'company', label: 'Company' }
      ]
    }
  },
  methods: {
    routeBack () {
      this.$route.back()
    }
  },
  created () {
    this.user = [this.$route.params.data]
  }
}
</script>
