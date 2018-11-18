// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const gcs = require('@google-cloud/storage')();
const Readable = require('stream').Readable;
const uuid = require('uuidv4');

const path = require('path');

exports.generateNotification = functions.database.ref('/blogs/{pushId}')
  .onWrite((change, context) => {
    let val = change.after.val();
    let beforeVal = change.before.val();
    if (!val || val.accessibility !== '公開'
      /*|| (beforeVal && val.accessibility === beforeVal.accessibility))*/) {
      console.log('interrupt');
      return null;
    }
    let pushId = context.params.pushId;
    let bucketName = 'gamma-creators.appspot.com';
    let bucket = gcs.bucket(bucketName);
    let filePath = `blogs/${pushId}`;
    let uuidVal = uuid();

    let file = bucket.file(filePath);
    let uploadStream = file.createWriteStream({
      metadata: {
        contentType: 'text/html',
        /*metadata: {
          firebaseStorageDownloadTokens: uuidVal
        }*/
      },
    });

    let html =
      `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="GAMMA Blog">
    <meta property="og:title" content="${val.title} - GAMMA Blog">
    <meta property="og:description" content="${val.preview}">
  </head>
  <body>
    <script>
      window.onload = ()=>{
        window.location.href
          = 'https://gamma-creators.firebaseapp.com/blogs/show/${pushId}';
      };
    </script>
  </body>
</html>`;

    let readStream = new Readable();
    readStream.push(html);
    readStream.push(null);

    return new Promise((resolve, reject) => {
      readStream.on('error', reject).pipe(uploadStream)
        .on('error', reject).on('finish', resolve/*() => {
          let url =
            'https://firebasestorage.googleapis.com/v0/b/'
            + bucketName
            + '/o/'
            + encodeURIComponent(filePath)
            + '?alt=media&token='
            + uuidVal;
          admin.database().ref(`/notifications/blogs/${pushId}`)
            .set({ url: url, state: val.accessibility })
            .then(() => {
              admin.database().ref('update').set(true)
                .then(resolve).catch(reject);
            }).catch(reject);
        }*/);
    });
  });

exports.getNotifyLink = functions.storage.object().onMetadataUpdate(object => {

  let filePath = object.name;
  console.log(filePath);
  if (path.dirname(filePath) !== 'blogs') {
    return null;
  }

  let fileName = path.basename(filePath);
  let token = object.metadata.firebaseStorageDownloadTokens;
  console.log(token);
  let bucketName = 'gamma-creators.appspot.com';

  let url =
    'https://firebasestorage.googleapis.com/v0/b/'
    + bucketName
    + '/o/'
    + encodeURIComponent(filePath)
    + '?alt=media&token='
    + token;

  return new Promise((resolve, reject) => {
    admin.database().ref(`/notifications/blogs/${fileName}`)
      .set({ url: url })
      .then(() => {
        admin.database().ref('update').set(true)
          .then(resolve).catch(reject);
      }).catch(reject);
  });
});

exports.removeNotification = functions.database.ref('/update')
  .onUpdate((change, context) => {
    let val = change.after.val();
    if (val) {
      return null;
    }
    else {
      return new Promise((resolve, reject) => {
        admin.database().ref('/notifications').set(null)
          .then(resolve).catch(reject);
      });
    }
  });