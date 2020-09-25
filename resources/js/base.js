module.exports = class Base
{
    constructor()
    {
        this.githubApi = 'https://api.github.com'

        this.modalLoading = $('#modal-loading')
        this.modalError = $('#modal-error')
        this.modalErrorMessage = $('#modal-error .modal-error-message')
        this.modalClone = $('#modal-clone')

        this.alertCopy = $('#alert-copy')
        this.selectCloneType = $('#select-clone-type')
        this.inputUrlClone = $('#input-url-clone')
        this.https = ''
        this.ssh = ''

        this.usersView = $('#users-view')
        this.repositoriesView = $('#repositories-view')

        this.repositoriesView.hide()
        this.alertCopy.hide()

        this.baseInit()
    }

    baseInit()
    {
        let _this = this
        this.selectCloneType.on('change', function () {
            _this.inputUrlClone.val(_this.selectCloneType.val() == 'https' ? _this.https : _this.ssh)
            _this.alertCopy.hide()
        })

        this.inputUrlClone.on('click', function () {
            _this.inputUrlClone.select()
            document.execCommand('copy')
            _this.alertCopy.show('fast')
        })

        $('#repositories-btn-voltar').on('click', () => {
            this.repositoriesView.hide('fast')
            this.usersView.show('fast')
        })
    }

    loading(show)
    {
        this.modalLoading.modal(show ? 'show' : 'hide')
    }

    error(show, message = '')
    {
        this.modalErrorMessage.empty()
        this.modalErrorMessage.append(message)
        this.modalError.modal(show ? 'show' : 'hide')
    }

    openClone(https, ssh)
    {
        this.https = `git clone ${https}`
        this.ssh = `git clone ${ssh}`

        this.selectCloneType.val('https')
        this.inputUrlClone.val(this.https)

        this.alertCopy.hide()
        this.modalClone.modal('show')
    }
}
