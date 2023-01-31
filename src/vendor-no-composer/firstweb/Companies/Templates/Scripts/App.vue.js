const fwControllerFileName = 'fw_companies.php';

var app = new Vue({
    el: '#app',

    data: {
        companies: [],
        waitingForLoad: true,
        showSaveButton: false,
        saveButtonText: 'Änderung speichern',
        searchWord: '',
        nextId: -1,
        pagination: new FwPagination(10),
    },

    mounted: function () {
        this.load();
    },
    
    methods: {
        load: function () {
            fetch(fwControllerFileName + '?action=getCompanies')
            .then(response => response.json())
            .then(data => {
                this.waitingForLoad = false;
    
                //console.log(data);
    
                // Fehlende Flags hinzufügen
                data.forEach(function(company) {
                    company.flag = 'none';
                });
    
                this.companies = data;
                this.showSaveButton = false;
            })
            .catch((error) => {
                this.waitingForLoad = false;
                console.error('Error:', error);
            });
        },

        save: function () {
            this.saveButtonText = 'bitte warten ...';

            seletedCompanies = this.filterChangedCompanies(this.companies);

            // companies an die Server API senden.
            fetch(fwControllerFileName + '?action=save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(seletedCompanies)
            })
            .then(response => response.text())
            .then(data => {
                this.showSaveButton = false;
                this.saveButtonText = 'Änderung speichern';
                this.load();
            });
        },

        add: function() {
            this.companies.unshift({
                id: this.nextId,
                name: 'Neue Firma',
                address: '',
                flag: 'new'
            })

            this.showSaveButton = true

            this.nextId--;
        },

        remove: function (company)
        {
            company.flag = 'deleted';
            this.showSaveButton = true;
        },

        filterCompanies: function(searchWord, companies) {
            selectedCompanies = companies;
            selectedCompanies = selectedCompanies.filter(function(company) {
                if (searchWord) {
                    result = false;
                    result |= company.name.toLowerCase().includes(searchWord.toLowerCase());
                    result |= company.address.toLowerCase().includes(searchWord.toLowerCase());
                    return result;
                }
                return true;
            });
            return selectedCompanies;
        },

        filterChangedCompanies: function()
        {
            selectedCompanies = [];
            this.companies.forEach(function(company) {
                if (company.flag === 'none') {
                    return;
                }
                selectedCompanies.push(company);
            });
            return selectedCompanies;
        },

        filterDeletedCompanies: function(companies) {
            selectedCompanies = companies.filter(function(company) {
                return company.flag !== 'deleted';
            });
            return selectedCompanies;
        },
    },

    computed: {
        displayCompanies: function() {
            seletectedCompanies = this.companies;
            seletectedCompanies = this.filterDeletedCompanies(seletectedCompanies);
            seletectedCompanies = this.filterCompanies(this.searchWord, seletectedCompanies);
            return this.pagination.paginate(seletectedCompanies);
        }
    },

    template: `
        <div>
            <button @click="add" type="button" class="btn btn-sm btn-success">
                Firma hinzufügen
            </button>

            <br><br>

            <form v-on:submit.prevent="">
                <div class="input-group mb-3">
                    <input v-model="searchWord" type="text" class="form-control" placeholder="Filter Firmennamen oder Firmenadresse">
                    <button type="submit" class="btn btn-outline-primary" id="button-addon2">Filtern</button>
                </div>
            </form>

            <div v-if="displayCompanies.length">
                <table class="table align-middle table-striped">
                    <thead>
                        <tr>
                            <th style="width: 1%" scope="col">ID</th>
                            <th style="width: 45%" scope="col">Name</th>
                            <th style="width: 45%" scope="col">Adresse</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="company in displayCompanies">
                            <tr>
                                <td>
                                    {{ company.id }}
                                </td>
                                
                                <td>
                                    <text-edit-line
                                        :value="company.name"
                                        v-on:change="company.name = $event;company.flag = 'changed'; showSaveButton = true">
                                    </text-edit-line>
                                </td>

                                <td>
                                    <textfield-edit-line
                                        :value="company.address"
                                        v-on:change="company.address = $event;company.flag = 'changed'; showSaveButton = true">
                                    </textfield-edit-line>
                                </td>

                                <td>
                                    <div class="float-end">
                                        <button @click="remove(company)" type="button" class="btn btn-sm btn-primary">
                                            entfernen
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <pagination-view
                    :pagination="pagination">
                </pagination-view>

            </div>
            <div v-else>
                <div class="alert alert-primary" role="alert">
                    Keine Firma vorhanden.
                </div>
            </div>

            <div v-if="waitingForLoad" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-if="showSaveButton" class="text-end">
                <button @click="save" type="button" class="btn btn-sm btn-success">
                    {{ saveButtonText }}
                </button>
            </div>

            <!-- <pre>
                {{ JSON.stringify(companies, null, 2) }}
                {{ JSON.stringify(filterChangedCompanies(), null, 2) }}
            </pre> -->
        </div>
    `
})