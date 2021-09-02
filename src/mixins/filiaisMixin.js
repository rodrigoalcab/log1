export default {
    data() {
        return {
            desabilitado: false,
            mensagens: [],
            posts: [],
            id: null,
            post: {
                userId: '',
                id: '',
                title: '',
                body: ''
            }
        }
    },
    methods: {
        salvar() {
            this.desabilitaBotao()
            if(this.verificaObjetoVazio(this.post)) {
                this.mensagens.push({
                    texto: 'Há campos vazios!',
                    tipo: 'danger'
                })
                this.habilitaBotao()
                return
            }
            
            const metodo = this.id ? 'put' : 'post'
            const finalUrl = this.id ? '/posts/' + this.id : '/posts'
            
            this.$http[metodo]('' + finalUrl, this.post)
                .then(response => {

                    this.habilitaBotao()

                    if(response.status == 200 || response.status == 201) {
                        
                        this.mensagens.push({
                            texto: 'Operação concluída com sucesso!',
                            tipo: 'success'
                        })

                    } else {
                        this.mensagens.push({
                            texto: response.body.retorno,
                            tipo: 'error'
                        })
                    }

                    this.limpar()
                    
                }).catch( err => {
                    this.mensagens.push({
                        texto: 'Problema para excluir',
                        tipo: 'danger'
                    })
                })
        },

        excluir(id) {
            alert('Excluindo o registro...')
            this.$http.delete('/posts/' + id)
                .then(() => {
                    this.limpar()
                    this.mensagens.push({
                        texto: 'Post excluído com sucesso!',
                        tipo: 'success'
                    })
                }).catch( err => {
                    this.mensagens.push({
                        texto: 'Problema para excluir',
                        tipo: 'danger'
                    })
                })
        },

        buscarUm(id) {
            this.$http.get('/posts/' + id).then(res => {
                this.post = res.data
                this.id = this.post.id
            })
        },

        limpar() {
            this.post.userId = ''
            this.post.id = ''
            this.post.title = ''
            this.post.body = ''
            this.id = null
        },

        exportarXls() {
            alert('Exportando arquivo XLS...')
        },

        habilitaBotao() {
            this.desabilitado = false;
        },

        desabilitaBotao() {
            this.desabilitado = true;
        }
    },

    created() {
        this.$http.get('/posts').then(res => {
            this.posts = res.data
        })

    }
}