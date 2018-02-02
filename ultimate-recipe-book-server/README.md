# Ultimate Recipe Book Server #

** Must be running to use server. Also requires a MongoDB instance, but more on that below. **

## To run ##

### 1. Install dependencies with NPM ###

Download npm if you don't have it.

```
#!command prompt

npm install
```

### 2. Create a MongoDB Instance ###

Either locally or hosted on a site like mLab.

### 3. Create a keys.json file in the root directory of ultimate-recipe-book-server

```
#!javascript

{
  "mongoHost": "host",
  "mongoPort": "1111",
  "mongoDatabase": "database-name",
  "mongoUser": "username",
  "mongoPass": "password",
  "SECRET" : "secret"
}

```

### 4. Run with NPM

```
#!command prompt

npm start
```
