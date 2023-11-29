import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import ChangeStatusModal from '../../components/Common/ChangeStatusModal';
//import components


import {
  getProductList, getProductParentList
} from "store/actions";
import {
  getProductCategoryList, getProductTypeList, saveInventory, updateInventory, changeInventoryStatus
} from "store/actions";

import { ProductStatus } from "../Ecommerce/EcommerceOrders/EcommerceOrderCol";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  InputGroup
} from "reactstrap";

import { Alert } from "reactstrap";

function InventryMedical() {

  //meta title
  document.title = "Inventory | Medimny";
  // validation
  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: 0,
      product_id: '',
      expiry_date: '',
      current_stock: '',
      max_qty: '',
      lot_size: '',
      unit_price: '',
      purchase_price: '',
      discount_type: 'flat',
      discount: ''
    },
    validationSchema: Yup.object({
      product_id: Yup.string().required("Please Select  Product"),
      expiry_date: Yup.string().required("Please Select  Expriry Date"),
      current_stock: Yup.string().required("Please Enter Total Available Quantity"),
      max_qty: Yup.string().required("Please Enter Total Maximum Quantity"),
      lot_size: Yup.string().required("Please Enter Lot Size"),
      unit_price: Yup.string().required("Please Enter MRP"),
      purchase_price: Yup.string().required("Please Enter PTR"),
      // discount_type: Yup.string().required("Please Select Discount"),
      // discount: Yup.string().required("Please Enter Discount"),
    }),
    onSubmit: (values) => {
      if (values.id == 0) {
        dispatch(saveInventory(values));
      } else {
        dispatch(updateInventory(values));
      }

      dispatch(getProductList());
      // window.location.reload();
      tog_xlarge();

    }
  });


  const [modal_xlarge, setmodal_xlarge] = useState(false);
  function tog_xlarge() {
    console.log(modal_xlarge,'modal xlarge ');
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const dispatch = useDispatch();

  const { products } = useSelector(state => ({
    products: state.ProductReducer.products,
  }));

  const { parentProducts } = useSelector(state => ({
    parentProducts: state.ProductReducer.parentProducts,
  }));


  const { productTypes } = useSelector(state => ({
    productTypes: state.ProductReducer.productTypes,
  }));

  const { productCategories } = useSelector(state => ({
    productCategories: state.ProductReducer.productCategories,
  }));

  const { error } = useSelector(state => ({
    error: state.ProductReducer.error,
  }));

  useEffect(() => {

    if (products && !products.length) {
      dispatch(getProductList());
    }

  }, [dispatch, products]);


  useEffect(() => {

    if (parentProducts && !parentProducts.length) {
      dispatch(getProductParentList());
    }

  }, [dispatch, parentProducts]);

  useEffect(() => {
    if (productCategories && !productCategories.length) {
      dispatch(getProductCategoryList());
    }

  }, [dispatch, productCategories]);


  useEffect(() => {
    if (productTypes && !productTypes.length) {
      dispatch(getProductTypeList());
    }

  }, [dispatch, productTypes]);


  const columns = useMemo(
    () => [

      {
        Header: 'Title',
        accessor: 'name',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true
      },
      {
        Header: 'MRP',
        accessor: 'unit_price',
        filterable: true
      },
      {
        Header: 'PTR',
        accessor: 'purchase_price',
        filterable: true
      },
      {
        Header: 'Quantity',
        accessor: 'current_stock',
        filterable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: true,
        Cell: (cellProps) => {
          return <ProductStatus {...cellProps} />;
        }
      },
      // {
      //   Header: 'Action',
      //   accessor: 'paymentMethod',
      //   Cell: (cellProps) => {
      //     return <PaymentMethod {...cellProps} />;
      //   }
      // },
      // {
      //   Header: 'View Details',
      //   accessor: 'view',
      //   disableFilters: true,
      //   Cell: () => {
      //     return (
      //       <Button
      //         type="button"
      //         color="primary"
      //         className="btn-sm btn-rounded"
      //         onClick={toggleViewModal}
      //       >
      //         View Details
      //       </Button>);
      //   }
      // },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickEdit(orderData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              {/* <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickDelete(orderData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link> */}
              {cellProps.row.original?.status == 1 ? <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickHide(orderData);
                }}
              >
                <i className="mdi mdi-eye-off font-size-18" id="hidetooltip" />
                <UncontrolledTooltip placement="top" target="hidetooltip">
                  Hide
                </UncontrolledTooltip>
              </Link> : <></>}
            </div>
          );
        }
      },
    ],
    []
  );

  const [selectedGroup, setselectedGroup] = useState(null);

  function handleSelectGroup(selectedGroup) {

    validation.setFieldValue("product_id", selectedGroup.value);

    const selected = parentProducts.find(parent => parent.id == selectedGroup.value)
    console.log(selected, 'select group');
    setChemicalCombination(selected.chemical_combination);
    setGST("GST " + selected.tax)
    setMedicineType(selected.medicine_type)
    const cats = JSON.parse(selected.category_ids);

    if (cats.length > 0) {
      const catss = productCategories.find(proCat => proCat?.id == cats[0]?.id)
      setCategory(catss?.name)
    }

    const proTypess = productTypes.find(proType => proType?.id == selected.product_type)

    if (proTypess) {
      setProductType(proTypess?.name)
    }

    setselectedGroup(selectedGroup);

  }

  const [ChemicalCombination, setChemicalCombination] = useState('');
  const [GST, setGST] = useState('');
  const [category, setCategory] = useState('');
  const [MedicineType, setMedicineType] = useState('');
  const [ProductType, setProductType] = useState('');

  let options = []
  if (parentProducts.length > 0) {
    parentProducts.map((parent) => (options.push({ label: parent.name, value: parent.id })))
  }

  const optionGroup = [
    {
      options: options
    }
  ];
  const [request, setRequest] = useState(null);
  const [requestModal, setRequestModal] = useState(false);

  const onClickHide = (request) => {
    setRequest(request);
    setRequestModal(true);
  }

  const handleRequestProduct = () => {
    if (request && request.id) {
      if (request.status == 1) {
        dispatch(changeInventoryStatus({ id: request.id, status: 0 }));
      } else {
        dispatch(changeInventoryStatus({ id: request.id, status: 1 }));
      }

      dispatch(getProductList());

      setRequestModal(false);
    }
  };
  const onClickEdit = (request) => {

    tog_xlarge();
    setRequest(request);

    console.log(request,'requests')
  
    validation.setFieldValue("id", request?.id);
    validation.setFieldValue("product_id", request?.product_id);
    validation.setFieldValue("current_stock", request?.current_stock);
    validation.setFieldValue("max_qty", request?.max_qty);
    validation.setFieldValue("expiry_date", request?.expiry_date);
    validation.setFieldValue("unit_price", request?.unit_price);
    validation.setFieldValue("purchase_price", request?.purchase_price);
    validation.setFieldValue("lot_size", request?.lot_size);
    validation.setFieldValue("discount_type", request?.discount_type);
    validation.setFieldValue("discount", request?.discount);
    setChemicalCombination(request?.chemical_combination);
    setGST('GST ' + request?.tax);
    setMedicineType(request?.medicine_type)
    const selected = parentProducts.find(parent => parent?.id == request?.product_id)

    const cats = JSON.parse(request?.category_ids);

    if (cats.length > 0) {
      const catss = productCategories.find(proCat => proCat?.id == cats[0]?.id)
      setCategory(catss?.name)
    }

    const proTypess = productTypes.find(proType => proType?.id == request?.product_type)

    if (proTypess) {
      setProductType(proTypess?.name)
    }
    console.log({ label: selected?.name, value: selected?.id },'ssss');
    setselectedGroup({ label: selected?.name, value: selected?.id });

  };

  return (
    <React.Fragment>

      <div className="page-content">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="font-weight-bold">Inventory </h2>
            <button className="btn btn-outline-primary">
              DOWNLOAD
            </button>
          </div>
          {/* <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" /> */}
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={products}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    isAddOptionTitle={'Add Inventory'}
                    handleOrderClicks={tog_xlarge}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
            size="xl"
            isOpen={modal_xlarge}
            toggle={() => {
              tog_xlarge();
            }}
          >
            <div className="modal-header">
              <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
              >
                Inventory
              </h5>
              <button
                onClick={() => {
                  setmodal_xlarge(false);
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Form
              className="form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className="modal-body">
                <Card>
                  <CardBody>

                    {error ? <Alert color="danger">{error}</Alert> : null}

                    <Row>
                      <Col md={12}>
                        <div className="mb-12">
                          <Label htmlFor="formrow-email-Input">Select Product</Label>
                          <Select
                            value={selectedGroup}
                            name="product_id"
                            onChange={(e) => {
                              handleSelectGroup(e);
                            }}
                            options={optionGroup}
                            className="select2-selection"
                          />
                        </div>

                        {validation.touched.product_id && validation.errors.product_id ? (
                          <FormFeedback type="invalid">{validation.errors.product_id}</FormFeedback>
                        ) : null}

                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Chemical Combination</Label>
                          <Input
                            name="chemical_combination"
                            value={ChemicalCombination}
                            type="text"
                            placeholder=""
                            readOnly
                          />

                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label">Company Name</Label>
                          <Input
                            name="company"
                            className="form-control"
                            placeholder=""
                            type="text"
                            value={""}
                            readOnly
                          />

                        </div>
                      </Col>


                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Total Available Quantity</Label>
                          <Input
                            name="current_stock"
                            value={validation.values.current_stock || ""}
                            type="text"
                            placeholder="Total Available Quantity"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.current_stock && validation.errors.current_stock ? true : false
                            }
                          />
                          {validation.touched.current_stock && validation.errors.current_stock ? (
                            <FormFeedback type="invalid">{validation.errors.current_stock}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Expiry Date</Label>
                          <InputGroup>
                            <Flatpickr
                              name="expiry_date"
                              onChange={(e) => validation.setFieldValue('expiry_date', e[0])}
                              className="form-control d-block"
                              placeholder="dd M,yyyy"
                              options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                dateFormat: "Y-m-d"
                              }}
                            />
                          </InputGroup>
                          {validation.touched.expiry_date && validation.errors.expiry_date ? (
                            <FormFeedback type="invalid">{validation.errors.expiry_date}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Country of Origin</Label>
                          <Input
                            name="country"
                            value={"INDIA"}
                            type="text"
                            placeholder=""
                            readOnly

                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">GST</Label>
                          <Input
                            value={GST}
                            type="text"
                            placeholder=""
                            readOnly
                          />

                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">TYPE</Label>
                          <Input
                            value={ProductType}
                            type="text"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Medicine type</Label>
                          <Input
                            value={MedicineType}
                            type="text"
                            placeholder=""
                            readOnly
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">MRP</Label>
                          <Input
                            name="unit_price"
                            value={validation.values.unit_price || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.unit_price && validation.errors.unit_price ? true : false
                            }
                          />
                          {validation.touched.unit_price && validation.errors.unit_price ? (
                            <FormFeedback type="invalid">{validation.errors.unit_price}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">PTR</Label>
                          <Input
                            name="purchase_price"
                            value={validation.values.purchase_price || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.purchase_price && validation.errors.purchase_price ? true : false
                            }
                          />
                          {validation.touched.purchase_price && validation.errors.purchase_price ? (
                            <FormFeedback type="invalid">{validation.errors.purchase_price}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Prepaid Inventory</Label>
                          <Input
                            type="text"
                            placeholder="FALSE"
                            readOnly
                          />

                        </div>
                      </Col>
                    </Row>


                    <Row>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Lot size</Label>
                          <Input
                            name="lot_size"
                            value={validation.values.lot_size || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.lot_size && validation.errors.lot_size ? true : false
                            }
                          />
                          {validation.touched.lot_size && validation.errors.lot_size ? (
                            <FormFeedback type="invalid">{validation.errors.lot_size}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Maximum order quantity</Label>
                          <Input
                            name="max_qty"
                            value={validation.values.max_qty || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.max_qty && validation.errors.max_qty ? true : false
                            }
                          />
                          {validation.touched.max_qty && validation.errors.max_qty ? (
                            <FormFeedback type="invalid">{validation.errors.max_qty}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Product Surcharge</Label>
                          <Input
                            value={"0 %"}
                            type="text"
                            placeholder=""
                            readOnly
                          />

                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Prepaid Product</Label>
                          <Input
                            type="text"
                            value={"FALSE"}
                            placeholder=""
                            readOnly

                          />

                        </div>
                      </Col>
                    </Row>


                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Product Category</Label>
                          <Input
                            value={category}
                            type="text"
                            placeholder=""
                            readOnly

                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Discount Type</Label>
                          <select
                            id="formrow-InputState"
                            className="form-control"
                            name="discount_type"

                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}

                          >

                            <option value="flat">Flat</option>
                            <option value="percent">Percent %</option>


                          </select>
                          {validation.touched.discount_type && validation.errors.discount_type ? (
                            <FormFeedback type="invalid">{validation.errors.discount_type}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Discount</Label>
                          <Input
                            name="discount_type"
                            value={validation.values.discount || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.discount && validation.errors.discount ? true : false
                            }
                          />
                          {validation.touched.discount && validation.errors.discount ? (
                            <FormFeedback type="invalid">{validation.errors.discount}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>


                    </Row>




                  </CardBody>
                </Card>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => tog_xlarge()}>Close</button>

                <button type="submit" className="btn btn-primary">SUMBIT</button>
              </div>
            </Form>
          </Modal>

          <ChangeStatusModal
            show={requestModal}
            onChangeClick={handleRequestProduct}
            onCloseClick={() => setRequestModal(false)}
            message={'Are you Sure you want to hide product'}
            buttonText={'Hide Now'}
          />

        </div>
      </div>
    </React.Fragment>
  );
}
// EcommerceOrder.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,

// };
InventryMedical.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default InventryMedical;