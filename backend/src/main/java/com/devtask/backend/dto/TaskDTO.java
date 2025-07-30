package com.devtask.backend.dto;

import java.time.LocalDate;

public class TaskDTO {
    public Long id;
    public String titulo;
    public String descricao;
    public String status;
    public String prioridade;
    public LocalDate dataCriacao;
    public LocalDate dataVencimento;

    public Long projetoId;
    public String projetoNome;
}
