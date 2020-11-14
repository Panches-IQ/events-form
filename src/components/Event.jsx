import React, { Component } from 'react';
import { eventservice } from '../service/service';
import { eventstore } from '../store/datastore';
import { About } from './About';
import { Coordinator } from './Coordinator';
import { When } from './When';
import { Loading } from './Loading';
import { errorstore } from '../store/errorstore';
import { Success } from './Success';
import './Event.scss';

export class Event extends Component {

    initialstate = {
        attendees: null,
        categories: null,
        isvalidform: false,
        isloading: false,
        issubmittedform: false
    };
    state = { ...this.initialstate };
    subscribers = [];

    componentDidMount() {
        this.setState({ isloading: true });

        eventservice.getAttendees()
            .subscribe(({ data }) => {
                this.setState({ attendees: data, isloading: !this.state.categories });
            });

        eventservice.getCategories()
            .subscribe(({ data }) => {
                this.setState({ categories: data, isloading: !this.state.attendees });
            });
        
        this.subscribers.push(eventstore
            .subscribe(() => {
                const { isvalidform } = this.state;
                const iserrors = Object.values(errorstore.getState()).reduce((a,i) => !!(a || i), false);
                const { coordinator, date, description, email, fee, ispaid, duration, title } = eventstore.getState();
                const isvalid = Boolean(!iserrors
                    && coordinator
                    && date
                    && duration
                    && description
                    && email
                    && (!ispaid || (ispaid && fee))
                    && title);

                if (isvalidform !== isvalid) {
                    this.setState({ isvalidform: isvalid });
                }
            }));
    }

    componentWillUnmount() {
        this.subscribers.forEach(s => s());
    }

    onSubmitClick = () => {
        if (this.state.isvalidform) {
            setTimeout(() => {
                this.sendData();
            }, 200);
        }
    }

    sendData() {
        const { coordinator, date, description, email, fee, ispaid, reward, title,
            duration, category } = eventstore.getState();
        
        const event = {
            title,
            description,
            category_id: category,
            paid_event: ispaid,
            event_fee: fee,
            reward,
            date,
            duration,
            coordinator: {
                email,                                                      
                id: coordinator
            },
        }

        eventservice.sendData(event)
            .subscribe(res => {
                const { success } = res;
                if (success) {
                    this.setState({ issubmittedform: true });
                }
            });
    }

    renderBody() {
        const { attendees, categories, issubmittedform, isloading } = this.state;
        const busy = isloading || !attendees || !categories;
        const body = busy
            ? <Loading />
            : issubmittedform 
            ? <Success />
            : <>
                <About categories={categories} />
                <Coordinator attendees={attendees} />
                <When />
            </>;
        return <div className="modal-body">{body}</div>
    }

    renderHeader() {
        return <div className="modal-title">New event</div>;
    }

    renderFooter() {
        const { isvalidform, issubmittedform } = this.state;
        return issubmittedform 
            ? null
            : <div className="modal-footer">
                <div className={ 'submit-event-button' + (isvalidform ? '' : ' disabled') }
                    type="button" onClick={this.onSubmitClick}>PUBLISH EVENT</div>
            </div>;
    }

    renderEventContent() {
        return <div className="card-content-wrapper">
            { this.renderHeader() }
            { this.renderBody() }
            { this.renderFooter() }
        </div>;
    }

    render() {
        return this.renderEventContent();
    }
}
