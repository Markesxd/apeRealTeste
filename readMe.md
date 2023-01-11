# Teste Apê Real

## Base de dados
A base de dados escolhida foi "Observatório da Criança e do Adolescente" que possui uma tabela com as seguintes colunas:  
- ano
- id_municipio
- taxa_bruta_matricula_pre_escola
- numero_absoluto_bruto_matricula_pre_escola
- taxa_liquida_matricula_pre_escola
- numero_absoluto_liquido_matricula_pre_escola

Para manipular os dados desta base fiz o download da mesma no formato csv e populei um banco MySql. Logo, para o funcionamento da aplicação é necessário que MySql esteja instalado na máquina. Também é necessário que exista uma base de dados com o nome "apeReal" e que o usuário e a senha do banco sejam colocados no arquivo application.properties (src/main/resources/application.properties).  
Para popular a base de dados basta rodar a aplicação e fazer uma requisição do tipo POST para localhost:8080/seeder. o arquivo csv está na pasta src/main/resources/db/municipio_primeira_infancia.csv

## Backend

O backend da aplicação foi feito com spring-boot utilizando maven e java 17. Para rodá-lo basta utilizar o comando:
```
mvn spring-boot:run 
```
A aplicação vai rodar na porta 8080 com as seguintes rotas disponíveis:
```
POST /seeder
```
Rota para população do banco de dados
```
GET /dados
```
Rota para recuperar todos os dados paginados
```
GET /dados/ano/{ano}
```
Rota para recuperar os dados de um determinado ano paginados
```
GET /dados/municipio/{ids_municipios}
```
Rota para recuperar os dados de um ou mais municípios  
As rotas paginadas podem receber os seguintes parâmetros de query:
- size: Número de entidades retornadas.
- sort: Ordenação dos dados.
- page: O número da página começando no 0. 
## Frontend

O frontend foi feito com angular para instalar as dependências utilize o comando 
```
npm install
```
Para rodar com o cli do angular use o comando:
```
ng serve
```
A aplicação vai rodar na porta 4200  
Para fazer a build use o comando
```
ng build
``` 
