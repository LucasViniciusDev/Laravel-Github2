const Base = require('./base')

class Users extends Base
{
    constructor()
    {
        super()

        this.usersContainer = $('#users-container')
        this.usersContainer.empty()
        this.repositoriesContainer = $('#repositories-container')

        this.formSearchUser = $('#form-search-user')

        this.events()
    }

    events()
    {
        this.formSearchUser.on('submit', (e) => {
            e.preventDefault()

            let userName = $('#form-search-user input[name=user_name]')
            if(userName.val())
                this.getByName(userName.val())
            else
                this.getAll()
        })
    }

    async getAll()
    {
        try
        {
            this.error(false)
            this.loading(true)
            let response = await fetch(`${this.githubApi}/users`)
            let data = await response.json()
            this.mountUsersHtml(data)
        }
        catch(error)
        {
            this.error(true, 'Ocorreu um erro')
            console.error(error)
        }
        finally
        {
            this.loading(false)
        }
    }

    async getByName(userName)
    {
        try
        {
            this.error(false)
            this.loading(true)
            let response = await fetch(`${this.githubApi}/users/${userName}`)
            if(response.status == 404)
                throw new Error('Nenhum usuário encontrado')

            let data = await response.json()
            this.mountUsersHtml([data])
        }
        catch(error)
        {
            this.error(true, error.message ? error.message : 'Ocorreu um erro')
            console.error(error)
        }
        finally
        {
            this.loading(false)
        }
    }

    async getRepositories(user)
    {
        try
        {
            this.error(false)
            this.loading(true)
            let response = await fetch(`${this.githubApi}/users/${user.login}/repos`)
            let data = await response.json()
            this.mountRepositoriesHtml(data, user)
        }
        catch(error)
        {
            this.error(true, 'Ocorreu um erro')
            console.error(error)
        }
        finally
        {
            this.loading(false)
        }
    }

    mountUsersHtml(users)
    {
        let html = ``
        for(let user of users)
        {
            html +=
            `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${user.avatar_url}" class="card-img" alt="avatar">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <a href="#" title="Ver Repositórios" class="btn-view-repositories" data-user='${JSON.stringify(user)}'>
                                    <h5 class="card-title">${user.login}</h5>
                                </a>
                                <p class="card-text">
                                    <a href="${user.html_url}" title="Abrir no Github" target="_blank">
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" height="32" width="32">
                                            <path style="fill:#cccccc;" d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
                                                c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
                                                c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
                                                c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368c-56.832-6.496-116.608-28.544-116.608-127.008
                                                c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68c0,0,21.504-6.912,70.4,26.336
                                                c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672c48.864-33.248,70.336-26.336,70.336-26.336
                                                c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992c0,98.72-59.84,120.448-116.864,126.816
                                                c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496c0,6.88,4.608,14.88,17.6,12.352
                                                C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"/>
                                        </svg>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        this.usersContainer.empty()
        this.usersContainer.append(html)
        this.usersView.show('fast')
        this.repositoriesView.hide('fast')

        let _this = this
        $('.btn-view-repositories').on('click', function () {
            let user = $(this).data('user')
            _this.getRepositories(user)
        })
    }

    mountRepositoriesHtml(repositories, user)
    {
        let html = ``

        html += `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div style="text-align: center;"><img class="avatar-img" src="${user.avatar_url}" alt="avatar"></div>
            <h4 style="text-align: center;">${user.login}</h4>
            <div style="text-align: center;">
                <a href="${user.html_url}" title="Abrir no Github" target="_blank">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" height="32" width="32">
                        <path style="fill:#aaa;" d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
                            c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
                            c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
                            c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368c-56.832-6.496-116.608-28.544-116.608-127.008
                            c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68c0,0,21.504-6.912,70.4,26.336
                            c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672c48.864-33.248,70.336-26.336,70.336-26.336
                            c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992c0,98.72-59.84,120.448-116.864,126.816
                            c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496c0,6.88,4.608,14.88,17.6,12.352
                            C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"/>
                    </svg>
                </a>
            </div>
        </div>
        `

        html += `<div class="col-lg-6 col-md-6 col-sm-12">`
        html += `<h6>Repositórios</h6>`

        if(repositories.length > 0)
        {
            for(let repository of repositories)
            {
                html += `
                <div class="row justify-content-between mt-4">
                    <div class="card mb-3" style="width: 100%;">
                        <div class="row no-gutters">
                            <div class="col-md-8">
                                <div class="card-body">
                                    <a href="${repository.html_url}" title="Abrir no Github" target="_blank">
                                        <h6 style="color: #0366d6;">${repository.name}</h6>
                                    </a>
                                    <p class="card-text">
                                        <small>${repository.description ? repository.description : ''}</small>
                                    </p>
                                    <p class="card-text">
                                        <span class="text-muted" style="font-size: 10pt;">
                                            Updated on ${repository.updated_at.replace(/[^0-9]/g, '').replace(/(\d{4})(\d{2})(\d{2})(\d{6})/g, '$3/$2/$1')}
                                        </span>
                                    </p>
                                    <p class="card-text">
                                        <span class="mr-2">
                                            <button type="button" class="btn btn-light btn-sm btn-clone" data-https="${repository.clone_url}" data-ssh="${repository.ssh_url}">Clone</button>
                                        </span>

                                        ${repository.language ?
                                            `<span class="mr-2">
                                                <svg width="16" height="16" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                                    <path style="fill:#2EA2EF;" d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z"/>
                                                    <path style="fill:#54BBFF;" d="M470.793,256C470.793,114.615,374.626,0,256,0C114.615,0,0,114.615,0,256s114.615,256,256,256
                                                        C374.626,512,470.793,397.385,470.793,256z"/>
                                                </svg>
                                                <span style="font-size: 10pt;">${repository.language}</span>
                                            </span>`
                                        : ''}

                                        <span class="mr-2">
                                            <svg aria-label="stars" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                                            ${repository.stargazers_count}
                                        </span>
                                        <span class="mr-2">
                                            <svg aria-label="forks" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                                            ${repository.forks_count}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
        }
        else
        {
            html += `
            <div class="row">
                <div class="col-12 mt-5">
                    <div class="alert alert-warning">
                        Não possui nenhum repositório
                    </div>
                </div>
            </div>
            `
        }

        html += `</div>`

        this.repositoriesContainer.empty()
        this.repositoriesContainer.append(html)
        this.usersView.hide('fast')
        this.repositoriesView.show('fast')

        let _this = this
        $('.btn-clone').on('click', function () {
            _this.openClone($(this).data('https'), $(this).data('ssh'))
        })
    }
}

const users = new Users()
users.getAll()
