import React, { useEffect, useState } from "react";
import styleHome from "./StyleHome.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [allMovies, setAllMovies] = useState(null);
  const [allTV, setAllTV] = useState(null);
  const [people, setAllPeople] = useState(null);

  async function getTrendingMovies() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=ab6f02890a894dfd18b04c025b5de2eb"
    );
    setTimeout(() => {
      setAllMovies(data.results);
    }, 200);
  }

  async function getTrendingTV() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=ab6f02890a894dfd18b04c025b5de2eb"
    );
    setAllTV(data.results);
  }

  async function getTrendingPeople() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/day?api_key=ab6f02890a894dfd18b04c025b5de2eb"
    );
    setAllPeople(data.results);
  }



  useEffect(() => {
    getTrendingMovies();
    getTrendingTV();
    getTrendingPeople();
  }, []);

  return (
    <>
      {(allMovies && allTV) == null ? (
        <div
          className={
            styleHome.bg_color +
            " vh-100 overflow-hidden d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0"
          }
        >
          <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
        </div>
      ) : (
        <div>
          <section className={styleHome.TrendingMovies + " container"}>
            <div className="row ">
              <div className="col-lg-4">
                <div>
                  <h2>
                    Trending
                    <div>Movies</div>
                    toWatch Now
                  </h2>
                  <p>Most watched Movies by days</p>
                </div>
              </div>

              {allMovies.slice(0,10).map((mov, index) => {
                return (
                  <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                    <Link to={`/details/movie/${mov.id}`} className="text-decoration-none">
                    <div className={styleHome.wrapper}>
                      <div className={styleHome.myImage}>
                        <div>
                            <img
                              src={
                                "https://image.tmdb.org/t/p/w500/" +
                                mov.poster_path
                              }
                              className="w-100"
                              alt="movies"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Sorry.png";
                              }}
                            />
                          <div className={styleHome.rating}>
                            <p>{Math.round(mov.vote_average * 10) / 10}</p>
                          </div>
                        </div>
                        <p className="TitleImg">{mov.title}</p>
                      </div>
                    </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
                                      {/* TV */}
          <section
            className={
              styleHome.TrendingMovies + " container " + styleHome.TrendingTV
            }
          >
            <div className="row ">
              <div className="col-lg-4">
                <div>
                  <h2>
                    Trending
                    <div>TV</div>
                    toWatch Now
                  </h2>
                  <p>Most watched TV by days</p>
                </div>
              </div>

              {allTV.slice(0,10).map((TV, index) => {
                return (
                  <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                    <Link to={`/details/tv/${TV.id}`}className="text-decoration-none">
                    <div className={styleHome.wrapper}>
                      <div className={styleHome.myImage}>
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
                          <div className={styleHome.rating}>
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
                                      {/* People */}
          <section
            className={
              styleHome.TrendingMovies +
              " container " +
              styleHome.TrendingTV +
              " " +
              styleHome.TrendingPeople
            }
          >
            <div className="row ">
              <div className="col-lg-4">
                <div>
                  <h2>
                    Trending
                    <div>People</div>
                    toWatch Now
                  </h2>
                  <p>Most watched People by days</p>
                </div>
              </div>

              {people.slice(0,10).map((person, index) => {
                return (
                  <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                    <div className={styleHome.wrapper}>
                      <div className={styleHome.myImage}>
                        <div>
                          <img
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              person.profile_path
                            }
                            className="w-100"
                            alt="People"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/img/Sorry.png";
                            }}
                          />
                        </div>
                        <p className="TitleImg p-0 m-0">{person.name}</p>
                        <p className={"p-0 m-0"}> department : </p>
                        <button className="btn btn-info p-0 mb-3">
                          {person.known_for_department}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
