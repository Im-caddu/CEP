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
        // Busca CEP por número
        searchCep() {
            if (this.cep.length === 8 && /^\d+$/.test(this.cep)) {
                axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
                    .then(response => this.data = response.data)
                    .catch(error => console.log(error));
            } else {
                alert('Por favor, digite um CEP válido com 8 dígitos.');
                this.data = null;
            }
        },

        // Busca endereço por estado, cidade e rua
        searchByAddress() {
            if (this.state && this.city && this.street) {
                axios.get(`https://viacep.com.br/ws/${this.state}/${this.city}/${this.street}/json/`)
                    .then(response => {
                        this.addressResults = response.data;
                        if (this.addressResults.length === 0) {
                            alert('Nenhum endereço encontrado para os critérios informados.');
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                alert('Por favor, preencha todos os campos para buscar o endereço.');
                this.addressResults = null;
            }
        }
    }
});
