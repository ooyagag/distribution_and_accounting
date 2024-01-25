import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { OrdersItemsRequest } from "../../services/OrdersItemsService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ProductsRequest } from "../../services/ProductsService";
import { brachRequest } from "../../services/BrachOfficeService";
import { WorkersRequest } from "../../services/WorkersService";

import { FormOrders } from "./formorders";
import { OrdersModal } from './ordersModal'

export function Orders()
{
    const Storeid = useSelector((state: any) => state.AuthReducer.store);
    const [Orders, setOrders] = useState([]);

    const [openmodal, setOpenmodal] = useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);

    const [openmodal2, setOpenmodal2] = useState(false);
    const handleOpenmodal2 = (data : any) => {setOpenmodal2(true); setOrderItemsData(data)};
    const handleClosemodal2 = () => setOpenmodal2(false);

    const [Product, setProduct] = useState([]);
    const [Brach, setBrach] = useState([]);

    const[refresh, setrefresh] = useState(false)

    const[OrderItemsData, setOrderItemsData] = useState({})

    const[Users, setUsers] = useState([])

    useEffect(() => {
        //console.log(WorkersRequest.getworker(1));
        OrdersItemsRequest.getOrdersItems(Storeid).then(e => setOrders(e.data))
        brachRequest.getbrach(Storeid).then(e => setBrach(e.data))
        ProductsRequest.getproducts(Storeid).then(e => setProduct(e.data))
        WorkersRequest.getworker(Storeid).then(e => setUsers(e.data))
    },[refresh, Storeid, Users])

    return (
        <div>
            {
                Product.length > 0 ? (
                    <TableContainer component={Paper}>
        <Button onClick={handleOpenmodal}>Add Orders</Button>
        <Table size="medium" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Product's name</TableCell>
                    <TableCell align="right">Quantity Of Products</TableCell>
                    <TableCell align="right">User's name</TableCell>
                    <TableCell align="right">Returned Products</TableCell>
                    <TableCell align="right">Sale</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Orders.map((data: any, i : any) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.id}
                            </TableCell>
                            <TableCell align="right">{data.name}</TableCell>
                            <TableCell align="right">{data.pname}</TableCell>
                            <TableCell align="right">{data.qualityOfProducts}</TableCell>
                            <TableCell align="right">{data.sname == null ? "There's not user" : data.sname}</TableCell>
                            <TableCell align="right">{data.returnedProducts}</TableCell>
                            <TableCell align="right"><Button onClick={()=> handleOpenmodal2(data)}>Add Sale</Button></TableCell>
                        </TableRow>

                    ))
                }
             
            </TableBody>
        </Table>
        <FormOrders
          open={openmodal}
          handleClose={handleClosemodal}
          refresh={refresh}
          setrefresh={setrefresh}
          product={Product}
          breach={Brach}
         />

         <OrdersModal
         open={openmodal2}
         handleClose={handleClosemodal2}
         refresh={refresh}
         setrefresh={setrefresh}
         data={OrderItemsData}
         Users={Users}
         />
    </TableContainer>
                ) : (<div>you have to create a product first</div>)
            }
        </div>
    )
}