/*
dataProcessor.js

Code used to process data recieved from
twitch.tv api calls.

Eric James Foster, MIT license...
*/


// API urls...
const searchURL =()=>
  'https://wind-bow.glitch.me/twitch-api/streams/'
const featuredURL =()=>
  'https://wind-bow.glitch.me/twitch-api/streams/featured/'

// a Higher-Order function for piping smaller functions together
// that operate on the same piece of data...
const pipe = (...funcs)=>
  (arg)=>
    funcs.reduce(
      (data, func)=> func(data),
      arg
    )

// A pure function that takes an optional search argument, and returns
// results in json format...
const callAPI =(search=null)=>
  (search)?
    xhr(url(searchURL(), search))
  :
    xhr(featuredURL())

// A pure function that takes in raw stringy json and returns a json object...
const parseJSON =(jsonString)=>
  JSON.parse(jsonString)

// A pure function that creates a new json object containing only the
// fields we are interested in...
const filterFeatureData =(json)=> ({
  'links': {
    'self': json._links.self,
    'next': json._links.next
  },
  'featured': json.featured.map((entry)=> ({
    'image': entry.image,
    'title': entry.title,
    'text': entry.text,
    'stream': {
      'id': entry.stream._id,
      'game': entry.stream.game,
      'preview': {
        'small': entry.stream.preview.small,
        'medium': entry.stream.preview.medium,
        'large': entry.stream.preview.large,
        'template': entry.stream.preview.template
      },
      'channel': {
        'id': entry.stream.channel._id,
        'status': entry.stream.channel.status,
        'displayName': entry.stream.channel.display_name,
        'logo': entry.stream.channel.logo,
        'url': entry.stream.channel.url
      },
      'links': {
        'self': entry.stream._links.self
      }
    },
    'search': false
  }))
})

// A pure function that creates a new json object containing only the
// fields we are interested in...
const filterSearchData =(json)=> (json.stream)? ({
  'stream': {
    'id': json.stream._id,
    'game': json.stream.game,
    'preview': {
      'small': json.stream.preview.small,
      'medium': json.stream.preview.medium,
      'large': json.stream.preview.large,
      'template': json.stream.preview.template
    },
    'channel': {
      'id': json.stream.channel._id,
      'status': json.stream.channel.status,
      'displayName': json.stream.channel.display_name,
      'logo': json.stream.channel.logo,
      'url': json.stream.channel.url
    },
    'links': {
      'self': json.stream._links.self
    },
    'search': true
  }
}) : json


// Combine...
const combine =(data)=> (
  {...data, 'featured': [...obtainAndProcessData('freecodecamp'), ...data.featured]}
)

// A Higher-Order function that uses the pipe function to compose
// 3 smaller functions together that pass data to one another. If the
// function recieves an optional search parameter, a channel will be
// searched. Otherwise, 25 featured results will be returned...
const obtainAndProcessData =(search=null)=>
  (search)?
    pipe(
      callAPI,
      parseJSON,
      filterSearchData
    )(search)
  :
    pipe(
      callAPI,
      parseJSON,
      filterFeatureData,
      combine
    )()
