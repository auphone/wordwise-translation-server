## Installation
```sh
git clone 
cd wordwise-translation-server
npm install
```

## Build
```sh
npm run build
```

## Run
```sh
node dist/index.js
```

# API
#### GET: `/api/levels`
Return the number of levels available in translation server
#### Respnose
`{ level: 3 }`


#### POST: `/api/translate`
Filter and translate difficult words by specific level
#### Request
```js
{
  "level": 3,
  "words": [ "apple", "cappuccino" ],
  "lang": "zh-tw"
}
```

#### Response
```js
{
  "cappuccino": "熱奶咖啡"
}
```

## Options
#### words
Array of words to be filtered / translated
**Required**

#### level
Level 1-3, level 1 will translate almost all words except stop words
Default: `1`

#### lang
Any language code supported by google translate
Default: `zh-tw`

#### password
A super simple and configurable password in `config.json` to restrict the use of translate API

*Optional*

## Projects using this server
(https://github.com/auphone/wordwise-chrome-extension.git)

## License
ISC

## Author
[github/auphone](https://github.com/auphone)

Good luck!