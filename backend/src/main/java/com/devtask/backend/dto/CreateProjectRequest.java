package com.devtask.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateProjectRequest {

    @NotBlank(message = "O nome do projeto é obrigatório")
    private String nome;

    @NotBlank(message = "A descrição do projeto é obrigatória")
    private String descricao;

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }
}
