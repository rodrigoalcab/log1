<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Filiais</strong>
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
          console.log('listagem do updateData'+this.produtos)

        })
      },

    },

    created() {
        this.$http.get('/v1/produto').then(res => {
            this.produtos = res.data
            console.log('listagem do created'+this.produtos)

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
