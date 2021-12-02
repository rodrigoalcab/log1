<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Perfil de Veículos</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTablePerfilVeiculos :perfis="perfis"
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

import DataTablePerfilVeiculos from '../datatable/DataTablePerfilVeiculos';

export default {
  name: 'Forms',
  components: { DataTablePerfilVeiculos },

    data() {
        return {
            perfis: [],

        }
    },
    methods: {

      getAll() {
        this.$http.get('/v1/modelo-veiculo').then(res => {
          this.perfis = res.data

        })
      },

    },

    created() {
        this.$http.get('/v1/modelo-veiculo').then(res => {
            this.perfis = res.data

        })
    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
