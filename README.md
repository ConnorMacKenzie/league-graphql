# league-graphql

An express GraphQL app to query League of Legends stats from a MongoDB database hosted on mLab.

### To Run

* Install dependencies
```shell
npm install
```

* Start server
```shell
cd server
node app.js
```

* Go to <http://localhost:4000/graphql> to query

### Types
```
Champion{
  id: ID
  name: String
  playedInGames: [PlayerStats]
}

Game{
  id: ID
  winner: Team
  loser: Team
  playerStats: [PlayerStats]
}

Player{
  id: ID
  ign: String
  position: String
  team: Team
  playedInGames: [PlayerStats]
}

Team{
  id: ID
  name: String
  gamesWon: [Game]
  gamesLost: [Game]
}

PlayerStats{
  id: ID
  game: Game
  player: Player
  kills: Int
  deaths: Int
  assists: Int
  cs: Int
  champion: Champion
}
```

### Queries
```
championById(id: ID): Champion

championByName(name: String): Champion

champions: [Champion]

gameById(id: ID): Game

games: [Game]

playerById(id: ID): Player

playerByIgn(ign: String): Player

players: [Player]

playerStatsById(id: ID): PlayerStats

playerStats: [PlayerStats]

teamById(id: ID): Team

teamByName(name: String): Team

teams: [Team]
```

### Mutations
```
addChampion(name: String!): Champion

addGame(winner: ID!loser: ID!): Game

addPlayer(
ign: String!
position: String!
team: ID!): Player

addTeam(name: String!): Team

addPlayerStats(
game: ID!
player: ID!
kills: Int!
deaths: Int!
assists: Int!
cs: Int!
champion: ID!): PlayerStats
```
