
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { Col, Container, Row } from "reactstrap";
import Overview from './Overview';
import DetailsSection from './DetailsSection';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import { getProjectDetail as onGetProjectDetail } from "store/projects/actions";
import {
    getOrderDetail as onGetOrderDetail,
  getTicketDetails as onGetTicketDetail,
  getTicketsLists as onGetTickets,
  getOrdersLists as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions";


//redux
import { useSelector, useDispatch } from "react-redux";

const OrderDetails  = props => {
    document.title = "Order Details | Medimny";

    const dispatch = useDispatch();

    const { order_detail } = useSelector(state => ({
        order_detail: state.OrderReducer.order_detail,
    }));
  
    const params = props.router.params;

    const [details,setDetails]=useState(null);
  
    useEffect(() => {
     console.log(order_detail,'order details')
       if (params && params.id) {
    //     console.log(params,'params')
   
        dispatch(onGetOrderDetail(params.id));
    //     setDetails(order_detail)
   } 
  
    }, []);
  
   
    return (
        <React.Fragment>
             <div className="page-content">
                <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumbs title="Order" breadcrumbItem="Order Details" />

                <Row>
                    <Overview order_detail={order_detail}/>
                    <DetailsSection order_detail={order_detail}/>
                </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

OrderDetails.propTypes = {
    match: PropTypes.object,
  };
  
  export default withRouter(OrderDetails);