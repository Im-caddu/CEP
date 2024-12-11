new Vue({
    el: '#app',
    data: {
        cep: '',
        data: null,
        state: 'PR',
        city: '',
        street: '',
        addressResults: null
    },
    methods: {
        // Busca CEP
        searchCep() {
            if (this.cep.length === 8 && /^\d+$/.test(this.cep)) {
                axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
                    .then(response => this.data = response.data)
                    .catch(error => console.log(error));
            } else {
                alert('Por favor, digite um CEP válido!');
                this.data = null;
            }
        },

        // Busca CEP por cidade
        searchByAddress() {
            if (this.state && this.city && this.street) {
                axios.get(`https://viacep.com.br/ws/${this.state}/${this.city}/${this.street}/json/`)
                    .then(response => {
                        this.addressResults = response.data;
                        if (this.addressResults.length === 0) {
                            alert('Nenhum endereço encontrado!');
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                alert('Por favor, preencha todos os campos!');
                this.addressResults = null;
            }
        }
    }
});
