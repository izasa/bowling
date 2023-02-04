import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './BowlingList.css';

function BowlingList() {

    const [list, setList] = useState([]);

    const getPoints = (str) => str.split(',').map(element => Number(element));

    const getScore = (pins) => {
        let score = 0;
        for (let i = 0; i < pins.length; i++) {
            let currentValue = pins[i]
            if (i < 18) {// not last and additional round
                if (i % 2 === 0 && currentValue === 10) { //strike
                    score = score + 10 + pins[i + 1] + pins[i + 2]
                } else {
                    if (i % 2 !== 0 && (currentValue + pins[i - 1] === 10)) { //spare
                        score = score + currentValue + pins[i + 1]
                    }
                    else {
                        score = score + currentValue;
                    }
                }
            }
            else {
                score = score + currentValue;
            }
        }
        return score;
    }//assumption: after strike sec round is 0 

    const handleOnClick = async (e) => {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onload = async (e) => {
            const text = (e.target.result);
            const result = text.split(/\r?\n/);
            let arr = [];
            //check is result.length%
            for (let i = 0; i < result.length; i++) {
                if (i % 2 === 0) {
                    let pinArray = getPoints(result[i + 1]);
                    arr.push({ name: result[i], score: getScore(pinArray), pins: pinArray })
                }
            }
            setList(arr);
        };
        reader.readAsText(file);
    }

    const getTableHeaders = Array.from({length: 22}, (_, index) => {
        return <TableCell className="cell" key={index} align="right">{index + 1}</TableCell>;
      });

    const getRowWithPin = (arr) => {
        let res = [];
        for (let i = 0; i < 22; i++) {
            res.push(<TableCell key={i} className="cell" align="right">{arr[i]}</TableCell>)
        }
        return res;
      };

    return (
        <div className="BowlingTable">
            {list.length === 0 ? (
                <input type="file" onChange={handleOnClick} accept=".txt" />
            ): (
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead className="Head" >
                        <TableRow>
                            <TableCell className="cell">Zawodnik</TableCell>
                            <TableCell className="cell">Wynik</TableCell>
                            {getTableHeaders}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className="cell" component="th" scope="row">{row.name} </TableCell>
                                <TableCell className="cell" align="right">{row.score}</TableCell>

                                {getRowWithPin(row.pins)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </div>
    )
}


export default BowlingList