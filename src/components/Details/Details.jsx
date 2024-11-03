import React, { useEffect, useState } from "react";
import axios from "axios";
import styleDetails from "./StyleDetails.module.css";
import { Link, useParams } from "react-router-dom";

export default function Details() {
    const [objDetails, setObjDetails] = useState(null);
    const [collectionDetails, setCollectionDetails] = useState(null);
    const [seasons, setSeasons] = useState([]);
    let { id, media } = useParams();

    async function getMovieDetails() {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/${media}/${id}?api_key=ab6f02890a894dfd18b04c025b5de2eb`
        )

        if (data) {
            setTimeout(() => {
                setObjDetails(data);
                setSeasons(data.seasons);
            }, 200);
        }
    }

    async function getCollectionDetails(collectionId) {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/collection/${collectionId}?api_key=ab6f02890a894dfd18b04c025b5de2eb`
        )

        if (data) {
            setTimeout(() => {
                setCollectionDetails(data);
            }, 200);
        }
    }

    useEffect(() => {
        getMovieDetails();
    },);

    useEffect(() => {
        if (objDetails?.belongs_to_collection) {
            getCollectionDetails(objDetails.belongs_to_collection.id);
        }
    },);

    return (
        <>
            {(objDetails == null ? (
                <div
                    className={
                        styleDetails.bg_color +
                        " vh-100 overflow-hidden d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0"
                    }
                >
                    <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
                </div>
            ) : (
                <section className={styleDetails.Details + " container my-5"}>
                    <div className={styleDetails.bg_img + " row"}>
                        <div className="col-md-4">
                            <div>
                                <img
                                    src={"https://image.tmdb.org/t/p/w500/" + objDetails.poster_path}
                                    className="w-100"
                                    alt="poster"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/img/Sorry.png";
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-8 pt-2">
                            <div>
                                <h2>{objDetails.title || objDetails.name}</h2>
                                <h5 className={styleDetails.Color_Title}>{objDetails.tagline}</h5>
                                <div className="my-3">
                                    {objDetails.genres?.map((gen, index) => (
                                        <span key={index} className="me-2">
                                            <button className="btn btn-info px-1 py-0 text-white">
                                                {gen.name}
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <p>vote : {Math.round(objDetails.vote_average * 10) / 10}</p>
                                <p>vote count : {Math.round(objDetails.vote_count * 10) / 10}</p>
                                <p>popularity : {Math.round(objDetails.popularity * 10) / 10}</p>
                                <p>release date : {objDetails.release_date || objDetails.first_air_date}</p>
                                <p className={styleDetails.Color_Title}>{objDetails.overview}</p>
                                {objDetails.number_of_episodes && <p>number of episodes : {objDetails.number_of_episodes}</p>}
                                {objDetails.number_of_seasons && <p>number of seasons : {objDetails.number_of_seasons}</p>}
                                <Link to={objDetails.homepage} target="_blank"><button className="btn btn-info text-white">Visit Home page</button></Link>
                            </div>
                        </div>
                    </div>

                    {collectionDetails && (
                        <div className="container my-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styleDetails.collectionContainer}>
                                        <h3>{collectionDetails.name}</h3>
                                        <p>{collectionDetails.overview}</p>
                                    </div>
                                </div>
                                {collectionDetails.parts?.map((collPart, index) => (
                                    <div className={collectionDetails.parts?.length > 3 ? "col-md-3" : "col-md-2"} key={index}>
                                        <Link to={`/details/${media}/${collPart.id}`} className="text-decoration-none text-white">
                                            <div className={styleDetails.myImage}>
                                                <img
                                                    src={"https://image.tmdb.org/t/p/w500/" + collPart.poster_path}
                                                    className="w-100"
                                                    alt={collPart.title}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "/img/Sorry.png";
                                                    }}
                                                />
                                                <div className={styleDetails.rating}>
                                                    <p>{Math.round(collPart.vote_average * 10) / 10}</p>
                                                </div>
                                                <p>{collPart.title}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {seasons && (
    <div className="container my-5">
        <h3 className={styleDetails.collectionContainer2 + ' ' + styleDetails.collectionContainer}>Previous Seasons</h3>
        <div className="row">
            {seasons.map((season, index) => (
                <div className="col-md-3 text-decoration-none" key={index}>
                    <div className="text-decoration-none text-white">
                        <div className={styleDetails.myImage}>
                            <img
                                src={"https://image.tmdb.org/t/p/w500/" + season.poster_path}
                                className="w-100"
                                alt={season.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/Sorry.png";
                                }}
                            />
                            <div className={styleDetails.rating}>
                                <p>{Math.round(season.vote_average * 10) / 10}</p>
                            </div>
                            <p>{season.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
                    )}

                </section>
            ))}
        </>
    );
}
