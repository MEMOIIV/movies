import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styleAllTV from "./AllTvShow.module.css";
export default function AllTvShow() {

const [allTV, setAllTV] = useState(null);

async function getTrendingTV() {
    let { data } = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?api_key=ab6f02890a894dfd18b04c025b5de2eb"
    );
    setTimeout(() => {
    setAllTV(data.results);
    }, 200);
}

useEffect(() => {
    
    getTrendingTV()
    
}, []);

return (
    <>
    {allTV == null ? (
        <div
        className={
            styleAllTV.bg_color +
            " vh-100 overflow-hidden d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0"
        }
        >
        <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
        </div>
    ) : (
        <section className={styleAllTV.Tv + " container "}>
        <div className="row ">
            {allTV.map((TV, index) => {
            return (
                <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                <Link
                    to={`/details/tv/${TV.id}`}
                    className="text-decoration-none"
                >
                    <div className={styleAllTV.wrapper}>
                    <div className={styleAllTV.myImage}>
                        <div>
                        <img
                            src={
                            "https://image.tmdb.org/t/p/w500/" +
                            TV.poster_path
                            }
                            className="w-100"
                            alt="Tv"
                            onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/Sorry.png";
                            }}
                        />
                        <div className={styleAllTV.rating}>
                            <p>{Math.round(TV.vote_average * 10) / 10}</p>
                        </div>
                        </div>
                        <p className="TitleImg">{TV.name}</p>
                    </div>
                    </div>
                </Link>
                </div>
            );
            })}
        </div>
        </section>
    )}
    </>
);
}
