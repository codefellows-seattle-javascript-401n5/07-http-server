
# 07: HTTP Server with Cowsay
___
###### TRAVIS: 
###### HEROKU: 
###### PR: 
___
This HTTP server uses the Cowsay module which will repeat what the user types.  

### **In order to run my app, do the following:**

**1.** Click the following link to test the GET request in the browser:  
//heroku app
To make a GET request in the browser type:/cowsay?text={message} at the end of the url.
  * Change the id to any number greater than 0 and less that 2018.  It will return the number.
  * Change the number outside of the parameters above ex: 2019.  It will return a 404 error and write 'not found' in the console.
  * Leave the id query blank. It will return a 400 error and write 'bad request' in the console.

**2.** Using HTTPie run the following commands in the terminal:

http POST :3000/api/cowsay text=hello
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/json
Date: Fri, 15 Jun 2018 15:10:05 GMT
Transfer-Encoding: chunked

{
    "content": " _______\n< hello >\n -------\n        \\   ^__^\n         \\ (oo)\\_______\n            (__)\\  )\\/\\\n                ||----w |\n              ||     ||"
}

**1.** 
