import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import Table from './Table';

const Container = styled.div`
  border: 1px solid lightgrey;
  width:650px;
  float:left;
`;

const Container1 = styled.div`
  border: 1px solid lightgrey;
  width:630px;
  float:right;
`;

const Analysis = () => {
  const [data, setData] = useState([]);
  const hourLabel = [];
  const dayLabel = [];
  const eatingData = [];
  const foodData = [];
  const animalData = [];
  const inputVideo = "/video/input.mp4";
  const outputVideo = "/video/output.mp4";

  // fetch data in a json format from database server
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/');
      res
        .json()
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }

    fetchData();
  }, []);

  // set timer and reload page hourly
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // get last 24 rows
  const hourData = data.slice(-24)
  // get 7 rows where the time is between 22:00 to 23:00
  const dayData = data.filter(item => item.COUNT_TIME !== null ?
    item.COUNT_TIME.substring(11, 13) === '22' : '').slice(-7)

  // Iterate the hour data and add items to different arrays.
  hourData.forEach(item => {
    hourLabel.push(item.COUNT_TIME.substring(11, 16));
    eatingData.push(Math.floor((item.ANIMAL_EATING / item.ANIMAL_ALL) * 100));
    foodData.push(item.FOOD_VOLUME / 130);
  });

  // Iterater the day data and add items to a new array.
  dayData.forEach(item => { animalData.push(item.ANIMAL_ALL); dayLabel.push(item.COUNT_TIME.substring(5, 10)) }
  );

  // Bar chart
  const bar = {
    labels: hourLabel,
    datasets: [
      {
        type: 'line',
        label: 'Eating Rate(%)',
        fill: false,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 2,
        // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        // hoverBorderColor: 'rgba(255,99,132,1)',
        data: eatingData,
      },
      {
        type: 'bar',
        label: 'Food Remaining(mL)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 2,
        hoverBackgroundColor: 'lightblue',
        hoverBorderColor: 'lightblue',
        data: foodData,
      },
    ],
  };

  // Line chart
  const line = {
    labels: dayLabel,
    datasets: [
      {
        type: 'line',
        label: 'Animal Count',
        fill: false,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 2,
        // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        // hoverBorderColor: 'rgba(255,99,132,1)',
        data: animalData,
      },
    ],
  };

  return (
    < div >
      <Container>
        {/* <img src="/video/143.jpg" width="650px"></img>
        <img src="/video/143_out.jpg" width="650px"></img> */}
        <video autoPlay loop width="650px" height="120px">
          <source src={inputVideo} type="video/mp4" />
        </video>
        <video autoPlay loop width="650px" height="120px">
          <source src={outputVideo} type="video/mp4" />
        </video>
        <Table />
      </Container>
      <Container1>
        <h4>Feed Monitoring - Hourly Trend</h4>
        <Bar
          data={bar}
          height={128}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  max: 100,
                  min: 0,
                }
              }]
            },
          }}
        />
        <h4>Larvae Counting - Daily Trend</h4>
        <Bar
          data={line}
          height={128}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  max: 4000,
                  min: 0,
                }
              }]
            },
          }}
        />
      </Container1>
    </div >
  );
};

export default withRouter(Analysis);
Analysis.propTypes = {
  history: PropTypes.shape({}).isRequired
};
