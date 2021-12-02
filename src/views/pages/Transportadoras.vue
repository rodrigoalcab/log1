<template>
  <div>
<!--    <CRow>-->
<!--      <CCol sm="12">-->
<!--        <CCard>-->
<!--&lt;!&ndash;          <CCardHeader>&ndash;&gt;-->
<!--&lt;!&ndash;            <strong>Cadastro de Filiais </strong>&ndash;&gt;-->

<!--&lt;!&ndash;          </CCardHeader>&ndash;&gt;-->

<!--&lt;!&ndash;          <CCardBody>&ndash;&gt;-->
<!--&lt;!&ndash;            <CRow>&ndash;&gt;-->
<!--&lt;!&ndash;              <CCol sm="12">&ndash;&gt;-->
<!--&lt;!&ndash;                <CInput label="userId" v-model="post.userId" />&ndash;&gt;-->
<!--&lt;!&ndash;                <CInput label="id" v-model="post.id" />&ndash;&gt;-->
<!--&lt;!&ndash;                <CInput label="Title" v-model="post.title" />&ndash;&gt;-->
<!--&lt;!&ndash;                <CInput label="Body" v-model="post.body" />&ndash;&gt;-->
<!--&lt;!&ndash;              </CCol>&ndash;&gt;-->
<!--&lt;!&ndash;            </CRow>&ndash;&gt;-->
<!--&lt;!&ndash;          </CCardBody>&ndash;&gt;-->
<!--&lt;!&ndash;          &ndash;&gt;-->
<!--&lt;!&ndash;          <CCardFooter style="text-align: right">&ndash;&gt;-->
<!--&lt;!&ndash;            <CButton type="reset" size="sm" color="danger" style="margin: 0 8px 0 8px;" class="botao-texto-branco" @click="clearFields(post)"><CIcon name="cil-ban"/> Limpar</CButton>&ndash;&gt;-->
<!--&lt;!&ndash;            <CButton type="submit" size="sm" color="success" style="margin: 0 8px 0 8px;" class="botao-texto-branco" @click="save" :disabled="saveButtonDisabled" ><CIcon name="cil-check-circle"/> Salvar</CButton>&ndash;&gt;-->
<!--&lt;!&ndash;          </CCardFooter>&ndash;&gt;-->

<!--        </CCard>-->
<!--      </CCol>-->
<!--    </CRow>-->

    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Listagem de Transportadoras</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">

               <DataTableTransportadoras :transportadoras="transportadoras"
                @updateData="getAll"/>

              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>

import DataTableTransportadoras from '../datatable/DataTableTransportadoras';

export default {
  name: 'Forms',
  components: { DataTableTransportadoras },

    data() {
        return {
            transportadoras: [],

        }
    },
    methods: {
      getAll() {
        this.$http.get('/v1/transportadora').then(res => {
          this.transportadoras = res.data


        })
      },
    },

    created() {
        this.$http.get('/v1/transportadora').then(res => {
            this.transportadoras = res.data
        })

    }

}
</script>

<style>
  .botao-texto-branco {
    color: #FFF !important;
  }

</style>
