

// // log('shadow: ' + shadowBool(customProps))
// // Use the new custom elements DOM API to define a new tag...
// // Dynamically create class source code for each component...
// reflect(`
//   window.customElements.define(
//     "${component[0]}",
//
//     class extends HTMLElement {
//       ${customProps.map(key=>`
//           get ${key[0]}() {
//             return this.hasAttribute("${key[0]}")
//           }
//           set ${key[0]}(val) {
//             if (val) {
//               this.setAttribute("${key[0]}", "")
//             } else {
//               this.removeAttribute("${key[0]}")
//             }
//           }
//        `).join('\n')
//       }
//
//       constructor() {
//         super()
//         ${(shadow)?
//             `let shadowRoot = this.attachShadow({mode: "open"})
//              appendChildren(shadowRoot)`
//           :
//             ``
//         }
//         console.log('hi')
//         ${(eListeners.length > 0)?
//           eListeners.map(entry=>`
//             this.addEventListener("${entry[0]}", this.${entry[1]})
//          `).join('\n')
//          : ``
//         }
//       }
//       ${(eListeners.length > 0)?
//         eListeners.map(entry=>`
//           ${entry[1]}() {
//             console.log('what about me')
//             return (${entry[2]})()
//           }
//         `).join('\n')
//        : ``
//       }
//       ${(!shadow)?
//          `connectedCallback() {
//            appendChildren(this)
//          }`
//        :
//          ``
//       }
//     }
//   )
// `)








// Internal method closure for grabbing the variable name from a flare component
// declaration, for tagname representation in custom element creation...
//   static _acquireComponentTagName(xCaller, callerName, array, props) {
//     let tagShifter,
//     tagTwister,
//     tagArray,
//     tag
//
//     log("I've been passed in", ['pink', 'bold']);log(array)
// // A very simple function for moving the first item of an array to the end.
//     tagTwister =(ra)=>  {
//       ra.push(ra.shift())
//       return ra
//     }
//
// // A function for shifting a tag from the beginning of the component names array....
//     tagShifter =(ra)=> {
//       let array = [],
//       object,
//       obj = {}
// // If we don't have an empty array....
//       if (ra.length > 0) {
// // We can shift out a tag....
//         obj.tag  = ra.shift()
//         log(`Shifted Tag: ${obj.tag}`, 'tomato')
// // Determine whether or not the array item is a tag or new array....
//         if (Is.array(obj.tag)) {
//           // log('tag is array', ['green', 'bold']);dir(obj.tag)
// // Put the original array back, so we can move on to the new one...
//           Flare._tagQueue = ra
// // Shift the first tagname to the end....
//           array = tagTwister(obj.tag)
// // Shift out the first tagname....
//           return tagShifter(array)
//         } else {
//           obj.array = ra
//         }
// // Else, we have a new component and must rebuild...
//       } else {
//         log('Rebuilding', ['green', 'bold'])
//         obj.array = _buildArray(xCaller, callerName, props)
//         return tagShifter(obj.array)
//       }
//       log('(window.statelessComponents.indexOf(obj.tag)', 'yellow')
//       log((window.statelessComponents.indexOf(obj.tag)))
// // Check the statelessComponents registry for a redundancy...
//       if (window.statelessComponents.indexOf(obj.tag) !== -1) {
//         log('Registry', ['orange', 'bold']);log(obj.tag)
//         return tagShifter(obj.array)
//       }
// // If we reach this point, we are ready to return tag...
//       // log('return obj', ['yellow', 'bold']);dir(obj)
//       return obj
//     }
//
// // If there are no component names in the array, lets's get some..
//     if (array.length == 0) {
// // Build array with x.caller source code, and twist it....
//       array = _buildArray(xCaller, callerName, props)
//       // log('building', ['red', 'bold']);dir(array);log(array.length)
//     }
//
// /* Call tagShifter function to shift out the bottom-most tagname in the list...
// If it has already been instantiated, then it is not a flare component- Pop from
// the list and move on... Return both the altered array and the shifted out tag...*/
//     let obj = tagShifter(array)
//     // log('tag', ['orange', 'bold']);dir(obj.tag);
//     Flare._tagQueue = obj.array
// // Return tag..
//     return obj.tag.toLowerCase()
//   }



