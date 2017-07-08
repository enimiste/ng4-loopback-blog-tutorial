# Angular 4 + Loopback Blog tutorial
- List Posts
- Edit Post
- View Post
- Create Post
- Integration of Boostrap 3
- Authentication and roles
- Login form
- Custom User model : Account
- AutoComplete Search form
- Add relation between Account and Post 
- Install TinyMCE + create tinymce editor component  
- Add Category model
- Create Category
- List Categories
- Choose Category when creating or editing posts
- More will be added soon

# Versions :
- Loopback : 3.x
- Nodejs : 6.x
- Angular : 4
- Bootstrap : 3
- JQuery : 1.12.4

# IDE :
- PhpStorm or WebStorm help a lot (Import, auto-complete, ...)
- But, you can use VS Code, Atom or SublimeText

# Project structure
- api : server part using loopback
- blog : front part using angular 4

# Database :
- I used MongoDb on a Homestead Vagrant machine
- You should edit the file `api/server/datasource.json` to set your credentials :
```json
{
  "db": {
    "host": "localhost",
    "port": 27018,
    "database": "blog",
    "name": "db",
    "connector": "mongodb"
  }
}
```

# Installation :
0. You should install first the angular cli `npm install -g @angular/cli` and loopback cli `npm install -g loopback-cli`
1. After cloning the repository and setting the database credentials and before running the server you should first edit the file `api/server/boot/install.js` to set `installed=false`.
2. Install dependencies :
```sh
$ cd api
$ npm install
$ cd ../blog
$ npm install
```
3. Run first serve of the api to create the install data : `cd api && node .`
4. Then reset in `/server/boot/install.js` to `installed=true` to avoid creation each time the server runs
5. Run the two parts :
```sh
cd api && node .
cd blog && ng serve
```
6. Check the installation by accessing these links : [Api](http://localhost:3000/explorer) and [Blog](http://localhost:4200)

# Tips :
+ I created in this project an Angular pipes : `keys`  
+ I used also ReactiveFormsModule in registration form.  
+ To show input errors i created a component `<app-form-errors></app-form-errors>`  
+ To show alert message i added new component `<app-flush></app-flush>`
# Thanks to : 
[Solmak.com](Solmak.com)

Of these serie [Youtube serie that i followed](https://www.youtube.com/playlist?list=PLP0rn5W6b0YUDcoeoOWFsB5KgNkYqSQXo)

# Contact Me
[Nickel IT](mailto:e.nouni@nickel-it.com)
