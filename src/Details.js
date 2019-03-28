import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import axios from 'axios';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            errorMessage: '',
        }
    }

    componentDidMount() {
        this.loadMovie();
    }

    loadMovie() {
        const movieId = this.props.match.params.id;
        return axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId)
            .then((response) => {
                this.setState({ movie: response.data })
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    this.setState({ errorMessage: 'Oops... 404 movie not found'});
                }
            }); 

    }

    render() {
        if (this.state.errorMessage) {
            return <h1>{this.state.errorMessage}</h1>
        }
        if (!this.state.movie) {
            return <></>;
        }
        return (
            <>
            <Helmet>
                <title>Details</title>
            </Helmet> 
            <section className='details-section'>
               <h1 className='details-head-title'>movie info.</h1> 
               <div className='details-box'>
                <h2 className='details-label-title'>Title</h2>
                <p className='details-info'>{this.state.movie.title}</p>
               </div>
               <div className='details-description'>
                <h2 className='details-label-description'>Description</h2>
                <p className='details-info'>{this.state.movie.description}</p>
               </div>
               <div className='details-box'>
                <h2 className='details-label-director'>Director</h2>
                <p className='details-info'>{this.state.movie.director}</p>
               </div>
               <div className='details-box'>
                <h2 className='details-label-rating'>Rating</h2>
                <div className='details-info'><Rater total={5} interactive={false} rating={Number(this.state.movie.rating)} />({this.state.movie.rating})</div>
               </div>
               <Link to={'/edit/' + this.state.movie.id} className='details-edit-button'>Edit</Link>
            </section>
            </>
        );
    }
}

export default Details;