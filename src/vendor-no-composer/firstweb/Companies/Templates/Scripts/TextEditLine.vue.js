Vue.component('text-edit-line', {
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
                    <input @keyup.enter="change()" @keyup.esc="abort()" v-model="newValue" type="text" class="form-control" value="">
                    <button @click="change()" type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-check"></i></button>
                    <button @click="abort()" type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-times"></i></button>
                </div>
            </div>
        </div>
    `
});