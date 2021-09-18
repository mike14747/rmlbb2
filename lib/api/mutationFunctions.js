const mutationQueryUrl = 'https://tmt0dwwl.api.sanity.io/v1/data/mutate/production';

async function deleteAllEvents() {
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

async function deleteAllManagers() {
    const mutations = [
        {
            delete: {
                query: '*[_type == "manager" && teamId > 0]',
            },
        },
    ];

    let returned;

    await fetch(mutationQueryUrl, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ mutations }),
    })
        .then(res => {
            console.log(res);
            returned = res;
        })
        .catch(error => {
            console.log(error);
            returned = error;
        });
    return returned;
}

module.exports = {
    deleteAllEvents,
    deleteAllManagers,
};
