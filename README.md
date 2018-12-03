# SimilarHomes

The tech stack I chose for this project is MEAN: MongoDB, Express, Angular and Node.js

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

To Run Locally: 
- You must have all entries in listings.csv imported into MongoDb using the mongoimport command. The db name should be 'homes' and the entries will go into a collection that is also named 'homes'. If the entries are correctly imported, you should be able to call 'db.homes.find()' in the Mongo shell and the entries should appear. 
- You must have the Mongo daemon and Mongo shell running. Please go to the directory where MongoDb lives on your machine and run 'mongod' or '~/mongodb/bin/mongod' if that does not work. Open a new command line window and go to the same directory and run 'mongo' or '~/mongodb/bin/mongo'. 
- The server side must be running. Please cd into the 'server' directory and run 'node app.js'
- You are now ready to spin up the app! Please run 'npm start' inside the SimilarHomes directory. 

To Test:
- You must have mocha installed globally. Please run 'npm install -g mocha'.
- Running 'ng lint' will lint the files and 'npm test' will run the test cases I have written. 

## Considerations and Tradeoffs

One of the main issues that I had while building this was how exactly I was going to implement the pagination, since I don't have much hands on experience on that front. I came across this awesome Mongoose plugin called mongoose-paginate: https://github.com/edwardhotchkiss/mongoose-paginate. This plugin allowed me to paginate the query results really simply, but when I ran a few queries to test the pagination, I realized that there are multiple database entires that refer to the same Home, because the original entry was modified and a new entry was made (the only difference is in the ModTimestamp). I wanted to remove these duplicates because it may look like there are 3 returned entries to a query on a UI, but all 3 are actually referring to the same Home. I wanted to implement only unique entries in the returned array using the Mongoose .distinct() call. However, I discovered that the .paginate() method from the mongoose-pagination plugin did not allow a chained .distinct() call so I didn't get to implement it that way. I'm sure there is a way to do it with the plugin, I just did not discover it. In retrospect, I would have done the pagination with a Mongoose .aggregate() call with $group to make the entries unique and the $limit and $skip to do pagination. 

## Known Errors and Areas of Improvement: 

- I do not like the way that the Max/Min Bathrooms, Bedrooms or Square Footage input fields on the UI will automatically show the default value of Number.MAX_VALUE or Number.MIN_VALUE if the user did not enter a value. In the future I would do that defaulting in a different way so that the user does not see those numbers fill their fields. It could be a confusing factor for someone who doesn't know what's going on.

- A breaking flaw of my application is that if results are returned from the query, the user cannot press the Previous Page button if they are on the first page. The mongoose-paginate plugin will think that we are trying to pass in a skip value of -10 which is not valid so the application will crash. I need to disable the Previous Page and Next Page buttons when the user should not click them (on the first page or results or on the last page of results). 

- Finally, an inefficiency with my application is how often I query the database. getHomes() will query the database with all of the specifications that the user entered. However, instead of just returning the next 10 results or the previous 10 results from the array of results already found by getHomes(), nextPage() and previousPage() just query the database AGAIN with a page number passed in so the method knows which results to return. It would be a lot more efficient if getHomes() was the only method that ever queried the database and nextPage() and previousPage() just returned the correct 10 results from what was returned by getHomes(). I guess the inefficiency really depends on whether the method with a page parameter queries all the matching entries and then returns the correct 10 based on the page parameter, or if it queries all matching entries until the 10 that we want. Either way, definitely a better way to do this while only querying with getHomes().


In addition I included some simple sample test cases in the ./test folder. 

Thank you for taking the time to review my submission! 

