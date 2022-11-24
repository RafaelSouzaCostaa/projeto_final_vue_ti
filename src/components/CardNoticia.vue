<template>
    <div id="container_section_noticias">
        <div
            class="container_section_noticias_item"
            v-for="noticia in articles"
            :key="noticia">
            <span v-if="noticia.author != null">{{ noticia.author }}</span>
            <img
                :src="noticia.urlToImage"
                @click="$emit('imageFullScreen', noticia.urlToImage)" />
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
</template>

<script>
export default {
    props: {
        articles: [],
    },
    emits: ["imageFullScreen"],
};
</script>

<style>
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
    cursor: default;
}
</style>
