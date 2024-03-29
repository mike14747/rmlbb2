export async function deleteAllEvents() {
    const mutations = [
        {
            delete: {
                query: '*[_type == "event"]',
            },
        },
    ];
    await fetch(process.env.SANITY_PUBLIC_MUTATION_URL, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            // Authorization: `Bearer ${process.env.SANITY_PUBLIC_API_TOKEN}`,
            Authorization: 'Bearer ' + process.env.SANITY_PUBLIC_API_TOKEN,
        },
        body: JSON.stringify({ mutations }),
    })
        .then(res => console.log('Status Code:', res.status))
        .catch(error => console.log(error));
    return 'done';
}

// this function is being kept as an example
// the manager data is now in its own private studio
export async function deleteAllManagers() {
    const mutations = [
        {
            delete: {
                query: '*[_type == "manager" && teamId > 0]',
            },
        },
    ];

    let returned;

    await fetch(process.env.SANITY_PRIVATE_MUTATION_URL, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            // Authorization: `Bearer ${process.env.SANITY_PRIVATE_API_TOKEN}`,
            Authorization: 'Bearer ' + process.env.SANITY_PRIVATE_API_TOKEN,
        },
        body: JSON.stringify({ mutations }),
    })
        .then(res => {
            console.log('Status Code:', res.status);
            returned = res;
        })
        .catch(error => {
            console.log(error);
            returned = error;
        });
    return returned;
}

export async function deleteAllNewsItems() {
    const mutations = [
        {
            delete: {
                query: '*[_type == "newsItem"]',
            },
        },
    ];
    await fetch(process.env.SANITY_PUBLIC_MUTATION_URL, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            // Authorization: `Bearer ${process.env.SANITY_PUBLIC_API_TOKEN}`,
            Authorization: 'Bearer ' + process.env.SANITY_PUBLIC_API_TOKEN,
        },
        body: JSON.stringify({ mutations }),
    })
        .then(res => console.log('Status Code:', res.status))
        .catch(error => console.log(error));
    return 'done';
}
