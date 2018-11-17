// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const gcs = require('@google-cloud/storage')();
const Readable = require('stream').Readable;

exports.addMessage = functions.https.onRequest((req, res) => {
  const original = req.query.text;
  return admin.database().ref('/update').push({ original: original }).then(snapshot => {
    return res.redirect(303, snapshot.ref.toString());
  })
})

exports.generateNotification = functions.database.ref('/blogs/{pushId}')
  .onUpdate((change, context) => {
    let val = change.after.val();
    let pushId = context.params.pushId;
    let bucket = gcs.bucket('gamma-creators.appspot.com');
    let filePath = `blogs/notify/${pushId}`;

    let file = bucket.file(filePath);
    let uploadStream = file.createWriteStream({
      metadata: { contentType: 'text/html' }
    });

    let html =
      `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta property="og:type" content="https://gamma-creators.firebaseapp.com">
    <meta property="og:site_name" content="GAMMA Blog">
    <meta property="og:title" content="${val.title}">
    <meta property="og:description" content="${val.preview}">
  </head>
  <body>
    <script>
      window.onload = ()=>{
        window.location.href
          = 'https://gamma-creators.firebaseapp.com/blogs/show/${change.after.key}';
      };
    </script>
  </body>
</html>`;

    let readStream = new Readable();
    readStream.push(html);
    readStream.push(null);

    return new Promise((resolve, reject) => {
      readStream.on('error', reject).pipe(uploadStream)
        .on('error', reject).on('finish', resolve/*file.getSignedUrl({
          action: 'read',
          expires: '03-31-2500'
        }).then(signedUrl => {
          console.log(signedUrl)
          return resolve;
        })*/);
    })
  });
