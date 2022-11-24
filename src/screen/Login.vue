<template>
    <div id="screen_login">
        <img
            src="../assets/logo_jornal.png"
            alt="logo_jornal"
            :width="imgWidth" />
        <label>
            <span>Usuário:</span>
            <input
                :class="classCSSInput"
                placeholder="Digite o seu E-mail"
                v-model="email"
                @keyup.enter="login()" />
        </label>
        <div id="container_space_inputs_login" />
        <label>
            <span>Senha:</span>

            <input
                type="password"
                :class="classCSSInput"
                placeholder="Digite sua Senha"
                v-model="password"
                @keyup.enter="login()" />
            <a>Esqueceu sua Senha?</a>
        </label>
        <button id="login_btn" @click="login()">Confirmar</button>
        <a>Problemas no acesso?</a>
        <span>
            <vs-icon icon="polymer" color="#000000"></vs-icon>
        </span>
    </div>
</template>

<script>
export default {
    name: "ScreenLogin",
    data() {
        return {
            email: null,
            password: null,
            loginFalsoEmail: "rafael@rafael",
            loginFalsoPassword: "rafael123",
            classCSSInput: "input_login",
            imgWidth: (15 * window.screen.width) / 100,
        };
    },
    methods: {
        login() {
            if (
                this.email == this.loginFalsoEmail &&
                this.password == this.loginFalsoPassword
            ) {
                this.$router.push("/home");
            } else {
                this.classCSSInput = "input_login_error";
            }
        },
    },
};
</script>

<style>
#screen_login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: linear-gradient(#21af451f, #17993e44),
        url("../assets/background.jpg") no-repeat;
    background-position: 0% 73%;
    background-size: cover;
}
#screen_login img {
    margin-bottom: 5vh;
}
#screen_login label {
    display: flex;
    flex-direction: column;
}
#screen_login label span {
    margin: 0px 0px 10px 0px;
    font-size: 16pt;
}
#screen_login label a {
    align-self: flex-end;
    margin-top: 5px;
    font-size: 10pt;
}
#screen_login label a:hover {
    cursor: pointer;
}
.input_login {
    width: 20vw;
    height: 5vh;
    background: #c6f7d26c;
    border: 1px solid #a0a0a0;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12pt;
}

.input_login_error {
    width: 20vw;
    height: 5vh;
    background: #dfdfdf;
    border: 1px solid #ff0000;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12pt;
}

#container_space_inputs_login {
    height: 3vh;
}

#login_btn {
    margin-top: 5vh;
    margin-bottom: 5vh;

    width: calc(20vw + 30px);
    height: 5vh;
    color: #cecece;
    border: none;
    background: #212529;
    border-radius: 10px;
}

#login_btn:hover {
    width: calc(20vw + 30px);
    height: 5vh;
    color: #212529;
    border: 1px solid #21252998;
    background: #cecece;
    cursor: pointer;
    border-radius: 10px;
}
</style>
