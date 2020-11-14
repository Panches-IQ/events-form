import axios from 'axios';
import { Observable } from 'rxjs';
import { first, retry } from 'rxjs/operators';

class EventService {
    getCategories() {
        return new Observable(o => {
            axios.get('http://www.mocky.io/v2/5bcdd3942f00002c00c855ba')
                .then(res => {
                    o.next(res);
                })
                .catch(err => {
                    o.error(err);
                });
        }).pipe(retry(5), first());
    }

    getAttendees() {
        return new Observable(o => {
            axios.get('http://www.mocky.io/v2/5bcdd7992f00006300c855d5')
                .then(res => {
                    o.next(res);
                })
                .catch(err => {
                    o.error(err);
                });
        }).pipe(retry(5), first());
    }

    sendData(data) {
        return new Observable(o => {
            console.log(data);
            o.next({ success: true });
        }).pipe(retry(5), first());
    }
}

export const eventservice = new EventService();
