import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Configuração do seu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD7gKNrLaahkuB3AIkNJqh6LxeNlyW061I",
    authDomain: "reau-1ebe3.firebaseapp.com",
    databaseURL: "https://reau-1ebe3-default-rtdb.firebaseio.com",
    projectId: "reau-1ebe3",
    storageBucket: "reau-1ebe3.appspot.com",
    messagingSenderId: "134853510226",
    appId: "1:134853510226:web:84ee2435ab22dc3f5b0b8b"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const dadosRef = ref(db, "dados_selecionados");
const lista = document.getElementById("lista-imagens");

onValue(dadosRef, (snapshot) => {
    lista.innerHTML = ""; // Limpa a lista antes de renderizar

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        const itemId = childSnapshot.key;

        // Inicializa os likes caso não existam
        const likes = item.likes || { cora: 0, baba: 0 };

        const li = document.createElement("li");
        li.className = "liimg";

        li.innerHTML = `
            <a href="${item.link}" target="_blank">
                <div class="fundoimg">
                    <div class="divp">
                        <p class="imgtxt">
                            feito por <span class="criador">${item.texto}</span> civit ai
                            <img class="imglink" src="../img/link_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="ir">
                        </p>
                    </div>
                    <img class="imgurl" src="${item.img}" alt="${item.texto}">
                    </a>

                     <div class="likes">
                <button class="btn-like" data-tipo="cora">❤️ <span class="count">${likes.cora}</span></button>
                <button class="btn-like" data-tipo="baba">😋 <span class="count">${likes.baba}</span></button>
            </div>
            
                </div>
           

        `;

        lista.appendChild(li);

        const botoesLike = li.querySelectorAll(".btn-like");

        botoesLike.forEach(botao => {
            botao.addEventListener("click", () => {
                const tipo = botao.dataset.tipo;
                const contador = botao.querySelector(".count");
                let valor = parseInt(contador.textContent);
                valor++;

                // Atualiza o contador visual
                contador.textContent = valor;

                // Atualiza no Firebase
                const atualizacao = {};
                atualizacao[`dados_selecionados/${itemId}/likes/${tipo}`] = valor;
                update(ref(db), atualizacao);
            });
        });
    });
});
