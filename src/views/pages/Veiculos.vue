<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem Veículos</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTableVeiculos :veiculos="veiculos"
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

import DataTableVeiculos from '../datatable/DataTableVeiculos';

export default {
  name: 'Forms',
  components: { DataTableVeiculos },

    data() {
        return {
            veiculos: [],

        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/veiculo').then(res => {
          this.veiculos = res.data


        })
      },

    },

    created() {
        this.$http.get('/v1/veiculo').then(res => {
            this.veiculos = res.data


        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
