var Bookshelf = require('bookshelf');

// configure database connection, returns an instantiated knex object
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'givingSF',
    charset  : 'utf8'
  }
});

// connect to our mysql database using Bookshelf ORM and knex, returns a new Bookshelf instance 
var db = Bookshelf(knex);

db.knex.schema.hasTable('orgs').then(function(exists) {
  if(!exists) {
    return knex.schema.createTable('orgs', function(org) {
      org.increments('id').primary();
      org.string('name', 50);
      org.string('city', 50);
      org.string('category', 50);
      org.string('mission', 50);
      org.integer('revenue', 10);
      org.integer('expenses', 10);
      //org.string('impact', 50).references('result').inTable('impacts');
      org.timestamps();
    }).then(function(table) {
      console.log('Created table!', table);
    });
  }
});

db.knex.schema.hasTable('impacts').then(function(exists) {
  if(!exists) {
    return knex.schema.createTable('impacts', function(impact) {
      impact.increments('id').primary();
      impact.integer('numerical result', 50);
      impact.string('text result', 50);
      impact.timestamps();
    }).then(function(table) {
      console.log('Created table!', table);
    });
  }
});

var Orgs = db.models.extend({



});


module.exports = {
  bookshelf: db,
  Orgs: Orgs
};