import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { filterCities } from '../../../state/citiesSlice';

import './TemperatureSlider.css';

let updateCities;

export default function TemperatureSlider() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Getting slider elements ones per render.
    const tSlider = document.querySelector('.t-slider');
    const sliderFiller = document.querySelector('.t-slider_filler');
    const tSliderHandle = document.querySelector('.t-slider_handle');
    const tValueElem = document.querySelector('.t-slider_handle p');

    function setTemperature(handlePos) {
      // This prevents from thousands of rerenders.
      clearTimeout(updateCities);

      handlePos = Math.min(Math.max(handlePos, 0), 300);
 
      // Moving the handle.
      tSliderHandle.style.marginLeft = `${handlePos}px`;
      sliderFiller.style.width = `${handlePos}px`;

      // Filtering cities.

      let t = (handlePos - 100) / 4;
      tValueElem.innerText = t;

      // I've added some precision for convinience.
      updateCities = setTimeout(() => {
        dispatch(filterCities(t));
      }, 200);
    }

    function mouseHandler(e) {
      const handlePos = e.clientX - tSlider.offsetLeft;
      setTemperature(handlePos);
    }

    function setMouseMove(e) {
      e.target.addEventListener('click', mouseHandler);
      e.target.addEventListener('mousemove', mouseHandler);
    }
  
    function resetMouseMove(e) {
      e.target.removeEventListener('click', mouseHandler);
      e.target.removeEventListener('mousemove', mouseHandler);
    }

    tSlider.addEventListener('mousedown', setMouseMove);
    tSlider.addEventListener('mouseover', resetMouseMove);

    setTemperature(120);
  });
  
  return (
    <>
      <p>Где сейчас теплее, чем</p>
      <div className="t-slider">
        <div className="t-slider_handle">
          <div />
          <p>-25</p >  
        </div>
        <div className="t-slider_filler" />
      </div>      
    </>    
  );
}