import { basePublicQueryUrl, mutationQueryUrl } from '../../lib/settings';

export async function getNextUpcomingEvents() {

}

export async function getAllUpcomingEvents() {

}

export async function getAllEvents() {

}

export async function deleteAllEvents() {
    const mutations = [
        {
            delete: {
                query: '*[_type == "event"]',
            },
        },
    ];
    await fetch(mutationQueryUrl, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ mutations }),
    }).then(res => console.log('Delete Response:', res)).catch(error => console.log(error));
    return 'done';
}
