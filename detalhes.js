 const params = new URLSearchParams(window.location.search);
    const imgUrl = params.get('img');

    if (imgUrl) {
      document.getElementById('imagem-detalhe').src = imgUrl;
    } else {
      document.getElementById('imagem-detalhe').alt = "Imagem não encontrada.";
    }

    const btnCompartilhar = document.getElementById('compartilhar');
    const mensagemCopiado = document.getElementById('mensagem-copiado');

    btnCompartilhar.addEventListener('click', () => {
      const linkParaCompartilhar = window.location.href;

      // Copiar o link para a área de transferência
      navigator.clipboard.writeText(linkParaCompartilhar).then(() => {
        mensagemCopiado.style.display = 'block';
        setTimeout(() => {
          mensagemCopiado.style.display = 'none';
        }, 3000);
      }).catch(() => {
        alert("Não foi possível copiar o link.");
      });
    });