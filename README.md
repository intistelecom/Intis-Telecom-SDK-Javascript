# Intis-SDK-JS

## Description
The Intis telecom gateway lets you send SMS messages worldwide via its API. This program sends HTTP(s) requests and receives information as a response in JSON and/or XML. The main functions of our API include:

* sending SMS messages (including scheduling options);
* receiving status reports about messages that have been sent previously;
* requesting current balance status;
* requesting current prices;

To begin using our API please [apply](https://go.intistele.com/external/client/register/) for your account at our website where you can get your login and API key.

## Package Managers

* [Bower](http://bower.io/): `intis-client`
* [npm](https://www.npmjs.com/): `components-intisclient`

## Usage

Include the (minified) JavaScript script in your HTML markup:

```html
<script src="dist/intis-client.min.js"></script>
```

Class IntisClient - The main class for SMS sending and getting API information

There are three mandatory parameters that you have to provide the constructor in order to initialize. They are:

```js
var client = new IntisClient("your_api_login", "your_api_key", "your_api_host");
```

## Requirements
The Intis-SDK-JS script requires [js-md5](https://github.com/blueimp/JavaScript-MD5).

## API

Use the getBalance method to request your balance status

```js
client.getBalance(function(data){ console.log(data); }, function(error){ console.log(error); });
```

To send a message (to one or several recipients), use the function send(phone, text, sender, success, error, sending_time), where phone - is a set of numbers you send your messages to, sender is a sender’s name and text stands for the content of the message and sending_time - Example: 2014-05-30 14:06 (an optional parameter, it is used when it is necessary to schedule SMS messages).

```js
client.send(phone, text, sender, function(data){ console.log(data); }, function(error){ console.log(error); });
```

To receive status info for an SMS you have already sent, use the function getStatus(messageId) where messageId - is an array of sent message IDs.

```js
client.getStatus(messageId, function(data){ console.log(data); }, function(error){ console.log(error); })
```

Use the getPrices method to request your prices

```js
client.getPrices(function(data){ console.log(data); }, function(error){ console.log(error); });
```

## License
The JavaScript MD5 script is released under the
[MIT license](http://www.opensource.org/licenses/MIT).