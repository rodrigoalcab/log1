<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Produtos</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTableProdutos :produtos="produtos"
               @updateData="getAll" />

              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>

import DataTableProdutos from '../datatable/DataTableProdutos';

export default {
  name: 'Forms',
  components: { DataTableProdutos },

    data() {
        return {
            produtos: [],

        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/produto').then(res => {
          this.produtos = res.data

        })
      },

    },

    created() {
        this.$http.get('/v1/produto').then(res => {
            this.produtos = res.data

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
