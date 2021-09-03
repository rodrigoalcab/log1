export default {
    data() {
        return {
            saveButtonDisabled: false,
            messages: [],
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
        save() {
            this.disableButton()
            const method = this.id ? 'put' : 'post'
            const finalUrl = this.id ? '/posts/' + this.id : '/posts'
            
            this.$http[method]('' + finalUrl, this.post)
                .then(response => {

                    this.enableButton()

                    if(response.status == 200 || response.status == 201) {
                        this.newMessage(this.messages, 'Operação concluída com sucesso!', 'success')
                    }

                    this.clearFields(this.post)
                    
                }).catch( error => {
                    this.newMessage(this.messages, 'Problema para excluir!', 'danger')
                console.log(error)
                })
        },

        remove(id) {
            this.$http.delete('/posts/' + id)
                .then(() => {
                    this.clearFields(this.post)
                    this.newMessage(this.messages, 'Post excluído com sucesso', 'danger')
                }).catch( error => {
                    this.newMessage(this.messages, 'Erro ao tentar excluir', 'danger')
                console.log(error)
                })
        },

        getOne(id) {
            this.$http.get('/posts/' + id)
                .then(res => {
                this.post = res.data
                this.id = this.post.id
            }).catch( error => {
                console.log(error)
            })
        },

        exportXLS() {
            alert('Exportando arquivo XLS...')
        },

        enableButton() {
            this.saveButtonDisabled = false;
        },

        disableButton() {
            this.saveButtonDisabled = true;
        }
    },

    created() {
        this.$http.get('/posts').then(res => {
            this.posts = res.data
        })

    }
}