import React, { Component } from 'react';
import { setCoordinator, setEmail } from '../store/dataactions';
import { eventstore } from '../store/datastore';
import { errorstore } from '../store/errorstore';
import { handleErrors } from '../utils/utils';
import './ContentBlock.scss';

export class Coordinator extends Component {

    state = {
        attendee: '',
        meid: 0,
        email: '',
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

    onCoordinatorChange = (e) => {
        const { value } = e.target;
        const { attendees } = this.props;
        this.setState({ attendee: value });
        eventstore.dispatch(setCoordinator(value));
        const attendee = attendees.find(i => String(i.id) === String(value));
        if (attendee && attendee.email) {
            this.setState({ email: attendee.email });
            eventstore.dispatch(setEmail(attendee.email));
            handleErrors({ type: 'email', value: attendee.email });
        }
    }

    onEmailChange = (e) => {
        const { value } = e.target;
        this.setState({ email: value });
        eventstore.dispatch(setEmail(value));
        handleErrors({ type: 'email', value });
    }

    renderEmail() {
        const { email: err } = this.state.errors;
        const { email } = this.state;
        return <div className={`block-area less-space-margin ${ err ? 'error' : '' }`}>
            <div className="area-name display-inline">EMAIL</div>
            <div className="area-content display-inline">
                <input onChange={this.onEmailChange}
                    value={email}
                    placeholder="Enter coordinator e-mail"
                    type="text" />
            </div>
            <div className="area-error display-inline">{err}</div>
        </div>;
    }

    renderResponsible() {
        const { attendee, meid } = this.state;
        const { attendees } = this.props;
        return <div className="block-area">
            <div className="area-name display-inline">RESPONSIBLE *</div>
            <div className="area-content display-inline">
                <select className={ attendee === '' ? '' : 'selected' } onChange={this.onCoordinatorChange} value={attendee}>
                    <option value="" disabled hidden>Select coordinator for event</option>
                    { attendees.map(item => {
                        const name = item.name + ' ' + item.lastname + (item.id === meid ? ' (me)' : '')
                        return <option key={item.id} value={item.id}>{ name }</option>
                    }) }
                </select>
            </div>
        </div>;
    }

    render() {
        return <div className="content-wrapper">
            <div className="block-name">Coordinator</div>
            <div className="block-separator"></div>
            { this.renderResponsible() }
            { this.renderEmail() }
        </div>;
    }
}