// var obj = {
//    a: 'string',
//    b: function func(str) { console.log(str) },
//    c: 9,
//    d: {
//     e: 6,
//     f: 'hello',
//     j: {
//       q: 5,
//       r: 'jesus',
//       c: {
//         m: 4,
//         n: 'christ'
//       }
//     }
//    },
//    e: /hello/g,
//    g: null
// }
// let newObj = _.deeplicateObject(obj)
// newObj.d.j = 'lord'
// log('objs', 'tomato')
// dir(obj)
// dir(newObj)




//
// const blue = '#0057ff'
// const yellow = '#ffc700'
// const tomato = '#ff4500'
// const green = '#17a637'
// const coolGreen = '#669a0f'
// const grey = '#323232'
//
//
// //global styles..
// __`
// body {
//   background: ${grey}
// }
// `
//
// const Fluid =()=> div({
//   className: 'container-fluid',
//   id: 'hwhatthe'
// })`
// position: absolute;
// height: 100%;
// width: 100%;
// padding: 0;
// `
//
// const Box =()=> div({
//   id: 'box',
//   className: 'boxy'
// })`
//   position: absolute
//   top: 50%
//   height: 200px
//   width: 100%
//   margin-top: -130px
//   padding: 30px
//   z-index: 9
//   background-color: transparent
//
//   h1 {
//     color: yellow;
//     position: absolute;
//     top: -150px;
//     left: 100px;
//     text-align: center;
//     vertical-align: middle;
//     font-size: 84px;
//     font-family: sf mono;
//   }
//
//   @media (max-height: 400px) {
//     background: red;
//     border-radius: 40%;
//   }
// `
//
// const MyDiv =({shadow})=> div`
//   position: absolute;
//   left: 76%;
//   top: 25%;
//   height: ${shadow? '100px' : '700px'};
//   width: 200px;
//   background: ${tomato}
//   z-index: 99;
// `
//
// // attribute for inner button text.....
// const Thing =({myAtty})=> button({
//   id: 'buttonThing',
//   className: 'thang',
//   type: 'submit',
//   label: 'press'
// })`
//   height: ${myAtty};
//   width: 75px;
//   border: none;
//   border-radius: 7px;
//   background-color: pink;
// `
//
//
// const MyDiv2 =({shadow})=> div`
//   position: absolute;
//   left: 82%;
//   top: 25%;
//   height: ${shadow? '100px' : '700px'};
//   width: 200px;
//   background-color: ${green};
//   z-index: 99;
//   p {
//     color: white;
//   }
// `
//
//
// const MyInput =()=> input({
//   placeholder: 'onsearch',
//   type: 'text',
//   className: 'myput'
// })`
//   position: absolute;
//   font-family: sf mono, space mono;
//   font-size: 38px;
//   width: 200px;
//   height: 38px;
//   margin: 0 auto;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   background-color: orange;
//   border: none;
//   border-radius: 5px;
//   color: yellow;
//
//   @media (max-height: 400px) {
//       background: blue;
//   }
// `
//
//
// //
// const Thing2 =({attrib, shadow})=> extend(Thing, {
//   id: 'thing2',
//   label: 'press me!'
// })`
//   position: relative;
//   top: 100px;
//   background-color: ${tomato};
//   opacity: ${attrib};
//   color: white;
//   border: 2px solid ${shadow? 'black' : 'orange'}
// `
//
// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//
//   to {
//     transform: rotate(360deg);
//   }
// `;
//
// const Spinner =()=> div`
//   position: absolute;
//   top: 55%;
//   left: 50px;
//   height: 300px;
//   width: 300px;
//   display: block;
//   padding: 5px;
//   background: grey;
//
//   div {
//     position: absolute;
//     text-align: center;
//     vertical-align: middle;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     margin: 0 auto;
//     padding: 40% 0;
//     background: tomato;
//     font-size: 44px;
//     color: blue;
//     font-family: sf mono, space mono;
//     animation: ${rotate} 2s linear infinite;
//   }
// `
//
// const Logo =()=> div({
//   cleanHTML: valenceLogo(),
//   shadow: false
// })`
//   width: 100%;
//   padding: 10px;
//   margin: auto;
//   z-index: 999
//
//   p {
//     color: white;
//     font-family: sf mono;
//   }
// `
//
//
//
// const MyName =()=>
//   <div>
//     <Box>
//       <MyDiv>
//         <Thing myAtty='75px' shadow={true}/>
//         <p>I'm inside a custom element!</p>
//       </MyDiv>
//       <p>What is happening</p>
//       <h1 className='name'>My Name Is:</h1>
//       <MyDiv2>
//         <MyInput shadow={true}/>
//         <Thing2 attrib={9} shadow={false}/>
//       </MyDiv2>
//     </Box>
//   </div>
//
//
// class App extends Valence.Component {
//
//   css() {
//     return`
//
//     `
//   }
//
//
//   render() {
//     return (
//       <Fluid>
//         <Spinner>
//           <div>
//             <Logo>
//               <p>Delilah!</p>
//             </Logo>
//           </div>
//         </Spinner>
//         <MyName className='myname'/>
//       </Fluid>
//
//     )
//   }
// }
//














