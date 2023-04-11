# API Routes

## Initial notes

With the advent of server components, many api routes are no longer needed, since you can bypass them and import the serverless functions directly into your components.

The only api routes I see as necessary are the ones that need to be initiated by the user. Examples of this are:

1.  POST, PUT and DELETE routes.
2.  Login/Register requests (which also fall into the above POST method).
3.  Any requests for additional page/component data that is requested via user input from a client component.

Many/most GET routes are no longer needed.

### Accessing the request body

To get the request body, you used to be able to just access it via "req.body".

Since next.js v13, you need to access it this way (using: await request.json()):

```ts
export async function POST(request: NextRequest) {
    try {
        // ...

        const { email } = await request.json();

        // ...
    } catch (error) {
        return handleAPICatchError(error);
    }
}
```

### Accessing route segment params

In the past, you could access them via: "req.query.id".

Since next.js v13, you need to access them this way:

```ts
export async function PUT(request: NextRequest, params: { params: { id: string }}) {
    try {
        // ...

        const { id } = params;

        // ...
    } catch (error) {
        return handleAPICatchError(error);
    }
}
```

### Responses

You need to explicitly return all responses.

For now (because of a bug in typescript), you need to return "NextResponse" instead of just "Response"... even though it's technically valid. Obviously, that means NextResponse needs to be imported first.

---

## Public routes

In this app, most public routes use the GET method.

These routes can be fairly simple because they don't have to check for a token and if they don't need to consider any route segment info.

```ts
import { NextResponse } from 'next/server';
import { getAllActivePastEvents } from '@/lib/api/events';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function GET() {
    try {
        const data = await getAllActivePastEvents();
        return data ? NextResponse.json(data, { status: 200 }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
```

---

## Protected routes

```ts

```

---

## User-specific protected routes

In the following route handler, the user needs to be signed in, plus the id param needs to match the id in their session.

In the below PUT example, a route segment param and request body are checked for validity. If they are NOT valid, the appropriate status code is returned.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { changeEmail } from '@/lib/api/user';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    try {
        const token = await getToken({ req: request });
        if (!token) return NextResponse.json(null, { status: 401 });

        const { email } = await request.json();
        const id = params.id;

        if (!id || !email) return NextResponse.json(null, { status: 400 });
        if (token?.id !== id) return NextResponse.json(null, { status: 401 });

        const result = await changeEmail(parseInt(id), email);
        return result.code
            ? NextResponse.json(null, { status: result.code })
            : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
```

---

## Admin routes

In admin routes, a user needs to not only be signed in, but must also have the role of "admin".

```ts
import { NextRequest, NextResponse } from 'next/server';
import { addUser } from '@/lib/api/user';
import { getToken } from 'next-auth/jwt';
import { handleAPICatchError } from '@/lib/helpers/handleCatchErrors';

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (token?.role !== 'admin') return NextResponse.json(null, { status: 401 });

        const { username, password, email, active } = await request.json();
        if (!username || !password || !email) return NextResponse.json(null, { status: 400 });

        const result = await addUser(username, password, email, active);
        return result?.code ? NextResponse.json(null, { status: result.code }) : NextResponse.json(null, { status: 500 });
    } catch (error) {
        return handleAPICatchError(error);
    }
}
```

---

## Handling .catch() errors

Typescript will complain if you try to "console.log(error.message)" because .catch() doesn't guarantee the error will be an error object... or at least typescript doesn't think so.

So, I've been using a function to handle my catch errors (as seen in the above route.ts files). I import it into all my route handlers and pass the error to it.

```ts
import { NextResponse } from 'next/server';

export function handleAPICatchError(error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.log('error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
```

I don't have any other .catch() error handlers inside the above file beside the ones for route handlers. But, I left it without a default export just in case I want to add others.

The above function takes in the error and checks to see if it's an error object.

If it is an error object, it outputs the error message.

If it is NOT an error object, it outputs a default error message.

---
