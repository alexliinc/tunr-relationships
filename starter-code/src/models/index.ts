//Connect
import * as Sequelize from 'sequelize';

var sequelize = new Sequelize('postgres://alexli@localhost:5432/tunr_relationships');

var Artist = sequelize.import("./artist");
var Manager = sequelize.import("./manager");
var Song = sequelize.import("./song")

//ADDED
Song.belongsTo(Artist);
Artist.hasMany(Song);

//ADDED
Artist.belongsTo(Manager);
Manager.hasMany(Artist);

const db = <any>{};
db.models = {
	Artist,
	Manager,
	Song
};

//Export models and Sequelize for seed and dbSetup
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export {db};