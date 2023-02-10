# Tech Blog

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| <img src="assets/images/js-logo.svg" alt="javascript" width="20"/> JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)     |  
| <img src="assets/images/nodejs-icon.svg" alt="html" width="20"/> Node.js    | [https://developer.mozilla.org/en-US/docs/Glossary/Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js) | 
| <img src="assets/images/mysql-icon.svg" alt="html" width="20"/> MySQL    | [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/) | 
| <img src="assets/images/expressjs-logo.svg" alt="html" width="20"/> Express.js    | [https://developer.mozilla.org/en-US/docs/Glossary/Express.js](https://developer.mozilla.org/en-US/docs/Glossary/Express.js) |

## Description 

This web application allows users to view blog posts about tech subjects. A user must create an account to publish their own blog posts and comment on other users' posts. User's can view all of their posts on a personal dashboard page where they can update and edit their posts.  

## Functionality
Visit the deployed site on Heroku [here](https://young-shore-42831.herokuapp.com).

## Code Snippets
The below code uses express-handlebars to dynamically generate the logged-in user's dashboard page. The handlebars template recieves a sequelize model instance as an argument to customize the page for each user.

```handlebars
<h3>{{user.username}}'s Dashboard</h3>
{{#each posts}}
    <div class="card m-2">
        <div class="card-header">
            {{user.username}} posted on {{format_date date_created}}
        </div>
        <div class="card-body">
            <h5 class="card-title"><a href="/post/{{id}}">{{title}}</a></h5>
            <p class="card-text">{{text}}</p>
            <a href="/post/update/{{id}}" class="btn btn-light">Edit Post</a>
            <a data-id={{id}} class="btn btn-light delete-post">Delete Post</a>
        </div>
    </div>
{{/each}}
<br/>
<h4>Create a new post</h4>
<form id="new-post" class="mt-2">
  <div class="form-group">
    <label for="title-input">Post Title</label>
    <input type="text" class="form-control" id="title-input">
  </div>
  <div class="form-group">
    <label for="text-input">Post Text</label>
    <textarea class="form-control" id="text-input" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<script src="/js/post.js"></script>
```