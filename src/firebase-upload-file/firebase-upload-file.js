(function() {
  'use strict';

  Polymer({

  is: 'firebase-upload-file',
    properties:{
      /**
      * Main message to show
      */
      title:{
        type: String,
        value: "Upload a file"
      },
      /**
      * File type to upload
      */
      fileType:{
        type: String
      },
      /**
      * Directory where file/image will be stored
      */
      directory:{
        type: String
      },
      /**
      * Name of firebase application
      */
      firebaseName:{
        type: String
      },
      /**
      * URL of file/image upload to firebase
      */
      downloadURL: {
        type: String,
        notify: true
      }
    },
    /**
    * Upload file/image to firebase storage:
    *
    * Selects the first element of event
    * Checks size of file or image (returns a error message if the file size is greater than limit size).
    * Creates route to upload file or image in firebase. In case of failure upload, returns error message.
    * Returns URL of file or image.
    */
    _uploadFile: function(ev){
      var file = ev.target.files[0];
      var routeName = this.directory + file.name;
      this.set("downloadURL","")
      if(file.size > '3000000000000720'){
        console.log("")
        this.fire("message", "Unsuccessful! It's too big");
      }
      else{
        var storageRef = firebase.app(this.firebaseName).storage().ref(routeName);
        //upload file
        var upload = storageRef.put(file);
        this.$.progress.hidden = false;
        this.$.imageContent.hidden = true;

        var self = this;
        upload.on('state_changed', function(snapshot){

        }, function(error) {
            // Handle unsuccessful uploads
            self.fire("message", "Upload unsuccessful");
        }, function() {
            self.set("downloadURL", upload.snapshot.downloadURL);
            self.fire("fileURL", self.downloadURL);
            self.fire("message", "Successful!");
            self.$.progress.hidden = true;
            self.$.imageContent.hidden = false;


        });
      }
    }
  });
}());
