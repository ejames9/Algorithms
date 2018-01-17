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
const freeCodeCampLogo =()=>
  'https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png'

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
  'search': false,
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
    }
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
const insertFreeCodeCamp =(data)=> (
  {...data, 'featured': [...[{...obtainAndProcessData('freecodecamp'), 'logo': freeCodeCampLogo()}], ...data.featured]}
)

// A higher-order function that combines featured results with either freeCodeCamp or Search Result...
const insertSearchResult =(data)=>
  (term)=> (term == 'freecodecamp')? (
    log(term),
    {...data, 'featured': [...[{...obtainProcessAndCombineData(true), 'logo': freeCodeCampLogo()}], ...data.featured]}
  )
  :
    (
      log(term),
    {...data, 'featured': [...[obtainProcessAndCombineData(true, term)], ...data.featured]}
  )

// A function for loggin data to a target...
const dataLogger =(logger)=>
  (data)=>
    logger(data)

// A function for logging data, but returning the unaltered data...
const logData =(data)=> {
  inspect(data)
  return data
}

// A Higher-Order function that uses the pipe function to compose
// 4/5 smaller functions together that pass data to one another. If the
// function recieves an optional search parameter, a channel will be
// searched. Otherwise, 25 featured results will be returned...
const obtainProcessAndCombineData =(search=false, term='freecodecamp')=>
  (search)?
    pipe(
      callAPI,
      parseJSON,
      filterSearchData,
      logData
    )(term)
  :
    pipe(
      callAPI,
      parseJSON,
      filterFeatureData,
      insertSearchResult(term),
      logData
    )()







// // Component for displaying stream channels and data...
// const Screen =({data, channel})=> {
//   if (data) {
//     if (data.search) {
//       return (
// // Component markup...
//         <Channel data={data} channel={channel}/>
//       )
//     }
//     else if (data.featured[channel].stream != null) {
//       return (
// // Component markup...
//         <Channel data={data} channel={channel}/>
//       )
//     } else {
//       return (
// // Offline screen component...
//        <Offline data={data.featured}/>
//       )
//     }
//   } else {
//     return (
// // Offline screen component...
//        <Offline />
//     )
//   }
// }
