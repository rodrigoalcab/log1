<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Clientes</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTableClientes :clientes="clientes"
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

import DataTableClientes from '../datatable/DataTableClientes';

export default {
  name: 'Forms',
  components: { DataTableClientes },

    data() {
        return {
            clientes: [],

        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/cliente').then(res => {
          this.clientes = res.data

        })
      },

    },

    created() {
        this.$http.get('/v1/cliente').then(res => {
            this.clientes = res.data

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
