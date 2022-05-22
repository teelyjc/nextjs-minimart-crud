import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import TableContainer from '@mui/material/TableContainer';
import ProductProps from '../stock/ProductProps';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dialog } from '@headlessui/react'
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export function CashierPage() {
  const [ data, setData ] = useState({
    productId: "",
    purchaseModal: false,
    customerValue: "",
  });

  const [ searchError, setSearchError ] = useState({
    isError: false,
    errorMessage: ""
  });

  const [ product, setProduct ] = useState<ProductProps[]>([]);

  const handleAddProduct = async (
    e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      const res = await axios.post('/api/cashier/getProduct', { id: data.productId });
      if (res.data.success === true) {
        setProduct([...product, res.data.result ]);
        setSearchError({ isError: false, errorMessage: "" });
        setData({...data, productId: "" });
      }

      if (res.data.success === false) {
        setData({ ...data, productId: "" });
        setSearchError({ isError: true, errorMessage: res.data.message })
      }
    }
  }

  const handlePrice = (): number => {
    let priceHandle: number = 0;
    product.forEach(item => {
      priceHandle += item.price
    });
    return priceHandle;
  }

  const handlePurchase = async () => {
    await axios.post('/api/cashier/setPurchase', { productPurchase: product })
    setProduct([]);
    setData({...data, purchaseModal: false });
  }

  const handleDelete = (index: number) => {
    setProduct([...product.slice(0, index), ...product.slice(index + 1, product.length)])
  }

  return (
    <div className="flex flex-col space-y-4 border rounded-md mx-12 p-4">
      <div className="flex flex-row space-x-2 justify-center">
        <label>รหัสสินค้า</label>
        <input 
          className="border rounded-md max-w-2xl w-full"
          value={data.productId}
          onChange={(e) => setData({ ...data, productId: e.target.value })}
          onKeyDown={handleAddProduct}
        />
      </div>
      {
        searchError.isError
        ? (
          <p className="text-center bg-red-500 text-white rounded-xl">{ searchError.errorMessage }</p>
        )
        : (null)
      }

      <div>
        <h1 className="text-5xl">ราคาทั้งหมด <span className="text-red-500">{ handlePrice() }</span> บาท</h1>
      </div>

      <Dialog open={data.purchaseModal} onClose={() => setData({ ...data, purchaseModal: false }) }>
        <Dialog.Panel className="absolute border rounded-xl transition transition-all delay-300 ease-in-out duration-300 -translate-y-6 inset-48 bg-white drop-shadow-2xl justify-center flex flex-col">
          <Dialog.Title className="text-center text-5xl">ชำระเงิน</Dialog.Title>
            <div className="flex flex-col mx-auto my-2">
              <h1 className="text-3xl">ราคาสินค้าทั้งหมด
                <span className="text-red-500"> { handlePrice() } </span>
              </h1>
              <div className="flex flex-col">
                <label className="text-2xl">จำนวนเงินลูกค้า</label>
                <input 
                  value={data.customerValue}
                  className="border rounded-md text-2xl pl-2 py-4"
                  onChange={(e) => setData({...data, customerValue: e.target.value})} 
                />
              </div>
              <h1 className="text-3xl">
                เงินทอน<span className="text-red-500"> { Number(data.customerValue) - handlePrice() } </span>บาท
               </h1>
            </div>
            <div className="flex flex-row justify-center space-x-2">
              <button className="border px-4 py-1 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white rounded-md"
                onClick={() => setData({ ...data, purchaseModal: false })}
              >
                ยกเลิก
              </button>
              <button className="border px-4 py-1 bg-green-400 hover:bg-green-500 active:bg-green-600 text-white rounded-md"
                onClick={() => handlePurchase()}
              >
                ชำระเงิน
              </button>
            </div>
        </Dialog.Panel>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ลำดับสินค้า</TableCell>
              <TableCell align="left">รหัสสินค้า</TableCell>
              <TableCell align="left">ชื่อสินค้า</TableCell>
              <TableCell align="left">ราคาสินค้า</TableCell>
              <TableCell align="left">ลบสินค้า</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              product.map((item, index) => {
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <button onClick={() => handleDelete(index)}>
                        <DeleteIcon className="text-red-500 hover:scale-110" />
                      </button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex flex-row space-x-2 justify-center">
        <button 
          onClick={() => setData({...data, purchaseModal: true })}
          className="bg-green-400 hover:bg-green-500 active:bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          ชำระเงิน
        </button>
        <button
          onClick={() => setProduct([])}
          className="bg-red-400 hover:bg-red-500 active:bg-red-600 text-white px-6 py-3 rounded-xl"
        >
          ยกเลิก
        </button>
      </div>

    </div>
  )
}