// Backend Routes
// User Routes
register - localhost:4500/user/register
method - post
body - basic layout
{
    "email": "rahul@gmail.com",
    "username": "rahul",
    "password": "rahul",
    "age": 25,
    "location": "Kumardubhi"
}

login - localhost:4500/user/login
method - post
body{
    "username": "rahul",
    "password": "rahul"
}

Data u will get is toke  so use token to make changes in the notes
pass token in headers as : Authorization : token


// Notes Routes
Pass the token in each notes routes in headers as : Authorization : Bearer token

Get all Notes Document :- localhost:4500/notes/get

Add New Notes Document : - localhost:4500/notes/Add

{
    "title": "Routes Testing",
    "body": "Testing All the Routes",
    "sub": "Testing Phase for all the routes"
}

Update  Notes Document : - localhost:4500/notes/update/ID

{
    "title": "Routes Testing",
    "body": "Testing All the Routes",
    "sub": "Testing Phase for all the routes"
}

Delete  Notes Document : - localhost:4500/notes/delete/ID

{
    "title": "Routes Testing",
    "body": "Testing All the Routes",
    "sub": "Testing Phase for all the routes"
}
