package com.devtask.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class UpdateTaskRequest {
    @NotBlank
    private String titulo;
    @NotBlank
    private String descricao;
    @NotBlank
    private String status;
    @NotBlank
    private String prioridade;
    private LocalDate dataVencimento;

    // ======== getters ========
    public String getTitulo() {
        return titulo;
    }
    public String getDescricao() {
        return descricao;
    }
    public String getStatus() {
        return status;
    }
    public String getPrioridade() {
        return prioridade;
    }
    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    // ======== setters ========
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }
    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }
}
