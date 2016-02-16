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

      Tasks.insert({
         title: title,
         createdAt: new Date()
      });
      event.target.title.value = "";
      return false;
    },
     'change .hide':function(event){
         Session.set('finished', event.target.checked);
     }
     
  });

  Template.main.events({
   'click .check':function(){
    Tasks.update(this._id,{$set: {checked: !this.checked}});
   },
    'click .delete': function(){
      Tasks.remove(this._id);
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
