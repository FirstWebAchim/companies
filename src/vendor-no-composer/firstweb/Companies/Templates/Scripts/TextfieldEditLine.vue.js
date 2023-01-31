Vue.component('textfield-edit-line', {
    props: {
        'value': {
            type: String,
            default: ''
        },
    },

    data: function () {
        return {
            edit: false,
            newValue: '',
        }
    },

    methods: {
        change: function()
        {
            this.edit = false
            this.$emit('change', this.newValue);
        },

        abort: function()
        {
            this.edit = false
        }
    },

    template: `
        <div>
            <div v-show="!edit">
                <span>{{ this.value }}</span>
                <button @click="newValue = value; edit = true" class="btn btn-sm btn-outline-secondary">
                    <i class="fas fa-pen"></i>
                </button>
            </div>

            <div v-show="edit">
                <div class="input-group">
                    <textarea @keyup.esc="abort()" v-model="newValue" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <button @click="change()" type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-check"></i></button>
                    <button @click="abort()" type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-times"></i></button>
                </div>
            </div>
        </div>
    `
});