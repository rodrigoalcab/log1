<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Localidades</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTableLocalidades :localidades="localidades"
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

import DataTableLocalidades from '../datatable/DataTableLocalidades';

export default {
  name: 'Forms',
  components: { DataTableLocalidades },

    data() {
        return {
            localidades: [],

        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/localidade').then(res => {
          this.localidades = res.data

        })
      },

    },

    created() {
        this.$http.get('/v1/localidade').then(res => {
            this.localidades = res.data

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
