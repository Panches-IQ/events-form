import axios from 'axios';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

class EventService {
    getCoordinators() {
        return new Observable(o => {
            axios.get('http://www.mocky.io/v2/5bcdd3942f00002c00c855ba')
                .then(res => {
                    o.next(res);
                    o.complete();
                })
                .catch(err => {
                    o.error(err);
                });
        }).pipe(first());
    }

    getAttendees() {
        return new Observable(o => {
            axios.get('http://www.mocky.io/v2/5bcdd7992f00006300c855d5')
                .then(res => {
                    o.next(res);
                    o.complete();
                })
                .catch(err => {
                    o.error(err);
                });
        }).pipe(first());
    }
}

export const eventservice = new EventService();
