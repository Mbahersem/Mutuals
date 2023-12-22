# Mutuals

## Description
In this microservice, we are implementing the creation and the management of mutuals which can be packages or single format. They are created by the users who are administrators. We are using MongoDB database, we have an API designed using Express and we are running tests with Jest. In the end, we will use Docker to conteneurize our application.

## Server
Launched with `npm run server` on port `5002`.

## Database
We are using the database **devmsass** in *development*. We have the following schemas :
* mutuals :
```javascript
{
    name: {type: String},
    creationDate: {type: Date, default: Date.now},
    typeMutual: {type: String},
    helps: [{nameHelp: String, descHelp: String}],
    members: [{emailMember: String, points: Number, status: String}],
}
```
* users :
```javascript
{
    name: {
    type: String,
    required: [true, "He must have a name."],
    },
    email: {
        type: String,
        required: [true, "An email is necessary !"],
    },
    password: {
        type: String,
        required: [true, "How could he be identified ?"],
    },
    status: {type: String, default: "Member"},
    points: {type: Number, default: 0},
}
```
* dues :
```javascript
{
    datePay: Date,
    dateDecided: Date,
    amountPay: Number,
    amountDecided: Number,
    mutual: {nameMutual: String},
    member: {emailMember: String, points: Number, status: String},
}
```
* refund :
```javascript
    amount: Number,
    rate: Number,
    mutual: {nameMutual: String},
    member: {emailMember: String, points: Number, status: String},
```

## API
* `GET /api/mutuals/:name` to get a mutual using his name.
* `GET /api/mutuals` to get all the mutuals.
* `GET /api/mutuals/:name/admins` to get all the admins of a mutual.
* `GET /api/mutuals/:name/package` to check if a mutual is a package or not.
* `GET /api/mutuals/total` to get the total number of mutuals.
* `POST /api/mutuals/creation` to create a mutual.
* `PUT /api/mutuals/:name/add` to add a member to a mutual.
* `DELETE /api/mutuals/:name/delete` to delete a mutual.

## Tests
Launched with the script `npm test` which is `jest --watchAll --detectOpenHandles`. There is only the file `mutuals.test.js` which has ? tests :
* Test the database connection
* Creating a mutual
* Creating mutuals
* Mutuals with same names
* Get a mutual
* Get mutuals
* Join a mutual
* Get admins
* Is a mutual a package ?


During the tests, we have some issues with the asynchronous behaviour of these functions.