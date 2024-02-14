# Backend Developer Assignment (Deadline: 24 hours)

### Purposefully, I have kept the .env file so that the setup becomes easy. Obviously,it will be gitignored in a real scenario

## Base URL

The base URL for all endpoints is: `http://localhost:3000/`

## To Run

```
1.npm install
2.npm start
```

### Login User

- **Endpoint:** `/api/login`
- **Method:** POST
  Description: Authenticate and log in a user. Provide username, password and type (admin or regular)in the request body.

```
Available list of users:
const users = [
    { username: 'ankan', password: 'admin123', type: 'admin' },
    { username: 'alireza', password: 'user123', type: 'regular' },
    { username: 'rose', password: 'user1234', type: 'regular' },
    { username: 'ajax', password: 'user12345', type: 'regular' }
];
```

Request Body:

```json
{
  "username": "ankan",
  "password": "admin123",
  "type": "admin"
}
```

Response: Returns a JWT token if successful for further authentication.

### Get Home

- **Endpoint:** `/home`
- **Method:**: GET

- **Description**: It will receive all books from regularUser.csv if user is of type:regular.
  It will receive all books from regularUser.csv and adminUser.csv if user is of type:admin

Authorization: Bearer Token (JWT)

```json
{
  "books": [
    "The Da Vinci Code",
    "Think and Grow Rich",
    "Harry Potter and the Half-Blood Prince",
    "The Catcher in the Rye",
    "The Alchemist"
  ]
}
```

Response: User Balance if found.

### Add Book (Must be admin, otherwise its unauthorized)

- **Endpoint:** `/addBook`
- **Method:** POST

Request Body:

```json
{
    "bookName": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationYear": 1925
}

Response:
{
    "message":"Book added successfully"
}
You can check the regularUser.csv file in the data folder that the book has actually been added in the last row.
```

## In the Authorization tab in Bearer section ,paste the token

### Add Book (Must be admin, otherwise its unauthorized)

- **Endpoint:** `/deleteBook`
- **Method:** DELETE

Request Body:

```json
{
    "bookName": "The Great Gatsby",
}

Response:
{
    "message":"Book deleted successfully"
}
You can check the regularUser.csv file in the data folder that the book has actually been deleted from the last row.
```

## In the Authorization tab in Bearer section ,paste the token
