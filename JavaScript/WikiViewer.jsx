/*
TwitchTVBrowser.jsx

A React/Styled-Components Powered twitch.tv UI
built for freeCodeCamp

Eric Foster
*/


/*
==========
Globals...
==========
*/

// A few constants...
const
style = styled;
const
keyframes = styled.keyframes;
const
styled = styled.default;
const
render = ReactDOM.render;

// API urls...
const
baseURL = 'https://wind-bow.glitch.me/twitch-api/streams/';
const
featuredURL = 'https://wind-bow.glitch.me/twitch-api/streams/featured/';

// Color variables;
var
bgColor = '#d0772a',
    red = '#e4141c';

// Font variables;
var
input = 'VT323';

// Global styles...
style.injectGlobal`
  body {
    background: black;
  }
  input:focus {
    outline: none;
  }
  .red {
    background-color: ${red};
  }
  .blue {
    background-color: blue !important;
  }
  .star {
    background-color: white;
    position: absolute;
    height: 90px;
    width: 90px;
    z-index: 99;
    clip-path: polygon(
      50% 0%,
      63% 38%,
      100% 38%,
      69% 59%,
      82% 100%,
      50% 75%,
      18% 100%,
      31% 59%,
      0% 38%,
      37% 38%
    );
  }
`;

/*
============================================
Quaternary Component Creation and Styling...
============================================
*/

