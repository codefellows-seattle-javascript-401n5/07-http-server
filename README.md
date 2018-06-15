[![Build Status](https://travis-ci.org/Lennerblom/07-http-server.svg?branch=master)](https://travis-ci.org/Lennerblom/07-http-server)
# 07: HTTP Server with Cowsay
___
###### TRAVIS: https://travis-ci.org/Lennerblom/07-http-server
###### HEROKU: https://cowsay07.herokuapp.com/
###### PR: https://github.com/Lennerblom/07-http-server/pull/3
___
This HTTP server uses the Cowsay module which displays a cow that will repeat what you type.  

**1.** Click the following link to test the GET request in the browser:  https://cowsay07.herokuapp.com/

To make a GET request in the browser type:`/cowsay?text={your message}` at the end of the url.  You should see something like this:

< your message >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||


**2.** Using HTTPie run the following commands in the terminal to test for a POST:


You should receive something like this:


HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/json
Date: Fri, 15 Jun 2018 15:10:05 GMT
Transfer-Encoding: chunked


{
    "content": " _______\n< hello >\n -------\n        \\   ^__^\n         \\ (oo)\\_______\n            (__)\\  )\\/\\\n                ||----w |\n              ||     ||"
}
