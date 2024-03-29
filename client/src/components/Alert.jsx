import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// alert.id --> import {v4 as uuid} from uuid // actions/alert.js 
function Alert({ alerts }){
    return alerts !== null && alerts.length > 0 && alerts.map((alert)=> {
        return (
        <div className={`alert alert--${alert.alertType}`} key={alert.id}>
            {alert.msg}
        </div>
        )
    })
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    alerts: state.alert
})


export default connect(mapStateToProps)(Alert);