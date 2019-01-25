import React, { Component } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableHighlight, Button } from 'react-native'
import { Container, Header, Content, Item,
  //For Card view
  Card, CardItem, Text, Body,

} from 'native-base';

// Life cycle of React
// --> componentWillMount()
// --> set the initial state in the constructor
// --> render()
// --> componentDidMount()
// --> setState()
// --> render()
// --> repeat setState() and render()



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cards: [], // responsible for displaying the cards
      defaultVal: 5,
      url: 'http://placekitten.com/g/200/',
      cardDatas: [] // responsible for keeping track of the cards stored data
    };
  }

  // For some reason, we have to wait for the fonts to be completely uploaded
  // before rendering
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({
      loading: false
    });
  }

  componentDidMount(){
    this._handlePopulate(this.state.defaultVal);
  }

// Handles the view of the single page application
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <Container >
        <Header />
        <Content>
          <Item regular>
              <TextInput
                keyboardType="numeric"
                returnKeyType="go"
                defaultValue={String(this.state.defaultVal)}
                onChangeText= { (num) => this._handlePopulate(num) } />

          </Item>
          <Item regular style= {styles.center}>
            <Button
              onPress={ this._fillWithCats }
              title="Fill with cats"
              color="#841584"
            />
          </Item>
          { this.state.cards }
        </Content>
      </Container>
    );
  }

  // This function responsibles for filling the display with cats
  _fillWithCats = () => {
     for (let i = 0; i < this.state.cards.length; i++) {
       var random = Math.floor(Math.random() * 1000) + 1;
       this.state.cards[i] =
         <TouchableHighlight key={this.state.cardDatas[i].index}
         onPress={ () => this._toggleActive(this.state.cardDatas[i].index) }
         style={ this.state.cardDatas[i].activeStatus? styles.active: styles.inactive }>
           <Card style= { styles.center} >
             <CardItem>
               <Body>
                 <Text>{this.state.cardDatas[i].activeStatus? this.state.cardDatas[i].index:''}</Text>
                 <Image source={{uri: this.state.url+random }} style={{height: 350, width: 250, flex: 1}}/>
               </Body>
             </CardItem>
           </Card>
         </TouchableHighlight>;
         this.state.cardDatas[i].url = this.state.url+random;
     }
     this.setState({
       cards: this.state.cards,
       cardDatas: this.state.cardDatas
     });
  }

  // This function responsibles for filling the display with cards and numbers
  _handlePopulate = (num) => {
    let cards = [];
    let cardDatas = [];

    for (let i = 0; i < num; i++) {
      console.log(i);
      cards.push(
        <TouchableHighlight key={i+1} onPress={ () => this._toggleActive(i+1) } style={styles.inactive}>
          <Card style= { styles.center} >
            <CardItem>
              <Body>
                <Text></Text>
                <Image style={{height: 350, width: 250, flex: 1}}/>
              </Body>
            </CardItem>
          </Card>
        </TouchableHighlight>
      );

      cardDatas.push( { index: i+1, url:'', activeStatus: false  });
    }

    this.setState({
      cards: cards,
      cardDatas: cardDatas
    });
    console.log('Card datas: '+cardDatas);
  }

  // handles the click of each card
   _toggleActive = (key) => {
     console.log('key: '+key);
     let cards = [];
     let cardDatas = this.state.cardDatas;

     for (let i = 0; i < cardDatas.length; i++) {

       if (cardDatas[i].index == key ) {
         if (cardDatas[i].activeStatus) {
           cardDatas[i].activeStatus = false;
         } else {
           cardDatas[i].activeStatus = true;
         }
       } else {
         cardDatas[i].activeStatus = false;
       }

       cards.push(
         <TouchableHighlight key={cardDatas[i].index}
          onPress={ () => this._toggleActive(cardDatas[i].index) }
          style={ cardDatas[i].activeStatus? styles.active: styles.inactive }>
           <Card style= { styles.center} >
             <CardItem>
               <Body>
                 <Text>{cardDatas[i].activeStatus? cardDatas[i].index:''}</Text>
                 <Image source={ {uri: cardDatas[i].url } } defaultSource={require('./assets/icon.png')}  style={{height: 350, width: 250, flex: 1}}/>
               </Body>
             </CardItem>
           </Card>
         </TouchableHighlight>
       );
     }
     this.setState ({
       cards: cards,
       cardDatas: cardDatas
     });
     console.log("Updated card: "+ cards);
     console.log("Updated cardDatas: "+ cardDatas);
     for (var i = 0; i < cardDatas.length; i++) {
       console.log(cardDatas[i]);
     }
   }
}



const styles = StyleSheet.create({
   center: {
     alignItems: 'center',
     justifyContent: 'center'
   },
   //style for cards
   active: {
     backgroundColor: 'red'
   },
   inactive: {
     backgroundColor: 'green'
   }
});
