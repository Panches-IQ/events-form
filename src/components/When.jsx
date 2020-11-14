import React, { Component } from 'react';
import { setDuration, setDate } from '../store/dataactions';
import { eventstore } from '../store/datastore';
import { errorstore } from '../store/errorstore';
import moment from 'moment';
import './ContentBlock.scss';
import { templateIn, templateOut } from '../utils/constants';
import { handleErrors } from '../utils/utils';

export class When extends Component {

    state = {
        date: '',
        time: '',
        timeformat: 'am',
        duration: 0,
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

    onTimeFormatChange = (e) => {
        const { value } = e.target;
        this.setState({ timeformat: value }, () => this.emitDate());
    }

    onDateChange = (e) => {
        const { value } = e.target;
        this.setState({ date: value }, () => this.emitDate());
        handleErrors({ type: 'date', value });
    }

    onTimeChange = (e) => {
        const { value } = e.target;
        this.setState({ time: value }, () => this.emitDate());
        handleErrors({ type: 'time', value });
    }

    onDurationChange = (e) => {
        const { value } = e.target;
        this.setState({ duration: value });
        const seconds = Number(value) * 60 * 60;
        eventstore.dispatch(setDuration(seconds));
    }

    emitDate() {
        const { timeformat, date, time } = this.state;

        if (timeformat && date && time) {
            const gathertime = moment(date + ' ' + time + ' ' + timeformat, templateIn);
            if (gathertime.isValid()) {
                eventstore.dispatch(setDate(gathertime.format(templateOut)));
            }
        }
    }

    renderDuration() {
        return <div className="block-area">
            <div className="area-name display-inline">DURATION</div>
            <div className="area-content display-inline">
            <div className="linerow-wrapper">
                    <input placeholder="Number" className="duration-input display-inline"
                        type="number" min="0" max="100" onChange={this.onDurationChange}/>
                    <div className="radio-label display-inline">hour(s)</div>
                </div>
            </div>
        </div>
    }

    renderDate() {
        const { date, time, timeformat } = this.state;
        const { date: dateerr, time: timeerr } = this.state.errors;
        const err = dateerr || timeerr;
        return <div className={`block-area ${ err ? 'error' : '' }`}>
            <div className="area-name display-inline">STARTS ON *</div>
            <div className="area-content display-inline">
                <div className="linerow-wrapper">
                    <input type="date" className={ 'display-inline date-input' + (date ? ' selected' : '') }
                        value={date}
                        onChange={this.onDateChange} />
                    <div className="radio-label display-inline">at</div>
                    <input type="time" className={ 'display-inline time-input' + (time ? ' selected' : '') }
                        value={time}
                        onChange={this.onTimeChange} />
                    <input type="radio" name="time_format" 
                        value="am" 
                        checked={timeformat === 'am'} 
                        onChange={this.onTimeFormatChange} />
                    <div className="radio-label display-inline">AM</div>
                    <input type="radio" name="time_format" 
                        value="pm" 
                        checked={timeformat === 'pm'} 
                        onChange={this.onTimeFormatChange} />
                    <div className="radio-label display-inline">PM</div>
                </div>
            </div>
            <div className="area-error display-inline">{err}</div>
        </div>;
    }

    render() {
        return <div className="content-wrapper">
            <div className="block-name">When</div>
            <div className="block-separator"></div>
            { this.renderDate() }
            { this.renderDuration() }
        </div>;
    }
}
