import { useState } from "react";
import { get, post } from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Box,
  Modal,
  Typography,
} from "@mui/material";

export default function CashierComponent({ user }) {
  const [
    productId,
    setProductId,
  ] = useState("");

  const [
    handleProduct,
    setHandleProduct,
  ] = useState([]);

  const handleProductId = ({ target: { value }}) => {
    setProductId(value);
  }

  const [ 
    handlePurchaseModal,
    setHandlePurchaseModal,
  ] = useState(false);

  const [
    handleCustomerValue,
    setHandleCustomerValue,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState({
    success: false,
    errorMessage: "",
    successMessage: "",
  });

  const setHandleCloseModal = () => {
    setHandleCustomerValue(0);
    setHandlePurchaseModal(false);
    setHandleProduct([]);
    setMessage({ success: false });
  }

  const submitProduct = async (event) => {
    // When Scanned do!
    if (event.key === "Enter") {
      if (!productId) return setMessage({
        success: true,
        errorMessage: "กรุณาระบุรหัสสินค้า",
      });

      await get(`/api/products/${productId}`)
        .then(({ data: { success, product, message } }) => {
          if (!success || !product) {
            return setMessage({ success: true, errorMessage: message });
          }

          setHandleProduct([...handleProduct, product])
          setMessage({ success: true, successMessage: message });
          return setProductId("");
        });

    }
  }

  const handleDeleteProduct = (index) => {
    setHandleProduct([
      ...handleProduct.slice(0, index),
      ...handleProduct.slice(index + 1, handleProduct.length),
    ]);
  }

  const handlePrice = () => {
    let price = 0;
    handleProduct.forEach((item) => {
      price = price + item.price;
    });

    return price;
  }

  const handlePurchase = async () => {
    if (user.role !== 1) {
      return setMessage({
        success: true,
        errorMessage: "คุณไมไ่ด้รับอนุญาติให้ชำระสินค้า",
      })
    }
    if (!handleCustomerValue || handleCustomerValue < handlePrice()) {
      return setMessage({ success: true, errorMessage: "กรุณากรอกจำนวนเงินที่ถูกต้อง" });
    }
    await post('/api/products/purchase', { products: handleProduct })
      .then(({ data: { success, message } }) => {
        if (success) {
          setTimeout(() => {
            setHandleCloseModal();
          }, 3000)

          return setMessage({success: true, successMessage: message});
        }

        return setMessage({ success: true, errorMessage: message });
      }
    );
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div className="flex flex-col border rounded-lg m-8 p-12 shadow-lg space-y-2">
      <div className="flex flex-row space-x-2 justify-center">
        <label>รหัสสินค้า</label>
        <input
          type="text"
          name="productId"
          className="border rounded-md focus:outline-none text-center max-w-lg lg:max-w-2xl w-full"
          value={ productId }
          onChange={ handleProductId }
          onKeyDown={ submitProduct }
        />
      </div>
      {
        message.success
        ? (
          message.errorMessage
          ? (
            <Alert severity="error">
              { message.errorMessage }
            </Alert>
            )
            : (
            <Alert severity="success">
              { message.successMessage }
            </Alert>
          )
        )
        : (null)
      }

      <div className="flex flex-row justify-between px-8">
        <p className="text-5xl">
          ราคา
          <span className="text-red-500">
            { " " + handlePrice().toLocaleString() + " " }
          </span>
          บาท
        </p>
        <button
          className="border rounded-md text-white bg-green-500 hover:bg-green-600 active:bg-green-700 px-2 text-lg"
          onClick={() => setHandlePurchaseModal(true)}
        >
            ชำระเงิน
        </button>
      </div>

      <Modal open={ handlePurchaseModal } onClose={ setHandleCloseModal }>
        <Box sx={ style } className="rounded-md">
          <Typography>
            ชำระเงิน
          </Typography>
          <Typography>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={ handleCustomerValue }
                onChange={ ({ target: { value }}) => setHandleCustomerValue(value) }
                className="border rounded-md focus:outline-none text-center max-w-lg lg:max-w-2xl w-full"
                placeholder="จำนวนเงินที่ลูกค้าชำระ"
              />
              <p className="text-2xl">ราคาสินค้าทั้งหมด
                <span className="text-red-500">
                  { " " + handlePrice().toLocaleString() + " "}
                </span>บาท
              </p>
              <p>เงินทอนทั้งสิ้น
                <span className="text-red-500">
                  {" " + (handleCustomerValue - handlePrice()).toLocaleString() + " " }
                </span> 
                บาท
              </p>
              <button
                className="border rounded-md text-white bg-green-500 hover:bg-green-600 active:bg-green-700 px-2 py-1"
                onClick={ () => handlePurchase() }
              >
                ชำระเงิน
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="product handle">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                รายละอียด
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">ลำดับ</TableCell>
              <TableCell align="center">รหัสสินค้า</TableCell>
              <TableCell align="center">สินค้า</TableCell>
              <TableCell align="center">ราคา</TableCell>
              <TableCell align="center">แก้ไข</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              handleProduct
              ? handleProduct.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{ index + 1 }</TableCell>
                    <TableCell align="center">{ item.id }</TableCell>
                    <TableCell align="center">{ item.name }</TableCell>
                    <TableCell align="center">{ item.price }</TableCell>
                    <TableCell align="center">
                      <button
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-1 rounded-md px-2"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        ลบสินค้า
                      </button>
                    </TableCell>
                  </TableRow>
                )
              })
              : (null)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
