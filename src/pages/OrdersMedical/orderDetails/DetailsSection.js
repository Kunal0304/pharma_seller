import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';
import { useSelector, useDispatch } from "react-redux";

import { isEmpty } from "lodash";
import {
    getOrders as onGetOrders,
    addNewOrder as onAddNewOrder,
    updateOrder as onUpdateOrder,
    deleteOrder as onDeleteOrder,
  } from "store/actions";

  
import {
    Button,
    Row,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,

  } from "reactstrap";
//import images
import wechat from "../../../assets/images/companies/wechat.svg";

import {
    OrderId,
    BillingName,
    Date,
    Total,
    PaymentStatus,
    PaymentMethod
  }
    from "./EcommerceOrderCol";

const DetailsSection = ({order_detail}) => {


    const dispatch = useDispatch();
 
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
  
    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState(null);

    const toggleViewModal = () => setModal1(!modal1);

    const handleOrderClicks = () => {
        setOrderList("");
        setIsEdit(false);
        toggle();
      };
    
    const columns = useMemo(
        () => [
    
          {
            Header: 'Title',
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
          {
            Header: 'Packing',
            accessor: 'pack',
            filterable: true,
            Cell: (cellProps) => {
              return <BillingName {...cellProps} />;
            }
          }
          ,
          {
            Header: 'Expiry	',
            accessor: 'expiry_date',
            filterable: true,
            Cell: (cellProps) => {
              return <BillingName {...cellProps} />;
            }
          } ,
          {
            Header: 'Offer	',
            accessor: 'discount_type',
           
          },
          {
            Header: 'MRP	',
            accessor: 'unit_price',
            
          },
          {
            Header: 'PTR',
            accessor: 'price',
            filterable: true,
          
          },
          {
            Header: 'Qty',
            accessor: 'qty',
           
          },
          {
            Header: 'Effective PTR',
            accessor: 'effective_ptr',
            filterable: true,
            Cell: (cellProps) => {
              return <Total {...cellProps} />;
            }
          },
          {
            Header: 'GST',
            accessor: 'tax',
            filterable: true,
           
          },
          {
            Header: 'Final Price',
            accessor: 'price*qty',
            filterable: true,
           
          },
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
                      handleOrderClick(orderData);
                    }}
                  >
                    <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                    <UncontrolledTooltip placement="top" target="edittooltip">
                      Edit
                    </UncontrolledTooltip>
                  </Link>
             
                </div>
              );
            }
          },
        ],
        []
      );
    return (
        <React.Fragment>
            <Col xl={9}>
                <Card>
                
                    <CardBody>

                    {order_detail.details!=undefined && order_detail.details!=null?<TableContainer
                    columns={columns}
                    data={order_detail.details}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                  />:<></>}
                       
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default DetailsSection;