/*
**------ PROPS --------
----------------------*/

/*********\ `name` Prop /*******************/
//   _name = null
// // Getter for `name` attribute...
//   get name() {
//     return this._name
//   }
// // Reflect the value of the name property as an HTML attribute.
//   set name(val) {
//     if (val) {
//       this.setAttribute('name', val)
//       this._name = val
//     } else {
//       this.removeAttribute('name')
//     }
//   }
//
// /*********\ `autofocus` Prop /*******************/
//   _autofocus = false
// // Getter for `name` attribute...
//   get autofocus() {
//     return this._autofocus
//   }
// // Reflect the value of the name property as an HTML attribute.
//   set autofocus(val) {
//     if (val) {
//       this.setAttribute('autofocus', val)
// // Set the property...
//       this._autofocus = val
//     } else {
//       this.removeAttribute('autofocus')
//     }
//   }
//
//   _block = false
// // Getter for `block` attribute...
//   get block() {
//     return this._block
//   }
// // Reflect the value of the `block` property as an HTML attribute.
//   set block(val) {
//     if (val) {
//       this.setAttribute('block', val)
//       this._block = val
//     } else {
//       this._block = false
//     }
//   }
//
//   _disabled = false
// // Getter for `disabled` attribute...
//   get disabled() {
//     return this._disabled
//   }
// // Reflect the value of the `disabled` property as an HTML attribute.
//   set disabled(val) {
//     if (val) {
//       this.setAttribute('disabled', val)
//       this._disabled = val
//     } else {
//       this.removeAttribute('disabled')
//     }
//   }
//
//   _size = 'md'
// // Getter for `size` attribute...
//   get size() {
//     return this._size
//   }
// // Reflect the value of the `size` property as an HTML attribute.
//   set size(val) {
//     if (val) {
//       this.setAttribute('size', val)
//       this._size = val
//     } else {
//       this.removeAttribute('size')
//     }
//   }
//
//   _variant = 'outline-primary'
// // Getter for `variant` attribute...
//   get variant() {
//     return this._variant
//   }
// // Reflect the value of the `variant` property as an HTML attribute.
//   set variant(val) {
//     if (val) {
//       this.setAttribute('variant', val)
//       this._variant = val
//     } else {
//       this.removeAttribute('variant')
//     }
//   }
//
//   _type = 'submit'
// // Getter for `type` attribute...
//   get type() {
//     return this._type
//   }
// // Reflect the value of the `type` property as an HTML attribute.
//   set type(val) {
//     if (val) {
//       this.setAttribute('type', val)
//       this._type = val
//     } else {
//       this.removeAttribute('type')
//     }
//   }
//
//   _tag = 'button'
// // Getter for `tag` attribute...
//   get tag() {
//     return this._tag
//   }
// // Reflect the value of the `tag` property as an HTML attribute.
//   set tag(val) {
//     if (val) {
//       this.setAttribute('tag', val)
//       this._tag = val
//     } else {
//       this.removeAttribute('tag')
//     }
//   }
//
//   _value = ''
// // Getter for `value` attribute...
//   get value() {
//     return this._value
//   }
// // Reflect the value of the `value` property as an HTML attribute.
//   set value(val) {
//     if (val) {
//       this.setAttribute('value', val)
//       this._value = val
//     } else {
//       this.removeAttribute('value')
//     }
//   }
//
//   _pressed = null
// // Getter for `pressed` attribute...
//   get pressed() {
//     return this._pressed
//   }
// // Reflect the value of the `pressed` property as an HTML attribute.
//   set pressed(val) {
//     if (val) {
//       this.setAttribute('pressed', val)
//       this._pressed = val
//     } else {
//       this.removeAttribute('pressed')
//     }
//   }












