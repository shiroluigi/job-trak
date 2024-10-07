const text = 'New user registration';

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
    if (eventType == 'keypress') {
        if (event.key != 'Enter') {
            return
        }
    }
    // event.stopPropagation()
    const name = document.getElementById('user').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    if(!name || !email || !password)
    {
        alert('Missing fields!')
        window.location.reload()
    }
    const package = {
        name: name.trim(),
        password: password.trim(),
        email: email.trim()
    }
    const x = new XMLHttpRequest()
    x.open('POST', '/api/register', true)
    x.setRequestHeader('Content-Type', 'application/json')
    x.send(JSON.stringify(package))
    x.onreadystatechange = () => {
        if (x.readyState == XMLHttpRequest.DONE) {
            if (x.status == 200) {

                alert('Registration successfull')
                window.location.href = '/'
            }else {
                alert('Something went wrong, try again')
                window.location.reload()
            }
        }
    }
}



document.addEventListener('keypress', (e) => {
    submit('keypress', e)
},true)
document.getElementById('registerClick').addEventListener('click', (e) => {
    submit('click', e)
},true)


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