import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            changed: false,
        }
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.loadMovie();
    }

    loadMovie() {
        const movieId = this.props.match.params.id;
        return axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId)
            .then((response) => {
                this.setState({ movie: response.data })
            });
    }

    onChange(event) {
        event.preventDefault();

        const movieInfo = { ...this.state.movie };
        movieInfo[event.target.id] = event.target.value;
        this.setState({ movie: movieInfo });
    }

    save(event) {
        event.preventDefault();

        const movieId = this.props.match.params.id;
        axios.put('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId, this.state.movie)
            .then(() => {
                this.setState({ changed: true });
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
        if (this.state.changed) {
            return <Redirect to='/' />
        }
        if (!this.state.movie) {
            return <></>;
        }
        
        return (
            <>
            <Helmet>
                <title>Edit</title>
            </Helmet> 
            <section className='edit-section'>
            <form className='edit-movie' onSubmit={this.onSubmit}>
               <h1 className='edit-head-title'>edit movie.</h1> 
               <label className='label-title' htmlFor='title'>Title</label> 
               <input className='edit-title' type='text' name='title' id='title' minLength='1' maxLength='40' value={this.state.movie.title} onChange={this.onChange} required='required' spellCheck='false'></input>  

               <label className='label-description' htmlFor='description'>Description</label>
               <textarea className='edit-description' name='description' id='description' rows='5' cols='33' minLength='1' maxLength='300' value={this.state.movie.description} onChange={this.onChange} required='required' spellCheck='false'></textarea>

               <label className='label-director' htmlFor='director'>Director</label> 
               <input className='edit-director' type='text' name='directors' id='director' minLength='1' maxLength='40' value={this.state.movie.director} onChange={this.onChange} required='required' spellCheck='false'></input>  

               <div className='rating-number'><Rater total={5} interactive={false} rating={Number(this.state.movie.rating)} />({this.state.movie.rating})</div>

               <label className='label-rating' htmlFor='rating'></label> 
               <input className='edit-rating' type='range' name='rating' id='rating' min='0' max='5' step='0.1' value={this.state.movie.rating} onChange={this.onChange} required='required' spellCheck='false'></input>  

               <button className='edit-button' onClick={this.save}>Save changes</button>
            </form> 
            </section>
            </>
        );
    }
}

export default Edit;