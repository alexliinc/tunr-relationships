import { db } from '../models';
var Manager = db.models.Manager;

//ADDED
var Artist = db.models.Artist;

//ADDED
var Ad = db.models.Ad;

function index(req, res) {
	Manager.findAll({
    //ADDED Return all songs that have a matching artistId
    include: Ad
  }).then(function(managers) {
		res.json(managers);
	});
}

function show(req, res) {
  Manager.findById(req.params.id, {
    //ADDED Return all songs that have a matching artistId
    include: Artist
  })
  .then(function(manager){
    if(!manager) res.send(res, "not found");
    else res.json(manager);
  });	
}

function create(req, res) {
	Manager.create(req.body).then(function(manager){
    if(!manager) res.send(res, "not saved");
    else res.json(manager);
  });
}

function update(req, res) {
  Manager.findById(req.params.id)
  .then(function(manager){
    if(!manager) res.send(res, "not found");
    else return manager.updateAttributes(req.body);
  })
  .then(function(manager){
    res.json(manager);
  });
}

function destroy(req, res) {
  Manager.findById(req.params.id)
  .then(function(manager){
    if(!manager) res.send(res, "not found");
    else return manager.destroy();
  })
  .then(function(){
    res.redirect(303, "/managers");
  });  
}

const managersController = <any>{};
managersController.index = index;
managersController.show = show;
managersController.create = create;
managersController.update = update;
managersController.destroy = destroy;

export {managersController};