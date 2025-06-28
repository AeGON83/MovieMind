/** @format */

import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import Navbar from './Navbar';

const type = 'movie';

export default function DiscoverPage() {
  const { id: genreId } = useParams();

  const [discoverDataList, setDiscoverDataList] = useState({});
  const [loading, setLoading] = useState(false);

  // Simplified state management
  const [filters, setFilters] = useState({
    includeAdult: false,
    sortBy: 'popularity.desc',
    year: 2022,
    selectedGenre: null,
  });

  const options = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  const [selectedOption, setSelectedOption] = useState(() => {
    let curOpt = options.filter((item) => item.id == genreId);
    return curOpt[0] || options[0];
  });

  // Handle sort changes
  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({ ...prev, sortBy: sortValue }));
  };

  const handleOptionChange = (e) => {
    setSelectedOption(() => {
      let curOpt = options.filter((item) => item.name === e.target.value);
      return curOpt[0];
    });
  };

  function handleYearChange(value) {
    setFilters((prev) => ({ ...prev, year: value }));
  }

  const handleAdultChange = (checked) => {
    setFilters((prev) => ({ ...prev, includeAdult: checked }));
  };

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?${
      filters.includeAdult ? 'include_adult=true' : 'include_adult=false'
    }&include_video=false&language=en-US&page=1&sort_by=${filters.sortBy}&year=${
      filters.year
    }&with_genres=${selectedOption.id}`;

    console.log(apiUrl);

    const apiReqOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    fetch(apiUrl, apiReqOptions)
      .then((response) => response.json())
      .then((response) => {
        setDiscoverDataList(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [filters, selectedOption]);

  return (
    <div>
      <Navbar />
      <div className='discover-section'>
        <div className='filters-slide'>
          <div className='filters-containar'>
            <h2 className='filter-containar-title'>Filters</h2>

            {/* Include Adult */}
            <ul className='filter-list'>
              <h3 className='filter-list-category-title'>Content</h3>
              <li className='filter-list-item'>
                <label htmlFor='include-adult'>Include Adult</label>
                <label className='search-bar-switch'>
                  <input
                    id='include-adult'
                    type='checkbox'
                    checked={filters.includeAdult}
                    onChange={(e) => handleAdultChange(e.target.checked)}
                  />
                  <span className='slider round'></span>
                </label>
              </li>
            </ul>

            {/* Genre and Year */}
            <ul className='filter-list'>
              <li className='filter-list-item'>
                <label
                  htmlFor='genre-select'
                  className='filter-input-lable'
                >
                  Genre
                </label>
                <select
                  id='genre-select'
                  value={selectedOption.name}
                  onChange={handleOptionChange}
                >
                  {options.map((option, index) => (
                    <option
                      key={index}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className='filter-list-item'>
                <label
                  htmlFor='year-input'
                  className='filter-input-lable'
                >
                  Year
                </label>
                <input
                  id='year-input'
                  type='number'
                  min={1900}
                  max={2024}
                  className='filter-input-input'
                  placeholder='2022'
                  value={filters.year}
                  onChange={(e) => handleYearChange(e.target.value)}
                />
              </li>
            </ul>

            {/* Sort Options */}
            <ul className='filter-list'>
              <h3 className='filter-list-category-title'>Sort By</h3>

              <li className='filter-list-item'>
                <label className='filter-sortby-label'>
                  <input
                    type='radio'
                    name='sort'
                    value='revenue.asc'
                    checked={filters.sortBy === 'revenue.asc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  <span>Revenue (Low to High)</span>
                </label>
                <label className='desc-arrow'>
                  <input
                    type='radio'
                    name='sort'
                    value='revenue.desc'
                    checked={filters.sortBy === 'revenue.desc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>

              <li className='filter-list-item'>
                <label className='filter-sortby-label'>
                  <input
                    type='radio'
                    name='sort'
                    value='popularity.asc'
                    checked={filters.sortBy === 'popularity.asc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  <span>Popularity (Low to High)</span>
                </label>
                <label className='desc-arrow'>
                  <input
                    type='radio'
                    name='sort'
                    value='popularity.desc'
                    checked={filters.sortBy === 'popularity.desc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>

              <li className='filter-list-item'>
                <label className='filter-sortby-label'>
                  <input
                    type='radio'
                    name='sort'
                    value='vote_count.asc'
                    checked={filters.sortBy === 'vote_count.asc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  <span>Vote Count (Low to High)</span>
                </label>
                <label className='desc-arrow'>
                  <input
                    type='radio'
                    name='sort'
                    value='vote_count.desc'
                    checked={filters.sortBy === 'vote_count.desc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>

              <li className='filter-list-item'>
                <label className='filter-sortby-label'>
                  <input
                    type='radio'
                    name='sort'
                    value='vote_average.asc'
                    checked={filters.sortBy === 'vote_average.asc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  <span>Rating (Low to High)</span>
                </label>
                <label className='desc-arrow'>
                  <input
                    type='radio'
                    name='sort'
                    value='vote_average.desc'
                    checked={filters.sortBy === 'vote_average.desc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>

              <li className='filter-list-item'>
                <label className='filter-sortby-label'>
                  <input
                    type='radio'
                    name='sort'
                    value='primary_release_date.asc'
                    checked={filters.sortBy === 'primary_release_date.asc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  <span>Release Date (Old to New)</span>
                </label>
                <label className='desc-arrow'>
                  <input
                    type='radio'
                    name='sort'
                    value='primary_release_date.desc'
                    checked={filters.sortBy === 'primary_release_date.desc'}
                    onChange={(e) => handleSortChange(e.target.value)}
                  />
                  ↓
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className={`movies-slides ${loading ? 'loading' : ''}`}>
          {loading ? (
            <div
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                color: 'white',
                fontSize: '1.2rem',
              }}
            >
              Loading movies...
            </div>
          ) : discoverDataList.results ? (
            discoverDataList.results.map((item) => (
              <MovieCard
                type={type}
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                title={item.title}
                name={item.name}
                overview={item.overview}
                release_date={item.release_date}
                first_air_date={item.first_air_date}
                vote_average={item.vote_average}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                color: 'white',
                fontSize: '1.2rem',
                padding: '2rem',
              }}
            >
              <p>🎬</p>
              <p>No movies found</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
