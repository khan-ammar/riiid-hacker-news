import { HN_USER_BASE } from '../constants';

export default function getUserLink(id) {
    return `${HN_USER_BASE}${id}`;
}
