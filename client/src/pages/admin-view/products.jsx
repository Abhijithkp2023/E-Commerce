import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProducts,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "../../components/admin-view/product-tile";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setCreateOpenProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setCreateOpenProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProducts({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAllProducts());
            setCreateOpenProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product added successfully",
            });
          }
        });
  };

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setCreateOpenProductsDialog(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCreateOpenProductsDialog={setCreateOpenProductsDialog}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                key={productItem?._id}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setCreateOpenProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            {currentEditedId !== null ? "Edit product" : "Add new product"}
          </SheetHeader>
          <ProductImageUpload
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
