var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

// Alterna entre os formulários de login
btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

// Evento de login para Portaria
document.getElementById('submitSignup').addEventListener('click', (event) => {
    event.preventDefault();
    // Aqui futuramente você vai chamar o backend para validar o login
    window.location.href = "../portaria/portaria.html"; // Redireciona para a página da portaria
});

// Evento de login para Administrador
document.getElementById('submitSignin').addEventListener('click', (event) => {
    event.preventDefault();
    // Aqui futuramente você vai chamar o backend para validar o login
    window.location.href = "../administrador/adm.html"; // Redireciona para a página do Administrador
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = "../../FRONTEND/layout1_view_site/index.html";
});

// Evento de login para Administrador
const loginForm = document.getElementById('signinForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        const loginData = {
            email: email,
            password: password
        };

        fetch('https://localhost:7061/identity/v1/login-administrator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Falha no login');
                    });
                }
                return response.json();
            })
            .then(data => {
                const token = data.data?.accessToken;
                if (!token) {
                    throw new Error('Token não recebido');
                }

                localStorage.setItem('authToken', token);
                showNotification('Login realizado com sucesso!');

                // Redireciona após login bem-sucedido
                window.location.href = "../administrador/adm.html";
            })
            .catch(error => {
                console.error(error);
                showNotification(`Erro ao logar: ${error.message}`);
            });
    });
} else {
    console.error("Formulário de login não encontrado!");
}