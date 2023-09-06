import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import '../css/styles.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    largeImageURL: '',
    isLoading: false,
    isModalOpen: false,
    totalHits: 0, 
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleInputChange = (value) => {
    this.setState({ query: value });
  };  

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const newQuery = e.target.querySelector('input').value;
  
    if (newQuery !== query) {
      this.setState({ query: newQuery, page: 1, images: [] }, this.fetchImages);
    } else {
      this.fetchImages();
    }
  };

  fetchImages = () => {
    const { query, page, prevQuery } = this.state;
    const apiKey = '38418747-ec354076649bfa1b688ea2611';
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;
  
    this.setState({ isLoading: true });
  
    // Перевірка на зміну запиту перед виконанням нового запиту
    if (query !== prevQuery) {
      this.setState({ prevQuery: query, page: 1 }); // Оновити попередній запит і скинути сторінку до 1
  
      fetch(
        `${baseUrl}?q=${query}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            images: data.hits,
            page: 2,
            totalHits: data.totalHits,
          })
        )
        .catch((error) => console.error('Error fetching images:', error))
        .finally(() => this.setState({ isLoading: false }));
    } else {
      fetch(
        `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
            totalHits: data.totalHits,
          }))
        )
        .catch((error) => console.error('Error fetching images:', error))
        .finally(() => this.setState({ isLoading: false }));
    }
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ largeImageURL, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: '', isModalOpen: false });
  };

  render() {
    const { query, images, isLoading, isModalOpen, largeImageURL, totalHits } = this.state;
  
    return (
      <div className="App">
        <Searchbar query={query} onChange={this.handleInputChange} onSubmit={this.handleSubmit} />
  
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
  
        {isLoading && <Loader />}
  
        {images.length > 0 && images.length < totalHits && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
  
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;


