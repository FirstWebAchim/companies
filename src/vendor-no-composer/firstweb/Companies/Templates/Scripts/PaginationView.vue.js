Vue.component('pagination-view', {
    props: {
        'pagination': {
            type: Object,
            default: []
        }
    },

    data: function () {
        return {
            elementsPerPage: this.pagination.elementsPerPage
        };
    },

    watch: {
        elementsPerPage: function() {
            this.pagination.elementsPerPage = this.elementsPerPage
        }
    },

    methods: {
        selected: function (value) {
            if (this.pagination.elementsPerPage == value) {
                return true;
            }
            return false;
        }
    },
    
    template: `
        <div class="fw-pagination">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center" style="user-select: none">
                    <li :class="(pagination.page > 0) ? '' : 'disabled'" class="page-item">
                        <a @click.prevent="pagination.prevPage()" class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li :class="(pagination.page < pagination.pages-1) ? '' : 'disabled'" class="page-item">
                        <a @click.prevent="pagination.nextPage()" class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="row">
                <div class="col">
                    Seite {{ pagination.page + 1 }} von {{ pagination.pages }}

                    <select v-model="elementsPerPage" class="form-select form-select-sm" aria-label="Default select example" style="display: inline; width: initial">
                        <option value="1" :selected="selected(1)">1 pro Seite</option>
                        <option value="3" :selected="selected(3)">3 pro Seite</option>
                        <option value="5" :selected="selected(5)">5 pro Seite</option>
                        <option value="10" :selected="selected(10)">10 pro Seite</option>
                        <option value="25" :selected="selected(25)">25 pro Seite</option>
                        <option value="50" :selected="selected(50)">50 pro Seite</option>
                        <option value="100" :selected="selected(100)">100 pro Seite</option>
                    </select>
                </div>
            </div>
        </div>
    `
});