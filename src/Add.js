import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import axios from 'axios';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMovie: {
                title: '',
                director: '',
                description: '',
                rating: 5,
            },
            added: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const movieInfo = { ...this.state.newMovie };
        movieInfo[event.target.id] = event.target.value;
        this.setState({ newMovie: movieInfo });
    }

    onSubmit(event) {
        event.preventDefault();

        axios.post('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies', this.state.newMovie)
            .then(() => {
                this.setState({ added: true });
            })
            .catch((error) => {
                console.log(error.response);
                
            });
    }

    render() {
        if (this.state.added) {
            return <Redirect to='/' />
        }
        return (
            <>
            <Helmet>
                <title>Add</title>
            </Helmet>    
            <section className='add-section'>
            <form className='add-movie' onSubmit={this.onSubmit}>
               <h1 className='add-head-title'>add movie.</h1>  
               <label className='label-title' htmlFor='title'>Title</label> 
               <input className='add-title' type='text' name='title' id='title' minLength='1' maxLength='40' value={this.state.newMovie.title} onChange={this.onChange} required='required' spellCheck='false'></input>  

               <label className='label-description' htmlFor='description'>Description</label>
               <textarea className='add-description' name='description' id='description' rows='5' cols='33' minLength='1' maxLength='300' value={this.state.newMovie.description} onChange={this.onChange} required='required' spellCheck='false'></textarea>

               <label className='label-director' htmlFor='director'>Director</label> 
               <input className='add-director' type='text' name='directors' id='director' minLength='1' maxLength='40' value={this.state.newMovie.director} onChange={this.onChange} required='required' spellCheck='false'></input>  

               <div className='rating-number'><Rater total={5} interactive={false} rating={Number(this.state.newMovie.rating)} />({this.state.newMovie.rating})</div>

               <label className='label-rating' htmlFor='rating'></label> 
               <input className='add-rating' type='range' name='rating' id='rating' min='0' max='5' step='0.1' value={this.state.newMovie.rating} onChange={this.onChange} required='required' spellCheck='false'></input>  

               <button className='add-button'>Add movie</button>
            </form>    
            </section>
            </>
        );
    }
}

export default Add;