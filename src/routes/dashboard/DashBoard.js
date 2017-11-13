import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberCard from './numberCard';
import { Row, Col, Card} from 'antd';
import Trend from './Trend';
import {loadOrdersListCount, loadProductListCount, loadMemberCount,loadSumPayFee} from '../../service/auth';

import mockdata from '../../mock';

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      users:0,
      orders:0,
      products:0,
      bank:0
    };
  }

  componentDidMount(){
  }

  render() {
    const { users, products, orders, bank} = this.state;

    return (
      <div>
        <div className="gutter-example">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <NumberCard icon='user' title='用户数' color='#81C1FD' number={users} />
            </Col>
            <Col className="gutter-row" span={6}>
              <NumberCard icon='shopping-cart' title='商品数' color='#D48AEA' number={products} />
            </Col>
            <Col className="gutter-row" span={6}>
              <NumberCard icon='file' title='订单数' color='#F78C8D' number={orders} />
            </Col>
            <Col className="gutter-row" span={6}>
              <NumberCard icon='bank' title='交易额' color='#53E983' number={bank} />
            </Col>

            {/* <Col span={24}>
              <Card bordered={false} {...bodyStyle}>
                <Trend data={mockdata.trend} />
              </Card>
            </Col> */}
          </Row>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state){
  return {
    number: state.dashboard.number
  };
}

export default connect(mapStatetoProps)(Dashboard);
