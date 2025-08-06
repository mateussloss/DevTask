package com.devtask.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class EditTaskRequest {
    @NotBlank private String titulo;
    @NotBlank private String descricao;
    @NotBlank private String status;
    @NotBlank private String prioridade;
    private LocalDate dataVencimento;

    public String getTitulo()        { return titulo; }
    public String getDescricao()     { return descricao; }
    public String getStatus()        { return status; }
    public String getPrioridade()    { return prioridade; }
    public LocalDate getDataVencimento() { return dataVencimento; }
}