//
// <Row bumpers='5px'gutters='10px'>
//   <Col>1 of 2</Col>
//   <Col>
//     2 of 2
//     <Row>
//       <Col>1 of 2</Col>
//       <Col>2 of 2</Col>
//     </Row>
//   </Col>
// </Row>
// <Row id='rowBoat'>
//   <Col cols={6}>1 of 4</Col>
//   <Col>2 of 4</Col>
//   <Col cols={3}>3 of 4</Col>
//   <Col>4 of 4</Col>
// </Row>


















/*
**
**
**
**
** Column WebComponent
**
**
***********************************************/


/*
** Column.js
**
** Column Components will hold the content in the grid system....
**
** Eric James Foster, Fostware LLC, MIT License.
***/

//
// import ValenceComponent from '../../Component'
// // Get css ...
// import { css } from '../../Flare/Flare'
// // Get logger...
// import { _log as log } from '../../Utilities/Loggers'
// // Get classlist manipulation...
// import {
//   addClass,
//   removeClass,
//   listContains
//  } from '../../Utilities/DOM/classList'
// // Get validation...
// import { isArray } from '../../Utilities/Is'
//
//
// // Component styles...
// const columnStyles = css` {
//     min-height: 60px;
//     height: 100%;
//     width: 100%;
//     background: #6c757d;
//     border: 1px solid #323232;
//     text-align: center;
//     font-family: hermit;
//     font-size: 22px;
//     line-height: 66px;
//
//   }
// `
//
// const userMarkupStyles = css`
//   ::slotted(row-) {
//     justify-content: space-evenly;
//     align-items: stretch;
//     flex-wrap: nowrap;
//     background: blue;
//   }
//   ::slotted(column-) {
//     background: blue;
//   }`
//
//
//
// const columnProps = {
//   col: {
//     type: Boolean,
//   default: false
//   },
//   cols: {
//     type: Number,
//     default: null
//   },
//   sm: {
//     type: [Boolean, String, Number],
//   default: false
//   },
//   md: {
//     type: [Boolean, String, Number],
//   default: false
//   },
//   lg: {
//     type: [Boolean, String, Number],
//   default: false
//   },
//   xl: {
//     type: [Boolean, String, Number],
//   default: false
//   },
//   place: {
//     type: String,
//     default: 'center'
//   }
// }
//
// class Column extends ValenceComponent {
// /*
// *** Class variables ********
// **************************/
//
// // An instance property for this component's active col count....
//   _cols = null
// // An instance property for the component's style object...
//   _style = null
// // An instance prop holding screen size breakpoints for layout changes....
//   _breakpoint = 0
// // An instance prop holding the devices screen width...
//   _screenWidth = null
// // An instance prop holding the parent row's width...
//   _rowWidth = null
//
//
// // Ctor....
//   constructor() {
//     super()
// // Set _screenWidth....
//     this._screenWidth = window.innerWidth
//
// // Add shadow root and slot for user markup...
//     let shadowRoot = this.shadowCaster()
//
// // Attach styles to shadowRoot....
//     this._style = this.addStyles(shadowRoot, columnStyles)
// /// Register the component's prop object...
//     this.registerProps(columnProps)
//   }
//
//
// // Internal method for determining the width percentage of a Col...
//   _calculateColTarget(cols) {
// // Get Row width...
//     this._rowWidth = this.parentNode.scrollWidth
//
//     let pWidth = this.gutters?
//       this._rowWidth - 30
//     :
//       this._rowWidth
// // Set col width...
//     let col = pWidth / 12,
// // Get target...
//     targetSize = cols * col
// // Return result...
//     return `${targetSize}px`
//   }
//
// // An internal method for setting _cols according with screen size....
//   _set_cols() {
// // var for breakpoint...
//     let breakpoint
// // Using a switch to determine col size, based on _screenWidth and props given...
//     switch (true) {
//       case (this._screenWidth >= 576 && this._screenWidth < 768):
//         if (this.sm) {
//           breakpoint = 576
//           return [this.sm, breakpoint]
//         } else {
//           return [this.cols]
//         }
//         break
//       case (this._screenWidth >= 768 && this._screenWidth < 992):
//         if (this.md) {
//           breakpoint = 768
//           return [this.md, breakpoint]
//         } else {
//           return [this.cols]
//         }
//         break
//       case (this._screenWidth >= 992 && this._screenWidth < 1200):
//         if (this.lg) {
//           breakpoint = 992
//           return [this.lg, breakpoint]
//         } else {
//           return [this.cols]
//         }
//         break
//       case this._screenWidth >= 1200:
//         if (this.xl) {
//           breakpoint = 1200
//           return [this.xl, breakpoint]
//         } else {
//           return [this.cols]
//         }
//         break
//       default:
//         return [this.cols]
//     }
//   }
//
// // Class method for setting styles based on cols and breakpoint props...
//   _setColWidths() {
// // Set the width of the column...
//     if (this._screenWidth >= this._breakpoint) {
// // Remove wrapping functionality from the parent row...
//       addClass(this.parentNode, 'no-wrap')
// // Remove class 'wrap'...
//       if (this.parentNode.classList.contains('wrap')) {
//         removeClass(this.parentNode, 'wrap')
//       }
//       this.style.flex = this._cols
//       this.style.flexBasis = ''
//     } else {
// // Add column wrapping functionality...
//       addClass(this.parentNode, 'wrap')
// // Remove 'no-wrap' class...
//       if (this.parentNode.classList.contains('no-wrap')) {
//         removeClass(this.parentNode, 'no-wrap')
//       }
//       this.style.flex = this._cols
//       this.style.minWidth = ''
//     }
//   }
//
//
//   componentDidMount() {
//     this._rowWidth = this.parentNode.scrollWidth
// /// Update element props with user defined props....
//     this.applyUserProps(this.props)
//
// // Check cols prop, and adjust width accordingly...
//     if (this.cols || this.md || this.sm || this.lg || this.xl) {
// //
//       let setCols = this._set_cols()
// // Set cols...
//       this._cols = setCols[0]
// // Set breakpoint if applicable....
//       if (setCols.length > 1) {
//         this._breakpoint = setCols[1]
//       }
//
// // Set the width of the column...
//       this._setColWidths()
//
// //Dynamic readjustment of the column's width....
//       document.body.onresize =(e)=> {
//         log('#####################################--########################################', ['', ''])
//         log('')
//         log(this._breakpoint)
//         log(this._screenWidth)
//         dir(this)
// /////
// //         let setCols = this._set_cols()
// // /// Set cols...
// //         this._cols = setCols[0]
// // // Set breakpoint if applicable....
// //         if (setCols.length > 1) {
// //           this._breakpoint = setCols[1]
// //         }
// // reset screen width....
//         this._screenWidth = window.innerWidth
//         //log('resize');log(this._cols)
//         this._setColWidths()
//       }
//     }
// // Check placement prop...
//     if (this.place) {
//       this.addClass(this.place)
//     }
//
//     this.insertRules(userMarkupStyles, this._style)
//   }
// }
//
// export default Column




















