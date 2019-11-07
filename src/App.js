import React, { PureComponent } from 'react';
import axios from 'axios';
import apiKey from './config';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import '../src/App.css'

//components
import SearchForm from './components/Search';
import Nav from './components/Nav';
import PhotoList from './components/Results';
import FourOhFour from './components/FourOhFour';


export default class App extends PureComponent {

  constructor() {
    super();
    this.state = {
      loading: true,
      loadedSearch: ['Halloween', 'Skeleton', 'Candy'],
      query: ' ',
      redirect: false,
      activeSearch: [],
      h2: ''
    }
  }

  componentDidMount() {
    this.generatePhotos();
    this.performSearch('Halloween');
  }

  generatePhotos (){
    let searches = this.state.loadedSearch;
    for(let i = 0; i < searches.length; i++){
      let query = searches[i];
      searches[i] = [];
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1`)
          .then(response => {
            searches[i].push(response.data.photos.photo);
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
    }
  }

  handleNoResults(){
    this.setState({
      activeSearch: null,
      h2: 'Sorry'
    });
  }


  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&safe_search=1&content_type=photo&extras=url_l,url_sq&per_page=24&page=1&format=json&nojsoncallback=1`)
        .then(response => {

          (response.data.photos.photo.length > 0)
              ?
              this.setState({
                activeSearch: response.data.photos.photo,
                loading: false,
                h2: query,
                query,
              })
              : this.handleNoResults()
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
  };

  render () {
    return (
        <BrowserRouter>
          <div className="container">
            <SearchForm performSearch={this.performSearch}/>
            <Nav performSearch={this.performSearch} />
            <nav className="photo-container">
              <h2>{(this.state.h2 === 'Sorry')? 'Sorry' : `${this.state.h2} Photos`}</h2>
              {
                (this.state.loading)
                    ? <p>Loading...</p>
                    : <Switch>
                      <Route exact path="/" render={()=> <PhotoList data={this.state}/>} />
                      <Route path="/Halloween" render={()=> <PhotoList data={this.state} search={0}/>}/>
                      <Route path="/Skeleton" render={()=> <PhotoList data={this.state} search={1}/>}/>
                      <Route path="/Candy" render={()=> <PhotoList data={this.state} search={2}/>}/>
                      <Route path="/search" render={()=> <PhotoList data={this.state} /> }  />
                      <Route component={FourOhFour} />
                    </Switch>
              }
            </nav>
          </div>
        </BrowserRouter>
    );
  }
}