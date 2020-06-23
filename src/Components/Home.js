import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MovieList from './MovieList'
import Modal from 'react-modal';

const API_URL="http://www.omdbapi.com/";
const API_KEY="cc76a706&s"

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            year: '',
            details: ''
        }
    }
    titleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    yearChange = (e) => {
        this.setState({
            year: e.target.value
        })        
    }

    changeHandler = (e) => {
        var query = `${API_URL}?apikey=${API_KEY}&s=${this.state.title}&y=${this.state.year}`

        fetch(query)
            .then(response => response.json())
            .then(data => {
                this.setState({ details: data.Search }
                )
            });
    }

    render() {
        return (
            <div>
                <div>
                    <Tabs>
                        <TabList>
                            <Tab>Movie by Year</Tab>
                            <Tab>Movie Poster</Tab>
                        </TabList>

                        <TabPanel>
                            <div>
                                <center>
                                    <table>
                                        <tr>
                                            <td><b>Movie Title</b></td>
                                            <td><input type="text" name="MovieTitle" id="movieTitle" onChange={this.titleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Movie Release Year</b></td>
                                            <td><input type="text" name="MovieYear" id="movieYear" onChange={this.yearChange} /></td>
                                        </tr>
                                    </table>
                                    <input type="submit" value="Search" onClick={this.changeHandler}></input>
                                </center>
                            </div>
                            <div>
                                <table id="table1" border='1'>
                                    <MovieList movieData={this.state.details} isPosterVisible={false} />
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <center>
                                    <table>
                                        <tr>
                                            <td><b>Movie Title</b></td>
                                            <td><input type="text" name="MovieTitle" id="movieTitle_" onChange={this.titleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Movie Release Year</b></td>
                                            <td><input type="text" name="MovieYear" id="movieYear_" onChange={this.yearChange} /></td>
                                        </tr>
                                    </table>
                                    <input type="submit" value="Search" onClick={this.changeHandler}></input>
                                </center>
                            </div>
                            <div>
                                <table id="table2" border='1'>
                                    <MovieList movieData={this.state.details} isPosterVisible={true} />
                                </table>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Home
