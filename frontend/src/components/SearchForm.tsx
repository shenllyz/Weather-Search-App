import React from 'react';
import { SassColor } from 'sass';

const searchForm = () => {
    return (
        <div>
           <h2 className="header">Weather Search ⛅</h2>
           <div className="form-container">
                <div className="form-group">
                    <label htmlFor="street">Street<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" id="street" name="street" className="input" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="city">City<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" id="city" name="city" className="input" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="state">State<span style={{ color: 'red' }}>*</span></label>
                    <select id="state" name="state" className="input" required>
                        <option value="">Select your state</option>
                         
                    </select>
                </div>
            </div>

            <div className="actions-container">
                <div className="checkbox-group">
                    
                    <label htmlFor="autodetect-location">Autodetect Location<span style={{ color: 'red' }}>*</span></label>

                    <input type="checkbox" id="current-location" name="current-location" />
                    <label htmlFor="current-location">Current Location</label>
                </div>

                <div className="buttons-group">
                    <button type="button" className="btn btn-primary">Search</button>
                    <button type="button" className="btn btn-secondary">Clear</button>
                </div>
            </div>
        </div>
    );
}

export default searchForm;