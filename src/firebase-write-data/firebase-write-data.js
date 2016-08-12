(function() {
  'use strict';

  Polymer({

    is: 'firebase-write-data',
    properties: {
        /**
         *  data object
         */
        data: {
          type: Object,
          notify:true,
          observer:"_syncFirebase"
        },
        /*
        * Id of data 
        */
        uid: {
          type: Number,
          notify: true
        },
        path: {
          type: String,
          value:"/"
        },
        appName: {
          type: String,
          value:""
        },
        response:{
          type: Object,
          notify: true
        }
      },
     /*
     * Synchronize de local datas with remote firebase database
     */
      _syncFirebase: function(){
        if(this.data){
          console.log(this.data)
          this.$.document.path = this.path+this.uid
          this.$.document.data = this.data;
          this.$.document.save(this.path,this.uid);
        }
      },
      /*
      *Remove an data by uid 
      */
      remove: function(uid){
        this.$.document.path=this.path+uid;
        this.$.document.ref.remove();
      },
      update: function(uid, data){
        var path = this.$.document.path=this.path+uid;
        this.$.document.setStoredValue(path, this.data);
      }
  });
}());
