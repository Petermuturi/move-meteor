Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
  Template.body.helpers({
     tasks: function(){
      if(Session.get('finished')){
        return Tasks.find({checked: {$ne: true}});  
      } else{
      return Tasks.find();
    }
     },
     finished: function(){
      return Session.get('finished');
     }
  });
// handle events on add button
  Template.body.events({
    'submit .routine': function(event){
      var title = event.target.title.value;

   Meteor.call("addTasks", title);

      event.target.title.value = "";
      return false;
    },
     'change .hide':function(event){
         Session.set('finished', event.target.checked);
     }
     
  });

  Template.main.events({
   'click .check':function(){
   Meteor.call("updateTasks", this._id, !this.checked);
   },
    'click .delete': function(){
      Meteor.call("deleteTasks", this._id);
    }
   
  });
    Accounts.ui.config({
     passwordSignupFields: "USERNAME_ONLY"
   });
   
}
   
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addTasks: function(title){
          Tasks.insert({
         title: title,
         createdAt: new Date()
      });
  },
     deleteTasks: function(id){
       Tasks.remove(id);
   },
   updateTasks: function(id){
      Tasks.update(id, {$set: {checked : checked}});
   }
});