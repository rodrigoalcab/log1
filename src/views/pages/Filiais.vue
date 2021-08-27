<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Cadastro de Filiais </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput label="userID" v-model="post.userId" />
                <CInput label="ID" v-model="post.id" />
                <CInput label="Title" v-model="post.title" />
                <CInput label="Body" v-model="post.body" />
              </CCol>

            </CRow>
          </CCardBody>
          <CCardFooter style="text-align: right">
            <CButton type="reset" size="sm" color="danger" style="margin: 0 8px 0 8px;" @click="limparPost"><CIcon name="cil-ban"/> Limpar</CButton>
            <CButton type="submit" size="sm" color="success" style="margin: 0 8px 0 8px;"><CIcon name="cil-check-circle"/> Cadastrar</CButton>

          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Filiais</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <div v-for="(post, id) in posts" :key="post.id">
                  <span><strong>ID:</strong> {{ post.id }}</span><br>
                  <span><strong>Title:</strong> {{ post.title }}</span><br>
                  <span><strong>Body:</strong> {{ post.body }}</span><br>
                  <b-button class="ml-2" variant="warning" @click="buscarUm(post.id)">Editar</b-button>
                  <b-button class="ml-2" variant="danger">Excluir</b-button>
                  <hr>
                </div>
              </CCol>
            </CRow>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>
export default {
  name: 'Forms',
  data() {
    return {
      posts: [],
      post: {

      }
    }
  },
  methods: {
    buscarUm(id) {
      this.$http.get('/posts/' + id).then(res => {
        this.post = res.data
        console.log(this.post)
      })
    },
    limparPost() {
      this.post = ''
    },

  },
  mounted() {
    this.$http.get('/posts').then(res => {
      this.posts = res.data
    })
  }
}
</script>

<style>
  button {

  }
</style>
