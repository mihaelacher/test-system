let utils = {
    initialize: function () {
        this.methodLinks = $('a[data-method]');
        this.token = $('a[data-token]');
        this.registerEvents();
        this.onPageLoadShowToastrSessionMsg();
    },

    registerEvents: function () {
        this.methodLinks.on('click', this.handleMethod);
    },

    handleMethod: function (e) {
        var link = $(this);
        var httpMethod = link.data('method').toUpperCase();
        var form;

        // If the data-method attribute is not PUT or DELETE,
        // then we don't know what to do. Just ignore.
        if ($.inArray(httpMethod, ['PUT', 'DELETE']) === -1) {
            return;
        }

        // Allow user to optionally provide data-confirm="Are you sure?"
        if (link.data('confirm')) {
            if (!utils.verifyConfirm(link)) {
                return false;
            }
        }

        form = utils.createForm(link);
        form.submit();

        e.preventDefault();
    },

    verifyConfirm: function (link) {
        return confirm(link.data('confirm'));
    },

    createForm: function (link) {
        var form =
            $('<form>', {
                'method': 'POST',
                'action': link.attr('href')
            });

        var token =
            $('<input>', {
                'type': 'hidden',
                'name': '_token',
                'value': link.data('token')
            });

        var hiddenInput =
            $('<input>', {
                'name': '_method',
                'type': 'hidden',
                'value': link.data('method')
            });

        return form.append(token, hiddenInput)
            .appendTo('body');
    },

    onPageLoadShowToastrSessionMsg: function () {
        let msgBox = $('.alert.show-toastr');
        let text = '';
        if (msgBox.length) {
            text = msgBox[0].textContent;
        }

        // Sanity check
        if (msgBox.is(':visible') || text === undefined || text === '') {
            return;
        }

        // if toastr library is not loaded, then show the error message box
        if (typeof toastr === undefined) {
            msgBox.show();
            msgBox.removeClass('hidden');
            return;
        }

        text = text.trim();

        let msgType = msgBox.hasClass('alert-danger') ? 'error' : 'success';

        utils.showToastrMessage(text, msgType, 4000);
    },

    showToastrMessage: function (msg, type, timeOut) {
        timeOut = timeOut !== undefined ? timeOut : 2000;

        toastr.options = {
            classButton: true,
            debug: false,
            positionClass: 'toast-top-right',
            onclick: null,
            showDuration: '500',
            hideDuration: '500',
            timeOut: timeOut,
            extendedTimeOut: '3000',
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut'
        }

        type = String(type);

        if (type === 'warning') {
            toastr.warning(msg);
        } else if (type === 'error') {
            toastr.error(msg);
        } else if (type === 'info') {
            toast.info(msg);
        } else {
            localStorage.clear();

            toastr.success(msg);
        }
    },

    getCommonDatatableOptions: function () {
        return {
            responsive: true,
            bFilter: false,
            lengthChange: false,
            ordering: false,
            info: false,
        };
    },

    getQuestionDatatableCols: function () {
        return [
            {
                data: 'title',
                name: 'title',
                orderable: false,
                searchable: false
            }, {
                data: 'question',
                name: 'question',
                orderable: false,
                searchable: false
            }, {
                data: 'points',
                name: 'points',
                orderable: false,
                searchable: false
            }, {
                data: 'type',
                name: 'type',
                orderable: false,
                searchable: false
            }
        ];
    },

    getUsersDatatableCols: function () {
       return [{
           data: 'full_name',
           name: 'full_name'
       }, {
           data: 'username',
           name: 'username'
       }, {
           data: 'email',
           name: 'email'
       }, {
           data: 'is_admin',
           name: 'is_admin'
       }];
    },

    getDataFromCache: function (cacheKey) {
        let data = undefined;

        if (typeof Storage !== undefined) {
            try {
                data = JSON.parse(localStorage.getItem(cacheKey));
            } catch (e) {
                return false;
            }
        }
        return data;
    },

    putDataInCache: function (cacheKey, data) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
    }
}
utils.initialize();

