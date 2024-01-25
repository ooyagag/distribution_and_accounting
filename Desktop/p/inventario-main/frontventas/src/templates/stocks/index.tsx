import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { StockRequest } from "../../services/stockServices";
import { ProductsRequest } from "../../services/ProductsService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FormStock } from "./formstock";

export function Stocks()
{
    const Storeid = useSelector((state: any) => state.AuthReducer.store);
    const [Stock, setStock] = useState([]);
    const [Product, setProduct] = useState([]);

    const [openmodal, setOpenmodal] = useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);

    const[refresh, setrefresh] = useState(false)

    useEffect(() => {
        //console.log(WorkersRequest.getworker(1));
        StockRequest.getStock(Storeid).then(e => setStock(e.data))

        ProductsRequest.getproducts(Storeid).then(e => setProduct(e.data))
    },[refresh, Storeid])


    return (
      <div>
          {
              Product.length > 0 ? (  <TableContainer component={Paper}>
                <Button onClick={handleOpenmodal}>Add stock</Button>
                <Table size="medium" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Quantity Of Product</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Stock.map((data: any) => (
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    
                                >
                                    <TableCell component="th" scope="row">
                                        {data.id}
                                    </TableCell>
                                    <TableCell align="right">{data.name}</TableCell>
                                    <TableCell align="right">{data.quantityOfProduct}</TableCell>
                                </TableRow>
        
                            ))
                        }
                     
                    </TableBody>
                </Table>
                <FormStock
                  open={openmodal}
                  handleClose={handleClosemodal}
                  refresh={refresh}
                  setrefresh={setrefresh}
                  products={Product}
                 />
            </TableContainer>) : (<div>you have to create a product first!</div>)
          }
      </div>
    )
}