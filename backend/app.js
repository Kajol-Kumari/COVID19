const express = require('express');
const path = require('path')
const app = express();
const request = require("request");

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Header',"Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/api/country' ,(req,res,next)=>{

    var options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': '67238ba9a5msh92dd86d0c03b206p127490jsnf552b5cec39d'
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var content = JSON.parse(body);
        res.status(200).send(content.response)
    });

});

app.use('/api/states', (req, res, next) => {
  var options = {
    method: 'GET',
    url: 'https://covid-india-cases.herokuapp.com/states',
  };
  request(options, function(error, response, body) {
      if (error) throw new Error(error);
        var content = JSON.parse(body);
        console.log(content);
        res.status(200).send(content)
  });
});

app.use('/api/state_district', (req, res, next) => {
  var options = {
    method: 'GET',
    url: 'https://api.covidindiatracker.com/state_data.json',
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    var content = JSON.parse(body);
    console.log(content);
    res.status(200).send(content)
  });
});

app.use('/api/daily' ,(req,res,next)=>{
  var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    const datetime = [year, month, day].join('-');
  // var yesterdayDate = new Date(); // Today!
  // yesterdayDate.setDate(yesterdayDate.getDate() - 1); // Yesterday!

  var options = {
    method: 'GET',
    url: `https://api.covid19india.org/v4/'${datetime}.json`,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var content = JSON.parse(body);
    console.log(content);
    res.status(200).send(content)
  });
});

app.use('/api/district-wise', (req, res, next) => {
  var options = {
    method: 'GET',
    url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseDataForState',
    qs: {statecode: '<required>'},
    headers: {
      'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com',
      'x-rapidapi-key': '1d6c44ab14msh746d7a700f656cep13cf7fjsn0e31c9f5fe44',
      useQueryString: true
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var content = JSON.parse(body);
    res.status(200).send(content.response)
  });
});

module.exports =app;
