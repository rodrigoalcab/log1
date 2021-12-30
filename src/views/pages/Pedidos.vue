<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Pedidos</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTablePedidos :pedidos="pedidos"
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

import DataTablePedidos from '../datatable/DataTablePedidos';

export default {
  name: 'Forms',
  components: { DataTablePedidos },

    data() {
        return {
            pedidos: [],
        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/pedido').then(res => {
          this.pedidos = res.data


        })
      },

    },

    created() {
        this.$http.get('/v1/pedido').then(res => {
            this.pedidos = res.data

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
