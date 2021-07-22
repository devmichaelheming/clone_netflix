import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null)

    useEffect(() => {
        const loadAll = async () => {
            // PEGANDO A LISTA TOTAL DE FILMES
            let list = await Tmdb.getHomeList();
            setMovieList(list);
            
            // PEGANDO O FILME EM DESTAQUE
            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatureData(chosenInfo);
        }

        loadAll();
    }, [])

    return (
        <div className="page">
            
            {featureData &&
                <FeatureMovie item={featureData} />
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    )
}