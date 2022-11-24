<template>
    <div id="screen_home" :style="'font-size: ' + fontSizeMenu + 'pt'">
        <div ref="container_menu_ref_vue" id="container_menu">
            <img src="../assets/logo_jornal_bbbbbb.png" alt="logo_jornal.png" />
            <div class="container_options_menu">
                📰<span @click="buscaNoticias()"> Noticias Variadas</span>
            </div>

            <div class="container_options_menu">
                😶‍🌫️<span> Fofocas de Hoje</span>
            </div>
        </div>
        <section>
            <div
                id="container_infos_fixed"
                v-if="Object.values(dolarReal).length != 0">
                <span>
                    <img src="../assets/icons/eye.svg" />
                    <p>1 {{ dolarReal.name }}</p>
                </span>
                <span>
                    <img src="../assets/icons/arrow-up-right.svg" />
                    <p>R$ {{ dolarReal.high }}</p>
                </span>
                <span>
                    <img src="../assets/icons/arrow-down-right.svg" />
                    <p>R$ {{ dolarReal.low }}</p>
                </span>
                <span>
                    <img src="../assets/icons/clock.svg" />
                    <p>
                        {{ dolarReal.create_date }}
                    </p>
                </span>
            </div>
            <div id="container_section_noticias">
                <div
                    class="container_section_noticias_item"
                    v-for="noticia in articles"
                    :key="noticia">
                    <span v-if="noticia.author != null">{{
                        noticia.author
                    }}</span>
                    <img
                        :src="noticia.urlToImage"
                        @click="setImageFullScreen(noticia.urlToImage)" />
                    <h2>
                        <a :href="noticia.url" target="_blank">
                            {{ noticia.title }}
                        </a>
                    </h2>
                    <p>
                        {{ noticia.description }}
                    </p>
                </div>
            </div>
        </section>
        <div id="backgroundImageFullScreen" v-if="imageFullScreen != ''">
            <div id="imageFullScreen" @click="setImageFullScreen()">
                <div>fechar X</div>
                <img :src="imageFullScreen" />
            </div>
        </div>
    </div>
</template>

/** APIs http://servicodados.ibge.gov.br/api/v3/noticias/ */

<script>
import axios from "axios";
export default {
    name: "ScreenHome",

    data() {
        return {
            dolarReal: {},
            estado: "goias",

            fontSizeMenu: (0.65 * window.screen.width) / 100,
            effectSection: "#ffffff", //"#009a4836",
            imageFullScreen: "",
        };
    },
    created() {
        //this.buscaDolar();
        //this.buscaNoticias();
        this.effectSection = "#009a4800";
    },

    methods: {
        async buscaNoticias() {
            axios({
                method: "get",
                url: "https://newsapi.org/v2/top-headlines?country=pt&apiKey=dbe67f6e7c304fdcbf1912fd04ed1923",
            })
                .then((result) => {
                    var aux = [];
                    result.data.articles.forEach((element) => {
                        aux.push(element);
                    });

                    this.articles = aux;
                    this.effectSection = "#bbbbbb";
                    this.buscaDolar();
                })
                .catch((err) => {
                    this.articles = err;
                });
        },
        buscaDolar() {
            axios({
                method: "get",
                url: "https://economia.awesomeapi.com.br/json/last/USD-BRL",
            })
                .then((result) => {
                    this.dolarReal = result.data.USDBRL;
                })
                .catch((err) => {
                    this.articles = err;
                });
        },
        setImageFullScreen(url) {
            if (this.imageFullScreen == "") {
                this.imageFullScreen = url;
            } else {
                this.imageFullScreen = "";
            }
        },
    },
    mounted() {
        window.addEventListener("resize", (event) => {
            this.fontSizeMenu = (0.65 * event.currentTarget.innerWidth) / 100;
        });
    },
};
</script>

<style scoped>
#screen_home {
    display: flex;
    overflow: hidden;
    width: 100vw;
    min-height: 100vh;
    background-image: url(../assets/background_home.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0% 35%;
    position: relative;
}

#backgroundImageFullScreen {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #dadadaa1;
}

#imageFullScreen {
    width: auto;
    height: auto;
    background-color: #000000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
#imageFullScreen img {
    width: auto;
    max-height: 85vh;
}
#imageFullScreen div {
    display: flex;
    justify-content: flex-end;
    background-color: #d6d6d685;
    padding: 5px;
    right: 0px;
    position: fixed;
    cursor: pointer;
}
#container_menu {
    background-color: #272626;
    width: 15vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 18px solid #009a47;
}
#container_menu img {
    width: 80%;
    margin-top: 20px;
    margin-bottom: 50px;
}
#screen_home section {
    background-color: v-bind(effectSection);
    width: 85vw;
    display: flex;
    flex-direction: column;
}

#container_infos_fixed {
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    background-color: #00000080;
    color: white;
    font-size: 16pt;
}
#container_infos_fixed span {
    display: flex;
}
#container_infos_fixed img {
    margin-right: 10px;
}
#container_section_noticias {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    width: 84vw;
    height: 95vh;
    overflow-y: auto;
    padding: 10px;
}
#container_section_noticias img {
    width: 100%;
    height: 30vh;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
}

.container_section_noticias_item {
    width: 100%;
    height: auto;
    background-color: #05300418;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    position: relative;
    border: 2px solid #27262660;
}

.container_section_noticias_item h2 {
    font-size: 1em;
    width: 90%;
    height: auto;
    text-align: justify;
    font-weight: 700;
    margin-bottom: 10px;
}

.container_section_noticias_item a {
    text-decoration: none;
    color: #000000;
}
.container_section_noticias_item a:hover {
    color: #009a47;
}
.container_section_noticias_item p {
    font-size: 1em;
    width: 90%;
    height: auto;
    text-align: justify;
    font-weight: 400;
}

.container_section_noticias_item span {
    position: absolute;
    width: auto;
    color: #ffffff;
    background-color: #272626c4;
    border-bottom: 2px solid #009a4886;
    border-right: 2px solid #009a4886;
    border-bottom-right-radius: 10px;
    padding: 4px 7px 4px 7px;
    left: 0px;
}

.container_options_menu {
    color: white;
    padding: 10px;
    width: 85%;
    height: auto;
    font-size: 1.4em;
}

.container_options_menu:hover {
    cursor: pointer;
    background-color: #4b4b4bb4;
}

/* sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */
</style>
