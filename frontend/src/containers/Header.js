import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';


function Header() {
    const { Header } = Layout;
    return (
        <>
            <aside>
                <div className='container'>

                    <Row justify='end' >
                        <Link to='/login'>Client Login</Link>
                    </Row>
                </div>
            </aside>
            <Header className="header">

                <Row className='container' justify='space-between'>
                    <Col>
                        <Link to='/'>Logo</Link>
                    </Col>
                    <Col>
                        <Button type='primary'>
                            <Link to='/get-quote'>Get Quote</Link>
                        </Button>
                    </Col>
                </Row>
            </Header>
        </>
    )
}

export default Header;