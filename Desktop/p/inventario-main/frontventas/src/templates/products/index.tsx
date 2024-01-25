
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { ProductsRequest } from "../../services/ProductsService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FormProduct } from "./formproduct";


export function Products() {

    const Storeid = useSelector((state: any) => state.AuthReducer.store);
    const [Product, setProduct] = useState([]);

    const [openmodal, setOpenmodal] = useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);

    const[refresh, setrefresh] = useState(false)

    useEffect(() => {
        //console.log(WorkersRequest.getworker(1));
        ProductsRequest.getproducts(Storeid).then(e => setProduct(e.data))

    },[refresh, Storeid])

    return (
        <TableContainer component={Paper}>
        <Button onClick={handleOpenmodal}>Add Product</Button>
        <Table size="medium" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Product.map((data: any) => (
                        <TableRow
                            key={data.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.id}
                            </TableCell>
                            <TableCell align="right">{data.name}</TableCell>
                            <TableCell align="right">{data.price}</TableCell>
                            <TableCell align="right">{data.descriptions}</TableCell>
                        </TableRow>

                    ))
                }
             
            </TableBody>
        </Table>
        <FormProduct
          open={openmodal}
          handleClose={handleClosemodal}
          refresh={refresh}
          setrefresh={setrefresh}
         />
    </TableContainer>
    )
}