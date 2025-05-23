package com.biblioteca.gerenciadorlivros.service;

import com.biblioteca.gerenciadorlivros.model.Livro;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BibliotecaService {

    private final List<Livro> livros = new ArrayList<>();

    public String adicionarLivro(String titulo, String autor) {
        if (titulo == null || titulo.isBlank() || autor == null || autor.isBlank()) {
            return "Por favor, preencha todos os campos obrigatórios.";
        }

        Optional<Livro> existente = livros.stream()
                .filter(l -> l.getTitulo().equalsIgnoreCase(titulo))
                .findFirst();

        if (existente.isPresent()) {
            return "Livro já cadastrado.";
        }

        livros.add(new Livro(titulo, autor));
        return "Novo livro cadastrado com sucesso!";
    }

    public Livro pesquisarLivroPorTitulo(String titulo) {
        return livros.stream()
                .filter(l -> l.getTitulo().equalsIgnoreCase(titulo))
                .findFirst()
                .orElse(null);
    }

    public String excluirLivroPorTitulo(String titulo) {
        Optional<Livro> livroParaRemover = livros.stream()
                .filter(l -> l.getTitulo().equalsIgnoreCase(titulo))
                .findFirst();

        if (livroParaRemover.isPresent()) {
            livros.remove(livroParaRemover.get());
            return "Livro excluído com sucesso!";
        } else {
            return "Operação falhou: livro não encontrado.";
        }
    }

    public List<Livro> listarTodos() {
        return new ArrayList<>(livros);
    }

    public boolean estaVazio() {
        return livros.isEmpty();
    }
}
