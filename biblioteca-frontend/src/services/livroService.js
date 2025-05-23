const API_URL = 'http://localhost:8080/api/livros';

async function listarLivros() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao carregar livros');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function adicionarLivro(livro) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livro),
    });
    if (!response.ok) {
      const err = await response.json();
      return { sucesso: false, mensagem: err.message || 'Erro ao adicionar livro' };
    }
    return { sucesso: true, mensagem: 'Novo livro cadastrado com sucesso!' };
  } catch (error) {
    console.error(error);
    return { sucesso: false, mensagem: 'Erro ao adicionar livro' };
  }
}

async function excluirLivro(titulo) {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(titulo)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const err = await response.json();
      return { sucesso: false, mensagem: err.message || 'Erro ao excluir livro' };
    }
    return { sucesso: true, mensagem: 'Livro excluído com sucesso!' };
  } catch (error) {
    console.error(error);
    return { sucesso: false, mensagem: 'Erro ao excluir livro' };
  }
}

export default { listarLivros, adicionarLivro, excluirLivro };
