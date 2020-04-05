import React from 'react';
import { connect } from 'react-redux';
import { getQuote } from '../../actions'
const options = [
    {
        name: 'icon',
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

function Quote(props) {



    return (
        <section id='quote' className='padded'>
            <div className='container'>
                <div className='row'>
                    <div className='col-9'>
                        <h1>Get the best offer!</h1>
                        <p>Choose one below</p>
                        <div className='row'>
                            {options.map((obj, i) =>
                                <div className='card col py-4 mx-1' key={i}>
                                    <h3>{obj.name}</h3>
                                    <ul className='list-group list-group-flush'>
                                        {obj.info.map((x, i) => <li className='list-group-item' key={i}>{x}</li>)}
                                    </ul>
                                    <button onClick={() => props.getQuote({ type: `${obj.name}_QUOTE`.toUpperCase(), payload: { name: obj.name } })} className='btn-secondary'>Choose {obj.name}</button>
                                </div>
                            )}
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className='col'>

                    </div>
                </div>


            </div>

        </section>
    )
}

export default connect(null, { getQuote })(Quote);





