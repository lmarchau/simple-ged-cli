<template>
<v-container fluid>
  <v-slide-y-transition mode="out-in">
    <v-layout column wrap>
      <v-flex xs12 lg5 mb-2>
        <h2>Upload Document</h2>
        <v-form ref="form">
          <v-text-field
            v-model="document.name"
            label="Nom"
            required>
          </v-text-field>
          <v-btn
            raised
            @click="pickFile()"
            >
            Sélectioner un fichier
          </v-btn>
          <input
            type="file"
            ref="file"
            name="file"
            accept="*"
            @change="filePicked"/>
          <v-btn
            depressed
            @click="create()"
            >
            Upload
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>
<script>
export default {
  data: function () {
    return {
      document: {
        name: null
      },
      file: ''
    }
  },
  methods: {
    pickFile: function () {
      this.$refs.file.click()
    },
    filePicked: function (event) {
      const files = event.target.files || event.dataTransfer.files
      if (files && files[0]) {
        let filename = files[0].name
        if (filename && filename.lastIndexOf('.') <= 0) {
          // FIXME ERROR
          return
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
//          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.file = files[0]
      }
      console.log(files)
    },
    create: function () {
      console.log('upload...' + this.file)
      let formData = new FormData()
      formData.set('file', this.file)
      formData.set('name', this.document.name)
      this.$http.post('http://localhost:8080/documents', formData)
        .then(response => {
          console.log('success')
          this.$router.push({name: 'home'})
        },
          error => {
            console.log('upload file error...' + error.data)
          })
    }
  }
}
</script>
