import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            search: '',
        };
        this.deleteMovie = this.deleteMovie.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies(response) {
        return axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies')
            .then(response => this.setState({ movies: response.data }));
    }

    deleteMovie(movieId) {
        axios.delete('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId)
            .then(() => this.loadMovies())
            .catch((response) => {
                this.loadMovies();
            }); 
    }

    getFilteredMovies() {
        return this.state.movies.filter((movie) => {
            return movie.title.toLowerCase().includes(this.state.search.toLowerCase()) 
                || movie.director.toLowerCase().includes(this.state.search.toLowerCase())
                || movie.rating.toString().includes(this.state.search);
        });
    }

    onChange(event) {
        this.setState({ search: event.target.value });
        return;
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <label htmlFor='search'></label>
                <input className='searchfield' type='text' name='search' id='search' placeholder='Search...' onChange={this.onChange} spellCheck='false'></input> 
                <table className='movie-table' cellSpacing='0' cellPadding='0'>
                    <thead>
                        <tr className='head-row'>
                            <th className='th-title'>Title</th>
                            <th className='th-director'>Director</th>
                            <th className='th-rating'>Rating</th>
                            <th className='th-edit'></th>
                            <th className='th-details'></th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.getFilteredMovies().map(movie => 
                            <tr className='movie-row' key={movie.id}>
                                <td className='td-title'>{movie.title}</td>
                                <td className='td-director'>{movie.director}</td>
                                <td className='td-rating'><Rater total={5} interactive={false} rating={Number(movie.rating)} />({movie.rating})</td>
                                <td className='links'>
                                    <Link to={'/edit/' + movie.id} className='edit-link'>Edit<i className='fas fa-edit edit-icon'></i></Link>
                                    <Link to={'/details/' + movie.id} className='details-link'>Details</Link>
                                    <button className='delete-button' onClick={() => this.deleteMovie(movie.id)}><i className='far fa-trash-alt'></i></button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>    
            </>
        );
    }
}

export default Home;