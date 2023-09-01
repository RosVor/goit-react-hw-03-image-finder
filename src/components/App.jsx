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
    this.setState({ images: [], page: 1 }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = '38418747-ec354076649bfa1b688ea2611';
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    this.setState({ isLoading: true });

    fetch(
      `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ largeImageURL, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: '', isModalOpen: false });
  };

  render() {
    const { query, images, isLoading, isModalOpen, largeImageURL } = this.state;

    return (
      <div className="App">
        <Searchbar query={query} onChange={this.handleInputChange} onSubmit={this.handleSubmit} />

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
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


