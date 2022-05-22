import {
  FormEvent,
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import axios from "axios";
import ProductProps from "./ProductProps";

import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "@headlessui/react";
import { Box, Button } from "@mui/material";

export function StockPage() {
  const [data, setData] = useState({
    modal: false,
    acceptDelete: false,
    deleteId: "",
  });

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: 0,
    amount: 0,
  });

  const [message, setMessage] = useState({
    success: false,
    isError: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/product");
      setProductList(data.products);
    };

    fetchData();
  }, [data]);

  const [productList, setProductList] = useState<ProductProps[]>([]);

  const columns: GridColumns = [
    { field: "id", headerName: "รหัสสินค้า", width: 250, editable: false },
    { field: "name", headerName: "ชื่อสินค้า", width: 250, editable: true },
    { field: "price", headerName: "ราคาสินค้า", width: 250, editable: true },
    { field: "amount", headerName: "จำนวนสินค้า", width: 250, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "ลบสินค้า",
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon className="text-red-500 hover:scale-110" />}
            label="Delete"
            onClick={() =>
              setData({ ...data, acceptDelete: true, deleteId: String(id) })
            }
            key={id}
          />,
        ];
      },
    },
  ];

  const rows = productList.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      amount: item.amount,
    };
  });

  const handleProduct = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    setProduct({ ...product, [name]: value });
  };

  const updateProduct = async () => {
    const updated = await axios.get("/api/product");
    setProductList(updated.data.products);
  };

  const handleAddProduct = async () => {
    if (!product.id) {
      return setMessage({
        success: true,
        isError: true,
        message: "กรุณากรอกรหัสสินค้า",
      });
    } else if (!product.name) {
      return setMessage({
        success: true,
        isError: true,
        message: "กรุณากรอกชื่อสินค้า",
      });
    } else if (!product.price) {
      return setMessage({
        success: true,
        isError: true,
        message: "กรุณาระบุราคาสินค้า",
      });
    } else if (!product.amount) {
      return setMessage({
        success: true,
        isError: true,
        message: "กรุณาระบุจำนวนสินค้าที่มี",
      });
    }

    const res = await axios.post("/api/product/add", product);
    try {
      if (res.status === 200) {
        setMessage({
          success: true,
          isError: false,
          message: "เพิ่มสินค้าเรียบร้อยแล้ว !",
        });
        setProduct({ id: "", name: "", price: 0, amount: 0 });

        updateProduct();
        return;
      }
    } catch (error: any) {
      setMessage({ success: true, isError: true, message: error.message });
      return;
    }
  };

  const processRowUpdate = useCallback(async (newRow: GridRowModel) => {
    const { id, name, price, amount } = newRow;
    await axios.post("/api/product/edit", { id, name, price, amount });
  }, []);

  const processRowUpdateError = useCallback(async (error: Error) => {
    return updateProduct();
  }, []);

  const handleDelete = async () => {
    await axios.post("/api/product/delete", { id: data.deleteId });
    setData({ ...data, acceptDelete: false });
    return updateProduct();
  };

  const EditToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setData({ ...data, modal: true })}
        >
          เพิ่มสินค้า
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <div className="relative">
      <Dialog
        open={data.modal}
        onClose={() => setData({ ...data, modal: false })}
      >
        <Dialog.Panel className="absolute border rounded-xl transition transition-all delay-300 ease-in-out duration-300 -translate-y-6 inset-48 bg-white drop-shadow-2xl justify-center flex flex-col">
          <Dialog.Title className="text-center text-2xl">
            เพิ่มสินค้าในคลัง / สต๊อก
          </Dialog.Title>
          <div className="flex flex-col mx-auto space-y-2">
            <div className="border p-8 rounded-xl space-y-2">
              <div className="flex flex-col">
                <label>รหัสสินค้า</label>
                <input
                  type="text"
                  name="id"
                  value={product.id}
                  className="border rounded-md pl-2"
                  onChange={handleProduct}
                />
              </div>
              <div className="flex flex-col">
                <label>ชื่อสินค้า</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  className="border rounded-md pl-2"
                  onChange={handleProduct}
                />
              </div>
              <div className="flex flex-col">
                <label>ราคา / บาท</label>
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  className="border rounded-md pl-2"
                  onChange={handleProduct}
                />
              </div>
              <div className="flex flex-col">
                <label>จำนวนที่มี / ชิ้น</label>
                <input
                  type="text"
                  name="amount"
                  value={product.amount}
                  className="border rounded-md pl-2"
                  onChange={handleProduct}
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="text-center">
                {message.success ? (
                  message.isError ? (
                    <p>{message.message}</p>
                  ) : (
                    <p>{message.message}</p>
                  )
                ) : null}
              </div>
              <div className="flex flex-row justify-center space-x-2">
                <button
                  className="border px-4 py-1 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white rounded-md"
                  onClick={() => setData({ ...data, modal: false })}
                >
                  ปิดหน้านี้
                </button>
                <button
                  className="border px-4 py-1 bg-green-400 hover:bg-green-500 active:bg-green-600 text-white rounded-md"
                  onClick={handleAddProduct}
                >
                  เพิ่มสินค้า
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <Dialog
        open={data.acceptDelete}
        onClose={() => setData({ ...data, acceptDelete: false })}
      >
        <Dialog.Panel className="absolute border rounded-xl transition transition-all delay-300 ease-in-out duration-300 -translate-y-6 inset-48 bg-white drop-shadow-2xl justify-center flex flex-col">
          <Dialog.Title className="text-center text-2xl">
            เพิ่มสินค้าในคลัง / สต๊อก
          </Dialog.Title>
          <div className="flex flex-row justify-center space-x-2">
            <button
              className="border px-4 py-1 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white rounded-md"
              onClick={() => setData({ ...data, acceptDelete: false })}
            >
              ยกเลิก
            </button>
            <button
              className="border px-4 py-1 bg-green-400 hover:bg-green-500 active:bg-green-600 text-white rounded-md"
              onClick={() => handleDelete()}
            >
              ยืนยัน
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="px-12" style={{ height: 700, width: "100%" }}>
        <Box
          sx={{
            height: 600,
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={processRowUpdate}
            components={{
              Toolbar: EditToolbar,
            }}
            onProcessRowUpdateError={processRowUpdateError}
          />
        </Box>
      </div>
    </div>
  );
}
