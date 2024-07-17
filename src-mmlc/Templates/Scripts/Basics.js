class FwPagination
{
    constructor(elementsPerPage) {
        this.pages = 0;
        this.page = 0;
        this.elementsPerPage = elementsPerPage;
    }

    prevPage()
    {
        this.page--;
    }

    nextPage()
    {
        this.page++;
    }

    paginate(entries)
    {
        this.pages = Math.ceil(entries.length / this.elementsPerPage);

        // Page darf nicht kleine 0 und nicht größer pages sein.
        this.page = Math.max(0, Math.min(this.page, this.pages - 1))
            
        const from = this.page * this.elementsPerPage;
        const to = (this.page + 1) * this.elementsPerPage;
        return entries.slice(from, to);
    }
}

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});