import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { saleRequest } from "../../services/saleService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function Sales()
{
    const Storeid = useSelector((state: any) => state.AuthReducer.store);
    const [Sales, setSales] = useState([]);

   
    useEffect(() => {
        //console.log(WorkersRequest.getworker(1));
        saleRequest.getsale(Storeid).then(e => setSales(e.data))

    })

    return (
        <TableContainer component={Paper}>
        <Table size="medium" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Store's name</TableCell>
                    <TableCell align="right">Quantity Of Products</TableCell>
                    <TableCell align="right">Returned Products</TableCell>
                    <TableCell align="right">User's name</TableCell>
                    <TableCell align="right">Product's name</TableCell>
                    <TableCell align="right">Date of order</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Sales.map((data: any) => (
                        <TableRow
                            key={data.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.id}
                            </TableCell>
                            <TableCell align="right">{data.name}</TableCell>
                            <TableCell align="right">{data.qualityOfProducts}</TableCell>
                            <TableCell align="right">{data.returnedProducts}</TableCell>
                            <TableCell align="right">{data.sname}</TableCell>
                            <TableCell align="right">{data.pname}</TableCell>
                            <TableCell align="right">{data.dateOfOrder}</TableCell>
                        </TableRow>

                    ))
                }
             
            </TableBody>
        </Table>
    </TableContainer>
    )
}