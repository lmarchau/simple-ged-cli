<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <v-flex xs12 lg5 mb-2>
          <h2>Home</h2>
          <v-btn color="primary" fab dark @click="add()">
            <v-icon>add</v-icon>
          </v-btn>
          <v-data-table
            :headers="headers"
            :items="documents"
            >
            <template slot="headers" slot-scope="props">
              <tr>
                <th
                  v-for="header in props.headers"
                  :key="header.text">
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.name }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      documents: [],
      headers: [
        {
          text: 'Name'
        }
      ]
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.$http.get('http://localhost:8080/documents')
          .then(response => {
            this.documents = response.data.content
          },
            error => {
              console.log('ERROR' + error.data)
            })
    },
    add: function () {
      this.$router.push({name: 'add-document'})
    }
  }
}
</script>
