const text = 'New user registration'


document.getElementById('registerClick').addEventListener('click',() => {
    const name = document.getElementById('user').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    const package = {
        name : name.trim(),
        password : password.trim(),
        email : email.trim()
    }
    const x = new XMLHttpRequest()
    x.open('POST','http://localhost:4000/api/register',true)
    x.setRequestHeader('Content-Type','application/json')
    x.send(JSON.stringify(package))
    x.onreadystatechange = () => {
        if(x.readyState == XMLHttpRequest.DONE)
        {
            console.log(x.status, x.responseText)
        }
    }
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