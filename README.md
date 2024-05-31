<div align="center">
  
 ## Robby - O Robô Coletor de Latas
  
</div>


## 📁 Utilização do projeto:

### 📥 Instalação de BackEnd
1. `cd backend`
2. `npm i`
4. Comando para inicialização:
```
npm run dev
```
<hr>

### 📥 Instalação de FrontEnd
1. `cd frontend`
2. `npm i`
3. Comando para incialização: 
```
npm run serve
```
4. Acessar:
```
http://localhost:8080/
```

## 📁 Informações do projeto:
- Robby é um robô que trabalha para limpar seu mundo através da coleta de latas de refrigerante vazias. O mundo de Robby é composto por 100 casas (locais) dispostas em uma grade de 10 × 10. Robby inicia na posição 0,0, e há um muro ao redor do limite de toda a grade. Várias latas de refrigerante são espalhadas neste mundo, e cada local pode conter apenas uma lata.

# Visão Geral do Mundo de Robby
- Dimensões: 10x10 casas.
- Posição Inicial: (0, 0).
- Muro: Ao redor do limite da grade.
- Objetivo: Coletar latas de refrigerante vazias espalhadas pelo mundo.
- Funcionamento de Robby
- Robby pode ver o conteúdo dos locais adjacentes (norte, sul, leste e oeste) de onde ele está atualmente. A visão de Robby é limitada e ele depende dessa percepção para tomar decisões.

# Comportamento de Robby
Para cada sessão de limpeza, Robby pode executar exatamente 200 passos, escolhendo entre as seguintes ações:

- Mover para o norte
- Mover para o sul
- Mover para o leste
- Mover para o oeste
- Mover aleatoriamente
- Ficar parado
- Curvar-se para pegar uma lata
- Cada ação pode gerar uma recompensa ou um castigo:

#  Sistema de pontos: 
- +10 pontos se Robby pegar uma lata.
- -1 ponto se ele tentar pegar uma lata onde não há nenhuma.
- -5 pontos se ele colidir com um muro.




