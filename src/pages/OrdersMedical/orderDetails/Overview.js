import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

//import images
import adobephotoshop from "../../../assets/images/companies/adobe-photoshop.svg";

const Overview = ({order_detail}) => {
    return (
        <React.Fragment>
            <Col xl={3}>
                <Card>
                    <CardBody>
                        <h5 className="fw-semibold">Overview</h5>

                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="col">PLACED BY</th>
                                        <td scope="col">{order_detail?.customer?.f_name+' '+order_detail?.customer?.l_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Order ID:</th>
                                        <td>{order_detail?.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Location</th>
                                        <td>{order_detail?.shipping_address_data?.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">City</th>
                                        <td><span className="badge badge-soft-success">{order_detail?.shipping_address_data?.zip+' '+order_detail?.shipping_address_data?.country}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td><span className="badge badge-soft-info">{order_detail?.order_status}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Order Date</th>
                                        <td>{order_detail?.order_date}</td>
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                        <div className="hstack gap-2">
                            <button className="btn btn-soft-primary w-100" onClick={()=>changeOrderStatus('processing')}>Process Order</button>
                            <button className="btn btn-soft-danger w-100" onClick={()=>changeOrderStatus('canceled')}>Cancel Order</button>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div className="text-center">
                            {/* <img src={adobephotoshop} alt="" height="50" className="mx-auto d-block" /> */}
                            <h5 className="mt-3 mb-1">KYC DETAILS</h5>
                            {/* <p className="text-muted mb-0">Since July 2017</p> */}
                        </div>

                        <ul className="list-unstyled mt-4">
                            <li>
                                <div className="d-flex">
                                    <i className="bx bx-file-find text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">FORM 20 </h6>
                                        <p className="text-muted fs-14 mb-0">({order_detail?.customer?.lic20bno} | {order_detail?.customer?.lic20bdate})</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-file-find text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">FORM 21</h6>
                                        <p className="text-muted fs-14 mb-0"> ({order_detail?.customer?.lic21bno} | {order_detail?.customer?.lic21bdate})</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-globe text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">PAYMENT TYPE</h6>
                                        <p className="text-muted fs-14 text-break mb-0">({order_detail?.payment_method=='razor_pay'?'Prepaid':'COD'})</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-map text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">Grand Total</h6>
                                        <p className="text-muted fs-14 mb-0">₹{order_detail?.order_amount}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        {/* <div className="mt-4">
                            <Link to="#" className="btn btn-soft-primary btn-hover w-100 rounded"><i className="mdi mdi-eye"></i> View Profile</Link>
                        </div> */}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default Overview;