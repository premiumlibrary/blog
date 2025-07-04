import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBOkhbW5zTu6VL6hj0RzwOYPAxM3k0fn-Y",
    authDomain: "sorteios-ca47c.firebaseapp.com",
    databaseURL: "https://sorteios-ca47c-default-rtdb.firebaseio.com",
    projectId: "sorteios-ca47c",
    storageBucket: "sorteios-ca47c.appspot.com",
    messagingSenderId: "27028769702",
    appId: "1:27028769702:web:ba003062c1f78d74ba9d67",
    measurementId: "G-6HD9W1P062"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const lista = document.getElementById('lista-imagens');
  const pastaRef = ref(storage, 'plus'); // Pasta onde estão as imagens

  listAll(pastaRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        const li = document.createElement('li');
        li.className = "liimg";
        const img = document.createElement('img');
        img.className = "imgurl";
        img.src = url;

        // Quando clicar na imagem, ir para a página de detalhes
        img.addEventListener('click', () => {
          window.location.href = `../detalhes.html?img=${encodeURIComponent(url)}`;
        });

        li.appendChild(img);
        lista.appendChild(li);
      });
    });
  })
  .catch((error) => {
    console.error('Erro ao listar imagens:', error);
  });
