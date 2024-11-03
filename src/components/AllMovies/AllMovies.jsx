import axios from 'axios'
import React, { useEffect, useState } from "react";
import styleAllMovies from './AllMovies.module.css'
import { Link } from 'react-router-dom';

export default function AllMovies() {

    const [AllMovies, setAllMovies] = useState(null);

    async function getAllMovies(){
        let {data} = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ab6f02890a894dfd18b04c025b5de2eb')
        setTimeout(()=>{
            setAllMovies(data.results)
        }, 200)
    }

    useEffect(() => {
        
        getAllMovies()
        
    },);



return (
    <>
    {(AllMovies) == null ? <div
        className={
            styleAllMovies.bg_color +
            " vh-100 overflow-hidden d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0"
        }
        >
        <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
        </div>:<section className={styleAllMovies.Movies + " container"}>
        <div className="row">
            {AllMovies.map((Movie , index)=>{
                return <div key={index} className="col-lg-2 co-md-4 col-sm-6">
                <Link to={`/details/movie/${Movie.id}`}  className='text-decoration-none'>
                <div className={styleAllMovies.wrapper}>
                <div className={styleAllMovies.myImage}>
                    <img
                            src={
                                "https://image.tmdb.org/t/p/w500/" +
                                Movie.poster_path
                            }
                            className="w-100"
                            alt="movies"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Sorry.png";
                            }}
                            />
                        <div className={styleAllMovies.rating}>
                            <p>{Math.round(Movie.vote_average * 10) / 10}</p>
                        </div>
                    </div>
                        <p>{Movie.title}</p>
                </div>
                </Link>
            </div>
            })}
        </div>
    </section>}
    
    
    </>
)
}
