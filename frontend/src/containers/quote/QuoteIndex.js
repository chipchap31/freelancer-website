import React from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import { getQuote } from '../../actions';
import { connect } from 'react-redux'
const options = [
    {
        name: 'logo',
        info: [
            'Lorem ipsum dolor sit amet',
            'consectetur adipiscing elit',
            'Ut sed neque in'

        ]
    },
    {
        name: 'poster',
        info: [
            'Lorem ipsum dolor sit amet',
            'consectetur adipiscing elit',
            'Ut sed neque ',
            'Ut sed neque '

        ]
    },
    {
        name: 'website',
        info: [
            'Lorem ipsum dolor sit amet.',
            'consectetur adipiscing elit',
            'Ut sed neque in'

        ]
    }
]


function QuoteIndex(props) {
    const match = useRouteMatch();


    return (
        <>
            <div className='col-8'>
                <h2>Get the best offer!</h2>
                <p>Choose one below</p>
                <div className='row'>
                    {options.map((obj, i) =>
                        <div className='card col py-4 mx-1' key={i}>
                            <h3>{obj.name}</h3>
                            <ul className='list-group list-group-flush'>
                                {obj.info.map((x, i) => <li className='list-group-item' key={i}>{x}</li>)}
                            </ul>
                            <Link
                                className='btn btn-secondary'
                                to={`${match.url}/${obj.name}`}
                                onClick={() => props.getQuote({
                                    type: `${obj.name}_Quote`.toUpperCase(),
                                    payload: {
                                        name: obj.name
                                    }
                                })}
                            >

                                Choose {obj.name}</Link>
                        </div>
                    )}
                    <div>

                    </div>
                </div>
            </div>
            <div className='col'>
                <h4>Estimated price</h4>
                <div className='card text-center p-2'>
                    Please select a service.
                </div>
            </div>
        </>

    )
}

export default connect(null, { getQuote })(QuoteIndex)