import React, {Component} from 'react';
import styles from '../styles/components/Banner2.css';

class Banner2 extends Component {
    render() {
        return (
            <div className="c-bord1">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat estem <span className="under-text3">dignissim lorem</span> quis porta. Ut vel neque gravida dui mattis malesuada etui.
                    Proin et dictum neque. In eget ipsum in risus vehicula hendrerit.
                </p>
                <p>
                    Morbi venenatis, tortor ac laoreet suscipit, enim augue tincidunt turpis, crasu
                    at faucibus arcu nisi finibus elit. Maecenas tempus eleifend neque, acumeti
                    malesuada sapien faucibus quis. Maecenas <span className="under-text3"> nec quam </span> nec odiom estoc
                    ollicitudin ipsum.
                </p>
            </div>
        );
    }
}

export default Banner2;
