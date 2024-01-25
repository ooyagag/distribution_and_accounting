import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react';
//import { useSelector } from "react-redux";
import { saleRequest } from "../../services/saleService";
import {
    PieChart,
    Pie,
    Tooltip
  } from "recharts";





export function Main({ Storeid }: any) {
    /*const Storeid = useSelector((state: any) => state.AuthReducer.store);*/
    const [Sales, setSales] = useState<any[]>([]);
    const [Allproducts, setAllproducts] = useState(0);
    const [ProductsNotBoughtQuantity, setProductsNotBoughtQuantity] = useState(0);
    const [PurchasedProductsQuantity, setPurchasedProductsQuantity] = useState(0);
    const [TotalPrice, setTotalPrice] = useState(0);



    const [ProductsNotData, setProductsNotData] = useState<any[]>([]);
    const [PurchasedData, setPurchasedData] = useState<any[]>([]);
    const [TotalData, setTotalData] = useState<any[]>([]);



    async function getsalesInfo() {
        let all = 0
        let allnot = 0
        //let allpurchased = 0
        let total = 0


        const ProductsNot : any[] = []
        const PurchasedData : any[] = []
        const TotalData : any[] = []

        await saleRequest.getsale(Storeid).then(e => {
            setSales(e.data)
            e.data.map((data: any, i:any) => {
                //console.log(data.id)
                all += data.qualityOfProducts;
                allnot += data.returnedProducts;
                total = ((data.qualityOfProducts - data.returnedProducts) * data.price) + total;
                ProductsNot.push({name : data.name, value : data.returnedProducts});
                PurchasedData.push({name : data.name, value : data.qualityOfProducts - data.returnedProducts})
                TotalData.push({name : data.name, value: (data.qualityOfProducts - data.returnedProducts)* data.price })
            })
        })

        //+(data.qualityOfProducts-data.returnedProducts*data.price)

        setAllproducts(all);
        setProductsNotBoughtQuantity(allnot)
        setPurchasedProductsQuantity(all - allnot)
        setTotalPrice(total)


        setProductsNotData(ProductsNot)
        setPurchasedData(PurchasedData)
        setTotalData(TotalData)


    }

    const cardPie = (
        <React.Fragment>
            <CardContent>
            These are the stores that returned products and the amount they returned per orders
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={ProductsNotData}
                cx={155}
                cy={155}
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
            {`Quantity of returned products ${ProductsNotBoughtQuantity}`}
            </CardContent>
    
        </React.Fragment>
    );

    const cardBar = (
        <React.Fragment>
            <CardContent>
            This is the number of products that each store bought per order
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={PurchasedData}
                cx={155}
                cy={155}
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
            {`Quantity of products purchased ${PurchasedProductsQuantity}`}
            </CardContent>
    
        </React.Fragment>
    );

    const cardBar2 = (
        <React.Fragment>
            <CardContent>
            Money earned for each order
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={TotalData}
                cx={155}
                cy={155}
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>

            {`All money earned ${TotalPrice}`}
            </CardContent>
    
        </React.Fragment>
    );
   


    useEffect(() => {
        //console.log(WorkersRequest.getworker(1));
        getsalesInfo()
    }, [])

    return (
        <Box component="div" >
            {
                Sales.length > 0 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">{cardPie}</Card>
                            
                        </Grid>
                        <Grid item xs={12}>
                        <Card variant="outlined">{cardBar}</Card>
                        </Grid>

                        <Grid item xs={12}>
                        <Card variant="outlined">{cardBar2}</Card>
                        </Grid>
                    </Grid>
                ) : (<div>No data</div>)
            }
        </Box>
    )
}

/*
{` ${Allproducts} ALL - `}
                            {` ${ProductsNotBoughtQuantity} NOT - `}
                            {` ${PurchasedProductsQuantity} PUR - `}
                            {` ${TotalPrice} TOT -`}

*/