<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Cadastro de Filiais </strong>
            <b-alert show dismissible v-for="(mensagem, index) in mensagens"
                     :key="index"
                     :variant="mensagem.tipo">{{ mensagem.texto }}</b-alert>

          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput label="userId" v-model="post.userId" />
                <CInput label="id" v-model="post.id" />
                <CInput label="Title" v-model="post.title" />
                <CInput label="Body" v-model="post.body" />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter style="text-align: right">
            <CButton type="reset" size="sm" color="danger" style="margin: 0 8px 0 8px;" class="botao-texto-branco" @click="limpar"><CIcon name="cil-ban"/> Limpar</CButton>
            <CButton type="submit" size="sm" color="success" style="margin: 0 8px 0 8px;" class="botao-texto-branco" @click="salvar" :disabled="desabilitado" ><CIcon name="cil-check-circle"/> Salvar</CButton>

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
<!--                <div v-for="(post, index) in posts" :key="index">-->
<!--                  <span><strong>userId:</strong> {{ post.userId }}</span><br>-->
<!--                  <span><strong>ID:</strong> {{ post.id }}</span><br>-->
<!--                  <span><strong>Title:</strong> {{ post.title }}</span><br>-->
<!--                  <span><strong>Body:</strong> {{ post.body }}</span><br>-->
<!--                  <span><strong>INDEX:</strong> {{ index }}</span><br>-->
<!--                  <b-button class="ml-2" variant="warning" @click="buscarUm(post.id)">Editar</b-button>-->
<!--                  <b-button class="ml-2" variant="danger" @click="excluir(post.id)">Excluir</b-button>-->
<!--                  <hr>-->
<!--                </div>-->
               <DataTable :posts="posts"
               @itemParaEditar="buscarUm"
               @itemParaExcluir="excluir"
               @xlsParaExportar="exportarXls"
               />
              </CCol>
            </CRow>
          </CCardBody>


        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>
  import filiaisMixin from '@/mixins/filiaisMixin';
  import DataTable from '../datatable/DataTable';


export default {
  name: 'Forms',

  components: { DataTable },
  mixins: [filiaisMixin],

  data() {
    return {

    }
  },
  methods: {

  }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
