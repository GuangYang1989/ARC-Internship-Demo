import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: '10%',
    padding: '5px',
    fontSize: 13,
  },
  body: {
    fontSize: 12,
    padding: '5px',
    width: '10%',
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(date, amount, eating, foodVolume, foodSize, animalSize) {
  return { date, amount, eating, foodVolume, foodSize, animalSize };
}


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    // overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const rows = [];

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


  {
    data.slice(-12).forEach(item => rows.push(createData(item.COUNT_TIME.substring(5, 16), item.ANIMAL_ALL, Math.floor((item.ANIMAL_EATING / item.ANIMAL_ALL) * 100),
      Math.floor(item.FOOD_VOLUME / 130), item.FOOD_SIZE * 2, 'Insta 3')))
  };


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Animal Amount</StyledTableCell>
            <StyledTableCell align="right">Eating(%)</StyledTableCell>
            <StyledTableCell align="right">Food Volume(mL)</StyledTableCell>
            <StyledTableCell align="right">Food Size(mm²)</StyledTableCell>
            <StyledTableCell align="right">Animal Size</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.reverse().map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.eating}</StyledTableCell>
              <StyledTableCell align="right">{row.foodVolume}</StyledTableCell>
              <StyledTableCell align="right">{row.foodSize}</StyledTableCell>
              <StyledTableCell align="right">{row.animalSize}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}