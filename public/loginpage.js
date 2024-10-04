
const text = 'Login form'

// ################# TEMPORARY LOGIN REDIRECT IF COOKIE ######################
const cc = document.cookie.split(';')
cc.forEach(cookie => {
    const [a, b] = cookie.split('=');
    if (a.trim() === 'token') {
        window.location.href = '/dashboard'
    }
})
// ###############################################################################
const submit = (eventType, event) => {
    try {
        if (eventType == 'keypress') {
            if (event.key != 'Enter') {
                return
            }
        }
        const uname = document.getElementById('user').value
        const password = document.getElementById('password').value
        if (!uname || !password || password.length <= 2) {
            throw new Error("Uname or password is absent")
        }
        const details = {
            name: uname,
            password: password
        }
        let request = new XMLHttpRequest()
        request.open('POST', '/api/login', true)
        request.setRequestHeader("Content-Type", "application/json")
        request.onreadystatechange = () => {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    // console.log(JSON.parse(request.responseText).token)
                    document.cookie = `token=${JSON.parse(request.responseText).token};SameSite=None;secure`
                    //Set Auth header and add bearer to authorize and redirect if OK
                    let authString = ''
                    if (!document.cookie) {
                        return
                    }
                    const cookies = document.cookie.split(';')
                    cookies.forEach(cookie => {
                        const [a, b] = cookie.split('=');
                        if (a.trim() === 'token') {
                            authString = 'Bearer ' + b.trim();
                            console.log(authString)
                        }
                    })
                    const x = new XMLHttpRequest();
                    x.open('GET', 'http://localhost:4000/api/dashboard');
                    x.setRequestHeader('authentication', authString)
                    x.send()
                    x.onreadystatechange = () => {
                        if (x.readyState == XMLHttpRequest.DONE) {
                            window.location.href = '/dashboard'
                        }
                    }
                }
            }
        }
        request.send(JSON.stringify(details))
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('keypress', (e) => {
    console.log(e.key)
    submit('keypress', e)
})
document.getElementById('loginClick').addEventListener('click', (e) => {
    submit('click', e)
})

const typer = () => {
    let textmaker = ''
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            textmaker += text.charAt(i)
            document.getElementById('typer').textContent = textmaker
        }, i * 200, i, text, textmaker);
    }
}

typer()
