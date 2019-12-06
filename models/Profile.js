const Profile = {};
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var cloudinary = require("cloudinary").v2;

const url =
  "mongodb+srv://ganesh:prasoon@cluster0-ecdyd.mongodb.net/aloha?retryWrites=true&w=majority";

var uploadedImg;

cloudinary.config({
  cloud_name: "dvxycvduu",
  api_key: "581873119937131",
  api_secret: "ipsgixKeWRTBK_ZPKhwKmyi6H6s"
});

Profile.upload = function(id, image, callback) {
  cloudinary.uploader.upload(image, function(error, response) {
    if (error) {
      throw error;
    } else {
      console.log(response);
      uploadedImg = response.secure_url;
    }
  });

  MongoClient.connect(url, { useUnifiedTopology: true }, function(
    error,
    client
  ) {
    if (error) {
      throw error;
    }
    var database = client.db("aloha");

    var identifier = {
      _id: id
    };

    var query = {
      image: uploadedImg
    };

    console.log("hello>>>>", query.image);
    var collection = database.collection("accounts");
    collection.updateOne(identifier, { $set: query }, function(error, success) {
      if (error) {
        return callback({ status: false, message: "Failed to upload!!!" });
      } else {
        return callback(null, {
          status: true,
          message: "uploaded successfully!!!"
        });
      }
    });
  });
};

module.exports = Profile;
