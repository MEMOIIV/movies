import axios from "axios";
import React, { useEffect, useState } from "react";
import stylePeople from "./people.module.css";

export default function People() {
const [people, setAllPeople] = useState(null);

async function getTrendingPeople() {
    let { data } = await axios.get(
    "https://api.themoviedb.org/3/trending/person/day?api_key=ab6f02890a894dfd18b04c025b5de2eb"
    );
    setTimeout(() => {
    setAllPeople(data.results);
    }, 200);
}

useEffect(() => {
    
    getTrendingPeople()
    
}, );

return (
    <>
    {people == null ? (
        <div
        className={
            stylePeople.bg_color +
            " vh-100 overflow-hidden d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bottom-0"
        }
        >
        <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
        </div>
    ) : (
        <section className={stylePeople.people + " container "}>
        <div className="row">
            {people.map((person, index) => {
            return (
                <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                <div className={stylePeople.wrapper}>
                    <div className={stylePeople.myImage}>
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
    )}
    </>
  );
}
