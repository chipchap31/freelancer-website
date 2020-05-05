import React from 'react';
import { Link } from 'react-router-dom';
import {
    Layout,
    Row,
    Col,
    Button,
    Avatar
} from 'antd';


function Header(props) {
    const { Header } = Layout;
    console.log(props);

    const { authenticated } = props;
    const { username } = props.user


    return (
        <>
            {!authenticated && (<aside>
                <div className='container'>

                    <Row justify='end' >
                        <Link to='/login'>Client Login</Link>
                    </Row>
                </div>
            </aside>)}
            <Header className="header">

                <Row className='container' justify='space-between'>
                    <Col>
                        <Link to='/'>Logo</Link>
                    </Col>
                    <Col>
                        {authenticated && (
                            <Button type='link'>
                                <Link to='/dashboard'>Dashboard</Link>
                            </Button>
                        )}
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