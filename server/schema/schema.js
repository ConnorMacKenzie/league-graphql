const graphql = require('graphql');

const Champion = require('../models/Champion');
const Game = require('../models/Game');
const Player = require('../models/Player');
const PlayerStats = require('../models/PlayerStats');
const Team = require('../models/Team');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const ChampionType = new GraphQLObjectType({
  name: 'Champion',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString}
  })
});

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: {type: GraphQLID},
    winner: {
      type: TeamType,
      resolve(parent, args){
        return Team.findById(parent.winner);
      }
    },
    loser: {
      type: TeamType,
      resolve(parent, args){
        return Team.findById(parent.loser);
      }
    }
  })
});

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: {type: GraphQLID},
    ign: {type: GraphQLString},
    position: {type: GraphQLString},
    team: {
      type: TeamType,
      resolve(parent, args){
        return Team.findById(parent.team);
      }
    }
  })
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString}
  })
});

const PlayerStatsType = new GraphQLObjectType({
  name: 'PlayerStats',
  fields: () => ({
    id: {type: GraphQLID},
    game: {
      type: GameType,
      resolve(parent, args){
        return Game.findById(parent.game);
      }
    },
    player: {
      type: PlayerType,
      resolve(parent, args){
        return Player.findById(parent.player);
      }
    },
    kills: {type: GraphQLInt},
    deaths: {type: GraphQLInt},
    assists: {type: GraphQLInt},
    cs: {type: GraphQLInt},
    champion: {
      type: ChampionType,
      resolve(parent, args){
        return Champion.findById(parent.champion);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //CHAMPION QUERIES
    championById: {
      type: ChampionType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Champion.findById(args.id);
      }
    },
    championByName: {
      type: ChampionType,
      args: {name: {type: GraphQLString}},
      resolve(parent, args){
        return Champion.find({name: args.name});
      }
    },
    champions: {
      type: new GraphQLList(ChampionType),
      resolve(parent, args){
        return Champion.find({});
      }
    },
    //GAME QUERIES
    gameById: {
      type: GameType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Game.findById(args.id);
      }
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args){
        return Game.find({});
      }
    },
    //PLAYER QUERIES
    playerById: {
      type: PlayerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Player.findById(args.id);
      }
    },
    playerByIgn: {
      type: PlayerType,
      args: {ign: {type: GraphQLString}},
      resolve(parent, args){
        return Player.find({ign: args.ign});
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args){
        return Player.find({});
      }
    },
    //PLAYER STATS QUERIES
    playerStatsById: {
      type: PlayerStatsType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return PlayerStats.findById(args.id);
      }
    },
    playerStats: {
      type: new GraphQLList(PlayerStatsType),
      resolve(parent, args){
        return PlayerStats.find({});
      }
    },
    //TEAM QUERIES
    teamById: {
      type: TeamType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Team.findById(args.id);
      }
    },
    teamByName: {
      type: TeamType,
      args: {name: {type: GraphQLString}},
      resolve(parent, args){
        return Team.find({name: args.name});
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args){
        return Team.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addChampion: {
      type: ChampionType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args){
        let champion = new Champion({
          name: args.name
        });
        return champion.save();
      }
    },
    addGame: {
      type: GameType,
      args: {
        winner: {type: new GraphQLNonNull(GraphQLID)},
        loser: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let game = new Game({
          winner: args.winner,
          loser: args.loser
        });
        return game.save();
      }
    },
    addPlayer: {
      type: PlayerType,
      args: {
        ign: {type: new GraphQLNonNull(GraphQLString)},
        position: {type: new GraphQLNonNull(GraphQLString)},
        team: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let player = new Player({
          ign: args.ign,
          position: args.position,
          team: args.team
        });
        return player.save();
      }
    },
    addTeam: {
      type: TeamType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args){
        let team = new Team({
          name: args.name
        });
        return team.save();
      }
    },
    addPlayerStats: {
      type: PlayerStatsType,
      args: {
        game: {type: new GraphQLNonNull(GraphQLID)},
        player: {type: new GraphQLNonNull(GraphQLID)},
        kills: {type: new GraphQLNonNull(GraphQLInt)},
        deaths: {type: new GraphQLNonNull(GraphQLInt)},
        assists: {type: new GraphQLNonNull(GraphQLInt)},
        cs: {type: new GraphQLNonNull(GraphQLInt)},
        champion: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args){
        let playerStats = new PlayerStats({
          game: args.game,
          player: args.player,
          kills: args.kills,
          deaths: args.deaths,
          assists: args.assists,
          cs: args.cs,
          champion: args.champion
        });
        return playerStats.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
