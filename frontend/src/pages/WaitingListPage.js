import React from 'react';
import { WaitingListForm } from '../components/forms';
import { Typography } from 'antd';
/** 
    * @module WaitingListPage
    * @description Rendered when the admin edits the model Config and 
    * sets the accept_project to True.  
    */
function WaitingListPage() {
    const { Title } = Typography;
    return (
        <section id='waiting-list'>
            <div className='container'>
                <Title level={2}>I apologize for the inconvenience</Title>

                <WaitingListForm />
            </div>
        </section>
    )
}

export default WaitingListPage