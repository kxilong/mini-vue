import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    componentDidMount() {
        console.log(process.env.NODE_ENV);
        // console.log(createHeading())
    }
    render() {
        return (
            <div>
                111
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))