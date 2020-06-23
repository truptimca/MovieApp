import React, { Component, useState } from 'react'
import Modal from 'react-modal';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetails: '',
            modalIsOpen: false,
            imdbID: '',
            BoxofficeStatus: ''
        }
    }

    displayMovieDetailsInModal = (imdbID) => {
        fetch(`http://www.omdbapi.com/?apikey=cc76a706&i=${imdbID}&plot=full`)
            .then(response => response.json())
            .then(data => {
                this.setState({ movieDetails: data, modalIsOpen: "true" })
                console.log("movieDetails>>>>", this.state.movieDetails)
                console.log("modal>>>>", this.state.modalIsOpen)
                console.log("imdbID>>>>", imdbID)
            })
        this.setState({ modalIsOpen: true })
    }

    render() {
        return (
            this.props.movieData ?
                this.props.movieData.map((item) => {
                    return (
                        <tr >
                            <td id="td1">
                                <table>
                                    <tr>
                                        <td>Title:</td>
                                        <td>{item.Title}</td>
                                    </tr>
                                    <tr>
                                        <td>Release Year:</td>
                                        <td>{item.Year}</td>
                                    </tr>
                                    <tr>
                                        <td>Type:</td>
                                        <td>{item.Type}</td>
                                    </tr>
                                    {this.props.isPosterVisible ?
                                        <tr>
                                            <td colspan="2"><img src={item.Poster} style={{ height: '500px' }} /></td>
                                        </tr> :
                                        ""
                                    }
                                </table>
                                <center>
                                    <input type="button" className="buttonMore" value="More Info" onClick={() => this.displayMovieDetailsInModal(item.imdbID)} />
                                </center>
                                <Modal className="movieModal" isOpen={this.state.modalIsOpen}>
                                    <table>
                                        <tr>
                                            <td colspan="2"><h3>{this.state.movieDetails.Title}</h3></td>
                                        </tr>
                                        <tr>
                                            <td> Type : </td>
                                            <td> {this.state.movieDetails.Type}</td>
                                        </tr>
                                        <tr>
                                            <td> Actors : </td>
                                            <td> {this.state.movieDetails.Actors}</td>
                                        </tr>
                                        <tr>
                                            <td> Language : </td>
                                            <td> {this.state.movieDetails.Language}</td>
                                        </tr>
                                        <tr>
                                            <td> Award : </td>
                                            <td> {this.state.movieDetails.Awards} </td>
                                        </tr>
                                        <tr>
                                            <td> Director : </td>
                                            <td> {this.state.movieDetails.Director} </td>
                                        </tr>
                                        <tr>
                                            <td> Released Date: </td>
                                            <td> {this.state.movieDetails.Released} </td>
                                        </tr>
                                        <tr>
                                            <td id="tdBoxOfc" colspan="2"><h4>Boxoffice : {parseInt(this.state.movieDetails.imdbRating) > 7 ? "Hit" : "Flop"}</h4></td>
                                        </tr>
                                    </table>
                                    <div>
                                        <button id="btnClose" onClick={() => this.setState({ modalIsOpen: false })}>close</button>
                                    </div>
                                </Modal>
                            </td>
                        </tr>
                    )
                }) :
                ""
        );
    }
}

export default MovieList;