// Create a Bootstrap container fluid wrapper...
const fluid = styled.div.attrs({
  className: 'container-fluid'
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Core = styled.div`
  position: absolute;
  height: 750px;
  width: 950px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  zoom: .8;
  margin: auto;
`;

// Create and style television component outer div #51220e...
const TV = styled.div`
   position: absolute;
   height: 500px;
   width: 750px;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   margin: auto;
   background-color: #3b190a;
   zoom: 1.12;
   border-radius: 3px;
   z-index: 3;

   &:hover {
    // zoom: 1.13;
   }

   div:first-child {
    position: absolute;
    height: 400px;
    width: 550px;
    top: 50px;
    left: 50px;
    border-radius: 20px;
    background-color: black;

    p {
      position: absolute;
      color: green;
      font: 100px ${input};
      right: 25px;

    }
  }
`;

// Create and style backdrop img tag...
const Img = styled.img.attrs({
  src: 'http://media.idownloadblog.com/wp-content/uploads/2016/03/Apple-TV-colored-screen.png',
  height: '100%',
  width: '100%'
})`
  position: fixed;
`;

// Create and style color blocks...
const Blocks = styled.div`
  position: absolute;
  height: 400px;
  width: 200px;
  left: 199px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  // visibility: hidden;
  background-color: #e4141c;

  &::before {
    content: '';
    position: absolute;
    height: 400px;
    width: 60%;
    left: -319px;
    right: 0;
    top: 20px;
    bottom: 0;
    margin: 0 auto;
    // visibility: hidden;
    background-color: #f2711a;
  }
`;

// The styled search input...
const Input = styled.input.attrs({
  placeholder: 'search',
})`
  position: absolute;
  margin: auto;
  top: 0;
  left: 5px;
  right: 0;
  bottom: 0;
  height: 35px;
  width: 240px;
  border: none;
  background-color:  transparent;
  color: blue;
  opacity: .7;
  font-size: 35px;
  font-family: VT323, sf mono;
  border-radius: 10px;
  z-index: 6;

  &::placeholder {
    opacity: .7;
  }
`;

// The colored backing for the search input
// It has an aesthetic function only...
const ColorBox = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 35px;
  width: 240px;
  opacity: .2;
  color: blue;
  font-size: 66px;
  z-index: 5;
  background-color: blue;
`;

// The TV Box itself, not the wrapper...
const TVBox = styled.div`
  position: absolute;
  height: 60px;
  width: 300px;
  border-radius: 5px;
  top: 35px;
  left: 290px;
  z-index: 4;
  background-color: black;

  i {
    position: absolute;
    color: blue;
    font-size: 12px;
    left: 280px;
    top: 5px;
  }
`;

// The TV Control Panel...
const Panel = styled.div`
  position: absolute;
  background-color: #555555;
  color: #1d1f20;
  height: 350px;
  width: 125px;
  right: 78px;
  top: 195px;
  border: 2px solid gold;
  border-radius: 10px;
  font-size: 54px;
  z-index: 9;

  i {
    position: absolute;
  }
  .knob1 {
    transform: rotate(90deg);
    top: 25px;
    left: 35px;
  }
  .knob2 {
    transform: rotate(-42deg);
    top: 90px;
    left: 35px;
  }
  .sliders {
    top: 150px;
    left: 35px;
  }
  .chUP {
    font-size: 32px;
    top: 220px;
    left: 25px;
  }
  .chDWN {
    font-size: 32px;
    top: 260px;
    left: 25px;
  }
  .volUP {
    font-size: 32px;
    top: 220px;
    left: 65px;
  }
  .volDWN {
    font-size: 32px;
    top: 260px;
    left: 65px;
  }
  p {
    position: absolute;
    color: #aeaeae;
    left: 9px;
    bottom: 0px;
    font: 18px warnes;
  }
`;

// The Set top box antennae...
const Antennae = styled.div`
  position: absolute;
  left: 150px;
  top: -50px;
  height: 400px;
  width: 600px;
  z-index: 10;

  ::before, ::after {
    position: absolute;
    content: '';
    height: 100px;
    width: 0;
    top: -30px;
    border-radius: 10px;
    border-right: 8px solid black;
  }

  ::before {
    left: 50px;
    transform: rotate(45deg);
  }

  ::after {
    left: -50px;
    transform: rotate(-45deg);
  }
`;

// The TV Legs...
const Legs = styled.div`
  position: absolute;
  left: 170px;
  bottom: -400px;
  height: 400px;
  width: 600px;

  ::before, ::after {
    position: absolute;
    content: '';
    height: 100px;
    width: 0;
    border-radius: 10px;
    border-style: solid;
    border-color: transparent transparent black transparent;
    border-width: 0px 20px 160px 20px;
  }

  ::before {
    left: 50px;
    top: -140px;
    transform: rotate(235deg);
  }

  ::after {
    left: 520px;
    top: -140px;
    transform: rotate(125deg);
  }
`;

const TitleText = styled.h1`
  position: absolute;
  left: 25px;
  font: 78px barrio;
  color: white;

  span {
    font-size: 108px;
  }
  span:nth-child(2) {
    color: black;
  }
`;

const TVScreen = styled(Screen)`
  p {
    font-family: sf mono;
  }
  .star {
    background-color: white;
    position: absolute;
    height: 50px;
    width: 50px;
    z-index: 99;
    clip-path: polygon(
      50% 0%,
      63% 38%,
      100% 38%,
      69% 59%,
      82% 100%,
      50% 75%,
      18% 100%,
      31% 59%,
      0% 38%,
      37% 38%
    );
  }
`;

/*
==========================================
React Component Articulation and Render...
==========================================
*/

/*
Tertiary Components...
========================>
========================>*/
// Component for displaying stream channels and data...
class Screen extends React.Component {
// The constructor...
  constructor(props) {
    super(props);
// Input state object...
    this.state = {value: ''};
// Bind class methods...
    // this.doChange = this.doChange.bind(this);
    // this.doSubmit = this.doSubmit.bind(this);

  }

// Component markup...
  render() {
    return (
      <div className='blue'>
        <p>09</p>
        <div className='star'></div>
      </div>
    )
  }
}

// API querying form component, combines the input and colored backing into
// one component...
class SearchBox extends React.Component {
// The constructor...
  constructor(props) {
    super(props);
// Input state object...
    this.state = {value: ''};
// Bind class methods...
    this.doChange = this.doChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
  }

// onchange event handler...
  doChange(e) {
    this.setState({value: e.target.value})
  }

// onsubmit form event handler...
  doSubmit(e) {
    const {_input} = this.refs;

  }

// The markup...
  render() {
    return (
      <form onSubmit={this.doSubmit}>
        <Input ref='_input' value={this.state.value} onChange={this.doChange}/>
        <ColorBox />
      </form>
    )
  }
}

// TV control panel...
const ControlPanel =(props)=>
// Markup...
  <Panel>
    <i className='fa fa-minus-circle knob1'></i>
    <i className='fa fa-minus-circle knob2'></i>
    <i className='fa fa-sliders sliders'></i>
    <i className='fa fa-caret-square-o-up chUP'></i>
    <i className='fa fa-caret-square-o-down chDWN'></i>
    <i className='fa fa-caret-square-o-up volUP'></i>
    <i className='fa fa-caret-square-o-down volDWN'></i>
    <p>foStware</p>
  </Panel>

/*
Secondary Components...
========================>
========================>*/
// Television component...
const Television =(props)=>
// Markup
  <div>
    <TV>
      <Screen/>
    </TV>
    <ControlPanel/>
    <Legs/>
  </div>

// SearchBox component...
const SetTopBox =(props)=>
// Markup...
  <TVBox>
    <Antennae />
    <SearchBox />
    <i className='fa fa-power-off'></i>
  </TVBox>


/*
Primary Components...
=======================>
=======================>*/
// Title text...
const Title =()=>
// Markup...
  <TitleText>
    <span>T</span>
     witch.
    <span>TV</span>
  </TitleText>

// Backdrop component, img alias...
const BackDrop =(props)=>
// Return Markup
  <Img/>

const AppCore =(props)=>
// Markup...
  <Core>
    <SetTopBox />
    <Television />
  </Core>

/*
The Application UI...
=======================>
=======================>*/
const TwitchTVUI =(props)=>
// Return Markup
  <fluid>
    <BackDrop />
    <Title />
    <AppCore />
  </fluid>

// Render View...
const renderUI =()=>
  render(
    <TwitchTVUI/>, el('#root')
  )


go(()=> {
  renderUI();
})
