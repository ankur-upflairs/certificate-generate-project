exports.html=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Allura&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
    <style>
    body{
     width: 3509px;
     height: 2481px;
    }
      .certificate {
        position: relative;
        
      }
      .text {
      position: absolute;
      top: 41.5%;
      left: 23%;
      
      width: 54%;
      text-align: center;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 174px;
      font-family: "Allura", cursive;
      font-weight: 400;
      font-style: normal;
      color: #1B1464;
    }

    .enroll {
      position: absolute;
      top: 91%;
      left: 31%;
      
      height: 70px;
      font-size: 72px;
      font-family: "Montserrat", sans-serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      color: #1B1464;
    }
    </style>
  </head>
  <body>
    <div class="certificate">
      <img src="{{{imageSource}}}" alt="" width="100%" />
      <div class="text">{{Name}}</div>
      <div class="enroll">Enrollment No.: {{enrollmentNo}}</div>
    </div>
   
  </body>
</html>
`