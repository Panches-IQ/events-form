import React, { Component } from 'react';
import { setCategory, setDescription, setFee, setPaid, setReward, setTitle } from '../store/dataactions';
import { eventstore } from '../store/datastore';
import { errorstore } from '../store/errorstore';
import { descriptionlimit } from '../utils/constants';
import { handleErrors } from '../utils/utils';
import './ContentBlock.scss';

export class About extends Component {

    state = {
        counter: 0,
        paymenttype: '0',
        category: '',
        fee: 0,
        reward: 0,
        errors: {}
    };

    subscribers = [];

    componentDidMount() {
        this.subscribers.push(errorstore
            .subscribe(() => {
                this.setState({ errors: errorstore.getState() });
            }));
    }

    componentWillUnmount() {
        this.subscribers.forEach(s => s());
    }

    onTitleChange = (e) => {
        const { value } = e.target;
        eventstore.dispatch(setTitle(value));
        handleErrors({ type: 'title', value })
    }

    onDescriptionChange = (e) => {
        const { value } = e.target;
        this.setState({ counter: (value || '').toString().length });
        eventstore.dispatch(setDescription(value));
        handleErrors({ type: 'description', value, limit: descriptionlimit });
    }

    onPaymentTypeChange = (e) => {
        const { value } = e.target;
        const { fee } = this.state;
        this.setState({ paymenttype: value });
        eventstore.dispatch(setPaid(value === '1'));
        handleErrors({ type: 'fee', value: fee, required: value === '1' });
    }

    onCategoryChange = (e) => {
        const { value } = e.target;
        this.setState({ category: value });
        eventstore.dispatch(setCategory(value));
    }

    onRewardChange = (e) => {
        const { value } = e.target;
        this.setState({ reward: value });
        eventstore.dispatch(setReward(Number(value)));
    }

    onFeeChange = (e) => {
        const { value } = e.target;
        const { paymenttype } = this.state;
        this.setState({ fee: value });
        eventstore.dispatch(setFee(Number(value)));
        handleErrors({ type: 'fee', value, required: paymenttype === '1' });
    }

    renderReward() {
        return <div className="block-area">
                <div className="area-name display-inline">REWARD</div>
                <div className="area-content display-inline">
                <div className="linerow-wrapper">
                        <input placeholder="Number" className="reward-input display-inline"
                            type="number" min="0" onChange={this.onRewardChange}/>
                        <div className="radio-label display-inline">reward points for attendance</div>
                    </div>
                </div>
            </div>
    }

    renderPaymentType() {
        const { paymenttype, fee } = this.state;
        const { fee: err } = this.state.errors;
        return <div className={`block-area ${ err ? 'error' : '' }`}>
            <div className="area-name display-inline">PAYMENT</div>
            <div className="area-content display-inline">
                <div className="linerow-wrapper">
                    <input type="radio" name="payment_type" 
                        value="0" 
                        checked={paymenttype === '0'} 
                        onChange={this.onPaymentTypeChange} />
                    <div className="radio-label display-inline">Free event</div>
                    <input type="radio" name="payment_type" 
                        value="1" 
                        checked={paymenttype === '1'} 
                        onChange={this.onPaymentTypeChange} />
                    <div className="radio-label display-inline">Paid event</div>
                    <input type="number"
                        min="0"
                        value={fee}
                        className={ 'fee-input display-inline' + (paymenttype === '1' ? '' : ' display-none') }
                        placeholder="Fee"
                        onChange={this.onFeeChange} />
                    <div className={ 'radio-label display-inline' + (paymenttype === '1' ? '' : ' display-none') }>$</div>
                </div>
            </div>
            <div className="area-error display-inline">{err}</div>
        </div>;
    }

    renderCategories() {
        const { categories } = this.props;
        const { category } = this.state;
        return <div className="block-area">
            <div className="area-name display-inline">CATEGORY</div>
            <div className="area-content display-inline">
                <select className={ category === '' ? '' : 'selected' } onChange={this.onCategoryChange} value={category}>
                    <option value="" disabled hidden>Select category (skills, interests, locations)</option>
                    { categories.map(item => {
                        return <option key={item.id} value={item.id}>{ item.name }</option>
                    }) }
                </select>
                <div className="hint">Lorem ipsum dolor sit amet consectetur.</div>
            </div>
        </div>;
    }

    renderDescription() {
        const { counter } = this.state;
        const { description: err } = this.state.errors;
        return <div className={`block-area ${ err ? 'error' : '' }`}>
            <div className="area-name display-inline">DESCRIPTION *</div>
            <div className="area-content display-inline">
                <textarea className="description-content"
                    placeholder="Write about your event. Be creative"
                    onChange={ this.onDescriptionChange }
                    rows="5" />
                <div className="hint">Max length is {descriptionlimit}<span>{ counter + '/' + descriptionlimit }</span></div>
            </div>
            <div className="area-error display-inline">{err}</div>
        </div>;
    }

    renderTitle() {
        const { title: err } = this.state.errors;
        return <div className={`block-area ${ err ? 'error' : '' }`}>
            <div className="area-name display-inline">TITLE *</div>
            <div className="area-content display-inline">
                <input onChange={this.onTitleChange}
                    placeholder="Make it short and clear"
                    type="text" />
            </div>
            <div className="area-error display-inline">{err}</div>
        </div>;
    }

    render() {
        return <div className="content-wrapper">
            <div className="block-name">About</div>
            <div className="block-separator"></div>
            { this.renderTitle() }
            { this.renderDescription() }
            { this.renderCategories() }
            { this.renderPaymentType() }
            { this.renderReward() }
        </div>;
    }
}
