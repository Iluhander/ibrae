import React, { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { filterCities } from '../../../state/citiesSlice';

import './TemperatureSlider.css';

let updateCities;

export default function TemperatureSlider() {
  const dispatch = useDispatch();

  // Slider elements.
  const tSlider = useRef(null);
  const sliderFiller = useRef(null);
  const tSliderHandle = useRef(null);
  const tValueElem = useRef(null);

  useEffect(() => {
    function setTemperature(handlePos) {
      // This prevents from thousands of rerenders.
      clearTimeout(updateCities);

      handlePos = Math.min(Math.max(handlePos, 0), 300);
 
      // Moving the handle.
      tSliderHandle.current.style.marginLeft = `${handlePos}px`;
      sliderFiller.current.style.width = `${handlePos}px`;

      // Filtering cities.

      let t = (handlePos - 100) / 4;
      tValueElem.current.innerText = t;

      // I've added some precision for convinience.
      updateCities = setTimeout(() => {
        dispatch(filterCities(t));
      }, 200);
    }

    function mouseHandler(e) {
      const handlePos = e.clientX - tSlider.current.offsetLeft;
      setTemperature(handlePos);
    }

    function mouseDownHandler(e) {
      document.addEventListener('mousemove', mouseHandler);
    }

    tSlider.current.addEventListener('mousedown', mouseDownHandler)
    tSliderHandle.current.addEventListener('mousedown', mouseDownHandler);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', mouseHandler);
    });

    setTemperature(120);
  });
  
  return (
    <>
      <p>Где сейчас теплее, чем</p>
      <div ref={tSlider} className="t-slider">
        <div ref={tSliderHandle} className="t-slider_handle">
          <div />
          <p ref={tValueElem}>-25</p >  
        </div>
        <div ref={sliderFiller} className="t-slider_filler" />
      </div>      
    </>    
  );
}