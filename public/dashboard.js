const cardTemplate = document.getElementsByClassName('job-card')[0]

const getInfoFromApi = () => {
    let authString = ''
    if (!document.cookie) {
        window.location.href = '/'
        return
    }
    const cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        const [a, b] = cookie.split('=');
        if (a.trim() === 'token') {
            authString = 'Bearer ' + b.trim();
            // console.log(authString)
        }
    })
    if (!authString) {
        window.location.href = '/'
    }
    // console.log(authString)
    const x = new XMLHttpRequest();
    x.open('GET', 'http://localhost:4000/api/dashboard');
    x.setRequestHeader('authentication', authString)
    x.send()
    x.onreadystatechange = () => {
        if (x.readyState == XMLHttpRequest.DONE) {
            //TEMPORARY CHANGE
            console.log("Done", x.response, JSON.parse(x.response).msg.name)
            document.getElementById('greet').textContent = JSON.parse(x.response).msg.name
        }
    }
    //careful
    const y  = new XMLHttpRequest();
    y.open('GET', 'http://localhost:4000/api/getJob');
    y.setRequestHeader('authentication', authString)
    y.send()
    y.onreadystatechange = () => {
        if (x.readyState === XMLHttpRequest.DONE) {
            const data_response = JSON.parse(y.response)
            console.log(data_response.resp.length)
            data_response.resp.forEach(items => {
                //current open closed previous
                if (items.status == "current") {
                    // clone job-crd and append to parent
                    //get pareent 
                    const parent = document.getElementById('cujs')
                    //make parent visible
                    // parent.style.display = 'flex' //not needed anymore
                    // get template 
                    const clone = cardTemplate.cloneNode(true)
                    clone.style.display = 'flex'
                    console.log(clone.children)
                    for (let i = 0; i < clone.children.length; i++) {
                        if (clone.children[i].className == 'company') {
                            clone.children[i].textContent = items.company
                        }
                        if (clone.children[i].className == 'dbid') {
                            clone.children[i].textContent = items.forId
                        }
                        if (clone.children[i].className == 'date') {
                            clone.children[i].textContent = items.date
                        }
                        if (clone.children[i].className == 'position') {
                            clone.children[i].textContent = items.position
                        }
                    }
                    parent.appendChild(clone)
                }
                if (items.status == "open") {
                    // clone job-crd and append to parent
                    //get pareent 
                    const parent = document.getElementById('ojs')
                    //make parent visible
                    // parent.style.display = 'flex' //not needed anymore
                    // get template 
                    const clone = cardTemplate.cloneNode(true)
                    clone.style.display = 'inline'
                    console.log(clone.children)
                    for (let i = 0; i < clone.children.length; i++) {
                        if (clone.children[i].className == 'company') {
                            clone.children[i].textContent = items.company
                        }
                        if (clone.children[i].className == 'dbid') {
                            clone.children[i].textContent = items.forId
                        }
                        if (clone.children[i].className == 'date') {
                            clone.children[i].textContent = items.date
                        }
                        if (clone.children[i].className == 'position') {
                            clone.children[i].textContent = items.position
                        }
                    }
                    parent.appendChild(clone)
                }
                if (items.status == "closed") {
                    // clone job-crd and append to parent
                    //get pareent 
                    const parent = document.getElementById('cjs')
                    //make parent visible
                    // parent.style.display = 'flex' //not needed anymore
                    // get template 
                    const clone = cardTemplate.cloneNode(true)
                    clone.style.display = 'block'
                    console.log(clone.children)
                    for (let i = 0; i < clone.children.length; i++) {
                        if (clone.children[i].className == 'company') {
                            clone.children[i].textContent = items.company
                        }
                        if (clone.children[i].className == 'dbid') {
                            clone.children[i].textContent = items.forId
                        }
                        if (clone.children[i].className == 'date') {
                            clone.children[i].textContent = items.date
                        }
                        if (clone.children[i].className == 'position') {
                            clone.children[i].textContent = items.position
                        }
                    }
                    parent.appendChild(clone)
                }
                if (items.status == "previous") {
                    // clone job-crd and append to parent
                    //get pareent 
                    const parent = document.getElementById('pjs')
                    //make parent visible
                    // parent.style.display = 'flex' //not needed anymore
                    // get template 
                    const clone = cardTemplate.cloneNode(true)
                    clone.style.display = 'block'
                    console.log(clone.children)
                    for (let i = 0; i < clone.children.length; i++) {
                        if (clone.children[i].className == 'company') {
                            clone.children[i].textContent = items.company
                        }
                        if (clone.children[i].className == 'dbid') {
                            clone.children[i].textContent = items.forId
                        }
                        if (clone.children[i].className == 'date') {
                            clone.children[i].textContent = items.date
                        }
                        if (clone.children[i].className == 'position') {
                            clone.children[i].textContent = items.position
                        }
                    }
                    parent.appendChild(clone)
                }
            })
        }
    }
}

document.getElementById('logout').addEventListener('click', () => {
    //Clear all cookie from stackOverflow https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    document.location.href = '/'
})

for (let i = 0; i < document.getElementsByClassName('job-list').length; i++) {
    document.getElementsByClassName('job-list')[i].addEventListener('wheel', (e) => {
        e.preventDefault();
        // console.log('scroll')
        // console.log()
        document.getElementsByClassName('job-list')[i].scrollLeft += e.deltaY;
    })
}

getInfoFromApi()