//
// <Container class='contain'>
//   <Row pads='15px' bumpers='5px' borders='1px #343a40'>
//     <Col order={2} mdOrder={3} class='on' cols={12} md={6}>1 of 2</Col>
//     <Col order={1} mdOrder={2} class='tw' cols={6} md={4} flex>2 of 2</Col>
//     <Col order={3} mdOrder={1} class='thr' cols={6} md={2}>3 of 2</Col>
//   </Row>
//   <Row pads='15px' bumpers='5px' gutters={false}>
//     <Col>1 of 2</Col>
//     <Col>2 of 2</Col>
//     <Col>3 of 2</Col>
//   </Row>
// </Container>
// <Container>
//   <Row align='end'>
//     <Col offset={7} mdOffset={1} align='center' cols={3} md={5}>1 of 1</Col>
//   </Row>
// </Container>
// <div class='container'>
//   <div class='row'>
//     <div class='col col-1'>1 of 3</div>
//     <div class='col col-2'>2 of 3</div>
//     <div class='col col-3'>3 of 3
//       <div class='row'>
//          <div class='col col-1'>1 of 2</div>
//          <div class='col col-2'>2 of 2</div>
//       </div>
//     </div>
//   </div>
// </div>
// <Square style='height: 1250px; width: 600px;'>Hello</Square>

















