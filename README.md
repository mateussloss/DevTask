
# 📘 DevTask – Sistema de Gerenciamento de Tarefas

## 📌 Descrição
**DevTask** é uma aplicação web e mobile para gerenciamento de tarefas em projetos pequenos e acadêmicos. Inspirado em ferramentas como Jira e Trello, mas com foco na simplicidade e produtividade.

---

## 📚 Diagrama de Classes (Domínio do Problema)

![Diagrama de Classes](diagrama-classes.png)

---

## 🛠️ Ferramentas escolhidas

| Categoria              | Ferramenta            | Uso                                                             |
|------------------------|------------------------|------------------------------------------------------------------|
| Versionamento          | Git + GitHub           | Controle de versão e colaboração                                |
| Build                  | Maven                  | Compilação, dependências e ciclo de build Java                  |
| Testes                 | JUnit                  | Testes automatizados no backend                                 |
| Issue Tracking         | GitHub Issues          | Gerenciamento de tarefas e bugs                                 |
| CI/CD                  | GitHub Actions         | Pipeline automatizado para build, testes e deploy               |
| Containerização        | Docker + Docker Compose| Empacotamento e orquestração do sistema                         |

---

## 📦 Frameworks reutilizados

- **Spring Boot** – Backend em Java, criação de APIs RESTful  
- **React.js** – Frontend web responsivo  
- **React Native** – Interface mobile (ou design responsivo adaptado)  
- **Axios** – Consumo de APIs REST  
- **PostgreSQL** – Banco de dados relacional  
- **Docker** – Empacotamento e execução de ambientes padronizados  

---

## 📖 Geração da documentação do código (JavaDoc)

Para gerar a documentação JavaDoc:

```bash
mvn javadoc:javadoc
```

A documentação será gerada em:
```
target/site/apidocs/index.html
```

---

## 🚀 Como executar o sistema

### 1. Clonar o repositório:
```bash
git clone https://github.com/seu-usuario/devtask.git
cd devtask
```

### 2. Iniciar com Docker
```bash
docker-compose up --build
```

### 3. Rodar sem Docker

#### Backend (Java + Maven)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

### ✅ Observações

- A aplicação usa `.env` para configurar variáveis como `DB_URL`, `PORT`, etc.
- Endpoints principais estão documentados via Swagger (opcional).
- Testes automatizados podem ser executados com:
```bash
mvn test
```
