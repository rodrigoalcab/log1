<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Motoristas</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTableMotoristas :motoristas="motoristas"
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

import DataTableMotoristas from '../datatable/DataTableMotoristas';

export default {
  name: 'Forms',
  components: { DataTableMotoristas },

    data() {
        return {
            motoristas: [],

        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/motorista').then(res => {
          this.motoristas = res.data

        })
      },

    },

    created() {
        this.$http.get('/v1/motorista').then(res => {
            this.motoristas = res.data

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
