import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import DeleteModal from '../../components/Common/DeleteModal';

import {
    getOrdersLists as onGetOrders,
    addNewOrder as onAddNewOrder,
    updateOrder as onUpdateOrder,
    deleteOrder as onDeleteOrder,
} from "store/actions";

import {
    OrderId,
    BillingName,
    Date,
    Total,
    PaymentStatus,
    PaymentMethod
}
    from "../Ecommerce/EcommerceOrders/EcommerceOrderCol";

//redux
import { useSelector, useDispatch } from "react-redux";
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

import {
    Button,
    Col,
    Row,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
    Card,
    CardBody,
} from "reactstrap";

function OrderMedical() {

    //meta title
    document.title = "Orders | Medimny";

    const dispatch = useDispatch();
    const { orders } = useSelector(state => ({
        orders: state.OrderReducer.orders,
    }));

    useEffect(() => {
        console.log(orders, 'orders')
        if (orders?.open == undefined || orders?.open == null) {
            dispatch(onGetOrders());
        }

    }, [dispatch, orders]);



    const columns = useMemo(
        () => [

            {
                Header: 'Order',
                accessor: 'id',
                width: '150px',
                style: {
                    textAlign: "center",
                    width: "10%",
                    background: "#0000",
                },
                filterable: true,
                Cell: (cellProps) => {
                    return <OrderId {...cellProps} />;
                }
            },
            // {
            //     Header: 'Amount',
            //     accessor: 'billingName',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <BillingName {...cellProps} />;
            //     }
            // },
            {
                Header: 'Amount',
                accessor: 'order_amount',
                filterable: true,
                Cell: (cellProps) => {
                    return <Total {...cellProps} />;
                }
            },
            {
                Header: 'Status',
                accessor: 'order_status',
                filterable: true,
                Cell: (cellProps) => {
                    return <PaymentStatus {...cellProps} />;
                }
            },
            // {
            //     Header: 'Action',
            //     accessor: 'paymentMethod',
            //     Cell: (cellProps) => {
            //         return <PaymentMethod {...cellProps} />;
            //     }
            // },
            {
                Header: 'Date',
                accessor: 'order_date',
                filterable: true,
                Cell: (cellProps) => {
                    return <Date {...cellProps} />;
                }
            },
            {
                Header: 'View Details',
                accessor: 'view',
                disableFilters: true,
                Cell: (cellProps) => {
                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="btn-group" role="group">
                                    {cellProps.row.original.order_status != 'delivered' && cellProps.row.original.order_status != 'canceled' && cellProps.row.original.order_status != 'Failed' ? <><input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" defaultChecked />
                                        <label className="btn btn-outline-secondary" htmlFor="btnradio4">DETAILS</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" />
                                        <label className="btn btn-outline-secondary" htmlFor="btnradio5">TRACK</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autoComplete="off" />
                                        <label className="btn btn-outline-secondary" htmlFor="btnradio6">PROCESS</label>
                                    </> : <></>}
                                    {cellProps.row.original.order_status == 'delivered' ? <><input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" defaultChecked />
                                        <label className="btn btn-outline-secondary" htmlFor="btnradio4">INVOICE</label>
                                    </> : <></>}
                                </div>
                            </div>
                        </div>
                    );
                }
            },
            // {
            //     Header: 'Action',
            //     accessor: 'action',
            //     disableFilters: true,
            //     Cell: (cellProps) => {
            //         return (
            //             <div className="d-flex gap-3">
            //                 <Link
            //                     to="#"
            //                     className="text-success"
            //                     onClick={() => {
            //                         const orderData = cellProps.row.original;
            //                         handleOrderClick(orderData);
            //                     }}
            //                 >
            //                     <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
            //                     <UncontrolledTooltip placement="top" target="edittooltip">
            //                         Edit
            //                     </UncontrolledTooltip>
            //                 </Link>
            //                 <Link
            //                     to="#"
            //                     className="text-danger"
            //                     onClick={() => {
            //                         const orderData = cellProps.row.original;
            //                         onClickDelete(orderData);
            //                     }}
            //                 >
            //                     <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
            //                     <UncontrolledTooltip placement="top" target="deletetooltip">
            //                         Delete
            //                     </UncontrolledTooltip>
            //                 </Link>
            //             </div>
            //         );
            //     }
            // },
        ],
        []
    );
    const [activeTab, setactiveTab] = useState("1");
    return (
        <React.Fragment>

            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
                    <Nav tabs>
                        <NavItem style={{ width: '33%' }}>
                            <NavLink
                                style={{
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                                className={classnames({
                                    active: activeTab === "1",
                                })}
                                onClick={() => {
                                    setactiveTab("1");
                                }}
                            >
                                OPEN
                            </NavLink>
                        </NavItem>
                        <NavItem style={{ width: '33%' }}>
                            <NavLink
                                style={{
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                                className={classnames({
                                    active: activeTab === "3",
                                })}
                                onClick={() => {
                                    setactiveTab("3");
                                }}
                            >
                                HISTORY
                            </NavLink>
                        </NavItem>
                        <NavItem style={{ width: '34%' }}>
                            <NavLink
                                style={{
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                                className={classnames({
                                    active: activeTab === "2",
                                })}
                                onClick={() => {
                                    setactiveTab("2");
                                }}
                            >
                                OLD MENIFEST
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    {orders?.open != null && orders?.open != undefined ? <TableContainer
                                        columns={columns}
                                        data={activeTab == 1 ? orders?.open : orders?.history}
                                        isGlobalFilter={true}
                                        isAddOptions={false}
                                        handleOrderClicks={null}
                                        customPageSize={10}
                                    /> : <></>}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </div>
        </React.Fragment>
    );
}
OrderMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

export default OrderMedical;










OrderMedical