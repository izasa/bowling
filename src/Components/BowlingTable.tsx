import { Player } from './Player';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function BowlingTable(props: { list: Player[] }) {

    const getTableHeaders = Array.from({ length: 22 }, (_, index) => {
        return <TableCell className="cell" key={index} align="right">{index + 1}</TableCell>;
    });

    const getRowWithPin = (arr: Array<number>) => {
        let res = [];
        for (let i = 0; i < 22; i++) {
            i > 0 && i % 2 !== 0 && arr[i - 1] === 10 && i !== 21
                ? res.push(<TableCell key={i} className="cell" align="right">{'-'}</TableCell>)
                : res.push(<TableCell key={i} className="cell" align="right">{arr[i]}</TableCell>)
        }
        return res;
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead className="Head" >
                    <TableRow>
                        <TableCell className="cell">Zawodnik</TableCell>
                        <TableCell className="cell" align="right">Wynik</TableCell>
                        {getTableHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.list.map((row) => (
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
    );
}

export default BowlingTable;