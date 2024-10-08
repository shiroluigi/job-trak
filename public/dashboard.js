const cardTemplate = document.getElementsByClassName('job-card')[0]
const clearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

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
        }
    })
    if (!authString) {
        window.location.href = '/'
    }
    const x = new XMLHttpRequest();
    x.open('GET', '/api/dashboard');
    x.setRequestHeader('authentication', authString)
    x.send()
    x.onreadystatechange = () => {
        if (x.readyState == XMLHttpRequest.DONE) {
            if (x.status == 200) {
                console.log("Done")
                document.getElementById('greet').textContent = JSON.parse(x.response).msg.name
            }
            else { //Redirect logic 
                clearCookies()
                window.location.href = "/"
            }
        }
    }
    const y = new XMLHttpRequest();
    y.open('GET', '/api/getJob');
    y.setRequestHeader('authentication', authString)
    y.send()
    y.onreadystatechange = async () => {
        if (y.readyState === XMLHttpRequest.DONE) {
            let resp_a = await y.responseText
            const resp_j = JSON.parse(resp_a)
            let cujs = false, ojs = false, cjs = false, pjs = false
            resp_j.resp.forEach(items => {
                if (items.status == "current") {
                    cujs = true
                    itemAddUtil(items, "cujs")
                }
                if (items.status == "open") {
                    ojs = true
                    itemAddUtil(items, "ojs")
                }
                if (items.status == "closed") {
                    cjs = true
                    itemAddUtil(items, "cjs")
                }
                if (items.status == "previous") {
                    pjs = true
                    itemAddUtil(items, "pjs")
                }
            })
            if(cujs == false) {
                document.getElementById('current-job').style.display = "none";
            }
            if(ojs == false) {
                document.getElementById('open-job').style.display = "none";
            }
            if(cjs == false) {
                document.getElementById('closed-job').style.display = "none";
            }
            if(pjs == false) {
                document.getElementById('previous-job').style.display = "none";
            }
            if(!cujs && !ojs && !cjs && !pjs)
            {
                document.getElementById('nojobs').style.display = "flex";
            }
        }
    }
}

const itemAddUtil = (items, id) => {
    const parent = document.getElementById(id)
    const clone = cardTemplate.cloneNode(true)
    clone.style.display = 'block'
    for (let i = 0; i < clone.children.length; i++) {
        if (clone.children[i].className == 'company') {
            clone.children[i].textContent = items.company
        }
        if (clone.children[i].className == 'dbid') {
            clone.children[i].textContent = items._id
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

document.getElementById('logout').addEventListener('click', async () => {
    //Clear all cookie from stackOverflow https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "/api/logout")
    xhr.send()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            clearCookies()
            document.location.href = '/'
        }
    }
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