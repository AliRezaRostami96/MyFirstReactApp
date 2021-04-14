import React, { useState } from 'react';
import PropTypes from 'prop-types';

const useDropDown = (id, lable, options, defaultState) => {
    const [state, setState] = useState(defaultState);
    const dropDown = () => (
        <label htmlFor={id}>
            {lable}:
            <select
                name={lable}
                id={id}
                value={state}
                onChange={e => setState(e.target.value)}
                onBlur={e => setState(e.target.value)}
                disabled={options.length == 0 ? true : false}
            >
                <option></option>
                {
                    options.map((option, index) => (
                        <option value={option.value} key={option.optionName + "-" + option.value}>{option.optionName}</option>
                    ))
                }
            </select>
        </label >
    )
    return [state, dropDown, setState];
}
useDropDown.defaultProps = {
    id: "selectOptionID",
    lable: "ForgotEnterLabel",
    options: [
        {
            optionName: "insert Your List Option",
            value: 0
        }
    ],
    defaultState: ""
}
useDropDown.propTypes = {
    id: PropTypes.string,
    lable: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    defaultState: PropTypes.number
}
export default (useDropDown);