import { useState, useEffect } from "react";
import axios, { get, post, put } from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
  Box,
  Typography,
  Modal,
} from "@mui/material"

export default function StockComponent({ user }) {
  const [
    productInput,
    setProductInput,
  ] = useState("");

  const [
    snackbarClipboard,
    setSnackbarClipboard,
  ] = useState(false);

  const [
    modalAddProduct,
    setModalAddProduct,
  ] = useState(false);

  const [
    modalDeleteProduct,
    setModalDeleteProduct,
  ] = useState(false);

  const [
    productList,
    setProductList,
  ] = useState([]);

  const [
    handleProduct,
    setHandleProduct,
  ] = useState({
    id: "",
    name: "",
    price: 0,
    amount: 0,
  });

  const [
    message,
    setMessage,
  ] = useState({
    success: false,
    errorMessage: "",
    successMessage: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      get('/api/products').then((response) => {
        const { data: { success, product, message } } = response;
        if (!success) return setMessage({
          success: true,
          errorMessage: { message },
        });
        setProductList(product);
      })
    }

    getProduct();
  }, []);

  const updateProduct = async () => {
    await get('/api/products').then( ({ 
      data: { product }
    }) => {
      setProductList(product);
    });
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
  };

  const handleClipboard = (id) => {
    navigator.clipboard.writeText(id);
    return setSnackbarClipboard(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarClipboard(false);
  }

  const handleChangeProduct = (event) => {
    const { name, value } = event.target;
    setHandleProduct({
      ...handleProduct,
      [name]: value,
    });
  }

  // Close and Clear value modal.
  const handleCloseModal = () => {
    setModalAddProduct(false);
    setModalDeleteProduct(false);
    setMessage({ success: false, errorMessage: "", successMessage: "" });
    setHandleProduct({ id: "", name: "", price: 0, amount: 0 });
  }

  const handleUpdateProduct = async () => {
    if (user.role !== 1) {
      return setMessage({
        success: true,
        errorMessage: "คุณไมไ่ด้รับอนุญาติให้แก้ไขสินค้า",
      })
    }
    await put(`/api/products/${handleProduct.id}`, {
      name: handleProduct.name,
      price: handleProduct.price,
      amount: handleProduct.amount,
    }).then(({ data: { success, message }}) => {
      if (success) {
        setMessage({ success: true, successMessage: message });
        return updateProduct();
      }
      setTimeout(() => {
        handleCloseModal();
      }, 3000)

      return setMessage({ success: true, errorMessage: message });
    })
  }

  const handleAddProduct = async () => {
    if (user.role !== 1) {
      return setMessage({
        success: true,
        errorMessage: "คุณไมไ่ด้รับอนุญาติให้เพิ่มสินค้า",
      })
    }
    if (!handleProduct.id) return setMessage({
      success: true,
      errorMessage: "กรุณาระบุรหัสสินค้า",
    });
    if (!handleProduct.name) return setMessage({
      success: true,
      errorMessage: "กรุณาระบุชื่อสินค้า",
    });
    if (!handleProduct.price) return setMessage({
      success: true,
      errorMessage: "กรุณาระบุราคาสินค้า",
    });
    if (!handleProduct.amount) return setMessage({
      success: true,
      errorMessage: "กรุณาระบุจำนวนสินค้า",
    });

    await post('/api/products', {
      id: handleProduct.id,
      name: handleProduct.name,
      price: handleProduct.price,
      amount: handleProduct.amount,
    }).then(async ({ data: { success, message } }) => {
      if (!success) return setMessage({
        success: true,
        errorMessage: message
      });

      setMessage({
        success: true,
        successMessage: message,
      });
      
      updateProduct();

      setTimeout(() => {
        handleCloseModal();
      }, 3000)
    })
  }

  const handleLoadProduct = async (id) => {
    await get(`/api/products/${id}`).then(({
      data: { success, product, message }}
    ) => {
      setHandleProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        amount: product.amount,
      });
      setModalDeleteProduct(true);
    })
  }

  // TODO: Set modal before delete
  const handleDeleteProduct = async (id) => {
    if (user.role !== 1) {
      return setMessage({
        success: true,
        errorMessage: "คุณไมไ่ด้รับอนุญาติให้ลบสินค้า",
      });
    }
    await axios.delete(`/api/products/${id}`)
      .then(({ data: { success, message }}) => {
        if (!success) return setMessage({
          success: true,
          errorMessage: message,
        });

        setMessage({ success: true, successMessage: message });
        updateProduct();

        setTimeout(() => {
          handleCloseModal()
        }, 2000)
    })
  }

  return (
    <div className="flex flex-col border rounded-lg m-8 p-12 shadow-lg space-y-2">
      <input
        type="text"
        name="productSearch"
        className="border rounded-md focus:outline-none text-center w-full"
        value={ productInput }
        onChange={({ target: { value }}) => setProductInput(value)}
        placeholder="ระบุสินค้าที่ต้องการค้นหา"
      />
      <button
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-1 rounded-lg"
        onClick={() => setModalAddProduct(true)}
      >
        เพิ่มสินค้า
      </button>
      <Snackbar
        open={ snackbarClipboard } 
        autoHideDuration={ 3000 } 
        message="คัดลองลงคลิปบอร์ด"
        onClose={ handleClose }
      />
      {/* Add Product Modal */}
      <Modal
        open={ modalAddProduct }
        onClose={ handleCloseModal }
        aria-labelledby="modal add product"
        aria-describedby="modal add product"
      >
        <Box sx={ style } className="rounded-lg">
          <Typography id="modal add product" variant="h6" component="h2">
            เพิ่มสินค้า
          </Typography>
          <Typography id="modal add product" sx={{ mt: 2 }}>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <label>รหัสสินค้า</label>
                <input
                  name="id"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.id }
                  onChange={ handleChangeProduct }
                />
              </div>
              <div className="flex flex-col">
                <label>ชื่อ</label>
                <input
                  name="name"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.name }
                  onChange={ handleChangeProduct }
                />
              </div>
              <div className="flex flex-col">
                <label>ราคา</label>
                <input
                  name="price"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.price }
                  onChange={ handleChangeProduct }
                />
              </div>
              <div className="flex flex-col">
                <label>จำนวน</label>
                <input
                  name="amount"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.amount }
                  onChange={ handleChangeProduct }
                />
              </div>
              {
                message.success
                ? (
                  message.errorMessage
                  ? (
                    <Alert severity="error">{ message.errorMessage }</Alert>
                    )
                    : (
                    <Alert severity="success">{ message.successMessage }</Alert>
                  )
                )
                : (null)
              }
              <div className="flex flex-row space-x-2 justify-center">
                <button
                  className="border rounded-md text-white bg-green-500 hover:bg-green-600 active:bg-green-700 py-1.5 w-full"
                  onClick={ handleAddProduct }
                >
                  เพิ่มสินค้า
                </button>
                <button
                  className="border rounded-md text-white bg-red-500 hover:bg-red-600 active:bg-red-700 py-1.5 w-full"
                  onClick={ handleCloseModal }
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* End Add Product Modal */}
      {/* Delete Modal */}
      <Modal
        open={ modalDeleteProduct }
        onClose={ handleCloseModal }
        aria-labelledby="modal add product"
        aria-describedby="modal add product"
      >
        <Box sx={ style } className="rounded-lg">
          <Typography id="modal add product" variant="h6" component="h2">
            แก้ไขสินค้า
          </Typography>
          <Typography id="modal add product" sx={{ mt: 2 }}>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <label>รหัสสินค้า</label>
                <input
                  name="id"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.id }
                  onChange={ handleChangeProduct }
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label>ชื่อ</label>
                <input
                  name="name"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.name }
                  onChange={ handleChangeProduct }
                />
              </div>
              <div className="flex flex-col">
                <label>ราคา</label>
                <input
                  name="price"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.price }
                  onChange={ handleChangeProduct }
                />
              </div>
              <div className="flex flex-col">
                <label>จำนวน</label>
                <input
                  name="amount"
                  className="border rounded-md focus:outline-none text-center w-full"
                  value={ handleProduct.amount }
                  onChange={ handleChangeProduct }
                />
              </div>
              {
                message.success
                ? (
                  message.errorMessage
                  ? (
                    <Alert severity="error">{ message.errorMessage }</Alert>
                    )
                    : (
                    <Alert severity="success">{ message.successMessage }</Alert>
                  )
                )
                : (null)
              }
              
              <div className="flex flex-row space-x-2 justify-center">
                <button
                  className="border rounded-md text-white bg-green-500 hover:bg-green-600 active:bg-green-700 py-1.5 w-full"
                  onClick={ () => handleUpdateProduct() }
                >
                  แก้ไขสินค้า
                </button>
                <button
                  className="border rounded-md text-white bg-red-500 hover:bg-red-600 active:bg-red-700 py-1.5 w-full"
                  onClick={ handleCloseModal }
                >
                  ยกเลิก
                </button>
              </div>
                <button
                  className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-1 rounded-md"
                  onClick={() => handleDeleteProduct(handleProduct.id)}
                >
                  ลบสินค้า
                </button>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* End Delete Modal */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ลำดับ</TableCell>
              <TableCell>รหัสสินค้า</TableCell>
              <TableCell>ชื่อสินค้า</TableCell>
              <TableCell>ราคา</TableCell>
              <TableCell>จำนวนที่มี</TableCell>
              <TableCell align="center">แก้ไข</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              productList ? (
                productList.filter((item) => (
                  item.id.includes(productInput.toLowerCase()) ||
                  item.name.includes(productInput.toLowerCase())
                )).map((item, index) => {
                  return (
                    <TableRow key={ item.name + item.id }>
                      <TableCell align="center">{ index + 1 }</TableCell>
                      <TableCell
                        onClick={() => handleClipboard(item.id)}
                        className="hover:cursor-pointer hover:text-blue-500"
                      >
                        { item.id }
                      </TableCell>
                      <TableCell>{ item.name }</TableCell>
                      <TableCell>{ item.price }</TableCell>
                      <TableCell>{ item.amount }</TableCell>
                      <TableCell align="center" className="space-x-2">
                        <button
                          onClick={() => handleLoadProduct(item.id)}
                          className="border rounded-md text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-2 py-1.5"
                        >
                          แก้ไข
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <Alert severity="error">{ message.errorMessage }</Alert>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
