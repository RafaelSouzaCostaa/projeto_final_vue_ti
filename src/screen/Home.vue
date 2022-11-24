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
            <CardNoticia
                :articles="articles"
                @imageFullScreen="
                    (props) => {
                        setImageFullScreen(props);
                    }
                " />
        </section>
        <div id="backgroundImageFullScreen" v-if="imageFullScreen != ''">
            <div id="imageFullScreen" @click="setImageFullScreen()">
                <img :src="imageFullScreen" />
            </div>
        </div>
    </div>
</template>

/** APIs http://servicodados.ibge.gov.br/api/v3/noticias/ */

<script>
import CardNoticia from "../components/CardNoticia.vue";
import axios from "axios";
export default {
    components: { CardNoticia },
    name: "ScreenHome",

    data() {
        return {
            dolarReal: {},
            articles: [
                {
                    source: {
                        id: null,
                        name: "Www.rtp.pt",
                    },
                    author: "Rádio e Televisão de Portugal",
                    title: "Dois mísseis russos atingem território polaco e matam duas pessoas, dizem EUA - RTP",
                    description:
                        "Um membro dos serviços de inteligência norte-americanos avançou esta terça-feira que dois mísseis russos atravessaram a fronteira da Ucrânia com a Polónia, matando pelo menos duas pessoas nesse país, membro da NATO.",
                    url: "https://www.rtp.pt/noticias/mundo/dois-misseis-russos-atingem-territorio-polaco-e-matam-duas-pessoas-dizem-eua_n1447285",
                    urlToImage:
                        "https://cdn-images.rtp.pt/icm/noticias/images/6b/6b0b6d128612be76f601bd3dd87eedc0?w=860&q=90&rect=0,8,1500,822&auto=format",
                    publishedAt: "2022-11-15T20:23:12Z",
                    content:
                        'De acordo com a Força Aérea ucraniana, a Rússia disparou esta terça-feira sobre as infraestruturas de produção de energia elétrica de várias regiões ucranianas "cerca de" 100 mísseis, causando cortes… [+765 chars]',
                },
                {
                    source: {
                        id: null,
                        name: "Pcguia.pt",
                    },
                    author: null,
                    title: "A Philips tem um novo monitor UHD Mini-LED 4K de 27 polegadas para profissionais criativos, artistas - PCGuia",
                    description:
                        "A divisão de monitores da Philips, a MMD, tem um novo monitor profissional no seu portfólio, o 27B1U7903. Este modelos é UHD Mini-LED 4K, tem 27 polegadas (3840 x 2160) e entrada/saída Thunderbolt …",
                    url: "https://www.pcguia.pt/2022/11/a-philips-tem-um-novo-monitor-uhd-mini-led-4k-de-27-polegadas-para-profissionais-criativos-artistas/",
                    urlToImage:
                        "https://www.pcguia.pt/wp-content/uploads/2022/11/Philips-MMD.png",
                    publishedAt: "2022-11-21T14:33:17Z",
                    content:
                        "A divisão de monitores da Philips, a MMD, tem um novo monitor profissional no seu portfólio, o 27B1U7903. Este modelo é UHD Mini-LED 4K, tem 27 polegadas (3840 x 2160) e entrada/saída Thunderbolt 4.\r… [+887 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Www.rtp.pt",
                    },
                    author: "Rádio e Televisão de Portugal",
                    title: "Inglaterra - Irão, o Mundial 2022 em direto - RTP",
                    description:
                        "Inglaterra e Irão abrem a primeira jornada do grupo B do Mundial 2022. Ambas as equipas procuram os primeiros três pontos, no Khalifa International Stadium. A partida tem início às 13h00. Pode seguir todas as incidências do jogo no site da RTP dedicado ao Mun…",
                    url: "https://www.rtp.pt/noticias/desporto/inglaterra-irao-o-mundial-2022-em-direto_e1447752",
                    urlToImage:
                        "https://cdn-images.rtp.pt/icm/noticias/images/59/593f3ea048c94b7cd75f9dd2ed826589?w=860&q=90&rect=0,37,1503,824&auto=format",
                    publishedAt: "2022-11-21T14:02:25Z",
                    content:
                        "Inglaterra e Irão abrem a primeira jornada do grupo B do Mundial 2022. Ambas as equipas procuram os primeiros três pontos, no Khalifa International Stadium. A partida tem início às 13h00. Pode seguir… [+73 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "Casa dos Bits",
                    title: "Montra TeK: À “caça” de um novo smartphone? Aproveite estas propostas com descontos da Black Friday - SAPO Tek",
                    description:
                        'O SAPO TEK está a percorrer as lojas online em busca dos descontos e promoções mais apetecíveis da Black Friday e, a pensar em quem está à procura de um novo smartphone por um preço mais "em conta", trazemos-lhe seis propostas.',
                    url: "https://tek.sapo.pt/extras/montra/artigos/montra-tek-a-caca-de-um-novo-smartphone-aproveite-estas-propostas-com-descontos-da-black-friday",
                    urlToImage:
                        "https://thumbs.web.sapo.io/?W=1200&H=630&delay_optim=1&tv=1&crop=center&bottom_overlay=https%3A%2F%2Ftek.sapo.pt%2Fassets%2Fimg%2Ftek-sapo%2Ffacebook-overlay.png&epic=NjlibI4FBQNOiWZxBjNttub6xeeJwU0U8pyBJrTFeHyaOrfE50i1eC5LgxTT8Go/H+X4s8OujiXSZHo6lWAmCaUjar6nObdz7y9fxfRcmQL6tKc=",
                    publishedAt: "2022-11-21T13:41:00Z",
                    content:
                        "A Black Friday está mesmo à porta e, apesar das previsões de desaceleração do mercado de bens de consumo tecnológicos, espera-se que a época de maiores descontos e promoções continue a estimular as v… [+4456 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Tempo.pt",
                    },
                    author: "Amanda Souza",
                    title: "Fenda no campo magnético da Terra provoca auroras boreais rosadas! - Tempo.pt",
                    description:
                        "Verdadeiro espetáculo no céu aconteceu após fenda registada no campo magnético da Terra. O resultado disso foi a formação de de auroras cor de rosa.",
                    url: "https://www.tempo.pt/noticias/actualidade/fenda-no-campo-magnetico-da-terra-provoca-auroras-boreais-rosadas-noruega.html",
                    urlToImage:
                        "https://services.meteored.com/img/article/rachadura-no-campo-magnetico-da-terra-provoca-auroras-boreais-rosadas-1668019799905_1280.png",
                    publishedAt: "2022-11-21T12:41:38Z",
                    content:
                        "Amanda SouzaMeteored Brasil\r\nHá 1 hora atrás\r\n5 min\r\nRegisto de auroras boreais rosadas na Noruega. Imagem: Markus Varik/Greenlander\r\nAuroras boreais acontecem em diferentes regiões do nosso planeta … [+3695 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Cmjornal.pt",
                    },
                    author: "Lusa",
                    title: '"Estão lá e são explorados": Estado português acusado de ter trabalhadores no Qatar sem condições - Correio da Manhã',
                    description:
                        '"É inadmissível para um país como Portugal, membro da União Europeia", disse secretário-geral adjunto do Sindicato dos Trabalhadores Consulares.',
                    url: "https://www.cmjornal.pt/mundo/detalhe/estao-la-e-sao-explorados-estado-portugues-acusado-de-ter-trabalhadores-no-qatar-sem-condicoes",
                    urlToImage:
                        "https://cdn.cmjornal.pt/images/2022-11/img_1200x676$2022_11_11_01_04_56_1202729.jpg",
                    publishedAt: "2022-11-21T12:11:04Z",
                    content:
                        "O sindicato que representa os trabalhadores consulares no estrangeiro acusou hoje o Estado português de manter estes trabalhadores no Qatar nas mesmas condições que outros imigrantes, que tanta atenç… [+2710 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Noticiasaominuto.com",
                    },
                    author: "Notícias ao Minuto",
                    title: "Sudão enfrenta maior surto de dengue dos últimos dez anos - Notícias ao Minuto",
                    description:
                        "A doença é mortal e tem crescido no país, um dos mais pobres do mundo e com poucas condições para lidar com os casos mais graves.",
                    url: "https://www.noticiasaominuto.com/mundo/2117357/sudao-enfrenta-maior-surto-de-dengue-dos-ultimos-dez-anos",
                    urlToImage:
                        "https://media-manager.noticiasaominuto.com/1280/naom_60abdb47026bf.jpg",
                    publishedAt: "2022-11-21T11:58:00Z",
                    content:
                        "O Sudão, que enfrenta uma grave crise humanitária intensificada pelo aumento da inflação a nível global, está a lidar também com o pior surto de dengue em mais de uma década, com mais de 1.400 casos … [+2367 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Jornalmedico.pt",
                    },
                    author: "António Luz Pereira, Direção da APMGF",
                    title: "You've got mail! - quando um aumento da acessibilidade não significa melhoria da acessibilidade - Jornal Médico",
                    description:
                        "No ano de 2021, foram realizadas 36 milhões de consultas médicas nos cuidados de saúde primários, mais 10,7% do que em 2020 e mais 14,2% do que em 2019. Ou seja, aproximadamente, a cada segundo foi realizada uma consulta médica.",
                    url: "https://www.jornalmedico.pt/rss/42753-you-ve-got-mail-quando-um-aumento-da-acessibilidade-nao-significa-melhoria-da-acessibilidade.html",
                    urlToImage:
                        "https://www.jornalmedico.pt/media/k2/items/cache/43f6219d69ee59b07df3828d7de4ed62_L.webp",
                    publishedAt: "2022-11-21T10:39:15Z",
                    content:
                        "No ano de 2021, foram realizadas 36 milhões de consultas médicas nos cuidados de saúde primários, mais 10,7% do que em 2020 e mais 14,2% do que em 2019. Ou seja, aproximadamente, a cada segundo foi r… [+4598 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Famashow.pt",
                    },
                    author: "Dina Arsénio",
                    title: "Morreu o ator Jason David Frank, o 'Power Ranger' verde - Fama Show",
                    description: "Tinha 49 anos.",
                    url: "https://famashow.pt/famosos/morreu-o-ator-jason-david-frank-o-power-ranger-verde/",
                    urlToImage:
                        "https://famashow.pt/wp-content/uploads/2022/11/GettyImages-1202420763-scaled.jpg",
                    publishedAt: "2022-11-21T10:31:19Z",
                    content:
                        "Jason David Frank, mais conhecido por interpretar o Green Power Ranger Tommy Oliver na série infantil ‘Mighty Morphin Power Rangers’, dos anos 1990. O ator tinha 49 anos. \r\nA triste notícia foi confi… [+2045 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Publico.pt",
                    },
                    author: "Miguel Dantas",
                    title: "Mundial. Selecções recuam no uso de braçadeiras arco-íris no Qatar - Público",
                    description:
                        "No limite, jogadores arriscariam expulsão antes do início da partida. Inglaterra, País de Gales, Bélgica, Dinamarca, Alemanha, Países Baixos e Suíça assinam declaração conjunta.",
                    url: "https://www.publico.pt/2022/11/21/desporto/noticia/mundial-seleccoes-recuam-uso-bracadeiras-arcoiris-qatar-2028516",
                    urlToImage:
                        "https://imagens.publico.pt/imagens.aspx/1753272?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Publico.png",
                    publishedAt: "2022-11-21T10:31:18Z",
                    content:
                        "O uso da braçadeira com as cores do arco-íris no Qatar em apoio à comunidade LGBTQ+ parecia uma coisa certa para muitas selecções, mas a ameaça de admoestação automática para os capitães fez as equip… [+3006 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "MadreMedia, Gonçalo Lopes",
                    title: "Segurança Social foi alvo de um ciberataque - SAPO 24",
                    description:
                        "Polícia Judiciária já está a investigar este ciberataque. Ainda não há informações sobre se o mesmo permitiu acesso indevido a dados de cidadãos ou empresas.",
                    url: "https://24.sapo.pt/atualidade/artigos/seguranca-social-foi-alvo-de-um-ciberataque",
                    urlToImage:
                        "https://thumbs.web.sapo.io/?W=1200&H=630&delay_optim=1&tv=1&crop=center&bottom_overlay=https%3A%2F%2Fsapo24.web.sapo.io%2Fassets%2Fimg%2F24-sapo%2Ffacebook-overlay.png&epic=NGE105+koLBlfb9Fkh8F7GuZFj1rWiEOw41QHJ3m74hA7XXY1rud/IOt4LSDQXKyI/Ud+slVjErk854COHliHJfyh7WAqCSir1Go9X+hj93bmCU=",
                    publishedAt: "2022-11-21T10:22:00Z",
                    content:
                        "A Segurança Social foi alvo de um ciberataque nesta segunda-feira, confirmou o SAPO24 junto da entidade, isto depois da notícias ter sido avançada pela CNN Portugal.\r\nSegundo um comunicado a que o SA… [+820 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Noticiasaominuto.com",
                    },
                    author: "Notícias ao Minuto",
                    title: "Cancro da mama. Exercício físico atenua efeitos secundários do tratamento - Notícias ao Minuto",
                    description:
                        "No geral, a radioterapia é muito utilizada no tratamento desta doença, no entanto, tem efeitos secundários que afetam a qualidade de vida.",
                    url: "https://www.noticiasaominuto.com/lifestyle/2117273/cancro-da-mama-exercicio-fisico-atenua-efeitos-secundarios-do-tratamento",
                    urlToImage:
                        "https://media-manager.noticiasaominuto.com/1280/naom_637b48de39bcf.jpg",
                    publishedAt: "2022-11-21T10:10:00Z",
                    content:
                        "Cancro da mama é um dos mais comuns entre mulheres e causa muitas fatalidades. Nos últimos anos, os tratamentos contra esta doença incluem radioterapia, no entanto, tem muitos efeitos secundários neg… [+1799 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Flash.pt",
                    },
                    author: "Flash",
                    title: "Gala do 'Big Brother' para esquecer! Cristina Ferreira arrasada: \"Ressabiada, arrogante e hipócrita\" - Flash",
                    description:
                        "A apresentadora não terá sido empática com Mafalda Diamond e foi criticada, forçou um namoro dentro da casa da Malveira e foi criticada, deu uma 'lição de moral' e foi criticada e, por fim, admitiu que nem todos os concorrentes têm o mesmo contrato e foi cili…",
                    url: "https://www.flash.pt/celebridades/nacional/detalhe/gala-do-big-brother-para-esquecer-cristina-ferreira-arrasada-ressabiada-arrogante-e-hipocrita",
                    urlToImage:
                        "https://cdn.flash.pt/images/2022-11/img_1200x676$2022_11_21_08_41_01_321447_im_638046169392402569.png",
                    publishedAt: "2022-11-21T09:45:00Z",
                    content: null,
                },
                {
                    source: {
                        id: null,
                        name: "Www.jn.pt",
                    },
                    author: "Sara Oliveira",
                    title: "Velório do DJ Eddie Ferrer marcado para quarta-feira em Cascais - Jornal de Notícias",
                    description:
                        "Já há data para as cerimónias fúnebres do único filho de Zulmira Ferreira. O velório de Eduardo Daniel, o famoso DJ Eddie Ferrer, realizar-se-à na quarta-feira, a partir das 18 horas, no Crematório de Alcabideche, em Cascais, onde no dia seguinte decorrerá à …",
                    url: "https://www.jn.pt/pessoas/velorio-do-dj-eddie-ferrer-marcado-para-quarta-feira-em-cascais-15372013.html",
                    urlToImage:
                        "https://static.globalnoticias.pt/jn/image.jpg?brand=JN&type=generate&guid=9b6ac54e-98fe-4b7c-b979-ce4295887ed3&w=800&h=420&watermark=true&t=20221121094100",
                    publishedAt: "2022-11-21T09:41:00Z",
                    content:
                        "Hoje às 09:41\r\nJá há data para as cerimónias fúnebres do único filho de Zulmira Ferreira. O velório de Eduardo Daniel, o famoso DJ Eddie Ferrer, realizar-se-à na quarta-feira, a partir das 18 horas, … [+1748 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Noticiasaominuto.com",
                    },
                    author: "Notícias ao Minuto",
                    title: "Filho de Julio Iglesias apresenta namorada de forma insólita e é arrasado - Notícias ao Minuto",
                    description:
                        "Vivi Di Domenico, namorada de Julio Iglesias Jr., surgiu num evento tapada por um lençol.",
                    url: "https://www.noticiasaominuto.com/fama/2117245/filho-de-julio-iglesias-apresenta-namorada-de-forma-insolita-e-e-arrasado",
                    urlToImage:
                        "https://media-manager.noticiasaominuto.com/1280/naom_637b427b3ae95.jpg?crop_params=eyJwb3J0cmFpdCI6eyJjcm9wV2lkdGgiOjk0MywiY3JvcEhlaWdodCI6MTY3NiwiY3JvcFgiOjcwNywiY3JvcFkiOjI3fSwibGFuZHNjYXBlIjp7ImNyb3BXaWR0aCI6MTU3NSwiY3JvcEhlaWdodCI6ODg2LCJjcm9wWCI6NDUwLCJjcm9wWSI6MTA4fX0=",
                    publishedAt: "2022-11-21T09:40:00Z",
                    content:
                        "Julio Iglesias Jr. quis apresentar a nova namorada de forma diferente, mas o método escolhido está a gerar muitas críticas em todo o mundo.\r\nO filho de Julio Iglesias e Isabel Presyler levou consigo … [+928 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Cmjornal.pt",
                    },
                    author: "Manuel Bento",
                    title: "Comboio descarrilou na Linha do Douro após embater em pedras - Correio da Manhã",
                    description:
                        "Descarrilamento terá acontecido por volta das 07h30.",
                    url: "https://www.cmjornal.pt/cm-ao-minuto/detalhe/comboio-descarrilou-na-linha-do-douro-apos-embater-em-pedras",
                    urlToImage:
                        "https://cdn.cmjornal.pt/images/2022-11/img_1200x676$2022_11_21_09_40_32_1210753.jpg",
                    publishedAt: "2022-11-21T09:31:13Z",
                    content:
                        "Um comboio descarrilou, esta manhã, na Linha do Douro, em Barqueiros, Mesão Frio, no distrito de Vila Real. Não há feridos a registar. A circulação está interrompida. \r\nO comboio fazia a deslocação e… [+740 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "ECO",
                    title: "Portugal é terceiro país europeu onde comida sobe mais que a inflação - ECO",
                    description:
                        "Na comparação entre a inflação dos preços dos alimentos e a inflação geral, Portugal apenas fica atrás da Alemanha e da Suíça.",
                    url: "https://eco.sapo.pt/2022/11/21/portugal-e-terceiro-pais-europeu-onde-comida-sobe-mais-que-a-inflacao/",
                    urlToImage:
                        "https://eco.imgix.net/uploads/2022/06/cropped-supermercado02.jpg?mark64=aHR0cHM6Ly9lY28uaW1naXgubmV0L0VDT193YXRlcm1hcmsucG5nP2ZtPXBuZw%3D%3D&markscale=33&markalign=center,left&w=1200",
                    publishedAt: "2022-11-21T09:11:38Z",
                    content:
                        "Portugal é o terceiro país da União Europeia em que a inflação dos produtos alimentares está mais acima da taxa de inflação geral. Entre maio e agosto, esta diferença foi de 4,84 pontos percentuais, … [+2025 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Abola.pt",
                    },
                    author: "Redação",
                    title: "Antiga mulher de Casillas operada de urgência - A Bola",
                    description:
                        "A BOLA, toda a informação desportiva. Acompanhe todas as notícias do seu clube ou modalidade preferida, para onde quer que vá.",
                    url: "https://www.abola.pt/nnh/2022-11-23/espanha-antiga-mulher-de-casillas-operada-de-urgencia/965861",
                    urlToImage:
                        "https://www.abola.pt//img/fotos/ABOLA2015/ESTRANGEIROSASF/saracarbonero1.jpg",
                    publishedAt: "2022-11-23T18:38:27Z",
                    content:
                        "Sara Carbonero, antiga jornalista que se separou de Iker Casillas há pouco mais de um ano, foi submetida a operação cirúrgica de urgência na passada segunda-feira, na sequência de uma revisão ao tumo… [+603 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "Sportinforma",
                    title: "Polémica com braçadeiras '#OneLove': Dinamarca ameaça deixar a FIFA e desafia outras federações a fazer o m... - SAPO Desporto",
                    description:
                        "A posição da Dinamarca surge após a FIFA ameaçar com sanções desportivas as seleções que entrassem em campo com a braçadeira '#OneLove'.",
                    url: "https://desporto.sapo.pt/futebol/mundial/artigos/polemica-com-bracadeiras-onelove-dinamarca-ameaca-deixar-a-fifa-e-desafia-outras-federacao-a-fazer-o-mesmo",
                    urlToImage:
                        "https://thumbs.web.sapo.io/?W=1200&H=630&delay_optim=1&tv=1&crop=center&bottom_overlay=https%3A%2F%2Fdesporto.sapo.pt%2Fassets%2Fimg%2Fdesporto-sapo%2Ffacebook-overlay.png&epic=MmJllBQfYGEkOROKzgrj7QU09owdIlE76Gi7oiYE/SezIiLd43+meoFRq7aWU9r/V0OnivS4Wualvgw8l0vYBtwfc7zgeO/dcb0D7tsgCV6zwVk=",
                    publishedAt: "2022-11-23T17:50:00Z",
                    content:
                        "A Dinamarca está a pensar em abandonar a FIFA, na sequência da polémica sobre o uso de braçadeiras '#OneLove', de apoio aos direitos LGBTQ+, proibidas no Mundial do Qatar.\r\nJakub Jensen e Jesper Möll… [+2392 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Motosport.com.pt",
                    },
                    author: "Redação",
                    title: "YADEA Keeness VFD: Naked urbana elétrica | Motomais - Motomais",
                    description:
                        "Revelada no EICMA de Milão, a YADEA Keeness VFD é uma pequena naked urbana com um visual futurista que se apresenta como uma alternativa às motos térmicas de 125cc. A servi-la tem um motor elétrico de transmissão central que entrega até 13,6 cavalos de potênc…",
                    url: "https://motomais.motosport.com.pt/noticias/yadea-keeness-vfd-naked-urbana-eletrica/",
                    urlToImage:
                        "https://motomais.motosport.com.pt/wp-content/uploads/2022/11/moto-electrique-yadea-keeness-vfd-statique-hd.jpg",
                    publishedAt: "2022-11-23T17:38:36Z",
                    content:
                        "Revelada no EICMA de Milão, a YADEA Keeness VFD é uma pequena naked urbana com um visual futurista que se apresenta como uma alternativa às motos térmicas de 125cc.\r\nA servi-la tem um motor elétrico … [+1034 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Publico.pt",
                    },
                    author: "Luís Villalobos",
                    title: "TAP cancela 360 voos nos dias da greve dos tripulantes em Dezembro - Público",
                    description:
                        "Transportadora aérea diz que a medida “terá um grande custo” mas que só assim é possível “mitigar os inconvenientes causados aos clientes”.",
                    url: "https://www.publico.pt/2022/11/23/economia/noticia/tap-cancela-360-voos-dias-greve-tripulantes-dezembro-2028877",
                    urlToImage:
                        "https://imagens.publico.pt/imagens.aspx/1754091?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Publico.png",
                    publishedAt: "2022-11-23T17:33:15Z",
                    content:
                        "A greve dos tripulantes de cabina da TAP marcada para os dias 8 e 9 de Dezembro levou ao cancelamento por parte da empresa de 360 voos programados para esses dois dias, uma quinta-feira que coincide … [+3514 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "https://www.facebook.com/ppinto10",
                    title: "Última hora: Vodafone com problemas no serviço - Pplware",
                    description:
                        'A Vodafone está com problema no serviço. Nas redes sociais e também no site downdetector é possível ver uma enorme quantidade de "reports"',
                    url: "https://pplware.sapo.pt/internet/ultima-hora-vodafone-com-problemas-no-servico/",
                    urlToImage:
                        "https://pplware.sapo.pt/wp-content/uploads/2020/06/Vodafone-2.jpg",
                    publishedAt: "2022-11-23T15:57:32Z",
                    content:
                        'A Vodafone volta a estar com problema no serviço. Nas redes sociais e também no site downdetector é possível ver uma enorme quantidade de "reports" relativamente a avarias nos serviços da operadora.\r… [+737 chars]',
                },
                {
                    source: {
                        id: null,
                        name: "Abola.pt",
                    },
                    author: "Redação",
                    title: "Alexandropoulos de volta e Amorim observa mais ‘pérolas’ da formação - A Bola",
                    description:
                        "A BOLA, toda a informação desportiva. Acompanhe todas as notícias do seu clube ou modalidade preferida, para onde quer que vá.",
                    url: "https://www.abola.pt/nnh/2022-11-23/alexandropoulos-de-volta-e-amorim-observa-mais-perolas-da-formacao/965840",
                    urlToImage:
                        "https://www.abola.pt//img/fotos/ABOLA2015/SPORTING/2022-23/sotiris1.JPG",
                    publishedAt: "2022-11-23T15:54:22Z",
                    content:
                        "O regresso do médio internacional grego Sotiris Alexandropoulos ao grupo, após ter estado ao serviço da sua seleção, marcou esta quarta-feira a sessão de treino matinal do plantel do Sporting, minist… [+1020 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Www.jn.pt",
                    },
                    author: "Alfredo Teixeira",
                    title: "Vários túneis do Porto fecham para manutenção nos próximos dias - Jornal de Notícias",
                    description:
                        "Vários túneis da cidade do Porto vão fechar para receber manutenção técnica nos próximos dias. São eles os túneis das Goelas de Pau (Entre a Avenida Fernão de Magalhães e a Praça das Flores), de Faria Guimarães (na zona da Baixa) e das Antas (de ligação da Av…",
                    url: "https://www.jn.pt/local/noticias/porto/porto/varios-tuneis-da-cidade-do-porto-fecham-para-manutencao-nos-proximos-dias-15380314.html",
                    urlToImage:
                        "https://static.globalnoticias.pt/jn/image.jpg?brand=JN&type=generate&guid=da6aac31-3cd7-41d2-ac3a-920850a16bdf&w=800&h=420&watermark=true&t=20221123154600",
                    publishedAt: "2022-11-23T15:46:00Z",
                    content:
                        "Hoje às 15:46\r\nVários túneis da cidade do Porto vão fechar para receber manutenção técnica nos próximos dias. São eles os túneis das Goelas de Pau (Entre a Avenida Fernão de Magalhães e a Praça das F… [+885 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "MadreMedia / Lusa",
                    title: "Sindicato de professores convoca greve por tempo indeterminado a partir de 9 de dezembro - SAPO 24",
                    description:
                        "O Sindicato de Todos os Professores (STOP) convocou uma greve por tempo indeterminado, a partir de 09 de dezembro, em protesto contra as propostas de alteração aos concursos e para exigir respostas a problemas antigos, foi hoje anunciado.",
                    url: "https://24.sapo.pt/atualidade/artigos/sindicato-de-professores-convoca-greve-por-tempo-indeterminado-a-partir-de-9-de-dezembro",
                    urlToImage:
                        "https://thumbs.web.sapo.io/?W=1200&H=630&delay_optim=1&tv=1&crop=center&bottom_overlay=https%3A%2F%2Fsapo24.web.sapo.io%2Fassets%2Fimg%2F24-sapo%2Ffacebook-overlay.png&epic=MzY3Ut99ddRBFia5mSyU9tnn7rbZG5GgALNYtq+AmYU6qILb7XEppZzwub8xDmNY2A91S488yDXmCXCgT2AOjH7kMe+zM6o/Uzl79sOhnpoX1uQ=",
                    publishedAt: "2022-11-23T15:38:00Z",
                    content:
                        "Em comunicado, o sindicato, que representa cerca de 1.300 docentes, refere que a forma de luta inédita resulta de uma sondagem realizada no blog ArLindo, em que 1.720 pessoas apoiaram a realização de… [+2252 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Abola.pt",
                    },
                    author: "Redação",
                    title: "Kompany brinca sobre Ronaldo: «Precisamos de jogadores que possam correr» - A Bola",
                    description:
                        "A BOLA, toda a informação desportiva. Acompanhe todas as notícias do seu clube ou modalidade preferida, para onde quer que vá.",
                    url: "https://www.abola.pt/nnh/2022-11-23/kompany-brinca-sobre-ronaldo-precisamos-de-jogadores-que-possam-correr/965835",
                    urlToImage:
                        "https://www.abola.pt/img/fotos/abola2015/kompany.JPG",
                    publishedAt: "2022-11-23T15:33:45Z",
                    content:
                        "O treinador do Burnley, Vicent Kompany, foi questionado pela BBC sobre a saída de Cristiano Ronaldo, 37 anos, do Manchester United, e se o contrataria para a sua equipa, respondendo em tom de brincad… [+505 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "MadreMedia / Lusa",
                    title: "OE2023: Aprovada proposta de alteração do PS que permite nova atualização das pensões - SAPO 24",
                    description:
                        "Os deputados aprovaram hoje uma proposta de alteração ao Orçamento do Estado para 2023 (OE2023) do PS que permite nova atualização das pensões caso a inflação seja superior ao previsto.",
                    url: "https://24.sapo.pt/atualidade/artigos/oe2023-aprovada-proposta-de-alteracao-do-ps-que-permite-nova-atualizacao-das-pensoes",
                    urlToImage:
                        "https://thumbs.web.sapo.io/?W=1200&H=630&delay_optim=1&tv=1&crop=center&bottom_overlay=https%3A%2F%2Fsapo24.web.sapo.io%2Fassets%2Fimg%2F24-sapo%2Ffacebook-overlay.png&epic=ZDdme9YZQN6HF3ngPELR9M1UJ/w9nu4wc0ZbA5iOedZCdWU8RMshMn1Xh3BJsuzRCL/AQkn41169bQx4o1RgqraksIjjaNBXS2Xr/zyjh/I0Ea4=",
                    publishedAt: "2022-11-23T15:21:00Z",
                    content:
                        "A proposta foi aprovada apenas com os votos favoráveis do PS, o voto contra do Chega e a abstenção dos restantes partidos.\r\nO Governo procede através de portaria à atualização das pensões e demais pr… [+1717 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Briefing.pt",
                    },
                    author: "Catarina Farinha",
                    title: "A OIKOS e a VMLY&R ficam mais ligeiras - Briefing",
                    description:
                        'A OIKOS tem novos iogurtes ligeiros, com uma fórmula que promete "a mesma dose de sabor, baixa em gordura”. Para dar a conhecer a novidade, a marca lança uma campanha de apresentação, desenvolvida pela VMLY&R, onde desafia os portugueses a provar novamente aq…',
                    url: "https://briefing.pt/marketing/53729-a-oikos-e-a-vmly-r-ficam-mais-ligeiras.html",
                    urlToImage:
                        "https://briefing.pt/media/k2/items/cache/bc71780944da3ce0e1a4ddb9095c8fff_L.jpg",
                    publishedAt: "2022-11-23T15:01:00Z",
                    content:
                        'A OIKOS tem novos iogurtes ligeiros, com uma fórmula que promete "a mesma dose de sabor, baixa em gordura. Para dar a conhecer a novidade, a marca lança uma campanha de apresentação, desenvolvida pel… [+1187 chars]',
                },
                {
                    source: {
                        id: null,
                        name: "Www.rtp.pt",
                    },
                    author: "Rádio e Televisão de Portugal",
                    title: "Escravatura laboral. Detidos 35 suspeitos em operação da PJ no Alentejo - RTP",
                    description:
                        "As autoridades detiveram esta quarta-feira 35 suspeitos de envolvimento numa rede de escravatura laboral no Alentejo, no âmbito de uma investigação e 65 buscas.",
                    url: "https://www.rtp.pt/noticias/pais/escravatura-laboral-detidos-35-suspeitos-em-operacao-da-pj-no-alentejo_n1448965",
                    urlToImage:
                        "https://cdn-images.rtp.pt/icm/noticias/images/db/dba467106aecf8559133d1499005ac43?w=860&q=90&rect=0,0,1280,702&auto=format",
                    publishedAt: "2022-11-23T14:53:14Z",
                    content:
                        "Rui Cardoso - RTP\r\nAs autoridades detiveram esta quarta-feira 35 suspeitos de envolvimento numa rede de escravatura laboral no Alentejo, no âmbito de uma investigação e 65 buscas.\r\nCerca de 65 buscas… [+2819 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "Sandra M. Pinto",
                    title: "Última hora: Aprovado aumento de 104 euros em 2023 - SAPO",
                    description: "saiba mais.",
                    url: "https://foreveryoung.sapo.pt/ultima-hora-aprovado-aumento-de-104-euros-em-2023/",
                    urlToImage:
                        "https://foreveryoung.sapo.pt/wp-content/uploads/2021/01/dinheiro-1024x682.jpg",
                    publishedAt: "2022-11-23T14:10:20Z",
                    content:
                        "O aumento de 104 euros em 2023 vai abranger mais 4.500 funcionários públicos, designadamente coordenadores técnicos e assistentes técnicos das posições remuneratórias complementares, disse o secretár… [+1036 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Www.rtp.pt",
                    },
                    author: "Rádio e Televisão de Portugal",
                    title: "Esposende. Dois mortos em deslizamento em Palmeira de Faro - RTP",
                    description:
                        "Duas pessoas morreram na madrugada desta quarta-feira em Palmeira de Faro, Esposende, vítimas de um deslizamento de terra e pedras que se abateram sobre uma habitação. Outras quatro pessoas saíram ilesas.",
                    url: "https://www.rtp.pt/noticias/pais/esposende-dois-mortos-em-deslizamento-em-palmeira-de-faro_n1448932",
                    urlToImage:
                        "https://cdn-images.rtp.pt/icm/noticias/images/28/2866bcfc0d7967ee5a6365cdcf041c78?w=860&q=90&rect=0,0,1499,822&auto=format",
                    publishedAt: "2022-11-23T12:44:41Z",
                    content:
                        '"O acidente ocorreu em Esposende, na freguesia de Palmeira de Faro. Confirma-se um deslizamento de vertente com duas vítimas mortais a lamentar", afirmou o vereador da Proteção Civil da Câmara Munici… [+1896 chars]',
                },
                {
                    source: {
                        id: null,
                        name: "Cmjornal.pt",
                    },
                    author: "Rafael Domingues",
                    title: "Homem morre em acidente de trator em Albufeira - Correio da Manhã",
                    description:
                        "Meios de socorro enviados para o local já não conseguiram fazer nada para salvar a vítima.",
                    url: "https://www.cmjornal.pt/portugal/detalhe/homem-morre-em-acidente-de-trator-em-albufeira",
                    urlToImage:
                        "https://cdn.cmjornal.pt/images/2022-11/img_1200x676$2022_11_23_12_59_47_1212765.jpg",
                    publishedAt: "2022-11-23T12:29:17Z",
                    content:
                        "Um homem com cerca de 70 anos morreu na sequência do capotamento de um trator agrícola numa estrada secundária na zona de Vale da Ursa, na freguesia da Guia, em Albufeira. Segundo o CM apurou, o aler… [+292 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Observador.pt",
                    },
                    author: "Rui Pedro Antunes",
                    title: 'Quatro eurodeputadas do PS abstiveram-se na resolução do Parlamento Europeu que declarou Rússia Estado "patrocinador do terrorismo" - Observador',
                    description: "",
                    url: "https://observador.pt/2022/11/23/quatro-eurodeputadas-do-ps-abstiveram-se-na-resolucao-do-parlamento-que-declarou-russia-estado-patrocinador-do-terrorismo-pcp-vota-contra/",
                    urlToImage:
                        "https://wm.observador.pt/wm/obs/l/https%3A%2F%2Fbordalo.observador.pt%2Fv2%2Frs%3Afill%3A770%3A403%2Fc%3A3000%3A1689%3Anowe%3A0%3A311%2Fq%3A85%2Fplain%2Fhttps%3A%2F%2Fs3.observador.pt%2Fwp-content%2Fuploads%2F2022%2F09%2F13131028%2F7o0b4470.jpeg",
                    publishedAt: "2022-11-23T12:15:00Z",
                    content:
                        "Houve divisão na bancada do PS na hora de declarar a Rússia como Estado patrocinador do terrorismo. Quatro eurodeputadas socialistas Margarida Marques, Maria Manuel Leitão Marques, Isabel Carvalhais … [+2615 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Publico.pt",
                    },
                    author: "Natália Faria",
                    title: "Censos: 20% dos portugueses concentram-se em apenas 1,1% do território - Público",
                    description:
                        "Litoralização agravou-se e Portugal iniciou rota do decréscimo populacional. Os estrangeiros aumentaram 37%. Casamentos recuaram, mas uniões de facto cresceram 38,2% na última década.",
                    url: "https://www.publico.pt/2022/11/23/sociedade/noticia/censos-20-portugueses-concentramse-apenas-11-territorio-2028835",
                    urlToImage:
                        "https://imagens.publico.pt/imagens.aspx/1754009?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Publico.png",
                    publishedAt: "2022-11-23T12:11:27Z",
                    content:
                        "Somos menos, mais envelhecidos e estamos concentrados no litoral. O retrato de Portugal que se extrai dos Censos 2021, cujos resultados definitivos foram apresentados nesta quarta-feira, confirmam qu… [+398 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Sapo.pt",
                    },
                    author: "Alberto Teixeira",
                    title: "Prestação da casa vai subir mais de 90 euros até final de 2023 - ECO",
                    description:
                        "Banco de Portugal estima subida das Euribor até 3% no final do próximo ano. Isto vai representar um aumento de mais de 90 euros da prestação da casa para 1,4 milhões de famílias.",
                    url: "https://eco.sapo.pt/2022/11/23/prestacao-da-casa-vai-subir-mais-de-90-euros-ate-final-de-2023/",
                    urlToImage:
                        "https://eco.imgix.net/uploads/2020/07/cropped-pndr5566-1.jpg?mark64=aHR0cHM6Ly9lY28uaW1naXgubmV0L0VDT193YXRlcm1hcmsucG5nP2ZtPXBuZw%3D%3D&markscale=33&markalign=center,left&w=1200",
                    publishedAt: "2022-11-23T12:04:33Z",
                    content:
                        "Quem está a pagar o crédito da casa ao banco não tem recebido boas notícias nos últimos meses. As Euribor estão a subir em flecha e isso tem representado um aumento significativo da prestação da habi… [+3540 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Jornaldenegocios.pt",
                    },
                    author: "Leonor Mateus Ferreira",
                    title: "Banco de Portugal antecipa recuo na procura por casas. Mas não vê excesso de oferta - Jornal de Negócios",
                    description:
                        "O supervisor assinala que a percentagem de transações financiadas com crédito bancário doméstico - cerca de 50% em 2022 - é 'bastante inferior' à registada durante a anterior crise da dívida soberana: cerca de 75% em 2010.",
                    url: "https://www.jornaldenegocios.pt/mercados/taxas-de-juro/detalhe/banco-de-portugal-antecipa-recuo-na-procura-por-casas-mas-nao-ve-excesso-de-oferta",
                    urlToImage:
                        "https://cdn.jornaldenegocios.pt/images/2022-11/img_1200x676$2022_11_10_19_29_54_440235.jpg",
                    publishedAt: "2022-11-23T12:01:30Z",
                    content:
                        "A procura por casas para comprar deverá ser penalizada pelo impacto da inflação nos rendimentos das famílias, bem como pela subida das taxas de juro sobre os empréstimos bancários, segundo antecipa o… [+1594 chars]",
                },
                {
                    source: {
                        id: null,
                        name: "Www.jn.pt",
                    },
                    author: "JN/Agências",
                    title: "Confrontos violentos em fábrica de iPhones na China - Jornal de Notícias",
                    description:
                        "Protestos violentos irromperam, esta quarta-feira, na maior fábrica de iPhones do mundo, situada no centro da China, numa altura em que as autoridades tentam conter um surto de covid-19 e manter a produção, antes do período natalício.",
                    url: "https://www.jn.pt/mundo/confrontos-violentos-em-fabrica-de-iphones-na-china-15379295.html",
                    urlToImage:
                        "https://static.globalnoticias.pt/jn/image.jpg?brand=JN&type=generate&guid=fc309d3a-3ac3-4b7a-a8a0-4ba2076b2408&w=800&h=420&watermark=true&t=20221123115000",
                    publishedAt: "2022-11-23T11:50:00Z",
                    content:
                        "Protestos violentos irromperam, esta quarta-feira, na maior fábrica de iPhones do mundo, situada no centro da China, numa altura em que as autoridades tentam conter um surto de covid-19 e manter a pr… [+2545 chars]",
                },
            ],
            fontSizeMenu: (0.65 * window.screen.width) / 100,
            effectSection: null,
            imageFullScreen: "",
        };
    },
    created() {
        //this.buscaDolar();
        //this.buscaNoticias();
        //this.effectSection = "#009a4836";
        this.effectSection = "#ffffff"; //RAFAEL apagar para produção
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
                    this.effectSection = "#ffffff";
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
    background-color: #25582ba1;
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
</style>