//************************--- Breakpoint setting code, belongs to Column.js

// Set breakpoint...
//       let breakpointData = this.sm ? [576, this.sm] :
//                          this.md ? [768, this.md] :
//                          this.lg ? [992, this.lg] :
//                         this.xl ? [1200, this.xl] : false
//
//       this._breakpoint = breakpointData[0]
//       this._breakCols  = breakpointData[1]
//
// // Set breakpoint...
//       let offsetBreakpointData = this.smOffset ? [576, this.smOffset] :
//                                this.mdOffset ? [768, this.mdOffset] :
//                                this.lgOffset ? [992, this.lgOffset] :
//                                this.xlOffset ? [1200, this.xlOffset] : false
//
//       this._offsetBreakpoint = offsetBreakpointData[0]
//       this._breakOffset  = offsetBreakpointData[1]
//
// // Set breakpoint...
//       let orderBreakpointData = this.smOrder ? [576, this.smOrder] :
//                               this.mdOrder ? [768, this.mdOrder] :
//                               this.lgOrder ? [992, this.lgOrder] :
//                               this.xlOrder ? [1200, this.xlOrder] : false
//
//       this._orderBreakpoint = orderBreakpointData[0]
//       this._breakOrder  = orderBreakpointData[1]



//
//
//
// breakPoints = breakPoints.map(bPoint=> {
//   switch (bPoint[0]) {
//     case 576:
//       return {sm: bPoint}
//       break
//     case 768:
//       return {md: bPoint}
//       break
//     case 992:
//       return {lg: bPoint}
//       break
//     case 1200:
//       return {xl: bPoint}
//       break
//     default:
//       return null
//   }
// })
