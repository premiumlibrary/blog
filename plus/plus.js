import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

  const firebaseConfig = {
  apiKey: "AIzaSyD7gKNrLaahkuB3AIkNJqh6LxeNlyW061I",
  authDomain: "reau-1ebe3.firebaseapp.com",
  databaseURL: "https://reau-1ebe3-default-rtdb.firebaseio.com",
  projectId: "reau-1ebe3",
  storageBucket: "reau-1ebe3.appspot.com",
  messagingSenderId: "134853510226",
  appId: "1:134853510226:web:84ee2435ab22dc3f5b0b8b"
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
